"use client";

import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import Image from "next/image"
import CountryDropDown from "@/components/subcomponents/dropdown";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Import our configuration mapping
import { countryNavigationParams, NavItem } from "@/config/countryNav";
import { capitalizeFirstLetter } from "@/components/subcomponents/capitalizeFirstLetter";

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

export default function DynamicCountryHeader({ countrySlug }: { countrySlug: string }) {
    const pathname = usePathname();
    const safeSlug = (countrySlug || "").toLowerCase();

    // Lookup the navigation items for this specific country, default to empty array if none defined.
    const navigation: NavItem[] = countryNavigationParams[safeSlug] || [];

    return (
        <Disclosure as="nav" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-black/5 transition-all duration-300">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    {/* Mobile menu button - Only show if we actually have navigation items */}
                    {navigation.length > 0 && (
                        <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
                            <DisclosureButton as="button" suppressHydrationWarning className="group relative inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                    )}

                    <div className="flex flex-1 items-center justify-center xl:items-stretch xl:justify-start">
                        <div className="flex shrink-0 items-center">
                            {/* Logo */}
                            <Link href={`/${safeSlug}`} className="flex items-center">
                                <Image
                                    src="/jibu_blue_logo.png"
                                    alt="Jibu Logo"
                                    height={60}
                                    width={200}
                                    className="h-10 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden xl:ml-6 xl:block">
                            <div className="flex items-center space-x-4 pl-4">
                                {navigation.map((item) => {
                                    const isCurrent = pathname === item.href || pathname === `${item.href}/`;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            aria-current={isCurrent ? 'page' : undefined}
                                        >
                                            <motion.div
                                                className={classNames(
                                                    isCurrent ? 'text-lg font-bold text-black' : 'text-sm font-medium text-gray-700',
                                                    'px-3 py-2 transition-all duration-300 whitespace-nowrap'
                                                )}
                                                whileHover={!isCurrent ? { scale: 1.1, color: "#005499" } : {}}
                                                whileTap={!isCurrent ? { scale: 0.95 } : {}}
                                                layout
                                            >
                                                {item.name}
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                        {/* Simple back to global site button if no nav items exist */}
                        {navigation.length === 0 && (
                            <Link href="/" className="hidden sm:block text-sm font-medium text-gray-700 hover:text-[#005499] transition-colors">
                                Back to Global Site
                            </Link>
                        )}
                        {/* Country Dropdown */}
                        <CountryDropDown country={capitalizeFirstLetter(safeSlug)} />
                    </div>
                </div>
            </div>

            {/* Mobile nav panel */}
            {navigation.length > 0 && (
                <DisclosurePanel className="xl:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-black/5 overflow-hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => {
                            const isCurrent = pathname === item.href || pathname === `${item.href}/`;
                            return (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    className={classNames(
                                        isCurrent ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-black/5 hover:text-black',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            );
                        })}
                    </div>
                </DisclosurePanel>
            )}
        </Disclosure>
    )
}
