"use client";

import { useEffect, useState } from "react";
import HeroImage from "@/components/HeroImage";
import AboutStats from "@/components/AboutStats";
import HowJibuWorks from "@/components/HowJibuWorks";
import CardCarousel, { Franchisee } from "@/components/SampleCarousel";
import { getFranchisees } from "./getFranchisees";

export default function Home() {
  const [franchisees, setFranchisees] = useState<Franchisee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getFranchisees(); // must return Franchisee[]
        if (alive) setFranchisees(Array.isArray(data) ? data : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <main className="p-8">Loading…</main>;

  return (
    <main>
      <HeroImage />
      <AboutStats />
      <CardCarousel items={franchisees} />
      <HowJibuWorks />
    </main>
  );
}
