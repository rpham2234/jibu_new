"use client";

import CardCarousel, { TeamMember } from "@/components/ExecutiveCarousel";
import PageTitle from "@/components/subcomponents/pageTitle";
import React, { useEffect, useState } from "react";
import { getTeam, getExecs } from "./getTeam";

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

  return (
    <main>
      <PageTitle title="Meet Our Team" />

      {/* Uncomment these when you want to visually test */}
      <CardCarousel items={board} title="Our Board Members" />
      <CardCarousel items={execs} title="Our Executive Team" />
    </main>
  );
}
