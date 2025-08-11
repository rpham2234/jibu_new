"use client";

import AboutStats from "@/components/AboutStats";
import HeroImage from "@/components/HeroImage";
import HowJibuWorks from "@/components/HowJibuWorks";
import CardCarousel from "@/components/SampleCarousel";


export default function Home() {

  return (
    <main>
      
      <HeroImage />
      <AboutStats />
      <CardCarousel />
      <HowJibuWorks />
    </main>
  );
}


