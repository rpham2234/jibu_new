"use client";

import FranchiseForm from "@/components/franchise/FranchiseForm";
import HeroImage from "@/components/HeroImage";
import React from "react";

export default function franchise() {
  return (
    <main className="bg-[#1b559b]">
      <HeroImage  imageurl="https://jibuco.com/website_b9c97ac3/wp-content/uploads/2023/07/Jibu-Main-Website-Banners-2-jpg.webp" title="Bring Clean Water, Build Your Future" 
      subtitle="Join Jibu's growing network of entrepreneurs transforming access to safe drinking water in communities across Africa. As a Jibu franchisee, you’ll run your own business, make a lasting impact, and be part of a movement changing lives every day."
      showButton={false} />
      <FranchiseForm/>
    </main>
  )};