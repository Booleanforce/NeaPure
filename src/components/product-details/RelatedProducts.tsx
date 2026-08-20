/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRouter } from "next/navigation";

import ProductCard from "../../app/products/components/ProductCard";

export default function RelatedProducts({
  products,
}: any) {
  const router = useRouter();

  const handleViewDetails = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <section className="container mx-auto py-20">
      <h2 className="mb-10 text-4xl font-bold">
        Related Products
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products
          .slice(0, 4)
          .map((item: any) => (
            <ProductCard
              key={item.id}
              product={item}
              onViewDetails={
                handleViewDetails
              }
            />
          ))}
      </div>
    </section>
  );
}