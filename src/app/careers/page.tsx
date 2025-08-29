"use client";

import OpenPositionsPage from "@/components/careers/careers-card";
import HeroImage from "@/components/HeroImage";
import React from "react";

export default function franchise() {
  return (
    <main>
      <HeroImage imageurl="https://jibuco.com/website_b9c97ac3/wp-content/uploads/2023/07/Jibu-Main-Website-Banners-2-jpg.webp" title="Let's Grow Together" 
      subtitle="At Jibu, we have a family culture where amazing people (like you) can do their best work. If you are ready to grow your career and help millions live a better life, you've come to the right place."
      showButton={false} />
      <section className="md:p-6 bg-[#1b559b]">
        <OpenPositionsPage />
      </section>
    </main>
  )};