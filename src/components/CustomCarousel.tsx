"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

type Slide = {
  src: string;
  alt: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaLink?: string;
};

export default function CustomCarousel({ slides,}: { slides: Slide[];}) {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + slides.length) % slides.length);
  const next = () =>
    setIndex((index + 1) % slides.length);
  const goTo = (i: number) => setIndex(i);

  const slide = slides[index];

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg">
      <div className="relative">
        <Image
          src={slide.src}
          alt={slide.alt}
          className="w-full h-auto"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6 py-8">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
            {slide.title}
          </h2>
          <p className="text-white text-base md:text-lg mb-6 max-w-2xl">
            {slide.description}
          </p>
          {slide.ctaLink && (
            <Link
              href={slide.ctaLink}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              {slide.ctaLabel}
            </Link>
          )}
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
      >
        Prev
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
      >
        Next
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full ${
              index === i ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
