"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0
  },
  onscreen: {
    y: 50,
    rotate: -3,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

interface CardProps {
  children: React.ReactNode;
  i: number;
}

function Card({ children, i }: CardProps) {
  return (
    <motion.div
      className={`card-container-${i} flex justify-center items-center relative mb-32`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.3, once: true }}
    >
      <motion.div
        variants={cardVariants}
        className="card w-full max-w-6xl bg-[#1b559b] text-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden"
        style={{
          transformOrigin: "center center",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 overflow-hidden">
      {/* Section 1 */}
      <Card i={0}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold md:text-5xl mb-2">Jibu Means &quot;Solution&quot;</h1>
            <h3 className="text-xl text-blue-200 mb-6 font-medium uppercase tracking-widest">What we do</h3>
            <p className="mb-4 text-lg leading-relaxed text-blue-50">
              Jibu capitalizes, equips, and trains emerging market entrepreneurs to launch and grow essential service franchises, with drinking water as our anchor product.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-blue-50">
              Franchises purify existing water sources in high-density urban and peri-urban communities and distribute to the neighborhood within walking distance of their storefronts. Franchisees also sell additional Jibu products and services.
            </p>
          </div>
          <div>
            <Image
              src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork_Jibu-Mum-and-Son-min-768x612.jpg"
              alt="Jibu Franchise"
              width={768}
              height={612}
              unoptimized
              className="w-full rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </Card>

      {/* Section 2 */}
      <Card i={1}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl mb-6">Who we are</h2>
            <p className="mb-4 text-lg leading-relaxed text-blue-50">
              Jibu, Inc is a for-profit social enterprise that prioritizes impact in our communities. Our hybrid approach stimulates responsible economic growth and independence. Through local entrepreneurship we produce safe drinking water as well as supply other essential products like LPG and fortified porridge.
            </p>
            <p className="text-lg leading-relaxed text-blue-50">
              The Jibu ecosystem is made of Jibu, Inc (founding franchisor), Jibu Area Master Franchisors (AMFs), and Jibu Franchisees.
            </p>
          </div>
          <div>
            <Image
              src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork_Jibu-Mum-and-Son-min-768x612.jpg"
              alt="Jibu Mom and Son"
              width={768}
              height={612}
              unoptimized
              className="w-full rounded-2xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </Card>

      {/* Section 3 */}
      <Card i={2}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl mb-6">The Jibu Story</h2>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/aXImu7_Th30"
                title="Jibu Rwanda"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold md:text-4xl mb-6">Our Production Process</h2>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VM1wh0NDGpY"
                title="Jibu Production"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 4 */}
      <Card i={3}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl mb-6">The Jibu Water Purifying Process</h2>
            <p className="mb-4 text-lg leading-relaxed text-blue-50">
              Jibu aims at consistently producing safe drinking water through its four-step filtration method. We use internationally accredited purification systems like ultrafiltration and blended RO-hybrid technology.
            </p>
            <p className="text-lg leading-relaxed text-blue-50">
              We are proud partners of{" "}
              <a
                href="https://healingwaters.org/"
                className="text-white underline font-bold hover:text-blue-200 transition-colors"
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
              width={768}
              height={510}
              unoptimized
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </Card>

      {/* Section 5 */}
      <Card i={4}>
        <div className="w-full">
          <h2 className="text-3xl font-bold md:text-4xl mb-8 text-center">Process Overview</h2>
          <div className="bg-white p-2 rounded-2xl">
            <Image
              src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-Water-Process-Table_Jibu-Water-Purifying-Process-1536x831.png"
              alt="Water Process Table"
              width={1536}
              height={831}
              unoptimized
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
