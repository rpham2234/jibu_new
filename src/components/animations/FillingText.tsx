"use client";

import { motion } from "framer-motion";
import React from "react";

interface FillingTextProps {
    text: string;
    className?: string;
    fillColor?: string;
    outlineColor?: string;
}

const FillingText = ({
    text,
    className = "",
    fillColor = "#ffffff", // Default fill color (white)
    outlineColor = "rgba(255, 255, 255, 0.3)", // Default outline color (semi-transparent white)
}: FillingTextProps) => {
    return (
        <div className={`relative inline-block ${className}`}>
            {/* Base Layer (Outline/Ghost) */}
            <span
                className="block"
                style={{ color: outlineColor }}
            >
                {text}
            </span>

            {/* Fill Layer */}
            <motion.div
                className="absolute bottom-0 left-0 w-full overflow-hidden text-left"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            >
                <span
                    className="block absolute bottom-0 left-0 w-full"
                    style={{ color: fillColor }}
                >
                    {text}
                </span>
            </motion.div>
        </div>
    );
};

export default FillingText;
