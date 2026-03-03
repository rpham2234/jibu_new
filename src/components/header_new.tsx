"use client";
import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import Image from "next/image"
import CountryDropDown from "./subcomponents/dropdown";
import { motion } from "framer-motion";

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Franchise Opportunity', href: '/franchise', current: false },
  { name: 'Our Team', href: '/ourTeam', current: false },
  { name: 'Careers', href: 'https://jibu.byoosi.com/jobs', current: false },
  { name: 'Jibu Stories', href: '/stories', current: false },
  { name: 'FAQ', href: '/faqs', current: false },
  { name: 'Jibuntu', href: '/jibuntu', current: false, external: true },
]

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

import { usePathname } from "next/navigation";

export default function Example() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-black/5 transition-all duration-300">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton as="button" suppressHydrationWarning className={classNames(
              "group relative inline-flex items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black",
              pathname === '/jibuntu' ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-black/5 hover:text-black"
            )}>
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src={pathname === '/jibuntu' ? "https://jibuntu.org/wp-content/uploads/2024/02/JibuntuLgoWhite.png" : "/jibu_blue_logo.png"}
                  alt={pathname === '/jibuntu' ? "Jibuntu Logo" : "Jibu Logo"}
                  height={60}
                  width={200}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex items-center space-x-4 pl-4">
                {navigation.map((item) => {
                  const isCurrent = pathname === item.href;
                  const isJibuntu = pathname === '/jibuntu';
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      <motion.div
                        className={classNames(
                          isCurrent
                            ? (isJibuntu ? 'text-lg font-bold text-white' : 'text-lg font-bold text-black')
                            : (isJibuntu ? 'text-sm font-medium text-white/80' : 'text-sm font-medium text-gray-700'),
                          'px-3 py-2 transition-all duration-300'
                        )}
                        whileHover={!isCurrent ? { scale: 1.5, color: isJibuntu ? "#fff" : "#005499" } : {}}
                        whileTap={!isCurrent ? { scale: 0.95 } : {}}
                        layout // Helps with smooth layout transitions when size changes
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Country Dropdown */}
            <CountryDropDown />
          </div>
        </div>
      </div>

      <DisclosurePanel className={classNames(
        "sm:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-black/5 overflow-hidden",
        pathname === '/jibuntu' ? "bg-[rgba(22,88,179,0.95)] border-white/10" : "bg-white/10 border-black/5"
      )}>
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href;
            const isJibuntu = pathname === '/jibuntu';
            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={classNames(
                  isCurrent
                    ? (isJibuntu ? 'bg-white/20 text-white' : 'bg-blue-900 text-white')
                    : (isJibuntu ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-black/5 hover:text-black'),
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
