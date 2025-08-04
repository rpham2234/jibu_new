'use client'
import { link } from 'fs';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

export default function ContactInfo({
    phone = "+1234567890",
    address = "sample address",
    facebook = "facebook link",
    instagram = "instagram link",
    twitter = "twitter link",
    linkedin = "linkedin link",

    }: {
    phone?: string;
    address?: string;
    facebook?: string;
    instagram?: string
    twitter?: string
    linkedin?: string
}) {
    return(<div className="flex justify-center mt-10 px-4">
      <div className="flex flex-wrap gap-4 max-w-6xl w-full">
        <div className="container mx-auto my-12 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-6xl font-semibold mb-4">Contact Us</h1>
        </div>
        {/* Card 1 */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex flex-col rounded-lg h-full dark:bg-gray-800  p-8">
            <div className="flex items-center mb-3">
              <h2 className="text-md font-medium text-gray-700 dark:text-gray-300">
                Call or WhatsApp Us
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="leading-relaxed text-xl text-gray-900 dark:text-gray-100">
                {phone}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex flex-col rounded-lg h-full dark:bg-gray-800  p-8">
            <div className="flex items-center mb-3">
              <h2 className="text-md font-medium text-gray-700 dark:text-gray-300">
                Pay Us a Visit
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="leading-relaxed text-xl text-gray-900 dark:text-gray-100">
                {address}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex flex-col rounded-lg h-full dark:bg-gray-800  p-8">
            <div className="flex items-center mb-3">
              <h2 className="text-md font-medium text-gray-700 dark:text-gray-300">
                Follow Us
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              {/* Social Links */}
                <div className="space-y-4 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-2">
                    <a href={facebook} className="bg-blue-600 p-2 rounded hover:bg-blue-700">
                        <FaFacebook className="text-white h-5 w-5" />
                    </a>
                    <a href={twitter} className="bg-pink-600 p-2 rounded hover:bg-pink-700">
                        <FaInstagram className="text-white h-5 w-5" />
                    </a>
                    <a href={twitter} className="bg-blue-400 p-2 rounded hover:bg-blue-500">
                        <FaTwitter className="text-white h-5 w-5" />
                    </a>
                    <a href={linkedin} className="bg-blue-700 p-2 rounded hover:bg-blue-900">
                        <FaLinkedin className="text-white h-5 w-5" />
                    </a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
