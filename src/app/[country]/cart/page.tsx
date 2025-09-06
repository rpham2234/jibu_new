// Server component — does the data fetch once per request (and can cache)
import { getSiteInfo } from "@/app/[country]/siteInfo";
import { CartClient } from "./CartClient";

type Props = { params: { country: string } };

export default async function CartPage({ params }: Props) {
  const siteInfo = await getSiteInfo(params.country); // cached, see note below
  return <CartClient siteInfo={siteInfo} />;
}
