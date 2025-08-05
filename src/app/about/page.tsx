"use client";

import React from "react";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex justify-center px-4">
      <div className="max-w-6xl w-full space-y-16">
        {/* Section 1 */}
        <div className="bg-[#F8F8FF] rounded shadow p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-3xl font-bold">Jibu Means &quot;Solution&quot;</h1>
              <h3 className="text-xl text-gray-500 mb-4">What we do</h3>
              <p className="mb-3">
                Jibu capitalizes, equips, and trains emerging market
                entrepreneurs to launch and grow essential service franchises,
                with drinking water as our anchor product.
              </p>
              <p className="mb-4">
                Franchises purify existing water sources in high-density urban
                and peri-urban communities and distribute to the neighborhood
                within walking distance of their storefronts. Franchisees also
                sell additional Jibu products and services.
              </p>
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-lg rounded">
                Learn more about the Jibu Franchise Model
              </button>
            </div>
            <div>
              <Image
                src="https://res.cloudinary.com/dp6oxybgv/image/upload/v1656254871/76833319-3130-4f34-bea8-0e759161e8e5_xjszvp.jpg"
                alt="Jibu Franchise"
                className="w-full rounded"
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#F8F8FF] rounded shadow p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Who we are</h2>
              <p className="mb-3">
                Jibu, Inc is a for-profit social enterprise that prioritizes
                impact in our communities. Our hybrid approach stimulates
                responsible economic growth and independence. Through local
                entrepreneurship we produce safe drinking water as well as
                supply other essential products like LPG and fortified porridge.
              </p>
              <p>
                The Jibu ecosystem is made of Jibu, Inc (founding franchisor),
                Jibu Area Master Franchisors (AMFs), and Jibu Franchisees.
              </p>
            </div>
            <div>
              <Image
                src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork_Jibu-Mum-and-Son-min-768x612.jpg"
                alt="Jibu Mom and Son"
                className="w-full rounded"
              />
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#F8F8FF] rounded shadow p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Jibu Story</h2>
              <div className="aspect-video max-w-xl mx-auto">
                <iframe
                  className="w-full h-full rounded"
                  src="https://www.youtube.com/embed/aXImu7_Th30"
                  title="Jibu Rwanda"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Production Process</h2>
              <div className="aspect-video max-w-xl mx-auto">
                <iframe
                  className="w-full h-full rounded"
                  src="https://www.youtube.com/embed/VM1wh0NDGpY"
                  title="Jibu Production"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-[#F8F8FF] rounded shadow p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Jibu Water Purifying Process</h2>
              <p className="mb-3">
                Jibu aims at consistently producing safe drinking water through
                its four-step filtration method. We use internationally
                accredited purification systems like ultrafiltration and blended
                RO-hybrid technology.
              </p>
              <p>
                We are proud partners of{" "}
                <a
                  href="https://healingwaters.org/"
                  className="text-blue-600 underline"
                >
                  Healing Waters
                </a>{" "}
                for our Water Treatment System technology.
              </p>
            </div>
            <div>
              <Image
                src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-Production-Unit_Jibu-768x510.jpeg"
                alt="Jibu Production"
                className="w-full rounded"
              />
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-[#F8F8FF] rounded shadow p-6">
          <Image
            src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-Water-Process-Table_Jibu-Water-Purifying-Process-1536x831.png"
            alt="Water Process Table"
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
}
