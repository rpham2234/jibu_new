"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/60 filter blur-[120px]"
                animate={{
                    x: [0, 150, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/60 filter blur-[120px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 150, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-cyan-400/60 filter blur-[140px]"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
