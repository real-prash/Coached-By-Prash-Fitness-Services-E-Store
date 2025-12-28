"use client";

import Stripe from "stripe";
import { useState } from "react";
import { ProductCard } from "./product-card";
import { Search } from "lucide-react"; // Optional: Add an icon if you want

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <div>
      {/* SEARCH BAR SECTION */}
      <div className="mb-10 flex justify-start">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH PROGRAMS..."
            className="w-full border-b-2 border-gray-200 bg-transparent py-2 text-sm font-bold uppercase tracking-wide text-black placeholder-gray-400 focus:border-black focus:outline-none"
          />
        </div>
      </div>

      {/* GRID */}
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProduct.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      
      {/* EMPTY STATE */}
      {filteredProduct.length === 0 && (
        <div className="py-20 text-center">
            <p className="text-gray-500 uppercase tracking-widest font-semibold">No programs found</p>
        </div>
      )}
    </div>
  );
};