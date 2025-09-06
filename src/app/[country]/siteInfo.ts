export type SiteInfo = {
  country: string;
  banner: string;
  countryCode: string;
  center: string; // tuple for geographic coordinates
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
};


const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function mapToSiteInfo(item: any): SiteInfo {
  const banner = item.siteInfo.banner;
  const bannerUrl =
    banner?.formats?.large?.url ||
    banner?.formats?.medium?.url ||
    banner?.formats?.small?.url ||
    banner?.url ||
    null;

  return {
    country: item.siteInfo.country,
    banner: bannerUrl,
    countryCode: item.siteInfo.countryCode,
    center: item.siteInfo.center,
    phone: item.siteInfo.phone,
    address: item.siteInfo.address,
    facebook: item.siteInfo.facebook,
    instagram: item.siteInfo.instagram,
    twitter: item.siteInfo.twitter,
    linkedin: item.siteInfo.linkedin
  };
}

export async function getSiteInfo(country: string): Promise<SiteInfo> {
  const res = await fetch(`${STRAPI_URL}/${country}?populate[siteInfo][populate]=banner`, {
    cache: "no-store", // or { next: { revalidate: 60 } } if you want ISR
  });
  if (!res.ok) throw new Error("Failed to fetch site info");
  const json = await res.json();
  return mapToSiteInfo(json.data);
}