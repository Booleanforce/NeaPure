"use client";

import { ImageIcon } from "lucide-react";
import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function GalleryTab({ product }: Props) {
  /*
   * Get all available product images.
   *
   * Priority:
   * 1. images[].image_url
   * 2. images[].image
   * 3. primary_image
   */

  const galleryImages = [
    ...(product.images || [])
      .map(
        (image) =>
          image.image_url || image.image || null
      )
      .filter(
        (image): image is string =>
          Boolean(image)
      ),

    ...(product.primary_image
      ? [product.primary_image]
      : []),
  ].filter(
    (image, index, array) =>
      array.indexOf(image) === index
  );

  return (
    <div className="space-y-6">

      {/* ------------------------------------------------------------------ */}
      {/* Title                                                              */}
      {/* ------------------------------------------------------------------ */}

      <h2 className="text-xl font-semibold text-gray-900">
        Product Gallery
      </h2>

      {/* ------------------------------------------------------------------ */}
      {/* Gallery                                                            */}
      {/* ------------------------------------------------------------------ */}

      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {galleryImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
            >
              <div className="relative h-64 w-full">
                <img
                  src={image}
                  alt={`${product.name} image ${
                    index + 1
                  }`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Primary badge */}
              {(
                product.images?.find(
                  (item) =>
                    (item.image_url ||
                      item.image) === image &&
                    item.is_primary
                ) ||
                (index === 0 &&
                  product.primary_image === image)
              ) && (
                <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow">
                  Primary
                </span>
              )}
            </div>
          ))}

        </div>
      ) : (
        /* ---------------------------------------------------------------- */
        /* Empty State                                                      */
        /* ---------------------------------------------------------------- */

        <div className="flex h-72 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white">

          <ImageIcon className="mb-3 h-12 w-12 text-gray-400" />

          <p className="text-gray-500">
            No gallery images available.
          </p>

        </div>
      )}

    </div>
  );
}