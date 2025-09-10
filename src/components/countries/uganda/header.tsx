"use client";

import React from "react";
import ReactCountryFlag from "react-country-flag";

export default function Header({
    countryCode="US",
    country="United States",

}:{
    countryCode?: string;
    country?: string;
}) {
    return(
        <div className="container mx-auto my-12 flex flex-col items-center text-center">
            <div style={{ width: '8em', aspectRatio: '3 / 2' }}>
                <ReactCountryFlag
                    countryCode={countryCode}
                    svg
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    }}
                    title={countryCode}
                />
            </div>

            <h1 className="text-3xl md:text-6xl font-semibold mb-4">Jibu {country}</h1>
            <p className="mb-6 text-sm md:text-base">Choose from available items below</p>   
        </div>
    )
};