// app/[country]/page.tsx

// Disable all caching / static optimization for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { unstable_noStore as noStore } from "next/cache";

import CountryBanner from "@/components/countries/CountryBanner";
import ProductGrid from "@/components/countries/productGrid";
import Header from "@/components/countries/uganda/header";
import { getSiteInfo } from "./siteInfo";
import { getShopifyProducts } from "./getProducts";

type RouteParams = { country: string };

export default async function CountryPage({ params }: { params: Promise<RouteParams> }) {
  noStore();

  const { country } = await params;
  const siteInfo = await getSiteInfo(country);

  const products = await getShopifyProducts(siteInfo.countryCode);

  type GridProduct = {
    _id: string;
    img: string;
    imageAlt: string;
    productName: string;
    price?: string;
    type: string;
    description: string;
  };

  const gridProducts: GridProduct[] = products.map((p: any) => ({
    _id: p._id,
    img: p.img,
    imageAlt: p.imageAlt ?? p.productName,
    productName: p.productName,
    price: p.price,
    type: p.type,
    description: p.description,
  }));

  return (
    <main className="min-h-screen bg-zinc-50">
      <CountryBanner
        imageUrl={siteInfo.banner}
        countryName={siteInfo.country}
        countryCode={siteInfo.countryCode}
      />
      <Header country={siteInfo.country} countryCode={siteInfo.countryCode} />
      <section id="products" className="px-4 py-8">
        <ProductGrid
          products={gridProducts}
          country={siteInfo.country.toLowerCase()}
        />
      </section>
    </main>
  );
}

