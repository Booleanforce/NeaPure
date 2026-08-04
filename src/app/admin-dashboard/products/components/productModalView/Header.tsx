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
    <div className="border-b bg-white p-6">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

        {/* Product Image */}

        <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl border bg-gray-50">

          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              width={140}
              height={140}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package className="h-14 w-14 text-gray-400" />
          )}

        </div>

        {/* Product Info */}

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h1 className="text-3xl font-bold text-gray-900">
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
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>

          </div>

          <p className="mt-2 text-gray-500">
            {product.slug}
          </p>

          {/* Stats */}

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

            <div className="rounded-xl border p-4">

              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Tag className="h-4 w-4" />
                SKU
              </div>

              <p className="font-semibold">
                {product.sku || "-"}
              </p>

            </div>

            <div className="rounded-xl border p-4">

              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Boxes className="h-4 w-4" />
                Category
              </div>

              <p className="font-semibold">
                {product.category?.name || "-"}
              </p>

            </div>

            <div className="rounded-xl border p-4">

              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <BadgeDollarSign className="h-4 w-4" />
                Price
              </div>

              <p className="font-semibold text-blue-600">
                ৳{product.price}
              </p>

            </div>

            <div className="rounded-xl border p-4">

              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Package className="h-4 w-4" />
                Stock
              </div>

              <p className="font-semibold">
                {product.stock}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}