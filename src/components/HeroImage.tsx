// app/components/HeroImage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/hero-new.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover object-[center_25%]"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center text-left text-white">
        <div className="w-[95%] max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="w-full md:w-[40%] lg:w-[30%]">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight flex flex-wrap gap-x-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {"Transforming Opportunity to Thrive".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="mb-8 text-base md:text-lg leading-relaxed flex flex-wrap gap-x-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.6,
                  },
                },
              }}
            >
              {"Enabling entrepreneurs across Africa to deliver affordable, essential services.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Link
                href="/about"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors text-lg font-medium"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
