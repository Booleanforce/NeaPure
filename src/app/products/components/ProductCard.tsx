import Image from "next/image";

import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const productImage =
    product.primary_image || "/images/kit.png";

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      {/* Product Image */}
      <div className="relative h-72 w-full overflow-hidden bg-gray-50">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Product Information */}
      <div className="space-y-4 p-6">
        <h3 className="text-xl font-bold text-gray-900">
          {product.name}
        </h3>

        {product.short_description && (
          <p className="line-clamp-2 text-gray-500">
            {product.short_description}
          </p>
        )}

        <div className="text-2xl font-bold text-blue-700">
          ৳ {product.price}
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"
        >
          View Details
        </button>
      </div>

    </div>
  );
}