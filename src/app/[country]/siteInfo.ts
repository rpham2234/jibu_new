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
  const url = `${STRAPI_URL}/${country}?populate[siteInfo][populate]=banner`;

  try {
    const res = await fetch(url, {
      cache: "no-store", // or { next: { revalidate: 60 } } if you want ISR
    });

    if (!res.ok) {
      console.error(`Failed to fetch site info for ${country}. Status: ${res.status}, URL: ${url}`);
      throw new Error(`Failed to fetch site info for ${country}: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (!json.data) {
      console.error(`No data returned from Strapi for ${country}`, json);
      throw new Error(`No data returned from Strapi for ${country}`);
    }

    return mapToSiteInfo(json.data);
  } catch (error) {
    console.error(`Error fetching site info for ${country}:`, error);
    throw error;
  }
}