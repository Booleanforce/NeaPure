"use client";

import {
  Package,
  Boxes,
  Tag,
  BadgeDollarSign,
  CheckCircle,
  Calendar,
} from "lucide-react";

import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function OverviewTab({
  product,
}: Props) {
  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Top Cards */}

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">

        {/* Product Information */}

        <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

          <h2 className="mb-4 text-base font-semibold text-blue-900 sm:mb-5 sm:text-lg">
            Product Information
          </h2>

          <div className="space-y-3 sm:space-y-4">

            <InfoRow
              icon={<Package className="h-4 w-4" />}
              label="Product Name"
              value={product.name}
            />

            <InfoRow
              icon={<Tag className="h-4 w-4" />}
              label="SKU"
              value={product.sku || "-"}
            />

            <InfoRow
              icon={<Package className="h-4 w-4" />}
              label="Slug"
              value={product.slug}
            />

            <InfoRow
              icon={<Boxes className="h-4 w-4" />}
              label="Category"
              value={product.category?.name || "-"}
            />

            <InfoRow
              icon={<Boxes className="h-4 w-4" />}
              label="Brand"
              value={product.brand?.name || "-"}
            />

            <InfoRow
              icon={<Package className="h-4 w-4" />}
              label="Model"
              value={product.model || "-"}
            />

          </div>

        </div>

        {/* Pricing */}

        <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

          <h2 className="mb-4 text-base font-semibold text-blue-900 sm:mb-5 sm:text-lg">
            Pricing & Inventory
          </h2>

          <div className="space-y-3 sm:space-y-4">

            <InfoRow
              icon={<BadgeDollarSign className="h-4 w-4" />}
              label="Price"
              value={`৳${product.price}`}
            />

            <InfoRow
              icon={<BadgeDollarSign className="h-4 w-4" />}
              label="Sale Price"
              value={
                product.sale_price
                  ? `৳${product.sale_price}`
                  : "-"
              }
            />

            <InfoRow
              icon={<Boxes className="h-4 w-4" />}
              label="Stock"
              value={`${product.stock}`}
            />

            <InfoRow
              icon={<CheckCircle className="h-4 w-4" />}
              label="Featured"
              value={
                product.featured
                  ? "Yes"
                  : "No"
              }
            />

            <InfoRow
              icon={<CheckCircle className="h-4 w-4" />}
              label="Status"
              value={product.status}
            />

            <InfoRow
              icon={<Calendar className="h-4 w-4" />}
              label="Created"
              value={
                product.created_at
                  ? new Date(
                      product.created_at
                    ).toLocaleDateString()
                  : "-"
              }
            />

          </div>

        </div>

      </div>

      {/* Short Description */}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Short Description
        </h2>

        <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {product.short_description ||
            "No short description available."}
        </p>

      </div>

      {/* Full Description */}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Description
        </h2>

        <div className="prose prose-sm max-w-none text-slate-600 sm:prose-base">

          {product.description || (
            <p>
              No description available.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-blue-100 pb-3">

      <div className="flex items-center gap-2 text-blue-400 sm:gap-3">

        {icon}

        <span className="text-sm">{label}</span>

      </div>

      <span className="text-right text-sm font-medium text-slate-900">
        {value}
      </span>

    </div>
  );
}