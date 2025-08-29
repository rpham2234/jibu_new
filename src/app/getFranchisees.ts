import { Franchisee } from "@/components/SampleCarousel";

const STRAPI_URL = "https://committed-paradise-9b1cb948f5.strapiapp.com/api";

function mapToFranchisee(item: any): Franchisee {
  const headshot = item.Headshot;
  const headshotUrl =
    headshot?.formats?.large?.url ||
    headshot?.formats?.medium?.url ||
    headshot?.formats?.small?.url ||
    headshot?.url ||
    null;

  return {
    name: item.Name,
    location: item.location,
    image: headshotUrl,
  };
}

export async function getFranchisees(): Promise<Franchisee[]> {
  const res = await fetch(`${STRAPI_URL}/franchisees?populate=Headshot`, {
    cache: "no-store", // or { next: { revalidate: 60 } } if you want ISR
  });
  if (!res.ok) throw new Error("Failed to fetch executives");
  const json = await res.json();
  return json.data.map(mapToFranchisee);
}