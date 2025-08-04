"use client";

import Options from "@/components/countries/options";
import ProductGrid from "@/components/countries/productGrid";
import Header from "@/components/countries/uganda/header";
import HeroImage from "@/components/HeroImage";
import React from "react";



const products = [
  {
    _id: 1,
    productName: "20L Tap New",
    price: "Fr 15,500",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-1-300x300.webp",
    imageAlt: "20L Tap New – Rwanda listing"
  },
  {
    _id: 2,
    productName: "20L Tap Refill",
    price: "Fr 2,000",
    type: "Refill",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-1-300x300.webp",
    imageAlt: "20L Tap Refill – Rwanda listing"
  },
  {
    _id: 3,
    productName: "20L Jerrycan New",
    price: "Fr 5,500",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-11.webp",
    imageAlt: "20L Jerrycan New – Rwanda listing"
  },
  {
    _id: 4,
    productName: "20L Jerrycan Refill",
    price: "Fr 2,000",
    type: "Refill",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-11.webp",
    imageAlt: "20L Jerrycan Refill – Rwanda listing"
  },
  {
    _id: 5,
    productName: "18.9L Bottle New",
    price: "Fr 12,000",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-8-300x300.webp",
    imageAlt: "18.9L Bottle New – Rwanda listing"
  },
  {
    _id: 6,
    productName: "18.9L Bottle Refill",
    price: "Fr 2,000",
    type: "Refill",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-8-300x300.webp",
    imageAlt: "18.9L Bottle Refill – Rwanda listing"
  },
  {
    _id: 7,
    productName: "10L Jerrycan New",
    price: "Fr 3,500",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-12-300x300.webp",
    imageAlt: "10L Jerrycan New – Rwanda listing"
  },
  {
    _id: 8,
    productName: "10L Jerrycan Refill",
    price: "Fr 1,200",
    type: "Refill",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-12-300x300.webp",
    imageAlt: "10L Jerrycan Refill – Rwanda listing"
  },
  {
    _id: 9,
    productName: "5L Jerrycan New",
    price: "Fr 2,500",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-1-300x300.webp",
    imageAlt: "5L Jerrycan New – Rwanda listing"
  },
  {
    _id: 10,
    productName: "5L Jerrycan Refill",
    price: "Fr 1,000",
    type: "Refill",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-1-300x300.webp",
    imageAlt: "5L Jerrycan Refill – Rwanda listing"
  },
  {
    _id: 11,
    productName: "6KG Cylinder Full Set",
    price: "Fr 32,700",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-13-300x300.webp",
    imageAlt: "6KG Cylinder Full Set"
  },
  {
    _id: 12,
    productName: "6KG Cylinder Refill",
    price: "Fr 10,000",
    type: "Refill",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-13-300x300.webp",
    imageAlt: "6KG Cylinder Refill"
  },
  {
    _id: 13,
    productName: "12KG Cylinder New",
    price: "Fr 57,400",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-14-300x300.webp",
    imageAlt: "12KG Cylinder New"
  },
  {
    _id: 14,
    productName: "12KG Cylinder Refill",
    price: "Fr 20,000",
    type: "Refill",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-14-300x300.webp",
    imageAlt: "12KG Cylinder Refill"
  },
  {
    _id: 15,
    productName: "1L Aluminium Bottle",
    price: "Fr 3,000",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-6-300x300.webp",
    imageAlt: "1L Aluminium Bottle – Rwanda listing"
  },
  {
    _id: 16,
    productName: "Jibu Family Porridge",
    price: "Fr 2,000",
    type: "New",
    img: "https://jibuco.com/wp-content/uploads/2024/12/Artboard-15-300x300.webp",
    imageAlt: "Jibu Family Porridge – Rwanda listing"
  }
]


export default function uganda() {
  return (
    <main>
      <HeroImage imageurl="https://jibuco.com/wp-content/uploads/2022/11/Ghana-launch.jpg" showText={true} title="We Deliver to your doorstep" subtitle="" showButton={false} />
      <Header country="Uganda" countryCode="UG"/>
      <Options />
      <section id="products">
        <ProductGrid products={products}/>
      </section>
    </main>
  )};