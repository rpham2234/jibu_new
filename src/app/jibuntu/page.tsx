"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ReactCountryFlag from "react-country-flag";

const countries = [
    { name: "Uganda", code: "UG" },
    { name: "Kenya", code: "KE" },
    { name: "Rwanda", code: "RW" },
    { name: "Burundi", code: "BI" },
    { name: "Tanzania", code: "TZ" },
    { name: "Zambia", code: "ZM" },
    { name: "Ghana", code: "GH" },
    { name: "DRC", code: "CD" },
];

function DonationBox() {
    const [type, setType] = useState<'monthly' | 'once'>('once');
    const [amount, setAmount] = useState(type === 'monthly' ? 12 : 500);

    const handleTypeChange = (newType: 'monthly' | 'once') => {
        setType(newType);
        setAmount(newType === 'monthly' ? 12 : 500);
    };

    const stripeLink = type === 'monthly'
        ? "https://buy.stripe.com/6oUfZh1Ev77WgJ61Ui53O09"
        : "https://donate.stripe.com/bJedR93MD8c01Oc0Qe53O07";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-[420px] bg-white rounded-lg overflow-hidden shadow-2xl text-gray-800 flex flex-col"
        >
            {/* Tabs */}
            <div className="flex w-full h-[70px]">
                <button
                    onClick={() => handleTypeChange('monthly')}
                    className={`flex-1 flex items-center justify-center font-bold text-sm leading-tight px-4 transition-all duration-300 ${type === 'monthly' ? 'bg-[#F9F9F7] text-gray-800' : 'bg-[#FFCC00] text-gray-900'}`}
                >
                    Subscribe monthly
                </button>
                <button
                    onClick={() => handleTypeChange('once')}
                    className={`flex-1 flex items-center justify-center font-bold text-sm leading-tight px-4 transition-all duration-300 ${type === 'once' ? 'bg-[#F9F9F7] text-gray-800' : 'bg-[#FFCC00] text-gray-900'}`}
                >
                    Sponsor with one time donation
                </button>
            </div>

            <div className="p-8 flex flex-col gap-6 bg-white">
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">ENTER AN AMOUNT TO GIVE</span>
                    <div className="relative border border-gray-200 rounded-md p-4 flex items-center transition-colors focus-within:border-[#FFCC00] shadow-sm">
                        <span className="text-3xl font-bold text-gray-300 mr-3">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="text-5xl font-bold w-full focus:outline-none bg-transparent text-gray-900 tracking-tight"
                        />
                        <span className="text-lg font-bold text-gray-400">USD</span>
                    </div>
                </div>

                <div className="text-sm text-gray-600 leading-relaxed font-medium">
                    Provide safe drinking water to one family in need for $12, or to 40 for $480. 100% of donations go directly to families in Uganda, Kenya, Rwanda, DR Congo, Zambia, or Ghana. <a href="#" className="underline decoration-gray-300 hover:text-[#005499] transition-colors">Learn more about Jibu and Jibuntu Foundation here</a>
                </div>

                <motion.a
                    href={stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full py-4 bg-[#FFCC00] text-gray-900 rounded-md font-black text-center text-lg tracking-widest shadow-lg hover:shadow-[#FFCC00]/40 transition-all uppercase mt-2"
                >
                    Help a Family
                </motion.a>
            </div>
        </motion.div>
    );
}

export default function JibuntuPage() {
    return (
        <main
            className="min-h-screen relative overflow-hidden"
            style={{ backgroundColor: 'rgba(22, 88, 179, 1)' }}
        >
            <div className="pt-40 pb-20 px-6 sm:px-12 lg:px-24 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
                    {/* Left side: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 text-white relative"
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6 border border-white/30"
                        >
                            Jibu Foundation
                        </motion.div>
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 tracking-tight">
                            Jibuntu
                        </h1>
                        <p className="text-xl sm:text-2xl mb-10 leading-relaxed font-light opacity-90 max-w-xl">
                            The philanthropic heartbeat of Jibu. We scale impact through sustainable community initiatives and entrepreneurial support.
                        </p>
                        <DonationBox />
                    </motion.div>

                    {/* Right side: Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 2 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="lg:w-1/2 relative group"
                    >
                        <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-square w-full rounded-[2rem] overflow-hidden group-hover:border-white/20 transition-all duration-500">
                            <Image
                                src="https://jibuntu.org/wp-content/uploads/2024/02/Header-picture-min-scaled-1.webp"
                                alt="Smiling lady and kid representing Jibuntu's mission"
                                fill
                                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Decorative background shapes */}
                        <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -z-10 -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                        {/* Floating Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute -bottom-6 -left-6 sm:left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl max-w-[200px]"
                        >
                            <div className="flex items-center gap-3 mb-2 text-white">
                                <div className="w-3 h-3 bg-green-400 rounded-full" />
                                <span className="text-xs font-bold uppercase tracking-wider">Live Impact</span>
                            </div>
                            <p className="text-white text-lg font-bold leading-tight">Together we grow.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none overflow-hidden sm:block hidden">
                <svg className="absolute right-0 top-0 h-full w-full text-white/[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M100 0 L100 100 L0 100 Q50 50 100 0 Z" fill="currentColor" />
                </svg>
            </div>

            {/* Challenges Section */}
            <section className="relative z-10 py-32 bg-[#0a0a0a] text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
                            The Challenges we face
                        </h2>
                        <div className="w-24 h-1 bg-white/30 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Challenge 1: Water */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group relative bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                        >
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src="/scarcitywater.png"
                                    alt="Rusty water tap representing scarcity"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                                        Safe Drinking Water
                                    </h3>
                                    <p className="text-lg font-light opacity-80 group-hover:opacity-100 transition-opacity">
                                        Over <span className="font-bold text-white">400 million people</span> in Sub-Saharan Africa do not have daily access to safe drinking water.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Challenge 2: Employment */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="group relative bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 lg:-mt-12"
                        >
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src="/jobscarcity.png"
                                    alt="Women carrying water jerrycans"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                                        Meaningful Employment
                                    </h3>
                                    <p className="text-lg font-light opacity-80 group-hover:opacity-100 transition-opacity">
                                        Over <span className="font-bold text-white">100 million people</span>  in sub-Saharan Africa lack meaningful, sustainable jobs.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Challenge 3: Environment */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="group relative bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                        >
                            <div className="aspect-[4/5] relative">
                                <Image
                                    src="/mancycling.png"
                                    alt="Charcoal transportation"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                                        Deforestation
                                    </h3>
                                    <p className="text-lg font-light opacity-80 group-hover:opacity-100 transition-opacity">
                                        Over <span className="font-bold text-white">60% of households</span> in sub-Saharan Africa use charcoal to boil water, fueling deforestation.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Support Jibuntu Section */}
            <section className="relative z-10 py-24 bg-white text-[#005499]">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
                    {/* Section Heading */}
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase mb-4"
                        >
                            SUPPORT JIBUNTU [DONATE / SPONSOR]
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "120px" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1.5 bg-[#FFD700] mx-auto"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch justify-center relative">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 flex flex-col items-center text-center p-8 lg:p-12"
                        >
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8">
                                <Image
                                    src="/dispensor.png"
                                    alt="Jibu Dispensor"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-4">
                                Sponsor a family with monthly donations
                            </h3>
                            <p className="text-md text-gray-700 font-medium">
                                Provide permanent safe drinking water access to low-income families by sponsoring them with the upfront purchase of a refillable bottle. The family will be responsible for the refills.
                            </p>
                        </motion.div>

                        {/* Vertical Divider (Desktop only) */}
                        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-gray-300 -translate-x-1/2" />

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 flex flex-col items-center text-center p-8 lg:p-12"
                        >
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8 flex items-center justify-center">
                                <Image
                                    src="/sponsorship.png"
                                    alt="Sponsorship Drops"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-4">
                                Sponsor 40 families with a one-time donation
                            </h3>
                            <p className="text-md text-gray-700 font-medium">
                                Provide a one-time gift that will sponsor 40 families
                            </p>
                        </motion.div>
                    </div>

                    {/* Refined Split-Button CTA */}
                    <div className="mt-16 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto flex flex-col md:flex-row items-stretch justify-center rounded-[2rem] md:rounded-full overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(22,88,179,0.3)] border-2 border-[rgba(22,88,179,1)]"
                        >
                            <a
                                href="https://buy.stripe.com/6oUfZh1Ev77WgJ61Ui53O09"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-8 py-6 bg-[rgba(22,88,179,1)] text-white group-hover:bg-white group-hover:text-[rgba(22,88,179,1)] transition-all duration-500 flex items-center justify-center text-center text-lg lg:text-xl font-bold uppercase tracking-widest border-b-2 md:border-b-0 md:border-r-2 border-[rgba(22,88,179,1)]"
                            >
                                Monthly Donation
                            </a>
                            <a
                                href="https://donate.stripe.com/bJedR93MD8c01Oc0Qe53O07"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-8 py-6 bg-white text-[rgba(22,88,179,1)] group-hover:bg-[rgba(22,88,179,1)] group-hover:text-white transition-all duration-500 flex items-center justify-center text-center text-lg lg:text-xl font-bold uppercase tracking-widest"
                            >
                                Sponsor with one time donation
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="relative z-10 pt-48 pb-24 bg-[rgba(22,88,179,1)] text-white overflow-hidden">
                {/* Refined Smooth Wave Edge */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px]">
                        <path
                            d="M0,0V120c150-100,350,100,600,0s450-100,600,0V0Z"
                            fill="#FFFFFF"
                        />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
                    {/* Section Heading */}
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase mb-4"
                        >
                            IMPACT
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "80px" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 bg-[#FFD700] mx-auto"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-24 relative">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 space-y-8"
                        >
                            <p className="text-lg lg:text-xl font-light leading-relaxed opacity-90">
                                Jibuntu, an initiative of Jibu, extends the mission of delivering safe drinking water by targeting underserved, low-income families in Africa who currently lack sustainable access to drinking water and can't afford Jibu at its ordinary prices.
                            </p>
                            <p className="text-lg lg:text-xl font-light leading-relaxed opacity-90">
                                Within its ordinary business model, Jibu serves Africa's core middle income population (40%-80% income earners). <span className="font-semibold text-white">Jibuntu extends this reach to the bottom 40%</span> by leveraging the existing Jibu network infrastructure and know-how.
                            </p>
                            <p className="text-lg lg:text-xl font-light leading-relaxed opacity-90">
                                Jibuntu works with disadvantaged entrepreneurs to ensure accessible and sustainable clean water solutions for the most underserved communities. It accomplishes this through home, school, hospital, and community sponsorships.
                            </p>
                        </motion.div>

                        {/* Vertical Divider (Desktop only) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/30 -translate-x-1/2" />

                        {/* Right Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 flex flex-col pt-4"
                        >
                            <div className="space-y-8 mb-12">
                                <p className="text-lg lg:text-xl font-light leading-relaxed opacity-90">
                                    By utilizing the Jibu franchise model, Jibuntu aims to make clean water accessible to those in need, foster economic development, and protect the environment.
                                </p>
                                <p className="text-xl lg:text-2xl font-bold leading-tight">
                                    Join us in our mission to support those who need it the most with access to safe drinking water.
                                </p>
                            </div>

                            <div className="mt-auto flex flex-col items-center">
                                <div className="relative w-full max-w-[400px] aspect-[4/3] mb-6">
                                    <Image
                                        src="https://jibuntu.org/wp-content/uploads/2024/02/JibuntuLgoWhite.png"
                                        alt="Jibuntu Brand Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-light leading-relaxed">
                                        <span className="font-bold">Jibuntu</span> ("Jibu" + "Ubuntu") plays on the Shona word, "Ubuntu", which means <span className="italic">"I am because we are"</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Current Impact Section */}
            <section className="relative z-10 py-24 bg-white text-[rgba(22,88,179,1)]">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
                    {/* Section Heading */}
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase mb-4"
                        >
                            CURRENT IMPACT
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "80px" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 bg-[#FFD700] mx-auto"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative items-stretch">
                        {/* Column 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center p-6"
                        >
                            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                                <Image
                                    src="/dispensor.png"
                                    alt="Households Reached"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-lg font-medium leading-relaxed text-gray-800">
                                In total, we have reached over <span className="font-bold text-[rgba(22,88,179,1)]">7,500 low-income households</span> In Uganda, Kenya, Rwanda, Ghana and DRC who are continuously using Jibu water.
                            </p>
                        </motion.div>

                        {/* Divider 1 */}
                        <div className="hidden md:block absolute left-[33.33%] top-0 bottom-0 w-px bg-gray-200" />

                        {/* Column 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center text-center p-6"
                        >
                            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                                <Image
                                    src="/jobsearch.png"
                                    alt="Jobs Created"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-lg font-medium leading-relaxed text-gray-800">
                                We have created over <span className="font-bold text-[rgba(22,88,179,1)]">3,000 direct jobs</span> and improved income of <span className="font-bold text-[rgba(22,88,179,1)]">10,000 resellers</span> in low-resource settings.
                            </p>
                        </motion.div>

                        {/* Divider 2 */}
                        <div className="hidden md:block absolute left-[66.66%] top-0 bottom-0 w-px bg-gray-200" />

                        {/* Column 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center text-center p-6"
                        >
                            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                                <Image
                                    src="/nobottle.png"
                                    alt="Bottles Saved"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-lg font-medium leading-relaxed text-gray-800">
                                One Jibu bottle can save up to <span className="font-bold text-[rgba(22,88,179,1)]">20,000 single use plastic bottles.</span>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Country Flags Carousel Section */}
            <section className="relative z-10 py-16 bg-white overflow-hidden border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-12">Active Countries</h3>
                    <div className="relative w-full h-32 flex items-center overflow-hidden">
                        <motion.div
                            className="flex items-center gap-12 whitespace-nowrap"
                            animate={{
                                x: [0, -1032] // Adjusted for approx flags + gaps
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {/* Duplicate flags for infinite effect */}
                            {[...countries, ...countries, ...countries].map((country, index) => (
                                <div key={`${country.code}-${index}`} className="flex items-center gap-6 group">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg border-2 border-gray-100 transition-transform duration-300 group-hover:scale-110">
                                        <ReactCountryFlag
                                            countryCode={country.code}
                                            svg
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                            title={country.name}
                                        />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-[rgba(22,88,179,1)] transition-colors duration-300">
                                        {country.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Gradient Fades for Smooth Edges */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
                    </div>
                </div>
            </section>
        </main>
    );
}
