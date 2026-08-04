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
    <div className="space-y-6">

      {/* Top Cards */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Product Information */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold">
            Product Information
          </h2>

          <div className="space-y-4">

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

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold">
            Pricing & Inventory
          </h2>

          <div className="space-y-4">

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

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-lg font-semibold">
          Short Description
        </h2>

        <p className="leading-7 text-gray-600">
          {product.short_description ||
            "No short description available."}
        </p>

      </div>

      {/* Full Description */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-lg font-semibold">
          Description
        </h2>

        <div className="prose max-w-none text-gray-600">

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
    <div className="flex items-center justify-between border-b pb-3">

      <div className="flex items-center gap-3 text-gray-500">

        {icon}

        <span>{label}</span>

      </div>

      <span className="font-medium text-gray-900">
        {value}
      </span>

    </div>
  );
}