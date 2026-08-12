import ProductCard from "./ProductCard";

import { Product } from "@/services/product.service";

interface Props {
  products: Product[];
  onViewDetails: (slug: string) => void;
}

export default function ProductSection({
  products,
  onViewDetails,
}: Props) {
  return (
    <section className="container mx-auto py-10">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Water Purifiers
          </h2>

          <p className="text-gray-500">
            Advanced purification technology.
          </p>

        </div>

        <button className="rounded-full border px-5 py-3">
          Compare Models
        </button>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}

      </div>

    </section>
  );
}