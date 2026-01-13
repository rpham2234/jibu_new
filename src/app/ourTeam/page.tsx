"use client";
import CardCarousel from "@/components/SampleCarousel";
import PageTitle from "@/components/subcomponents/pageTitle";
import React, { useEffect, useState } from "react";
import { getTeam, getExecs } from "./getTeam";
import { TeamMember } from "@/components/ExecutiveCarousel"; // Keeping for type, or could just use any

export default function OurTeam() {
  const [execs, setExecs] = useState<TeamMember[]>([]);
  const [board, setBoard] = useState<TeamMember[]>([]);

  useEffect(() => {
    getExecs().then((data) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Execs:", data);
      }
      setExecs(data);
    });

    getTeam().then((data) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Board:", data);
      }
      setBoard(data);
    });
  }, []);

  // Map TeamMember to Franchisee format needed by SampleCarousel
  const mapToCarouselItems = (members: TeamMember[]) => {
    return members.map(m => ({
      id: m.id, // Pass ID for navigation
      name: m.name,
      location: m.role, // Mapping role to location
      image: m.headshotUrl || "https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-2_Jibu-Logo-150x48-white.png" // Fallback image
    }));
  };

  return (
    <main className="min-h-screen">
      {/* <PageTitle title="Meet Our Team" /> */}

      <div className="space-y-12 mt-20 pb-20">
        <CardCarousel items={mapToCarouselItems(board)} title="Our Board Members" />
        <CardCarousel items={mapToCarouselItems(execs)} title="Our Executive Team" />
      </div>
    </main>
  );
}
