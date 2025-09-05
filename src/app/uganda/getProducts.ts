// getProducts.ts

export type ProductOutput = {
  _id: string;            // numeric product id
  productName: string;
  price?: string;         // formatted (e.g., "UGX 48,050" or "UGX 40,000 – UGX 48,050")
  type: string;
  img: string;
  imageAlt?: string;
  description: string;
};

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`;

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

/** Query multiple products with priceRange (cheapest + highest variant price) */
const PRODUCTS_QUERY = `
  query {
    products(first: 15) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges { node { url altText } }
          }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
        }
      }
    }
  }
`;

/** Query a single product with ALL variants + options (so we can price by selection) */
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
function mapProduct(node: any, selections?: Record<string, string>): ProductOutput {
  const image = node.images?.edges?.[0]?.node;

  // Try to use a specific variant (e.g., { Type: "Refill" }) if provided
  const selectedVariant = pickVariantBySelections(node, selections);
  let priceStr: string | undefined;

  if (selectedVariant?.price) {
    priceStr = formatMoney(selectedVariant.price);
  } else if (node.priceRange?.minVariantPrice && node.priceRange?.maxVariantPrice) {
    const min = node.priceRange.minVariantPrice as MoneyV2;
    const max = node.priceRange.maxVariantPrice as MoneyV2;
    priceStr = (min.amount !== max.amount)
      ? `${formatMoney(min)} – ${formatMoney(max)}`
      : formatMoney(min);
  }

  return {
    _id: extractNumericId(node.id),
    productName: node.title,
    price: priceStr,
    type: "New", // keep as-is; your UI can ignore/change this
    img: image?.url || "",
    imageAlt: image?.altText || node.title,
    description: node.description,
  };
}

/** Fetch and map multiple products (grid) */
export async function getShopifyProducts(): Promise<ProductOutput[]> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);

  const json = await res.json();
  const edges = json?.data?.products?.edges || [];
  return edges.map((e: any) => mapProduct(e.node));
}

/**
 * Fetch and map a single product by numeric ID.
 * Pass selections (e.g., { Type: "Refill" }) to price the correct variant.
 */
export async function getProductById(
  id: string,
  selections?: Record<string, string>
): Promise<ProductOutput | null> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: singleProductQuery(id) }),
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
