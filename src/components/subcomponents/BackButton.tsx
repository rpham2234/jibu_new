"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackLink({ label = "Back" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center space-x-1 text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium align-middle"
    >
      <ArrowLeft className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}

//You Must Use this on product page on country sites
export function BackLinkCountry({ label = "Back", country="uganda" }: { label?: string , country?: string;}) {
  //const router = useRouter();

  return (
    <a
      //type="button"
      href = {`/${country}`}
      className="inline-flex items-center space-x-1 text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium align-middle"
    >
      <ArrowLeft className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
      <span>{label}</span>
    </a>
  );
}