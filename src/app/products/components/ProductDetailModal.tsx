"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Package,
  CheckCircle,
} from "lucide-react";

import { Modal } from "@/components/ui/Modal";
import {
  Product,
  ProductImage,
  productService,
} from "@/services/product.service";

interface Props {
  isOpen: boolean;
  slug: string | null;
  onClose: () => void;
}

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */

/**
 * Safely converts API values into something React can render.
 *
 * This prevents errors like:
 * "Objects are not valid as a React child"
 */
function renderValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return (
      <ul className="space-y-1">
        {value.map((item, index) => (
          <li key={index}>
            {typeof item === "object" && item !== null
              ? JSON.stringify(item)
              : String(item)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export default function ProductDetailModal({
  isOpen,
  slug,
  onClose,
}: Props) {
  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  /* -------------------------------------------------------------------------- */
  /*                              Load Product                                  */
  /* -------------------------------------------------------------------------- */

  const loadProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);

      const data =
        await productService.getProduct(slug);

      /* ---------------------------------------------------------------------- */
      /* Normalize Images                                                       */
      /* ---------------------------------------------------------------------- */

      let normalizedImages: ProductImage[] =
        Array.isArray(data.images)
          ? data.images
          : [];

      /* ---------------------------------------------------------------------- */
      /* Add Primary Image if No Images Exist                                   */
      /* ---------------------------------------------------------------------- */

      if (
        data.primary_image &&
        normalizedImages.length === 0
      ) {
        normalizedImages = [
          {
            id: `primary-${data.id}`,
            image: data.primary_image,
            image_url: data.primary_image,
            alt_text: data.name,
            is_primary: true,
            order: 0,
          },
        ];
      }

      /* ---------------------------------------------------------------------- */
      /* Add Primary Image if Not Already Included                              */
      /* ---------------------------------------------------------------------- */

      if (
        data.primary_image &&
        normalizedImages.length > 0
      ) {
        const alreadyExists =
          normalizedImages.some(
            (image) =>
              image.image_url ===
                data.primary_image ||
              image.image ===
                data.primary_image
          );

        if (!alreadyExists) {
          normalizedImages = [
            {
              id: `primary-${data.id}`,
              image: data.primary_image,
              image_url: data.primary_image,
              alt_text: data.name,
              is_primary: true,
              order: 0,
            },
            ...normalizedImages,
          ];
        }
      }

      /* ---------------------------------------------------------------------- */
      /* Set Product                                                            */
      /* ---------------------------------------------------------------------- */

      setProduct({
        ...data,
        images: normalizedImages,
      });
    } catch (error) {
      console.error(
        "Failed to load product:",
        error
      );

      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  /* -------------------------------------------------------------------------- */
  /*                              Open / Close                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isOpen && slug) {
      loadProduct();
    }
  }, [isOpen, slug, loadProduct]);

  useEffect(() => {
    if (!isOpen) {
      setProduct(null);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  /* -------------------------------------------------------------------------- */
  /*                              Gallery Images                                */
  /* -------------------------------------------------------------------------- */

  const galleryImages = product
    ? [
        ...(product.images || [])
          .map(
            (img) =>
              img.image_url ||
              img.image ||
              null
          )
          .filter(
            (img): img is string =>
              Boolean(img)
          ),

        ...(product.primary_image
          ? [product.primary_image]
          : []),
      ].filter(
        (img, index, arr) =>
          arr.indexOf(img) === index
      )
    : [];

  /* -------------------------------------------------------------------------- */
  /*                                Render                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      {/* ====================================================================== */}
      {/* LOADING                                                                 */}
      {/* ====================================================================== */}

      {loading ? (
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

            <p className="text-sm text-blue-500">
              Loading Product...
            </p>
          </div>
        </div>
      ) : !product ? (
        /* ==================================================================== */
        /* PRODUCT NOT FOUND                                                    */
        /* ==================================================================== */

        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              Product not found.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Unable to load product information.
            </p>
          </div>
        </div>
      ) : (
        /* ==================================================================== */
        /* PRODUCT CONTENT                                                       */
        /* ==================================================================== */

        <div className="p-6">

          {/* ================================================================== */}
          {/* TOP: IMAGE + BASIC INFO                                            */}
          {/* ================================================================== */}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* ================================================================= */}
            {/* IMAGE GALLERY                                                      */}
            {/* ================================================================= */}

            <div className="space-y-4">

              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">

                {galleryImages.length > 0 ? (
                  <Image
                    src={
                      galleryImages[
                        currentImageIndex
                      ]
                    }
                    alt={
                      product.name +
                      ` image ${
                        currentImageIndex + 1
                      }`
                    }
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-16 w-16 text-gray-300" />
                  </div>
                )}

                {/* Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    {/* Previous */}
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) =>
                            prev === 0
                              ? galleryImages.length - 1
                              : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>

                    {/* Next */}
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) =>
                            prev ===
                            galleryImages.length - 1
                              ? 0
                              : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* ================================================================= */}
              {/* THUMBNAILS                                                        */}
              {/* ================================================================= */}

              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryImages.map(
                    (img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        type="button"
                        onClick={() =>
                          setCurrentImageIndex(
                            idx
                          )
                        }
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                          currentImageIndex === idx
                            ? "border-blue-600"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${
                            idx + 1
                          }`}
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized
                        />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* ================================================================= */}
            {/* PRODUCT INFORMATION                                                */}
            {/* ================================================================= */}

            <div className="space-y-6">

              {/* Category */}
              {product.category?.name && (
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {product.category.name}
                </span>
              )}

              {/* Product Name */}
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                {product.name}
              </h2>

              {/* Price */}
              <div className="text-3xl font-bold text-blue-600">
                ৳ {product.price}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="leading-relaxed text-gray-600">
                  {renderValue(
                    product.short_description
                  )}
                </p>
              )}

              {/* Perfect For */}
              {product.perfect_for && (
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900">
                    Perfect For
                  </h4>

                  <div className="text-sm text-gray-600">
                    {renderValue(
                      product.perfect_for
                    )}
                  </div>
                </div>
              )}

              {/* Warranty */}
              {product.warranty_duration_months !==
                undefined && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield className="h-4 w-4 text-blue-500" />

                  <span>
                    {
                      product.warranty_duration_months
                    }{" "}
                    months warranty
                  </span>
                </div>
              )}

              {/* Featured Badge */}
              {product.is_featured && (
                <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* ================================================================== */}
          {/* BOTTOM: DETAILS                                                     */}
          {/* ================================================================== */}

          <div className="mt-10 space-y-6">

            {/* ================================================================= */}
            {/* KEY FEATURES                                                       */}
            {/* ================================================================= */}

            {product.key_features && (
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  Key Features
                </h3>

                <div className="text-sm leading-6 text-gray-600">
                  {renderValue(
                    product.key_features
                  )}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* TECHNICAL SPECIFICATIONS                                           */}
            {/* ================================================================= */}

            {product.technical_specs && (
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <h3 className="mb-4 text-base font-semibold text-gray-900">
                  Technical Specifications
                </h3>

                {typeof product.technical_specs ===
                "object" &&
                product.technical_specs !== null &&
                !Array.isArray(
                  product.technical_specs
                ) ? (
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

                    {Object.entries(
                      product.technical_specs as Record<
                        string,
                        unknown
                      >
                    ).map(
                      ([key, value], index) => (
                        <div
                          key={key}
                          className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                            index !==
                            Object.keys(
                              product.technical_specs as Record<
                                string,
                                unknown
                              >
                            ).length - 1
                              ? "border-b border-gray-200"
                              : ""
                          }`}
                        >
                          <span className="text-sm font-medium text-gray-600">
                            {key}
                          </span>

                          <span className="text-sm font-semibold text-gray-900 sm:text-right">
                            {renderValue(value)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="whitespace-pre-line text-sm leading-6 text-gray-600">
                    {renderValue(
                      product.technical_specs
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ================================================================= */}
            {/* PACKAGE INCLUDES                                                   */}
            {/* ================================================================= */}

            {product.package_includes && (
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900">
                  <Package className="h-5 w-5 text-blue-500" />

                  What&apos;s in the Box
                </h3>

                <div className="text-sm leading-6 text-gray-600">
                  {renderValue(
                    product.package_includes
                  )}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* REPLACEMENT INFO                                                   */}
            {/* ================================================================= */}

            {product.recommended_replacement_months !=
              null &&
              product.recommended_replacement_months !=
                undefined && (
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                  <p className="text-sm text-blue-700">
                    Recommended filter replacement
                    every{" "}

                    <strong>
                      {
                        product.recommended_replacement_months
                      }{" "}
                      months
                    </strong>{" "}

                    for optimal performance.
                  </p>
                </div>
              )}
          </div>
        </div>
      )}
    </Modal>
  );
}