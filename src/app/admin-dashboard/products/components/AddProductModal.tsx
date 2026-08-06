/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { productService } from "@/services/product.service";
import CategorySelect from "../CategorySelect";
import ProductForm from "./ProductForm";
import slugify from "slugify";
import { Bounce, toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    sku: "",

    category_id: "",

    product_type: "FILTER",

    price: "",

    perfect_for: "",

    short_description: "",

    key_features: "",

    technical_specs: "",

    package_includes: "",

    warranty_duration_months: "12",

    recommended_replacement_months: "6",

    status: "ACTIVE",

    is_featured: false,
  });

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        category_id: form.category_id || null,

        product_type: form.product_type,

        name: form.name,

        slug: slugify(
          form.slug.trim() || form.name,
          {
            lower: true,
            strict: true,
          }
        ),

        sku: form.sku,

        price: Number(form.price),

        perfect_for: form.perfect_for,

        short_description:
          form.short_description,

        key_features: form.key_features,

        technical_specs:
          form.technical_specs,

        package_includes:
          form.package_includes,

        warranty_duration_months: Number(
          form.warranty_duration_months
        ),

        recommended_replacement_months:
          Number(
            form.recommended_replacement_months
          ),

        status: form.status,

        is_featured: form.is_featured,
      };

      console.log("Creating Product:");
      console.table(payload);

      await productService.createProduct(
        payload
      );

      await onCreated();
      toast.success("Sign-in Successful!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      onClose();

      setForm({
        name: "",
        slug: "",
        sku: "",
        category_id: "",
        product_type: "FILTER",
        price: "",
        perfect_for: "",
        short_description: "",
        key_features: "",
        technical_specs: "",
        package_includes: "",
        warranty_duration_months: "12",
        recommended_replacement_months: "6",
        status: "ACTIVE",
        is_featured: false,
      });
    } catch (error: any) {
      console.error("Create Product Error:", error);

      if (error?.data) {
        console.error(
          "Backend Validation:",
          error.data
        );

        alert(
          JSON.stringify(
            error.data,
            null,
            2
          )
        );
      } else {
        alert(
          error?.message ||
            "Failed to create product."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-blue-950/40 p-3 backdrop-blur-sm sm:p-6">
      <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/20">

        {/* Header */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-blue-100 bg-white px-4 py-4 sm:px-8 sm:py-5">
          <div>
            <h2 className="text-lg font-bold text-blue-900 sm:text-2xl">
              Add Product
            </h2>

            <p className="mt-1 text-xs text-blue-400 sm:text-sm">
              Create a new product for your catalog.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-blue-400 transition hover:bg-blue-50 hover:text-blue-900 sm:p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto bg-blue-50/40 p-4 sm:p-8">

          <ProductForm
            form={form}
            setForm={setForm}
          />

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-blue-100 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-8 sm:py-5">

          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-blue-100 px-6 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3"
          >
            {saving ? "Creating..." : "Create Product"}
          </button>

        </div>

      </div>
    </div>
  );
}