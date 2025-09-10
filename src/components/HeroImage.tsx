// app/components/HeroImage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroImage({
  imageurl = "https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork_Jibu-Mum-and-Son-min-768x612.jpg",
  showText = true,
  title = "Transforming Opportunity to Thrive",
  subtitle = "Enabling entrepreneurs across Africa to deliver affordable, essential services.",
  showButton = true,
}: {
  imageurl?: string;
  showText?: boolean;
  title?: string;
  subtitle?: string;
  showButton?: boolean;
}) {
  return (
    <section className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
      {/* Background Image */}
      <Image
        src={imageurl}
        alt="Hero background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conditionally Render Text */}
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-snug">
            {title}
          </h1>
          <p className="mb-6 text-sm sm:text-base md:text-lg max-w-2xl">
            {subtitle}
          </p>
          {showButton && (
            <Link
              href="/about"
              className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black"
            >
              Learn More
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
