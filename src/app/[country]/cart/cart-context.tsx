"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { MARKETS } from "@/lib/markets";

/** ====== Shopify config ====== */
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`;

/** ====== Types ====== */
type CountryCode = string; // ISO-3166-1 alpha-2, e.g. "UG", "KE", "RW"

type MoneyV2 = { amount: string; currencyCode: string };

export type CartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: MoneyV2 };
  merchandise: {
    id: string;
    title: string;
    product: { id: string; title: string; handle?: string };
    image?: { url: string; altText?: string };
    price?: MoneyV2;
    selectedOptions?: { name: string; value: string }[];
  };
};

type CartCost = {
  subtotalAmount?: MoneyV2;
  totalAmount?: MoneyV2;
};

export type CartState = {
  id: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
  cost: CartCost;
  currencyCode?: string;
};

type EnsureCartOpts = { createIfMissing?: boolean };

type CartContextType = {
  cart: CartState;
  country: CountryCode;
  bootstrapped: boolean;

  ensureCart: (opts?: EnsureCartOpts) => Promise<void>;
  loadCart: () => Promise<void>;

  addLine: (variantId: string, quantity?: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;

  clearCartForCountry: (code?: CountryCode) => void;
  setCountry: (code: CountryCode) => Promise<void>;
  formatMoney: (m?: MoneyV2 | null, localeOverride?: string) => string;
};

/** ====== Storage helpers (per-country cart IDs) ====== */
const CART_IDS_KEY = "shopify_cart_ids"; // JSON: { "UG": "<id>", "KE": "<id>", ... }
const COUNTRY_KEY = "shopify_country";   // currently selected country

function readCartIds(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CART_IDS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function writeCartIds(map: Record<string, string>) {
  localStorage.setItem(CART_IDS_KEY, JSON.stringify(map));
}
function getCartIdForCountry(code: CountryCode): string | null {
  return readCartIds()[code] ?? null;
}
function setCartIdForCountry(code: CountryCode, id: string) {
  const map = readCartIds();
  map[code] = id;
  writeCartIds(map);
}
function removeCartIdForCountry(code: CountryCode) {
  const map = readCartIds();
  if (map[code]) {
    delete map[code];
    writeCartIds(map);
  }
}

/** ====== Context ====== */
const CartContext = createContext<CartContextType | null>(null);

/** ====== Utils ====== */
function formatMoneyWithLocale(
  m?: MoneyV2 | null,
  locale = "en-US"
): string {
  if (!m) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: m.currencyCode,
  }).format(Number(m.amount));
}

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any>,
  country: CountryCode
): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables: { country, ...variables } }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify API: ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json;
}

/** ====== GraphQL ====== */
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost { totalAmount { amount currencyCode } }
          merchandise {
            ... on ProductVariant {
              id
              title
              image { url altText }
              product { id title }
              selectedOptions { name value }
            }
          }
        }
      }
    }
  }
`;

const CART_QUERY = `
  ${CART_FRAGMENT}
  query CartQuery($id: ID!, $country: CountryCode!)
  @inContext(country: $country) {
    cart(id: $id) { ...CartFields }
  }
`;

