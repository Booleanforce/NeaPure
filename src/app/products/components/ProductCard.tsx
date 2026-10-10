"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";

import { Product } from "@/services/product.service";
import { addToCart } from "@/features/cart/slices/cartSlice";

interface Props {
  product: Product;
  onViewDetails: (slug: string) => void;
}

/**
 * key_features string ba array jai ashuk, shobshomoy string[] return kore.
 * - Array hole: shoja map kore nei
 * - JSON string hole ('["a","b"]'): parse kori
 * - Normal string hole: new line diye alada kori
 */
function parseFeatures(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const text = value.trim();
    if (!text) return [];

    if (text.startsWith("[")) {
      try {
        const parsed: unknown = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return parsed.map((v) => String(v).trim()).filter(Boolean);
        }
      } catch {
        // JSON na hole niche normal string hishabe handle hobe
      }
    }

    // Jodi comma diye alada thake tahole "\n" er jaygay "," dao
    return text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
}

export default function ProductCard({ product, onViewDetails }: Props) {
  const dispatch = useDispatch();

  const productImage =
    product.primary_image ||
    product.images?.[0]?.image_url ||
    "/images/kit.png";

  const features: string[] = parseFeatures(product.key_features).slice(0, 5);

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
    <div className="relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-sm transition hover:shadow-lg">
      {product.is_featured && (
        <span className="absolute left-0 top-3 z-10 rounded-r bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white">
          Best Seller
        </span>
      )}

      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 line-clamp-2 min-h-[2.75rem] text-lg font-bold leading-snug">
        {product.name}
      </h3>
      <p className="mt-1 line-clamp-2 min-h-[2rem] text-xs font-medium text-gray-700">
        {product.short_description}
      </p>

      {/* Features */}
      <ul className="mt-3 min-h-[7.5rem] space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
            <svg
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="line-clamp-1">{f}</span>
          </li>
        ))}
      </ul>

      {/* Price + actions */}
      <div className="mt-auto pt-4">
        <p className="text-xl font-bold">
          ৳ {Number(product.price).toLocaleString()}
        </p>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(product.slug)}
            className="h-10 flex-1 rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-blue-600 transition hover:bg-blue-50"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2 4h13M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}