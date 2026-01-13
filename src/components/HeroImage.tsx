// app/components/HeroImage.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FillingText from "./animations/FillingText";
import Globe3D from "./Globe3D";

const MotionLink = motion(Link);

interface HeroImageProps {
  imageurl?: string;
  title?: string;
  subtitle?: string;
  showButton?: boolean;
}

export default function HeroImage({
  imageurl,
  title,
  subtitle,
  showButton = true,
}: HeroImageProps) {
  // If imageurl is provided, render as a Banner (Standard Page Header)
  if (imageurl) {
    return (
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center bg-black">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${imageurl}')` }}
        />
        <div className="absolute inset-0 z-0 bg-black/40" /> {/* Overlay for text readability */}

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>
          )}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <MotionLink
                href="/contact" // Default or make prop?
                className="inline-block bg-[#005499] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get in Touch
              </MotionLink>
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // DEFAULT: Home Page Layout (Globe + Animation)
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white flex items-center">
      {/* Content - Left Side */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:pl-32 md:pr-12 z-20">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-gray-900 max-w-lg lg:max-w-xl xl:max-w-3xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FillingText
            text="Transforming Opportunity to Thrive"
            className="text-gray-900"
            fillColor="#005499"
            outlineColor="rgba(0,0,0,0.1)"
          />
        </motion.h1>
        <motion.p
          className="mb-8 text-lg md:text-xl leading-relaxed text-gray-600 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Enabling entrepreneurs across Africa to deliver affordable, essential services.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <MotionLink
            href="/about"
            className="inline-block border-2 border-[#005499] text-[#005499] px-8 py-3 rounded-full text-lg font-medium bg-transparent"
            whileHover={{
              scale: [null, 1.1, 1.2],
              transition: {
                duration: 0.5,
                times: [0, 0.6, 1],
                ease: ["easeInOut", "easeOut"],
              },
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            Learn More
          </MotionLink>
        </motion.div>
      </div>

      {/* Globe - Right Side */}
      <div className="absolute right-0 top-0 w-full md:w-[75%] 2xl:w-[60%] h-full z-10 translate-x-[20%] md:translate-x-[5%] 2xl:-translate-x-[20%]">
        <Globe3D />
      </div>
      {/* Mobile Globe (Full width but lower z-index or different positioning if needed, keeping simple for now) */}
      <div className="absolute inset-0 z-0 md:hidden opacity-30">
        <Globe3D />
      </div>
    </section>
  );
}
