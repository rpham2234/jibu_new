"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import CountryDropDown from "../subcomponents/dropdown";

export default function CountryNavbar({country="uganda",}:{country?: string;}) {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <nav className="bg-[#005499] text-white">
      <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href={"/" + country} className="flex items-center">
          <Image
            src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-2_Jibu-Logo-150x48-white.png"
            alt="Jibu Logo"
            height={48}
            width={150}
          />
        </Link>

        <button
          className="block lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle Menu</span>
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
          >
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

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-4 lg:mt-0">
            <li>
              <Link
                href={"/" + country}
                className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center"
              >
                Jibu Global
              </Link>
            </li>
            <li>
              <Link
                href={`/${country}#products`}
                className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center"
              >
                Our Products
              </Link>
            </li>
            <li>
              <Link
                href={`/${country}/franchise`}
                className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center"
              >
                Franchise Locations
              </Link>
            </li>
            <li>
              <Link
                href="bids-tenders"
                className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center"
              >
                Bids & Tenders
              </Link>
            </li>
            <li>
              <Link
                href={`/${country}/contact`}
                className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center"
              >
                Contact Us
              </Link>
            </li>
            <CountryDropDown />
            <li>
                <Link
                href="#"
                className="hover:text-gray-200 font-semibold px-0 py-2 flex items-center"
                >
                    <ShoppingCartIcon height={24} width={24}/>
                </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}
