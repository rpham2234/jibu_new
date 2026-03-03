"use client";

import { useEffect, useState } from "react";
import HeroImage from "@/components/HeroImage";
import AboutStats from "@/components/AboutStats";
import HowJibuWorks from "@/components/HowJibuWorks";
import CardCarousel, { Franchisee } from "@/components/SampleCarousel";
import { getFranchisees } from "./getFranchisees";
import InvestorPartners from "@/components/InvestorPartners";

export default function Home() {
  const [franchisees, setFranchisees] = useState<Franchisee[] | undefined>(undefined);


  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getFranchisees(); // must return Franchisee[]
        if (alive) setFranchisees(Array.isArray(data) && data.length > 0 ? data : undefined);
      } catch (error) {
        console.error("Failed to fetch franchisees:", error);
      }
    })();
    return () => { alive = false; };
  }, []);



  return (
    <main>
      <HeroImage />
      <AboutStats />
      <CardCarousel items={franchisees} />
      <HowJibuWorks />
      <InvestorPartners />
    </main>
  );
}
