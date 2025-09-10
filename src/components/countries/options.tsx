"use client";

import React from "react";
import Image from 'next/image';

export default function Options() {
    return(
        <div className="container mx-auto my-12 flex justify-center">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 my-6 px-4 md:px-0">
            <div className="relative w-full md:w-1/2 h-64 duration-500 hover:scale-105 hover:shadow-xl">
                <img
                    className="w-full h-full object-cover rounded-md" 
                    src="https://jibuco.com/website_b9c97ac3/wp-content/uploads/2023/07/Jibu-Main-Website-Banners4-jpg.webp" 
                    alt="Random image" 
                    
                />
                <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-3xl font-bold">Shop New Products</h2>
                </div>
            </div>

            <div className="relative w-full md:w-1/2 h-64 duration-500 hover:scale-105 hover:shadow-xl">
                <img
                    className="w-full h-full object-cover rounded-md" 
                    src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-2_Home-Banner-3-min-scaled.jpg" 
                    alt="Random image" 
                
                />
                <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-3xl font-bold">Shop Refills</h2>
                </div>
            </div>
        </div>
        </div>
    )
};

