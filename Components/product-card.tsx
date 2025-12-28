import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const priceString = price?.unit_amount 
    ? `$${(price.unit_amount / 100).toFixed(2)}` 
    : "N/A";

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="h-full border-0 shadow-none bg-transparent">
        
        {/* IMAGE CONTAINER - Fixed Legacy Props */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
          {product.images && product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Optional Badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md text-black">
            Program
          </div>
        </div>

        {/* TEXT CONTENT */}
        <CardContent className="space-y-2 p-4 px-0">
          <h3 className="text-lg font-bold uppercase tracking-tight text-black group-hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
               One-Time Purchase
            </p>
            <span className="text-lg font-bold text-black">
              {priceString}
            </span>
          </div>
        </CardContent>
        
        {/* BUTTON - Sleek, Full width */}
        <CardFooter className="p-0 px-0">
           <Button className="w-full rounded-none bg-black text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 h-10">
             View Details
           </Button>
        </CardFooter>

      </Card>
    </Link>
  );
};