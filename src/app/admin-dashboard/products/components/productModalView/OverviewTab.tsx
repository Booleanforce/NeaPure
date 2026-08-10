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
<<<<<<< HEAD
    <div className="space-y-4 sm:space-y-6">
=======
    <div className="space-y-5 sm:space-y-6">
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0

      {/* =====================================================
          TOP CARDS
      ===================================================== */}

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">

        {/* ===================================================
            PRODUCT INFORMATION
        =================================================== */}

        <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

          <h2 className="mb-4 text-base font-semibold text-blue-900 sm:mb-5 sm:text-lg">
            Product Information
          </h2>

          <div className="space-y-3 sm:space-y-4">
<<<<<<< HEAD
=======

            {/* Product Name */}
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0

            <InfoRow
              icon={
                <Package className="h-4 w-4" />
              }
              label="Product Name"
              value={product.name || "-"}
            />

            {/* SKU */}

            <InfoRow
              icon={
                <Tag className="h-4 w-4" />
              }
              label="SKU"
              value={product.sku || "-"}
            />

            {/* Slug */}

            <InfoRow
              icon={
                <Package className="h-4 w-4" />
              }
              label="Slug"
              value={product.slug || "-"}
            />

            {/* Product Type */}

            <InfoRow
              icon={
                <Package className="h-4 w-4" />
              }
              label="Product Type"
              value={product.product_type || "-"}
            />

            {/* Category */}

            <InfoRow
              icon={
                <Boxes className="h-4 w-4" />
              }
              label="Category"
              value={
                product.category?.name || "-"
              }
            />

          </div>
        </div>


<<<<<<< HEAD
        <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

=======
        {/* ===================================================
            PRICING & INVENTORY
        =================================================== */}

        <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
          <h2 className="mb-4 text-base font-semibold text-blue-900 sm:mb-5 sm:text-lg">
            Pricing & Inventory
          </h2>

          <div className="space-y-3 sm:space-y-4">
<<<<<<< HEAD
=======

            {/* Price */}
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0

            <InfoRow
              icon={
                <BadgeDollarSign className="h-4 w-4" />
              }
              label="Price"
              value={
                product.price !== undefined &&
                product.price !== null
                  ? `৳${product.price}`
                  : "-"
              }
            />

            {/* Stock */}

            <InfoRow
              icon={
                <Boxes className="h-4 w-4" />
              }
              label="Stock"
              value={product.stock ?? 0}
            />

            {/* Featured */}

            <InfoRow
              icon={
                <CheckCircle className="h-4 w-4" />
              }
              label="Featured"
              value={
                product.is_featured
                  ? "Yes"
                  : "No"
              }
            />

            {/* Status */}

            <InfoRow
              icon={
                <CheckCircle className="h-4 w-4" />
              }
              label="Status"
              value={product.status || "-"}
            />

            {/* Warranty */}

            <InfoRow
              icon={
                <Calendar className="h-4 w-4" />
              }
              label="Warranty"
              value={
                product.warranty_duration_months !==
                undefined
                  ? `${product.warranty_duration_months} months`
                  : "-"
              }
            />

            {/* Recommended Replacement */}

            <InfoRow
              icon={
                <Calendar className="h-4 w-4" />
              }
              label="Replacement"
              value={
                product.recommended_replacement_months !==
                  undefined &&
                product.recommended_replacement_months !==
                  null
                  ? `${product.recommended_replacement_months} months`
                  : "-"
              }
            />

            {/* Created */}

            <InfoRow
              icon={
                <Calendar className="h-4 w-4" />
              }
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


<<<<<<< HEAD
      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

=======
      {/* =====================================================
          SHORT DESCRIPTION
      ===================================================== */}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Short Description
        </h2>

        <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {product.short_description ||
            "No short description available."}
        </p>

      </div>


<<<<<<< HEAD
      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Description
        </h2>

        <div className="prose prose-sm max-w-none text-slate-600 sm:prose-base">
=======
      {/* =====================================================
          PERFECT FOR
      ===================================================== */}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Perfect For
        </h2>

        <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {product.perfect_for ||
            "No information available."}
        </p>
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0

      </div>


      {/* =====================================================
          KEY FEATURES
      ===================================================== */}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Key Features
        </h2>

        <p className="whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {product.key_features ||
            "No key features available."}
        </p>

      </div>


      {/* =====================================================
          TECHNICAL SPECIFICATIONS
      ===================================================== */}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Technical Specifications
        </h2>

        <p className="whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {product.technical_specs ||
            "No technical specifications available."}
        </p>

      </div>


      {/* =====================================================
          PACKAGE INCLUDES
      ===================================================== */}

      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

        <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
          Package Includes
        </h2>

        <p className="whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {product.package_includes ||
            "No package information available."}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   INFO ROW
========================================================= */

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
<<<<<<< HEAD
    <div className="flex items-center justify-between gap-3 border-b border-blue-100 pb-3">

      <div className="flex items-center gap-2 text-blue-400 sm:gap-3">

        {icon}

        <span className="text-sm">{label}</span>

      </div>

      <span className="text-right text-sm font-medium text-slate-900">
=======
    <div className="flex min-w-0 items-center justify-between gap-4">

      <div className="flex min-w-0 items-center gap-2 text-blue-400 sm:gap-3">

        {icon}

        <span className="text-sm">
          {label}
        </span>

      </div>

      <span className="max-w-[55%] truncate text-right text-sm font-medium text-slate-900">
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
        {value}
      </span>

    </div>
  );
}