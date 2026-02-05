"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const investors = [
    {
        name: "Kepple Africa Ventures",
        url: "https://kepple-africa-ventures.com/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/s-1200x630_v-fms_webp_36abaf52-f0eb-43e4-995f-30bf13db82c6_middle.webp",
    },
    {
        name: "Danone Communities",
        url: "https://www.danonecommunities.com/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/logo-1.png",
    },
    {
        name: "The Stone Family Foundation",
        url: "https://thestonefamilyfoundation.org/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/logo.png",
    },
    {
        name: "Hesabu Capital",
        url: "https://hesabucapital.com/",
        logo: "https://jibuco.com/wp-content/uploads/2023/05/Hesabu-Logo_3D_horizontal-lock-up_on-black-01.png",
    },
    {
        name: "Hilton Foundation",
        url: "https://www.hiltonfoundation.org/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/download-1-e1662964954420.jpeg",
    },
    {
        name: "FINCA Ventures",
        url: "https://fincaventures.com/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/btqptd5virfbq8sgag50.webp",
    },
    {
        name: "DFC",
        url: "https://www.dfc.gov/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/dfc.png",
    },
    {
        name: "AAIC",
        url: "https://aa-ic.com/en/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/co_logo_bw.webp",
    },
    {
        name: "Open Road Alliance",
        url: "https://openroadalliance.org/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/ora.webp",
    },
    {
        name: "Kiva",
        url: "https://www.kiva.org/",
        logo: "https://jibuco.com/wp-content/uploads/2022/09/download-1.png",
    },
    {
        name: "responsAbility",
        url: "https://www.responsability.com/en",
        logo: "https://jibuco.com/wp-content/uploads/2022/11/download.png",
    },
];

// Duplicate the investors to ensure seamless looping
const duplicatedInvestors = [...investors, ...investors];

export default function InvestorPartners() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-outfit">
                    Investor Partners
                </h2>
                <div className="mx-auto mt-4 h-1 w-20 bg-[#005499] rounded-full"></div>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    className="flex items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Adjust speed here (slower is usually better for logos)
                    }}
                    style={{ width: "fit-content" }}
                >
                    {duplicatedInvestors.map((investor, index) => (
                        <div
                            key={`${investor.name}-${index}`}
                            className="w-[200px] flex-shrink-0 h-24 relative mx-6 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            <Link
                                href={investor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-full h-full block"
                            >
                                <Image
                                    src={investor.logo}
                                    alt={investor.name}
                                    fill
                                    className="object-contain p-2"
                                    sizes="200px"
                                />
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
