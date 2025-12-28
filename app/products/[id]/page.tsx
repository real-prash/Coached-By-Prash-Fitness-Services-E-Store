import { ProductDetail } from "@/Components/product-detail";
import { stripe } from "@/lib/stripe";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Fetch product from Stripe
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  // Convert to plain object to pass to client component safely
  const plainProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="min-h-screen bg-white">
        <ProductDetail product={plainProduct} />
    </div>
  );
}