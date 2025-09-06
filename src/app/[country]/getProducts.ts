// getProducts.ts

import { Product } from "@/components/countries/productPage"


const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`;

/** Defaults: override per call */
const DEFAULT_COUNTRY = "UG";
const DEFAULT_LANGUAGE = "EN";

/** Helpers */
function extractNumericId(gid: string): string {
  return gid.split("/").pop() || gid;
}

type MoneyV2 = { amount: string; currencyCode: string };

function formatMoney(m?: MoneyV2 | null): string | undefined {
  if (!m) return undefined;
  const n = Number(m.amount);
  const zeroFrac = m.currencyCode === "UGX"; // no cents for UGX
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: m.currencyCode,
    minimumFractionDigits: zeroFrac ? 0 : 2,
    maximumFractionDigits: zeroFrac ? 0 : 2,
  }).format(n);
}

/** Inject @inContext(country:, language:) into a query string */
function applyContext(q: string, country = DEFAULT_COUNTRY, language = DEFAULT_LANGUAGE) {
  return q.replace(/^(\s*query)(\b)/, `$1 @inContext(country: ${country}, language: ${language})$2`);
}

function pickVariantBySelections(node: any, selections?: Record<string, string>) {
  if (!selections) return null;
  const norm = (s: string) => s.trim().toLowerCase();
  const wanted = Object.entries(selections).map(([k, v]) => [norm(k), norm(v)] as const);
  const variants = node?.variants?.edges?.map((e: any) => e.node) ?? [];
  for (const v of variants) {
    const ok = wanted.every(([name, val]) => {
      const found = v.selectedOptions?.find((o: any) => norm(o.name) === name)?.value;
      return found && norm(found) === val;
    });
    if (ok) return v;
  }
  return null;
}

/** Query multiple products with priceRange (min+max) */
const PRODUCTS_QUERY = `
  query {
    products(first: 15) {
      edges {
        node {
          id
          title
          description
          images(first: 1) { edges { node { url altText } } }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
        }
      }
    }
  }
`;

/** Query a single product with ALL variants + options */
function singleProductQuery(numericId: string) {
  return `
    query {
      product(id: "gid://shopify/Product/${numericId}") {
        id
        title
        description
        images(first: 1) { edges { node { url altText } } }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        options { name values }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              selectedOptions { name value }
            }
          }
        }
      }
    }
  `;
}

/** Map a Shopify product node → ProductOutput (optionally using a selected variant) */
function mapProduct(node: any, selections?: Record<string, string>): Product {
  const image = node.images?.edges?.[0]?.node;

  const selectedVariant = pickVariantBySelections(node, selections);
  let priceStr: string | undefined;

  if (selectedVariant?.price) {
    priceStr = formatMoney(selectedVariant.price);
  } else if (node.priceRange?.minVariantPrice && node.priceRange?.maxVariantPrice) {
    const min = node.priceRange.minVariantPrice as MoneyV2;
    const max = node.priceRange.maxVariantPrice as MoneyV2;
    priceStr = (min.amount !== max.amount)
      ? `${formatMoney(min)} - ${formatMoney(max)}`
      : formatMoney(min);
  }

  return {
    _id: extractNumericId(node.id),
    productName: node.title,
    price: priceStr,
    type: "New",
    img: image?.url || "",
    imageAlt: image?.altText || node.title,
    description: node.description,
  };
}

/** Fetch and map multiple products (grid), for a specific Market */
export async function getShopifyProducts(country = DEFAULT_COUNTRY, language = DEFAULT_LANGUAGE): Promise<Product[]> {
  const query = applyContext(PRODUCTS_QUERY, country, language);
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);

  const json = await res.json();
  const edges = json?.data?.products?.edges || [];
  return edges.map((e: any) => mapProduct(e.node));
}

/**
 * Fetch and map a single product by numeric ID (with selections),
 * for a specific Market (country/language).
 */
export async function getProductById(
  id: string,
  selections?: Record<string, string>,
  country = DEFAULT_COUNTRY,
  language = DEFAULT_LANGUAGE
): Promise<Product | null> {
  const raw = singleProductQuery(id);
  const query = applyContext(raw, country, language);
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);

  const json = await res.json();
  const node = json?.data?.product;
  return node ? mapProduct(node, selections) : null;
}

/** Optional: build a GID from numeric id if you need it elsewhere */
export function makeProductGid(id: string | number): string {
  return `gid://shopify/Product/${id}`;
}
