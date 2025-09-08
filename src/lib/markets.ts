// lib/markets.ts
export type CountryCode = "BI" | "GH" | "KE" | "TZ" | "ZM" | "CD" | "RW" | "UG";

export const MARKETS: Record<CountryCode, {
  name: string;
  currency: string;
  locale: string; // for Intl.NumberFormat display
  slug: string;
}> = {
  BI: { name: "Burundi",                      currency: "BIF", locale: "fr-BI", slug: "burundi" },
  GH: { name: "Ghana",                        currency: "GHS", locale: "en-GH", slug: "ghana" },
  KE: { name: "Kenya",                        currency: "KES", locale: "en-KE", slug: "kenya" },
  TZ: { name: "Tanzania",                     currency: "TZS", locale: "en-TZ", slug: "tanzania" },
  ZM: { name: "Zambia",                       currency: "ZMW", locale: "en-ZM", slug: "zambia" },
  CD: { name: "DRC",                          currency: "CDF", locale: "fr-CD", slug: "drc" },          // Democratic Republic of the Congo
  RW: { name: "Rwanda",                       currency: "RWF", locale: "en-RW", slug: "rwanda" },
  UG: { name: "Uganda",                       currency: "UGX", locale: "en-UG", slug: "uganda" },
};

// If your routes are /uganda, /ghana, ... use this to resolve the code:
export const SLUG_TO_CODE: Record<string, CountryCode> = {
  burundi: "BI",
  ghana:   "GH",
  kenya:   "KE",
  tanzania:"TZ",
  zambia:  "ZM",
  drc:     "CD",
  rwanda:  "RW",
  uganda:  "UG",
};

export function slugToCountryCode(slug: string): CountryCode | null {
  return SLUG_TO_CODE[slug.toLowerCase()] ?? null;
}
