// app/uganda/product/[id]/page.tsx

import ProductPage from "@/components/countries/productPage";
import { notFound } from "next/navigation";
import { getProductById } from "../../getProducts"; // adjust if your file lives elsewhere
import { info } from "../../info";

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  // If you want the “Refill” price initially:
  const product = await getProductById(params.id, { Type: "Refill" });
  // Or use "New": const product = await getProductById(params.id, { Type: "New" });

  if (!product) notFound();
  return <ProductPage product={product} country={info.country.toLowerCase()} />;
}
