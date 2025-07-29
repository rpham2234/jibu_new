"use client";

import ProductGrid from "@/components/countries/productGrid";
import Header from "@/components/countries/uganda/header";
import HeroImage from "@/components/HeroImage";
import React from "react";


const products = [
  {
    _id: "100001",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100002",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100003",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100004",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100005",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100006",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100007",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100008",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100009",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
  {
    _id: "100010",
    img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
  },
];

export default function uganda() {
  return (
    <main>
      <HeroImage imageurl="https://jibuco.com/wp-content/uploads/2022/11/Ghana-launch.jpg" showText={true} title="We Deliver to your doorstep" subtitle="" showButton={false} />
      <Header />
      <ProductGrid products={products}/>
    </main>
  )};