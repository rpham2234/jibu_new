"use client";
import { motion } from "framer-motion";

export default function CountryDropDown({ country = "Global", }: { country?: string; }) {
  const handleScrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleScrollToFooter}
        suppressHydrationWarning
        className="group inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-bold text-black hover:text-[#e98686ff] transition-colors duration-300 focus:outline-none"
      >
        <motion.span
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          Explore Countries
        </motion.span>
      </button>
    </div>
  )
}