const CART_CREATE = `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!], $country: CountryCode!)
  @inContext(country: $country) {
    cartCreate(input: {
      lines: $lines,
      buyerIdentity: { countryCode: $country }
    }) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

const CART_LINES_ADD = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode!)
  @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

const CART_LINES_UPDATE = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $country: CountryCode!)
  @inContext(country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

const CART_LINES_REMOVE = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode!)
  @inContext(country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

/** ====== Mapping ====== */
function mapCart(json: any): CartState {
  const c =
    json?.data?.cart ??
    json?.data?.cartCreate?.cart ??
    json?.data?.cartLinesAdd?.cart ??
    json?.data?.cartLinesUpdate?.cart ??
    json?.data?.cartLinesRemove?.cart ??
    null;

  const edges: any[] = c?.lines?.edges ?? [];
  const lines: CartLine[] = edges.map((e) => e.node);

  return {
    id: c?.id ?? null,
    checkoutUrl: c?.checkoutUrl ?? null,
    lines,
    cost: {
      subtotalAmount: c?.cost?.subtotalAmount ?? undefined,
      totalAmount: c?.cost?.totalAmount ?? undefined,
    },
    currencyCode: c?.cost?.subtotalAmount?.currencyCode,
  };
}

/** ====== Provider ====== */
export function CartProvider({
  children,
  countryCode = "US",
}: {
  children: React.ReactNode;
  countryCode?: CountryCode;
}) {
  const [country, setCountryState] = useState<CountryCode>(countryCode);
  const countryRef = useRef<CountryCode>(countryCode); // always-current for async work
  const [cart, setCart] = useState<CartState>({
    id: null,
    checkoutUrl: null,
    lines: [],
    cost: {},
  });
  const [bootstrapped, setBootstrapped] = useState(false);

  // keep ref in sync with state
  useEffect(() => {
    countryRef.current = country;
  }, [country]);

  /** Restore selected country & its cartId on mount (lazy; no creation) */
  useEffect(() => {
    const savedCountry = localStorage.getItem(COUNTRY_KEY);
    const initialCountry = savedCountry ?? countryCode;
    if (initialCountry !== country) setCountryState(initialCountry);
    countryRef.current = initialCountry;

    // Migrate legacy single-cart key if present
    const legacy = localStorage.getItem("shopify_cart_id");
    if (legacy) {
      const map = readCartIds();
      if (!map[initialCountry]) {
        map[initialCountry] = legacy;
        writeCartIds(map);
      }
      localStorage.removeItem("shopify_cart_id");
    }

    const cid = getCartIdForCountry(initialCountry);
    if (cid) setCart((c) => ({ ...c, id: cid }));

    setBootstrapped(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** If route-provided country changes (e.g., /uganda -> /kenya), switch carts */
  useEffect(() => {
    if (countryCode && countryCode !== country) {
      void setCountry(countryCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  /** Load cart for a specific country (no stale closures) */
  const loadCartFor = async (code: CountryCode, id?: string) => {
    const cid = id ?? getCartIdForCountry(code);
    if (!cid) return;
    try {
      const json = await shopifyFetch<any>(CART_QUERY, { id: cid }, code);
      const mapped = mapCart(json);
      if (countryRef.current === code) setCart(mapped);
    } catch (e) {
      // expired/invalid → clear only this market
      removeCartIdForCountry(code);
      if (countryRef.current === code) {
        setCart({ id: null, checkoutUrl: null, lines: [], cost: {} });
      }
      console.warn(`Failed to load cart ${cid} for ${code}`, e);
    }
  };

  const loadCart = async () => loadCartFor(countryRef.current);

  /** Ensure a cart exists; optionally avoid creation (for cart page) */
  const ensureCart = async (
    opts: EnsureCartOpts = { createIfMissing: true }
  ) => {
    if (!bootstrapped) return;

    const code = countryRef.current;
    let id = cart.id ?? getCartIdForCountry(code);

    if (id) {
      try {
        const json = await shopifyFetch<any>(CART_QUERY, { id }, code);
        const mapped = mapCart(json);
        if (countryRef.current === code) setCart(mapped);
      } catch {
        removeCartIdForCountry(code);
        if (countryRef.current === code) {
          setCart({ id: null, checkoutUrl: null, lines: [], cost: {} });
        }
      }
      return;
    }

    if (opts.createIfMissing === false) return;

    const created = await shopifyFetch<any>(CART_CREATE, { lines: [] }, code);
    const mapped = mapCart(created);
    if (mapped.id) setCartIdForCountry(code, mapped.id);
    if (countryRef.current === code) setCart(mapped);
  };

  /** Mutations always operate on the CURRENT country's cart id (read at call time) */
  const addLine = async (variantId: string, quantity = 1) => {
    const code = countryRef.current;
    let id = getCartIdForCountry(code);

    if (!id) {
      const created = await shopifyFetch<any>(
        CART_CREATE,
        { lines: [{ merchandiseId: variantId, quantity }] },
        code
      );
      const mapped = mapCart(created);
      if (mapped.id) setCartIdForCountry(code, mapped.id);
      if (countryRef.current === code) setCart(mapped);
      return;
    }

    if (cart.id !== id && countryRef.current === code) {
      setCart((c) => ({ ...c, id }));
    }

    const json = await shopifyFetch<any>(
      CART_LINES_ADD,
      { cartId: id, lines: [{ merchandiseId: variantId, quantity }] },
      code
    );
    const mapped = mapCart(json);
    if (mapped.id && mapped.id !== id) setCartIdForCountry(code, mapped.id);
    if (countryRef.current === code) setCart(mapped);
  };

  const updateLine = async (lineId: string, quantity: number) => {
    const code = countryRef.current;
    const id = getCartIdForCountry(code);
    if (!id) return;

    const json = await shopifyFetch<any>(
      CART_LINES_UPDATE,
      { cartId: id, lines: [{ id: lineId, quantity }] },
      code
    );
    const mapped = mapCart(json);
    if (mapped.id && mapped.id !== id) setCartIdForCountry(code, mapped.id);
    if (countryRef.current === code) setCart(mapped);
  };

  const removeLine = async (lineId: string) => {
    const code = countryRef.current;
    const id = getCartIdForCountry(code);
    if (!id) return;

    const json = await shopifyFetch<any>(
      CART_LINES_REMOVE,
      { cartId: id, lineIds: [lineId] },
      code
    );
    const mapped = mapCart(json);
    if (mapped.id && mapped.id !== id) setCartIdForCountry(code, mapped.id);
    if (countryRef.current === code) setCart(mapped);
  };

  /** Clear only the current country's cart (keep others) */
  const clearCartForCountry = (code: CountryCode = countryRef.current) => {
    removeCartIdForCountry(code);
    if (countryRef.current === code) {
      setCart({ id: null, checkoutUrl: null, lines: [], cost: {} });
    }
  };

  /** Switch the active country WITHOUT repointing carts across markets */
  const setCountry = async (code: CountryCode) => {
    if (code === countryRef.current) return;

    localStorage.setItem(COUNTRY_KEY, code);
    setCountryState(code);
    countryRef.current = code;

    const nextId = getCartIdForCountry(code);
    setCart({ id: nextId ?? null, checkoutUrl: null, lines: [], cost: {} });

    if (nextId) {
      await loadCartFor(code, nextId);
    } else {
      // lazily create on first add; or uncomment to eagerly create:
      // await ensureCart({ createIfMissing: true });
    }
  };

  const value = useMemo<CartContextType>(
    () => ({
      cart,
      country,
      bootstrapped,
      ensureCart,
      loadCart,
      addLine,
      updateLine,
      removeLine,
      clearCartForCountry,
      setCountry,
      formatMoney: (m, localeOverride) => {
        const locale =
          localeOverride ??
          MARKETS?.[countryRef.current as keyof typeof MARKETS]?.locale ??
          "en-US";
        return formatMoneyWithLocale(m, locale);
      },
    }),
    [cart, country, bootstrapped]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

/** ====== Hook ====== */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
