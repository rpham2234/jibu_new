import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const franchisees = [
  {
    name: "Rehema Uwamahoro",
    location: "Franchisee in Rwamagana, Rwanda",
    image: "https://jibuco.com/wp-content/uploads/2022/10/Uwamahoro-Rehema-Franchisee-Rwamagana-min-731x1024.jpg"
  },
  {
    name: "Dorcus",
    location: "Franchisee in Buruburu, Kenya",
    image: "https://jibuco.com/wp-content/uploads/2023/01/MG_2009-1-jpg.webp"
  },
  {
    name: "Mediatrice Muvuna",
    location: "Franchisee in Kinamba, Musanze, Nyagatare - Rwanda",
    image: "https://jibuco.com/wp-content/uploads/2022/10/Mediatrice-Muvuna-Franchisee-Kinamba-min-731x1024.jpg"
  },
  {
    name: "Carol Mbabazi",
    location: "Franchisee in Kicukiro & Sonatube, Rwanda",
    image: "https://jibuco.com/wp-content/uploads/2022/10/Carol-Mbabazi-Franchisee-Kicukiro-and-Sonatube-min-731x1024.jpg"
  },
  {
    name: "Ivan Ntabazi",
    location: "Franchisee in Ggaba & Munyonyo, Uganda",
    image: "https://jibuco.com/wp-content/uploads/2023/02/IVAN-NTABAZI-min-731x1024.webp"
  },
  {
    name: "Ian Odong",
    location: "Franchisee in Ntinda, Uganda",
    image: "https://jibuco.com/wp-content/uploads/2022/10/IAN-ODONG-JIBU-NTINDA-MAY_16-min-731x1024.jpg"
  },
  {
    name: "Charity Wafula",
    location: "Franchisee in Karen, Kenya",
    image: "https://jibuco.com/wp-content/uploads/2023/02/Charity-Wafula-Franchisee-Karen-min-1-731x1024.webp"
  },
  {
    name: "Rosine Uwamaharo",
    location: "Franchisee in Nyamata & Gasogi 1, Rwanda",
    image: "https://jibuco.com/wp-content/uploads/2023/02/Uwamaharo-Rosine-Franchisee-Nyamata-and-Gasogi-1-min-731x1024.webp"
  },
  {
    name: "Aimee Kanyoni",
    location: "Franchisee in Ville, Goma, DRC",
    image: "https://jibuco.com/wp-content/uploads/2023/02/Aimee-Kanyoni-Franchisee-Ville-min-819x1024-min-1-731x1024.webp"
  },
  {
    name: "Bahati Patient",
    location: "Franchisee in Unigom, Goma, DRC",
    image: "https://jibuco.com/wp-content/uploads/2023/02/Bahati-Patient-Franchisee-Unigom-min-min-731x1024.webp"
  },
  {
    name: "Eric Nsengimana",
    location: "Franchisee in Virunga 2, Goma, DRC",
    image: "https://jibuco.com/wp-content/uploads/2023/02/Eric-Nsengimana-Franchisee-Virunga-2-min-min-1-731x1024.webp"
  },
  {
    name: "Walter Opio",
    location: "Franchisee in Najjanankumbi",
    image: "https://jibuco.com/wp-content/uploads/2023/02/WALTER-OPIYO-OJIJO-JIBU-LWEZA-FEB_16-min-731x1024-min-731x1024.webp"
  }
];

import { useRouter } from "next/navigation";

export type Franchisee = {
  id?: string | number; // Added optional id
  name: string;
  location: string;
  image: string;
};

export default function CardCarousel({
  items = franchisees,
  title = "Meet Our Franchisees",
}: {
  items?: Franchisee[];
  title?: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Calculate visible range (e.g., 2 on each side)
  const getVisibleItems = () => {
    if (!items.length) return [];

    // Prevent showing duplicate items if the list is small
    const spread = Math.min(2, Math.floor((items.length - 1) / 2));

    const visibleItems = [];
    for (let i = -spread; i <= spread; i++) {
      const index = (currentIndex + i + items.length) % items.length;
      visibleItems.push({ ...items[index], offset: i, key: index });
    }
    return visibleItems;
  };

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-slate-800">
          {title}
        </h2>

        <motion.div
          className="relative w-full h-[500px] flex items-center justify-center perspective-1000 touch-none"
          onPanEnd={(e, info) => {
            if (info.offset.x < -50) {
              handleNext();
            } else if (info.offset.x > 50) {
              handlePrev();
            }
          }}
        >
          <AnimatePresence initial={false}>
            {getVisibleItems().map((item) => (
              <motion.div
                key={item.key}
                layout
                initial={{
                  scale: 0.8,
                  x: item.offset * 100, // Initial guess
                  opacity: 0
                }}
                animate={{
                  scale: item.offset === 0 ? 1 : 0.85 - Math.abs(item.offset) * 0.1,
                  x: item.offset * 220, // Spacing between cards
                  y: item.offset === 0 ? 0 : 20,
                  zIndex: 100 - Math.abs(item.offset),
                  opacity: 1 - Math.abs(item.offset) * 0.3,
                  rotateY: item.offset * -15, // Tilt effect
                }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="absolute w-[280px] md:w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (item.offset === 0 && item.id) {
                    router.push(`/ourTeam/${item.id}`);
                  } else if (item.offset !== 0) {
                    setCurrentIndex(item.key);
                  }
                }}
              >
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-white/80">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
