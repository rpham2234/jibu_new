// shopifyCart.ts
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`;

type MoneyV2 = { amount: string; currencyCode: string };

export function formatMoney(m?: MoneyV2 | null): string {
  if (!m) return "";
  const amount = Number(m.amount);
  const noCents = m.currencyCode === "UGX"; // UGX typically has no decimals
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: m.currencyCode,
    minimumFractionDigits: noCents ? 0 : 2,
    maximumFractionDigits: noCents ? 0 : 2,
  }).format(amount);
}


type SelectedOption = { name: string; value: string };

export type Variant = {
  id: string; // gid://shopify/ProductVariant/...
  title: string;
  availableForSale: boolean;
  price?: MoneyV2;
  selectedOptions: SelectedOption[];
};

export type ProductWithVariants = {
  id: string;              // gid://shopify/Product/...
  numericId: string;       // "8949517058275"
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  options: { name: string; values: string[] }[];
  variants: Variant[];
};

function extractNumericId(gid: string): string {
  return gid.split("/").pop() || gid;
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
  if (!res.ok) throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json;
}

/** Fetch one product (by numeric id) with its options and variants */
export async function getProductWithVariantsById(numericId: string): Promise<ProductWithVariants | null> {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        images(first: 1) { edges { node { url altText } } }
        options { name values }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
              selectedOptions { name value }
            }
          }
        }
      }
    }
  `;
  const variables = { id: `gid://shopify/Product/${numericId}` };
  const data = await shopifyFetch<{ data: any }>(query, variables);
  const p = data.data.product;
  if (!p) return null;

  return {
    id: p.id,
    numericId: extractNumericId(p.id),
    title: p.title,
    description: p.description,
    imageUrl: p.images?.edges?.[0]?.node?.url,
    imageAlt: p.images?.edges?.[0]?.node?.altText ?? p.title,
    options: p.options ?? [],
    variants: (p.variants?.edges ?? []).map((e: any) => e.node),
  };
}

/** Find the variant ID matching a set of selections, e.g. { Size: "10L" } */
export function findVariantId(product: ProductWithVariants, selections: Record<string, string>): string | null {
  const norm = (s: string) => s.trim().toLowerCase();
  const entries = Object.entries(selections).map(([k, v]) => [norm(k), norm(v)] as const);

  for (const v of product.variants) {
    const ok = entries.every(([k, val]) => {
      const optVal = v.selectedOptions.find(o => norm(o.name) === k)?.value;
      return optVal && norm(optVal) === val;
    });
    if (ok) return v.id;
  }
  return null;
}

/** Create a cart with a single line and return checkout URL, then redirect */
export async function addToCartAndCheckout(variantId: string, quantity = 1): Promise<void> {
  const mutation = `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { id checkoutUrl }
        userErrors { message }
      }
    }
  `;
  const variables = { lines: [{ merchandiseId: variantId, quantity }] };
  const json = await shopifyFetch<{ data: any }>(mutation, variables);
  const err = json.data.cartCreate.userErrors?.[0]?.message;
  if (err) throw new Error(err);
  const checkoutUrl = json.data.cartCreate.cart.checkoutUrl as string;
  if (!checkoutUrl) throw new Error("No checkoutUrl returned");
  window.location.href = checkoutUrl; // redirect to Shopify checkout
}
