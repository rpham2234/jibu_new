// app/[country]/page.tsx

export const revalidate = 3600;

import CountryBanner from "@/components/countries/CountryBanner";
import ProductGrid from "@/components/countries/productGrid";
import { getSiteInfo } from "./siteInfo";
import { getShopifyProducts } from "./getProducts";
import BackgroundAnimation from "@/components/animations/BackgroundAnimation";

type RouteParams = { country: string };

export default async function CountryPage({ params }: { params: Promise<RouteParams> }) {
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
    <main className="relative min-h-screen bg-zinc-50">
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        <BackgroundAnimation />
      </div>
      <CountryBanner
        imageUrl={siteInfo.banner}
        countryName={siteInfo.country}
        countryCode={siteInfo.countryCode}
      />
      <section id="products" className="relative z-10 px-4 py-8 mt-12">
        <ProductGrid
          products={gridProducts}
          country={siteInfo.country.toLowerCase()}
        />
      </section>
    </main>
  );
}

