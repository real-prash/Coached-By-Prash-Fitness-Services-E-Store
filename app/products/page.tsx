import { ProductList } from "@/Components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="min-h-screen bg-white pt-12 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Page Heading */}
        <div className="mb-12 border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-extrabold uppercase tracking-tighter text-black md:text-4xl">
            All Programs
          </h1>

        </div>

        <ProductList products={products.data} />

      </div>
    </div>
  );
}