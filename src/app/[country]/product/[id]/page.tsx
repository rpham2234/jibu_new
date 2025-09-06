// app/[country]/product/[id]/page.tsx (Server Component)
import { notFound } from "next/navigation";
import ProductPage from "@/components/countries/productPage";
import { getProductById } from "@/app/[country]/getProducts"; // adjust if needed
import { getSiteInfo } from "@/app/[country]/siteInfo";       // adjust if needed
import type { Metadata } from "next";

// If you prefer runtime rendering only for product pages, uncomment:
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export type PageParams = { params: { country: string; id: string } };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    const siteInfo = await getSiteInfo(params.country);
    return {
      title: `${siteInfo?.country ?? "Shop"} – Product`,
      description: `Details and delivery options in ${siteInfo?.country ?? "your country"}.`,
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function Page({ params }: PageParams) {
  const { id, country } = params; // ✅ no awaiting params

  // 1) Country context
  let siteInfo: any;
  try {
    siteInfo = await getSiteInfo(country);
    if (!siteInfo) return notFound();
  } catch (e) {
    console.error("getSiteInfo failed", e);
    return notFound();
  }

  // 2) Product fetch
  let product: any | null = null;
  try {
    const raw = await getProductById(id, { Type: "Refill" });
    product = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (e) {
    console.error("getProductById failed", e);
  }

  if (!product) return notFound();

  // 3) Render product page
  return (
    <ProductPage
      product={product}
      country={siteInfo.country.toLowerCase()}
      market={{ countryCode: siteInfo.countryCode, languageCode: "EN" }}
    />
  );
}

// Optional: pre-generate a small subset of known product pages per country at build time.
// Remove this if your product catalog changes frequently or is large.
// export async function generateStaticParams() {
//   const countries = ["uganda", "kenya", "tanzania", "rwanda"]; // keep in sync with supported markets
//   // Example: pre-render a few hero SKUs by id for each market
//   const featuredIds = ["sku-123", "sku-456"]; // replace with real IDs
//   return countries.flatMap((country) => featuredIds.map((id) => ({ country, id })));
// }
