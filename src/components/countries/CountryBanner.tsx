"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ReactCountryFlag from "react-country-flag";

interface CountryBannerProps {
    imageUrl: string;
    countryName: string;
    countryCode: string;
}

export default function CountryBanner({ imageUrl, countryName, countryCode }: CountryBannerProps) {
    return (
        <div className="w-full px-4 py-8 bg-gradient-to-b from-zinc-100 to-zinc-50">
            <motion.div
                className="max-w-6xl mx-auto relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Banner Card */}
                <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-2xl bg-white mt-20"
                    whileHover={{
                        y: -8,
                        scale: 1.01,
                        transition: { duration: 0.3, ease: "easeOut" }
                    }}
                >
                    {/* Banner Image */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                        <Image
                            src={imageUrl}
                            alt={`${countryName} Banner`}
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Country Name */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <motion.h1
                                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                style={{
                                    textShadow: "0 4px 20px rgba(0,0,0,0.8)",
                                }}
                            >
                                {countryName}
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-white/90 mt-2 font-medium"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                style={{
                                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                                }}
                            >
                                Local Owners Driving Lasting Solutions
                            </motion.p>
                        </div>
                    </div>

                    {/* Bottom decoration bar */}
                    <div className="h-2 bg-gradient-to-r from-[#005499] via-blue-500 to-[#005499]" />
                </motion.div>
            </motion.div>
        </div>
    );
}