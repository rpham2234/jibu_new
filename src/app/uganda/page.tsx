"use client";

import Options from "@/components/countries/options";
import ProductGrid from "@/components/countries/productGrid";
import Header from "@/components/countries/uganda/header";
import HeroImage from "@/components/HeroImage";
import React from "react";
import { products } from "./products"
import { info } from "./info"


export default function uganda() {
  return (
    <main>
      <HeroImage imageurl={info.banner} showText={true} title="We Deliver to your doorstep" subtitle="" showButton={false} />
      <Header country={info.country} countryCode={info.countryCode}/>
      <Options />
      <section id="products">
        <ProductGrid products={products} country={info.country.toLowerCase()}/>
      </section>
    </main>
  )};