"use client";

import Options from "@/components/countries/options";
import ProductGrid from "@/components/countries/productGrid";
import Header from "@/components/countries/uganda/header";
import HeroImage from "@/components/HeroImage";
import React from "react";
import ReactCountryFlag from "react-country-flag"


const products = [
  {
    _id: 1,
    productName: 'Earthen Bottle',
    href: '#',
    price: '$48',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    _id: 2,
    productName: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    _id: 3,
    productName: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    _id: 4,
    productName: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    _id: 5,
    productName: 'Focus Card Tray',
    href: '#',
    price: '$64',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  },
  {
    _id: 6,
    productName: 'Focus Multi-Pack',
    href: '#',
    price: '$39',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg',
    imageAlt: 'Stack of 3 small drab green cardboard paper card refill boxes with white text.',
  },
  {
    _id: 7,
    productName: 'Brass Scissors',
    href: '#',
    price: '$50',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg',
    imageAlt: 'Brass scissors with geometric design, black steel finger holes, and included upright brass stand.',
  },
  {
    _id: 8,
    productName: 'Focus Carry Pouch',
    href: '#',
    price: '$32',
    img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
]

export default function uganda() {
  return (
    <main>
      <HeroImage imageurl="https://jibuco.com/wp-content/uploads/2022/11/Ghana-launch.jpg" showText={true} title="We Deliver to your doorstep" subtitle="" showButton={false} />
      <Header country="Kenya" countryCode="KE"/>
      <Options />
      <section id="products">
        <ProductGrid products={products}/>
      </section>
    </main>
  )};