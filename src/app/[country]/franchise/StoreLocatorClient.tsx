// app/[country]/franchise/StoreLocatorClient.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Location } from "./getLocations"

type LatLng = [number, number];

const StoreLocator = dynamic(
  () => import("@/components/countries/uganda/franchise/storeFinder"),
  { ssr: false }
);

export default function StoreLocatorClient({
  stores,
  center,
  country,
}: {
  stores: Location[];
  center: LatLng;
  country: string; // slug, e.g. "uganda"
}) {
  return <StoreLocator stores={stores} center={center} country={country} />;
}
