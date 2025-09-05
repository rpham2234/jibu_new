"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`;

type MoneyV2 = { amount: string; currencyCode: string };

export type CartLine = {
  id: string; // cartLine id
  quantity: number;
  cost: { totalAmount: MoneyV2 };
  merchandise: {
    id: string; // variant id
    title: string;
    product: { id: string; title: string; handle?: string };
    image?: { url: string; altText?: string };
    price?: MoneyV2; // (not always present in cart, we use cost.totalAmount)
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

type CartContextType = {
  cart: CartState;
  ensureCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  addLine: (variantId: string, quantity?: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  clearCartId: () => void; // helpful for debugging
};

const CartContext = createContext<CartContextType | null>(null);

function formatMoney(m?: MoneyV2 | null): string {
  if (!m) return "";
  const noCents = m.currencyCode === "UGX";
  const n = Number(m.amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: m.currencyCode,
    minimumFractionDigits: noCents ? 0 : 2,
    maximumFractionDigits: noCents ? 0 : 2,
  }).format(n);
}

async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify(variables ? { query, variables } : { query }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify API: ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json;
}

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
  query CartQuery($id: ID!) {
    cart(id: $id) { ...CartFields }
  }
`;

const CART_CREATE = `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

const CART_LINES_ADD = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

const CART_LINES_UPDATE = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

const CART_LINES_REMOVE = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { message }
    }
  }
`;

function mapCart(json: any): CartState {
  const c = json?.data?.cart
    ?? json?.data?.cartCreate?.cart
    ?? json?.data?.cartLinesAdd?.cart
    ?? json?.data?.cartLinesUpdate?.cart
    ?? json?.data?.cartLinesRemove?.cart
    ?? null;

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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({ id: null, checkoutUrl: null, lines: [], cost: {} });

  // Restore cartId from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("shopify_cart_id");
    if (saved && !cart.id) {
      setCart((c) => ({ ...c, id: saved }));
    }
  }, []);

  const ensureCart = async () => {
    if (cart.id) return;
    const json = await shopifyFetch<any>(CART_CREATE, { lines: [] });
    const mapped = mapCart(json);
    setCart(mapped);
    if (mapped.id) localStorage.setItem("shopify_cart_id", mapped.id);
  };

  const loadCart = async () => {
    if (!cart.id) return;
    const json = await shopifyFetch<any>(CART_QUERY, { id: cart.id });
    setCart(mapCart(json));
  };

  const addLine = async (variantId: string, quantity = 1) => {
    let cartId = cart.id;
    if (!cartId) {
      const created = await shopifyFetch<any>(CART_CREATE, { lines: [{ merchandiseId: variantId, quantity }] });
      const mapped = mapCart(created);
      setCart(mapped);
      if (mapped.id) localStorage.setItem("shopify_cart_id", mapped.id);
      return;
    }
    const json = await shopifyFetch<any>(CART_LINES_ADD, { cartId, lines: [{ merchandiseId: variantId, quantity }] });
    setCart(mapCart(json));
  };

  const updateLine = async (lineId: string, quantity: number) => {
    if (!cart.id) return;
    const json = await shopifyFetch<any>(CART_LINES_UPDATE, { cartId: cart.id, lines: [{ id: lineId, quantity }] });
    setCart(mapCart(json));
  };

  const removeLine = async (lineId: string) => {
    if (!cart.id) return;
    const json = await shopifyFetch<any>(CART_LINES_REMOVE, { cartId: cart.id, lineIds: [lineId] });
    setCart(mapCart(json));
  };

  const clearCartId = () => {
    localStorage.removeItem("shopify_cart_id");
    setCart({ id: null, checkoutUrl: null, lines: [], cost: {} });
  };

  const value = useMemo<CartContextType>(() => ({
    cart,
    ensureCart,
    loadCart,
    addLine,
    updateLine,
    removeLine,
    clearCartId,
  }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return { ...ctx, formatMoney };
}
