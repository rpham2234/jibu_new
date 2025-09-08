// app/[country]/cart/page.tsx  (Server Component)

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import { CartClient } from "./CartClient";
import { getSiteInfo } from "../siteInfo";

export default async function CartPage({ params }: { params: Promise<{ country: string }> }) {
  noStore();
  const { country } = await params;
  const siteInfo = await getSiteInfo(country);
  return <CartClient siteInfo={siteInfo} />;
}
