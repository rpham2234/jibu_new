// app/components/HeroImage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroImage({
  imageurl = "https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork_Jibu-Mum-and-Son-min-768x612.jpg",
  showText = true,
}: {
  imageurl?: string;
  showText?: boolean;
}) {
  return (
    <section className="relative w-full h-[500px] md:h-[600px]">
      {/* Background Image */}
      <Image
        src={imageurl}
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conditionally Render Text */}
      {showText && (
        <div className="absolute bottom-10 left-10 text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Transforming Opportunity to Thrive
          </h1>
          <p className="mb-6 text-sm md:text-base">
            Enabling entrepreneurs across Africa to deliver affordable, essential services.
          </p>
          <Link
            href="/about"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Learn More
          </Link>
        </div>
      )}
    </section>
  );
}
