// app/[country]/page.tsx

import ProductGrid from "@/components/countries/productGrid";
import Header from "@/components/countries/uganda/header";
import HeroImage from "@/components/HeroImage";
import { getSiteInfo } from "./siteInfo";
import { getShopifyProducts } from "./getProducts";

export default async function CountryPage({ params }: { params: { country: string } }) {
  const siteInfo = await getSiteInfo((await params).country);

  const products = await getShopifyProducts(siteInfo.countryCode);

  return (
    <main className="min-h-screen bg-[#1b559b]">
      <HeroImage
        imageurl={siteInfo.banner}
        showText
        title="We Deliver to your doorstep"
        subtitle=""
        showButton={false}
      />
      <Header country={siteInfo.country} countryCode={siteInfo.countryCode} />
      <section id="products" className="px-4 py-8">
        <ProductGrid
          products={products}
          country={siteInfo.country.toLowerCase()}
        />
      </section>
    </main>
  );
}
