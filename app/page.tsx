import Image from "next/image";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 8,
    active: true,
  });

  const heroProduct = products.data[4] || products.data[0];
  const heroImage = heroProduct?.images[0] || "/placeholder.png";

  return (
    <div className="min-h-screen bg-white">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-neutral-50 py-12 sm:py-20 border-b border-gray-100">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          
          {/* Text Content */}
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tighter text-black uppercase sm:text-5xl md:text-6xl leading-[0.9]">
              Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500">
                Transformation
              </span>
            </h1>
            
            <p className="font-semibold text-xs tracking-[0.2em] text-gray-500 uppercase leading-loose">
              Expert coaching, personalized nutrition, and proven training plans designed to build your dream physique.
            </p>

            <div className="pt-4">
              <Button
                asChild
                className="h-12 rounded-none bg-black px-8 text-sm font-bold uppercase tracking-widest text-white hover:bg-neutral-800"
              >
                <Link href="/products">
                  Start Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-square w-full max-w-md justify-self-center overflow-hidden rounded-lg bg-neutral-200 shadow-xl">
            <Image
              alt="Transformation Hero"
              src={heroImage}
              fill
              className="object-cover"
              priority 
            />
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCTS SECTION --- */}
      <section className="container mx-auto px-4 py-16 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold uppercase tracking-tighter text-black">
            Latest Programs
          </h2>
          <Link href="/products" className="hidden text-xs font-bold uppercase tracking-widest text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-black sm:block">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.data.slice(0, 3).map((product) => {
            const price = product.default_price as any;
            const amount = price?.unit_amount ? (price.unit_amount / 100).toFixed(2) : "N/A";

            return (
              // FIX: Changed /product/ to /products/ to match your folder structure
              <Link key={product.id} href={`/products/${product.id}`} className="group block space-y-4">
                
                {/* Image Card */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-100">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                </div>

                {/* Details */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold uppercase tracking-wide text-black group-hover:text-gray-600">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      One Time Purchase
                    </p>
                  </div>
                  <span className="font-bold text-black">${amount}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}