"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react"; // Added icons for premium feel

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  const formattedPrice = price?.unit_amount 
    ? `$${(price.unit_amount / 100).toFixed(2)}` 
    : "N/A";

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 md:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        
        {/* LEFT: Product Image (Fixed Aspect Ratio + Modern Image Props) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col justify-center space-y-8">
          
          {/* Header Section */}
          <div className="space-y-4 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">

            </div>
            <h1 className="text-4xl font-extrabold uppercase tracking-tighter text-black md:text-5xl leading-none">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-black">{formattedPrice}</p>
          </div>

          {/* Description */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            {product.description || "No description available for this program."}
            

          </div>

          {/* Actions / Add to Cart */}
          <div className="pt-4">
            {quantity === 0 ? (
                // State A: Add to Cart Button
                <Button 
                    onClick={onAddItem}
                    className="h-14 w-full rounded-none bg-black text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-neutral-800"
                >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            ) : (
                // State B: Quantity Controller
                <div className="flex flex-col gap-3">
                    <div className="flex items-center h-14 border border-black">
                        {/* Minus Button */}
                        <button 
                            onClick={() => removeItem(product.id)}
                            className="flex h-full w-16 items-center justify-center bg-white hover:bg-gray-100 transition-colors"
                        >
                            <Minus className="h-4 w-4 text-black" />
                        </button>
                        
                        {/* Counter Display */}
                        <div className="flex-1 flex items-center justify-center h-full border-x border-black bg-white text-lg font-bold text-gray-500">
                            {quantity} <span className="text-xs font-normal text-gray-500 ml-2 uppercase tracking-wide">in cart</span>
                        </div>

                        {/* Plus Button */}
                        <button 
                            onClick={onAddItem}
                            className="flex h-full w-16 items-center justify-center bg-white hover:bg-gray-100 transition-colors"
                        >
                            <Plus className="h-4 w-4 text-black" />
                        </button>
                    </div>
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-green-600">
                        Added to your cart
                    </p>
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};