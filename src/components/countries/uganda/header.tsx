"use client";

import React from "react";
import ReactCountryFlag from "react-country-flag";

export default function Header() {
    return(
        <div className="container mx-auto my-12 flex flex-col items-center text-center">
            <div style={{ width: '12em', aspectRatio: '3 / 2' }}>
                <ReactCountryFlag
                    countryCode="UG"
                    svg
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    }}
                    title="UG"
                />
            </div>

            <h1 className="text-3xl md:text-6xl font-semibold mb-4">Jibu Uganda</h1>
            <p className="mb-6 text-sm md:text-base">Choose from available items below</p>   
        </div>
    )
};