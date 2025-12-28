"use client";

import { Button } from "@/Components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import { Minus, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // --- EMPTY STATE ---
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4">
        <h1 className="text-3xl font-extrabold uppercase tracking-tighter text-black mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mb-8 uppercase tracking-wide text-sm font-semibold">
          Ready to start your transformation?
        </p>
        <Button 
          asChild 
          className="h-12 rounded-none bg-black px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-neutral-800"
        >
          <Link href="/products">Browse Programs</Link>
        </Button>
      </div>
    );
  }

  // --- CHECKOUT LAYOUT ---
  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        
        <h1 className="mb-12 text-4xl font-extrabold uppercase tracking-tighter text-black md:text-5xl border-b border-gray-100 pb-6">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <ul className="space-y-8">
              {items.map((item) => (
                <li key={item.id} className="flex gap-6 border-b border-gray-100 pb-8 last:border-0">
                  
                  {/* Item Image */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-neutral-100">
                    {item.imageUrl ? (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-200 text-[10px] text-gray-500">
                        NO IMG
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold uppercase tracking-wide text-black text-lg">
                          {item.name}
                        </h3>
                      </div>
                      <p className="font-bold text-black text-lg">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls - Matching Product Detail Page Style */}
                    <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center h-8 border border-black w-24">
                            <button 
                                onClick={() => removeItem(item.id)}
                                className="flex h-full w-8 items-center justify-center bg-white hover:bg-gray-100 transition-colors"
                            >
                                <Minus className="h-3 w-3 text-black" />
                            </button>
                            <div className="flex-1 flex items-center justify-center h-full text-sm font-bold text-black ">
                                {item.quantity}
                            </div>
                            <button 
                                onClick={() => addItem({ ...item, quantity: 1 })}
                                className="flex h-full w-8 items-center justify-center bg-white hover:bg-gray-100 transition-colors"
                            >
                                <Plus className="h-3 w-3 text-black" />
                            </button>
                        </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 p-8 sticky top-24">
              <h2 className="text-xl font-bold uppercase tracking-tight text-black mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between text-sm uppercase tracking-wide text-gray-600">
                  <span>Subtotal</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-wide text-gray-600">
                  <span>Taxes</span>
                  <span>Calculated at next step</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-extrabold uppercase tracking-tight text-black mb-8">
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>

              <form action={checkoutAction}>
                <input type="hidden" name="items" value={JSON.stringify(items)} />
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-none bg-black text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-neutral-800 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              
              <p className="mt-4 text-center text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                Secure Checkout Powered by Stripe
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}