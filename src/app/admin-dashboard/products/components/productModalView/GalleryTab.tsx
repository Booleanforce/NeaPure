"use client";

import { ImageIcon } from "lucide-react";
import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function GalleryTab({ product }: Props) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Product Gallery
      </h2>

      {product.thumbnail ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

          <img
            src={product.thumbnail}
            alt={product.name}
            className="h-52 w-full rounded-xl border object-cover"
          />

        </div>
      ) : (
        <div className="flex h-72 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300">

          <ImageIcon className="mb-3 h-12 w-12 text-gray-400" />

          <p className="text-gray-500">
            No gallery images available.
          </p>

        </div>
      )}

    </div>
  );
}