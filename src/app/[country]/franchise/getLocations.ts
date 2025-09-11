export type Location = {
  name: string;
  address:string;
  position:LatLng;
  phone: string
};

export type LatLng = [number, number];

export function toLatLng(
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

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function mapToLocation(item: any): Location {
 

  return {
    name: item.locations.name,
    address: item.locations.address,
    position: toLatLng(item.locations.position),
    phone: item.locations.phone
  };
}

export async function getLocation(countryCode: string): Promise<Location[]> {
  const res = await fetch(`${STRAPI_URL}/${countryCode.toLowerCase()}s?populate=*`, {
    cache: "no-store", // or { next: { revalidate: 60 } } if you want ISR
  });
  if (!res.ok) throw new Error("Failed to fetch site info");
  const json = await res.json();
  return json.data.map(mapToLocation);
}