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

/* =========================================================
   SAFE VALUE RENDERER
========================================================= */

function renderValue(
  value: unknown
): React.ReactNode {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  /* String / Number */

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return value;
  }

  /* Boolean */

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  /* Array */

  if (Array.isArray(value)) {
    return (
      <ul className="space-y-2">
        {value.map((item, index) => (
          <li
            key={index}
            className="relative pl-5 text-sm leading-6 text-slate-600 sm:text-base"
          >
            <span className="absolute left-0 top-[9px] h-2 w-2 rounded-full bg-blue-500" />

            {typeof item === "object" &&
            item !== null
              ? renderValue(item)
              : String(item)}
          </li>
        ))}
      </ul>
    );
  }

  /* Object */

  if (typeof value === "object") {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
        {Object.entries(
          value as Record<string, unknown>
        ).map(([key, itemValue], index) => (
          <div
            key={key}
            className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${
              index !==
              Object.keys(value).length - 1
                ? "border-b border-slate-200"
                : ""
            }`}
          >
            <span className="text-sm font-medium text-slate-600">
              {key}
            </span>

            <span className="text-sm text-slate-900 sm:max-w-[60%] sm:text-right">
              {renderValue(itemValue) || "—"}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return String(value);
}

/* =========================================================
   CONTENT SECTION
========================================================= */

function ContentSection({
  title,
  value,
  fallback,
}: {
  title: string;
  value: unknown;
  fallback: string;
}) {
  const hasValue =
    value !== null &&
    value !== undefined &&
    value !== "" &&
    (!Array.isArray(value) ||
      value.length > 0);

  return (
    <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

      <h2 className="mb-3 text-base font-semibold text-blue-900 sm:mb-4 sm:text-lg">
        {title}
      </h2>

      {hasValue ? (
        <div className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {renderValue(value)}
        </div>
      ) : (
        <p className="text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          {fallback}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   OVERVIEW TAB
========================================================= */

export default function OverviewTab({
  product,
}: Props) {
  return (
    <div className="space-y-5 sm:space-y-6">

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

            <InfoRow
              icon={
                <Package className="h-4 w-4" />
              }
              label="Product Name"
              value={product.name || "-"}
            />

            <InfoRow
              icon={
                <Tag className="h-4 w-4" />
              }
              label="SKU"
              value={product.sku || "-"}
            />

            <InfoRow
              icon={
                <Package className="h-4 w-4" />
              }
              label="Slug"
              value={product.slug || "-"}
            />

            <InfoRow
              icon={
                <Package className="h-4 w-4" />
              }
              label="Product Type"
              value={
                product.product_type || "-"
              }
            />

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

        {/* ===================================================
            PRICING & INVENTORY
        =================================================== */}

        <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:rounded-2xl sm:p-6">

          <h2 className="mb-4 text-base font-semibold text-blue-900 sm:mb-5 sm:text-lg">
            Pricing & Inventory
          </h2>

          <div className="space-y-3 sm:space-y-4">

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

            <InfoRow
              icon={
                <Boxes className="h-4 w-4" />
              }
              label="Stock"
              value={product.stock ?? 0}
            />

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

            <InfoRow
              icon={
                <CheckCircle className="h-4 w-4" />
              }
              label="Status"
              value={
                product.status || "-"
              }
            />

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

      {/* =====================================================
          SHORT DESCRIPTION
      ===================================================== */}

      <ContentSection
        title="Short Description"
        value={product.short_description}
        fallback="No short description available."
      />

      {/* =====================================================
          PERFECT FOR
      ===================================================== */}

      <ContentSection
        title="Perfect For"
        value={product.perfect_for}
        fallback="No information available."
      />

      {/* =====================================================
          KEY FEATURES
      ===================================================== */}

      <ContentSection
        title="Key Features"
        value={product.key_features}
        fallback="No key features available."
      />

      {/* =====================================================
          TECHNICAL SPECIFICATIONS
      ===================================================== */}

      <ContentSection
        title="Technical Specifications"
        value={product.technical_specs}
        fallback="No technical specifications available."
      />

      {/* =====================================================
          PACKAGE INCLUDES
      ===================================================== */}

      <ContentSection
        title="Package Includes"
        value={product.package_includes}
        fallback="No package information available."
      />

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
    <div className="flex min-w-0 items-center justify-between gap-4">

      <div className="flex min-w-0 items-center gap-2 text-blue-400 sm:gap-3">
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <span className="max-w-[55%] truncate text-right text-sm font-medium text-slate-900">
        {value}
      </span>

    </div>
  );
}