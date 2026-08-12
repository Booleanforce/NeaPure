/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { productService } from "@/services/product.service";
import ProductForm from "./ProductForm";
import slugify from "slugify";
import { Bounce, toast } from "react-toastify";

/* =========================================================
   TYPES
========================================================= */

type ProductStatus = "ACTIVE" | "INACTIVE";

interface ProductFormState {
  name: string;
  slug: string;
  sku: string;

  category_id: string;

  product_type: string;

  price: string;

  perfect_for: string;

  short_description: string;

  key_features: string;

  technical_specs: string;

  package_includes: string;

  warranty_duration_months: string;

  recommended_replacement_months: string;

  status: ProductStatus;

  is_featured: boolean;
}

/* =========================================================
   PROPS
========================================================= */

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
}

/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm: ProductFormState = {
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
};

/* =========================================================
   COMPONENT
========================================================= */

export default function AddProductModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  /* =======================================================
     STATE
  ======================================================= */

  const [saving, setSaving] = useState(false);

  const [form, setForm] =
    useState<ProductFormState>(initialForm);

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  if (!isOpen) {
    return null;
  }

  /* =======================================================
     HANDLE SAVE
  ======================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      /* =====================================================
         PRODUCT PAYLOAD
      ===================================================== */

      const payload = {
        category_id:
          form.category_id || null,

        product_type:
          form.product_type,

        name:
          form.name,

        slug: slugify(
          form.slug.trim() ||
            form.name,
          {
            lower: true,
            strict: true,
          }
        ),

        sku:
          form.sku,

        price:
          Number(form.price),

        perfect_for:
          form.perfect_for,

        short_description:
          form.short_description,

        key_features:
          form.key_features,

        technical_specs:
          form.technical_specs,

        package_includes:
          form.package_includes,

        warranty_duration_months:
          Number(
            form.warranty_duration_months
          ),

        recommended_replacement_months:
          Number(
            form.recommended_replacement_months
          ),

        /*
         * IMPORTANT:
         *
         * form.status is now typed as:
         *
         * "ACTIVE" | "INACTIVE"
         *
         * so it matches CreateProductPayload.
         */
        status:
          form.status,

        is_featured:
          form.is_featured,
      };

      /* =====================================================
         DEBUG
      ===================================================== */

      console.log(
        "Creating Product:"
      );

      console.table(payload);

      /* =====================================================
         CREATE PRODUCT
      ===================================================== */

      await productService.createProduct(
        payload
      );

      /* =====================================================
         REFRESH PRODUCT LIST
      ===================================================== */

      await onCreated();

      /* =====================================================
         SUCCESS MESSAGE
      ===================================================== */

      toast.success(
        "Product created successfully!",
        {
          position:
            "bottom-center",

          autoClose: 5000,

          hideProgressBar:
            false,

          closeOnClick:
            false,

          pauseOnHover:
            true,

          draggable:
            true,

          progress:
            undefined,

          theme:
            "light",

          transition:
            Bounce,
        }
      );

      /* =====================================================
         CLOSE MODAL
      ===================================================== */

      onClose();

      /* =====================================================
         RESET FORM
      ===================================================== */

      setForm(initialForm);

    } catch (error: any) {
      console.error(
        "Create Product Error:",
        error
      );

      /* =====================================================
         BACKEND VALIDATION ERROR
      ===================================================== */

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
        /* ===================================================
           GENERAL ERROR
        =================================================== */

        alert(
          error?.message ||
            "Failed to create product."
        );
      }

    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ===================================================
            HEADER
        =================================================== */}

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
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-full p-1.5 text-blue-400 transition hover:bg-blue-50 hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* ===================================================
            BODY
        =================================================== */}

        <div className="flex-1 overflow-y-auto bg-blue-50/40 p-4 sm:p-8">

          <ProductForm
            form={form}
            setForm={setForm}
          />

        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-blue-100 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-8 sm:py-5">

          {/* CANCEL */}

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-blue-100 px-6 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3"
          >
            Cancel
          </button>

          {/* CREATE */}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3"
          >
            {saving
              ? "Creating..."
              : "Create Product"}
          </button>

        </div>

      </div>

    </div>
  );
}