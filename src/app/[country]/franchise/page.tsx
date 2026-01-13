// app/[country]/franchise/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import { getSiteInfo } from "../siteInfo";
import StoreLocatorClient from "./StoreLocatorClient";
import { toLatLng, LatLng, getLocation } from "./getLocations";



export default async function Page({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  noStore();

  const { country: countrySlug } = await params;
  const siteInfo = await getSiteInfo(countrySlug);
  const center = toLatLng(siteInfo.center);

  const stores = await getLocation(siteInfo.countryCode);


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

