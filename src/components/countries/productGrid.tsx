"use client";

import React from "react";
import ProductCard from "@/components/countries/productCard";

// Define the Product interface
interface Product {
  _id: string;
  img: string;
  productName: string;
  price: number;
  color: string;
}

interface ProductGridProps {
  products?: Product[]; // Array of products (optional)
}

export default function ProductGrid({ products = [] }: ProductGridProps) {
  return (
    <div className="container mx-auto my-12 flex justify-center">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={product._id || index}
            _id={product._id}
            img={product.img}
            productName={product.productName}
            price={product.price}
            color={product.color}
          />
        ))}
      </div>
    </div>
  );
}
