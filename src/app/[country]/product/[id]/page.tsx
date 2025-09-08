// app/[country]/product/[id]/page.tsx (Server Component)

// Disable caching / static optimization for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductPage from "@/components/countries/productPage";
import { getProductById } from "@/app/[country]/getProducts";
import { getSiteInfo } from "@/app/[country]/siteInfo";

type RouteParams = { country: string; id: string };
type PageProps = { params: Promise<RouteParams> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  noStore();
  try {
    const { country } = await params;
    const siteInfo = await getSiteInfo(country);
    return {
      title: `${siteInfo?.country ?? "Shop"} – Product`,
      description: `Details and delivery options in ${siteInfo?.country ?? "your country"}.`,
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function Page({ params }: PageProps) {
  noStore();

  const { id, country } = await params;

  let siteInfo: any;
  try {
    siteInfo = await getSiteInfo(country);
    if (!siteInfo) return notFound();
  } catch (e) {
    console.error("getSiteInfo failed", e);
    return notFound();
  }

  let product: any | null = null;
  try {
    const raw = await getProductById(id, { Type: "Refill" });
    product = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (e) {
    console.error("getProductById failed", e);
  }

  if (!product) return notFound();

  return (
    <ProductPage
      product={product}
      country={siteInfo.country.toLowerCase()}
      market={{ countryCode: siteInfo.countryCode, languageCode: "EN" }}
    />
  );
}
