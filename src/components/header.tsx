"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import CountryDropDown from "./subcomponents/dropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("UG"); // Default: Uganda

  return (
    <nav className="bg-[#005499] text-white">
      <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-2_Jibu-Logo-150x48-white.png"
            alt="Jibu Logo"
            height={48}
            width={150}
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="block lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle Menu</span>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M18.3 5.7a1 1 0 00-1.4-1.4L12 9.6 7.1 4.7a1 1 0 10-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 001.4 1.4L12 14.4l4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>

        {/* Menu Items */}
        <div className={`${isOpen ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-4 lg:mt-0 items-center">
            <li>
              <Link href="/" className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center">
                About
              </Link>
            </li>
            <li>
              <Link href="/franchise" className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center">
                Franchise Opportunity
              </Link>
            </li>
            <li>
              <Link href="/ourTeam" className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center">
                Our Team
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center">
                Jibu Stories
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-200 font-semibold italic px-0 py-2 flex items-center">
                Jibuntu
              </Link>
            </li>
            <li className="flex items-center">
              <CountryDropDown />
            </li>
          </ul>


        


          {/* Country Flag Selector */}
          

          {/* Search Bar 
          <form className="flex mt-4 lg:mt-0 lg:ml-6">
            <input
              type="search"
              placeholder="Search"
              className="px-3 py-2 rounded-l bg-white text-black focus:outline-none"
            />
            <button type="submit" className="bg-gray-700 px-4 py-2 rounded-r hover:bg-gray-800">
              Search
            </button>
          </form>
          */}
        </div>
      </div>
    </nav>
  );
}
