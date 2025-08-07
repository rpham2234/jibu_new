import { useState } from "react";
import Image from 'next/image';

interface Product {
  _id: number;
  img: string;
  imageAlt: string;
  productName: string;
  price: string;
  type: string;
  description: string;
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState("S");

  const type = ["New", "Refill"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section - Images */}
      <div>
        <div className="mb-4 relative w-full h-[500px]">
          <Image
            src={product.img}
            alt={product.imageAlt}
            fill
            className="rounded-lg object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{product.productName}</h1>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 mb-4">
          <h3 className="text-lg font-medium mb-2">{product.price}</h3>
        </div>

        {/* Choose New or Refill */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Type</h3>
          <div className="flex gap-2">
            {type.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSize(option)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === option
                    ? "border-black bg-black text-white"
                    : "border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className={`py-3 rounded-lg mb-4 w-full ${
            selectedSize
              ? "bg-[#005499] hover:bg-indigo-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedSize} // disables button when no selection is made
        >
          Add to cart
        </button>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-sm text-gray-700">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
