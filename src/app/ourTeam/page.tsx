"use client";

import FranchiseeCarousel from "@/components/Franchisee Carousel";
import React from "react";

export default function ourTeam() {

  const execs = [
  {
      "name": "Galen Welsch",
      "location": "Chief Executive Officer",
      "image": "https://jibuco.com/wp-content/uploads/2022/09/Galen-Welsch-Jibu-min-829x1024.jpg"
    },
    {
      "name": "Antonia Nalunga",
      "location": "Franchisee in Buruburu, Kenya",
      "image": "https://jibuco.com/wp-content/uploads/2022/09/Antonia-Nalunga-819x1024.jpeg"
    }
  ]
  const board = [
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
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Meet Our Team</h1>
      <FranchiseeCarousel franchisees={execs} title="Our Executive Team"/>
      <FranchiseeCarousel franchisees={board} title="Board Members"/>
    </main>
  )};