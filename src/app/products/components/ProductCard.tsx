import Image from "next/image";

import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <div className="relative h-72">

        <Image
          src={
            product.images?.[0]?.image_url ||
            "/images/kit.png"
          }
          alt={product.name}
          fill
          className="object-contain p-8"
        />

      </div>

      <div className="space-y-4 p-6">

        <h3 className="text-xl font-bold">
          {product.name}
        </h3>

        <p className="text-gray-500">
          {product.short_description}
        </p>

        <div className="text-2xl font-bold text-blue-700">
          ৳ {product.price}
        </div>

        <button className="w-full rounded-xl bg-blue-600 py-3 text-white">
          View Details
        </button>

      </div>

    </div>
  );
}