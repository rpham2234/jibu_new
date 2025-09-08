// app/[country]/franchise/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import { getSiteInfo } from "../siteInfo";
import StoreLocatorClient from "./StoreLocatorClient";

type LatLng = [number, number];

function toLatLng(
  value: string | number[] | LatLng,
  fallback: LatLng = [0, 0]
): LatLng {
  if (Array.isArray(value)) {
    const a = Number(value[0]), b = Number(value[1]);
    return Number.isFinite(a) && Number.isFinite(b) ? [a, b] : fallback;
    }
  if (typeof value === "string") {
    const s = value.trim();
    if (s.startsWith("[")) {
      try { return toLatLng(JSON.parse(s)); } catch { return fallback; }
    }
    const parts = s.split(",").map((x) => parseFloat(x.trim()));
    return parts.length === 2 && parts.every((n) => Number.isFinite(n))
      ? [parts[0], parts[1]]
      : fallback;
  }
  return fallback;
}

export default async function Page({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  noStore();

  const { country: countrySlug } = await params;
  const siteInfo = await getSiteInfo(countrySlug);
  const center = toLatLng(siteInfo.center);

  const stores = [
    { name: "Jibu Kyanja", address: "Plot 145, Kawempe", position: [0.3476, 32.5825] as [number, number] },
    { name: "Jibu Namuwongo", address: "Plot 177/178, Bukasa Rd", position: [0.3102, 32.6203] as [number, number] },
    { name: "Jibu Ggaba", address: "Plot 125, Ggaba", position: [0.2901, 32.6150] as [number, number] },
  ];

  return (
    <div>
      <div className="container mx-auto my-12 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-6xl font-semibold mb-4">
          Find a Jibu Franchise Near you
        </h1>
      </div>

      <div className="px-0 md:px-8 xl:px-32 py-8">
        <StoreLocatorClient
          stores={stores}
          center={center}
          country={countrySlug.toLowerCase()}
        />
      </div>
    </div>
  );
}

