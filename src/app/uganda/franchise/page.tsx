'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import {info} from "../info"

const StoreLocator = dynamic(() => import('@/components/countries/uganda/franchise/storeFinder'), {
  ssr: false,
});


export default function Page() {

    const stores = [
      { name: "Jibu Kyanja", address: "Plot 145, Kawempe", position: [0.3476, 32.5825] as [number, number]},
      { name: "Jibu Namuwongo", address: "Plot 177/178, Bukasa Rd", position: [0.3102, 32.6203] as [number, number]},
      { name: "Jibu Ggaba", address: "Plot 125, Ggaba", position: [0.2901, 32.6150] as [number, number]},
    ];

    return(
        <div>
            <div className="container mx-auto my-12 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-6xl font-semibold mb-4">Find a Jibu Franchise Near you</h1> 
            </div>
            <div className="px-0 md:px-8 xl:px-32 py-8 ">
                <StoreLocator stores={stores} center={info.center as [number, number]}  country={info.country.toLowerCase()} />
            </div>
            
        </div>
    )
}