"use client";

import AboutStats from "@/components/AboutStats";
import CustomCarousel from "@/components/CustomCarousel";
import FranchiseeCarousel from "@/components/Franchisee Carousel";
import HeroImage from "@/components/HeroImage";
import HowJibuWorks from "@/components/HowJibuWorks";

export default function Home() {

  const slides = [
    {
      src: "https://mdbootstrap.com/img/Photos/Others/images/76.jpg",
      alt: "Scenery 1",
      title: "Welcome to My Blog",
      description: "Explore articles, tutorials, and more.",
      ctaLabel: "Read More",
      ctaLink: "/blog",
    },
    {
      src: "https://mdbootstrap.com/img/Photos/Others/images/77.jpg",
      alt: "Scenery 2",
      title: "See cool stuff",
      description: "Explore articles, tutorials, and more.",
      ctaLabel: "About us",
      ctaLink: "/about",
    },
    // Add more slides...
  ];

  const franchisees = [
    {
        "name": "Rehema Uwamahoro",
        "location": "Franchisee in Rwamagana, Rwanda",
        "image": "https://jibuco.com/wp-content/uploads/2022/10/Uwamahoro-Rehema-Franchisee-Rwamagana-min-731x1024.jpg"
      },
      {
        "name": "Dorcus",
        "location": "Franchisee in Buruburu, Kenya",
        "image": "https://jibuco.com/wp-content/uploads/2023/01/MG_2009-1-jpg.webp"
      },
      {
        "name": "Mediatrice Muvuna",
        "location": "Franchisee in Kinamba, Musanze, Nyagatare - Rwanda",
        "image": "https://jibuco.com/wp-content/uploads/2022/10/Mediatrice-Muvuna-Franchisee-Kinamba-min-731x1024.jpg"
      },
      {
        "name": "Carol Mbabazi",
        "location": "Franchisee in Kicukiro & Sonatube, Rwanda",
        "image": "https://jibuco.com/wp-content/uploads/2022/10/Carol-Mbabazi-Franchisee-Kicukiro-and-Sonatube-min-731x1024.jpg"
      },
      {
        "name": "Ivan Ntabazi",
        "location": "Franchisee in Ggaba & Munyonyo, Uganda",
        "image": "https://jibuco.com/wp-content/uploads/2023/02/IVAN-NTABAZI-min-731x1024.webp"
      },
      {
        "name": "Ian Odong",
        "location": "Franchisee in Ntinda, Uganda",
        "image": "https://jibuco.com/wp-content/uploads/2022/10/IAN-ODONG-JIBU-NTINDA-MAY_16-min-731x1024.jpg"
      },
      {
        "name": "Charity Wafula",
        "location": "Franchisee in Karen, Kenya",
        "image": "https://jibuco.com/wp-content/uploads/2023/02/Charity-Wafula-Franchisee-Karen-min-1-731x1024.webp"
      },
      {
        "name": "Rosine Uwamaharo",
        "location": "Franchisee in Nyamata & Gasogi 1, Rwanda",
        "image": "https://jibuco.com/wp-content/uploads/2023/02/Uwamaharo-Rosine-Franchisee-Nyamata-and-Gasogi-1-min-731x1024.webp"
      },
      {
        "name": "Aimee Kanyoni",
        "location": "Franchisee in Ville, Goma, DRC",
        "image": "https://jibuco.com/wp-content/uploads/2023/02/Aimee-Kanyoni-Franchisee-Ville-min-819x1024-min-1-731x1024.webp"
      },
      {
        "name": "Bahati Patient",
        "location": "Franchisee in Unigom, Goma, DRC",
        "image": "https://jibuco.com/wp-content/uploads/2023/02/Bahati-Patient-Franchisee-Unigom-min-min-731x1024.webp"
      },
      {
        "name": "Eric Nsengimana",
        "location": "Franchisee in Virunga 2, Goma, DRC",
        "image": "https://jibuco.com/wp-content/uploads/2023/02/Eric-Nsengimana-Franchisee-Virunga-2-min-min-1-731x1024.webp"
      },
      {
        "name": "Walter Opio",
        "location": "Franchisee in Najjanankumbi",
        "image": "https://jibuco.com/wp-content/uploads/2023/02/WALTER-OPIYO-OJIJO-JIBU-LWEZA-FEB_16-min-731x1024-min-731x1024.webp"
      }
  ];

  return (
    <main>
      
      <HeroImage />
      <AboutStats />
      <FranchiseeCarousel franchisees={franchisees}/>
      <HowJibuWorks />
    </main>
  );
}


