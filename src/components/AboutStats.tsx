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
    <section className="bg-white text-black px-6 py-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Centered Title & Text */}
        <div className="mb-16 max-w-3xl">
          <p className="text-6xl mb-4 font-semibold text-gray-500">About Us</p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-black">
            Local Owners <br /> Driving Lasting Solutions
          </h2>
          <p className="text-md md:text-xl text-gray-600">
            Jibu capitalizes, equips, and trains emerging market entrepreneurs to launch and grow essential service franchises, with drinking water as our anchor product.
          </p>
        </div>

        {/* Motion Tilt Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white text-black rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col items-center justify-center aspect-square"
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
              <p className="text-5xl md:text-7xl font-bold text-sky-500">{stat.value}</p>
              <p className="text-base md:text-lg font-medium text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
