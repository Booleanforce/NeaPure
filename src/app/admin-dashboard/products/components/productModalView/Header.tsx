"use client";

import Image from "next/image";
import {
  Package,
  Tag,
  Boxes,
  BadgeDollarSign,
} from "lucide-react";

import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function Header({
  product,
}: Props) {
  return (
    <div className="border-b border-blue-100 bg-linear-to-r from-blue-50 to-cyan-50 p-4 sm:p-6">

      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center">

        {/* Product Image */}

        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 ring-4 ring-white/60 sm:h-24 sm:w-24">

          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package className="h-10 w-10 text-white" />
          )}

        </div>

        {/* Product Info */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <h1 className="truncate text-lg font-bold text-blue-950 sm:text-2xl">
              {product.name}
            </h1>

            {product.featured && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                ⭐ Featured
              </span>
            )}

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                product.status === "ACTIVE"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>

          </div>

          <p className="mt-1 truncate text-sm text-blue-500 sm:text-base">
            {product.slug}
          </p>

          {/* Stats */}

          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 md:grid-cols-4">

            <div className="rounded-xl border border-blue-100 bg-white/70 p-3 sm:p-4">

              <div className="mb-2 flex items-center gap-2 text-blue-400">
                <Tag className="h-4 w-4" />
                <span className="text-xs sm:text-sm">SKU</span>
              </div>

              <p className="text-sm font-semibold text-blue-950 sm:text-base">
                {product.sku || "-"}
              </p>

            </div>

            <div className="rounded-xl border border-blue-100 bg-white/70 p-3 sm:p-4">

              <div className="mb-2 flex items-center gap-2 text-blue-400">
                <Boxes className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Category</span>
              </div>

              <p className="text-sm font-semibold text-blue-950 sm:text-base">
                {product.category?.name || "-"}
              </p>

            </div>

            <div className="rounded-xl border border-blue-100 bg-white/70 p-3 sm:p-4">

              <div className="mb-2 flex items-center gap-2 text-blue-400">
                <BadgeDollarSign className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Price</span>
              </div>

              <p className="text-sm font-semibold text-blue-600 sm:text-base">
                ৳{product.price}
              </p>

            </div>

            <div className="rounded-xl border border-blue-100 bg-white/70 p-3 sm:p-4">

              <div className="mb-2 flex items-center gap-2 text-blue-400">
                <Package className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Stock</span>
              </div>

              <p className="text-sm font-semibold text-blue-950 sm:text-base">
                {product.stock}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}