"use client";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"; // or use Heroicons
import Image from 'next/image';

type Franchisee = {
    name: string;
    location: string;
    image: string;
}

export default function FranchiseeCarousel({
  franchisees,
  title = "Meet Our Franchisees", // fallback title
}: {
  franchisees: Franchisee[];
  title?: string;
}) {

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const next = () => {
    if (startIndex + visibleCount < franchisees.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section className="px-6 py-8 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 z-10"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 z-10"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        {/* Cards */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 gap-6"
            style={{ transform: `translateX(-${startIndex * 100}%)` }}
          >
            {franchisees.map((f, i) => (
              <div
                key={i}
                className="w-72 flex-shrink-0 bg-white rounded shadow-md text-center"
              >
                <div className="relative w-[300px] h-[400px]">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className="w-full h-80 object-cover rounded-t"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{f.name}</h3>
                  <p className="text-sm text-gray-500">{f.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
