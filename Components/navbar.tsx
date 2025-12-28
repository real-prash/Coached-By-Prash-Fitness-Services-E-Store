"use client"; // 1. Must be a client component to check store state

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; 
import { useCartStore } from "@/store/cart-store"; // 2. Import your store
import { useEffect, useState } from "react";

export const Navbar = () => {
  // 3. Get items from store
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // 4. Hydration fix: Wait until component mounts on client to show accurate count
  // This prevents the "server says 0, client says 3" error
  useEffect(() => {
    setMounted(true);
  }, []);

  // 5. Calculate total items
  const cartCount = mounted 
    ? items.reduce((total, item) => total + item.quantity, 0) 
    : 0;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/logo.png" 
            alt="Coached By Prash Logo"
            width={100} 
            height={100} 
            className="h-23 w-25 object-contain" 
          />
          
          <div className="flex flex-col justify-center leading-none">
            <span className="font-extrabold text-lg tracking-tighter text-black uppercase">
              COACHED BY PRASH
            </span>
            <span className="font-semibold text-[10px] tracking-[0.3em] text-gray-500 uppercase">
              HELPING YOU BECOME THE BEST VERSION OF YOURSELF
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm font-bold uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className="text-sm font-bold uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
          >
            Products
          </Link>
        </div>

        {/* RIGHT SIDE - Cart with Dynamic Count */}
        <div className="flex items-center gap-6">
          <Link href="/checkout" className="relative group">
            <ShoppingCart className="h-6 w-6 text-black group-hover:text-gray-600 transition-colors" />
            
            {/* 6. Conditionally render the badge only if count > 0 */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};