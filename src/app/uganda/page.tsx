"use client";

import Options from "@/components/countries/options";
import ProductGrid from "@/components/countries/productGrid";
import Header from "@/components/countries/uganda/header";
import HeroImage from "@/components/HeroImage";
import { info } from "./info";
import React, { useEffect, useState } from "react";

import { getShopifyProducts } from "./getProducts";  // fetches raw JSON string

export default function Uganda() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
  getShopifyProducts()
    .then(setProducts)
    .catch(err => setError(err.message));
}, []);

  return (
    <main>
      <HeroImage
        imageurl={info.banner}
        showText={true}
        title="We Deliver to your doorstep"
        subtitle=""
        showButton={false}
      />
      <Header country={info.country} countryCode={info.countryCode} />
      <Options />
      <section id="products">
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <ProductGrid products={products} country={info.country.toLowerCase()} />
      </section>
    </main>
  );
}
