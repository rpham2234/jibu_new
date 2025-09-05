// app/uganda/product/[id]/page.tsx  (server component)

import ProductPage from "@/components/countries/productPage";
import { notFound } from "next/navigation";
import { getProductById } from "@/app/uganda/getProducts"; // adjust if needed
import { info } from "../../info";

type PageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: PageProps) {
  const { id } = await params;               // ✅ await the params object
  const product = await getProductById(id, { Type: "Refill" });

  if (!product) notFound();

  return <ProductPage product={product} country={info.country.toLowerCase()} />;
}
