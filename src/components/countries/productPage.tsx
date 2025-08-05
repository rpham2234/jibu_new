import { useState } from "react";
import Image from 'next/image';

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("S");

  const colors = [
    { name: "Black", value: "black", class: "bg-black" },
    { name: "Gray", value: "gray", class: "bg-gray-400" }
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section - Images */}
      <div>
        <div className="mb-4">
          <Image
            src="https://jibuco.com/rw/wp-content/uploads/sites/4/2024/02/Artboard-1-jpg.webp"
            alt="Basic Tee Main"
            className="rounded-lg w-full"
          />
        </div>
        
      </div>

      {/* Right Section - Product Details */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">20L Tap New</h1>
          
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1 mb-4">
          <h3 className="text-lg font-medium mb-2">$35</h3>
        </div>

        

        

        {/* Add to Cart Button */}
        <button className="bg-[#005499] hover:bg-indigo-700 text-white py-3 rounded-lg mb-4">
          Add to cart
        </button>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-sm text-gray-700">
            Our unique 20L Bottle with a Tap
            </p>
        </div>

      

        
      </div>
    </div>
  );
}
