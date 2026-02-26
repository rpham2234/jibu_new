"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "8", label: "Countries Served" },
  { value: "10k", label: "Retail Points" },
  { value: "160+", label: "Franchises Launched" },
  { value: "490M", label: "Litres Distributed" },
];

export default function AboutStats() {
  return (
    <section className="relative w-full z-[15] mt-[-100px] lg:mt-[-120px]">
      {/* Refined Smooth Wave Edge (Transparent Top, Blue Bottom via rotate-180) */}
      <div className="w-full overflow-hidden leading-none z-0 relative">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] lg:h-[120px] rotate-180">
          <path
            d="M0,0V120c150-100,350,100,600,0s450-100,600,0V0Z"
            fill="#005499"
          />
        </svg>
      </div>

      <div className="bg-[#005499] px-6 pb-20 pt-12 overflow-hidden relative z-10 w-full">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

          {/* Centered Title & Text */}
          <div className="mb-16 max-w-3xl">
            <p className="text-6xl mb-4 font-semibold text-blue-200">About Us</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Local Owners <br /> Driving Lasting Solutions
            </h2>
            <p className="text-md md:text-xl text-blue-100">
              Jibu capitalizes, equips, and trains emerging market entrepreneurs to launch and grow essential service franchises, with drinking water as our anchor product.
            </p>
          </div>

          {/* Motion Tilt Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white text-[#005499] rounded-2xl p-4 shadow-lg border-none flex flex-col items-center justify-center aspect-square box-shadow-md"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.1)"
                }}
                style={{ perspective: 1000 }}
              >
                <p className="text-5xl md:text-7xl font-bold text-[#005499]">{stat.value}</p>
                <p className="text-base md:text-lg font-medium text-[#005499]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
