"use client";

import Image from "next/image";

import { Product } from "@/services/product.service";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/slices/cartSlice";

interface Props {
  product: Product;
  onViewDetails: (slug: string) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
}: Props) {
  const dispatch = useDispatch();
  const productImage =
    product.primary_image ||
    product.images?.[0]?.image_url ||
    "/images/kit.png";

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        image: productImage,
        quantity: 1,
      })
    );
  };

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

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(product.slug)}
            className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 rounded-xl border border-blue-600 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}