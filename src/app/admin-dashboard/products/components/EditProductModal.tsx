/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Bounce, toast } from "react-toastify";

import ImageUploader from "@/components/ui/ImageUploader";
import { productService } from "@/services/product.service";
import ProductForm from "./ProductForm";

/* =========================================================
   TYPES
========================================================= */

type ProductStatus = "ACTIVE" | "INACTIVE";

interface EditProductFormState {
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

  image_url: string;
}

/* =========================================================
   PROPS
========================================================= */

interface Props {
  isOpen: boolean;
  slug: string | null;
  onClose: () => void;
  onUpdated: () => void;
}

/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm: EditProductFormState = {
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

  image_url: "",
};

/* =========================================================
   COMPONENT
========================================================= */

export default function EditProductModal({
  isOpen,
  slug,
  onClose,
  onUpdated,
}: Props) {
  /* =======================================================
     LOADING / SAVING
  ======================================================= */

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  /* =======================================================
     IMAGE
  ======================================================= */

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  /* =======================================================
     FORM
  ======================================================= */

  const [form, setForm] =
    useState<EditProductFormState>(initialForm);

  /* =======================================================
     LOAD PRODUCT WHEN MODAL OPENS
  ======================================================= */

  useEffect(() => {
    if (!isOpen || !slug) {
      return;
    }

    setImageFile(null);
    setPreview(null);

    loadProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, slug]);

  /* =======================================================
     CLEANUP PREVIEW URL
  ======================================================= */

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* =======================================================
     GET PRODUCT
  ======================================================= */

  const loadProduct = async () => {
    if (!slug) {
      return;
    }

    try {
      setLoading(true);

      const product = await productService.getProduct(slug);

      /* -----------------------------------------------------
         FIND PRIMARY IMAGE
      ----------------------------------------------------- */

      const primaryImage = product.images?.find(
        (img) => img.is_primary
      );

      /* -----------------------------------------------------
         FALLBACK TO FIRST IMAGE
      ----------------------------------------------------- */

      const firstImage = product.images?.[0];

      /* -----------------------------------------------------
         GET IMAGE URL
      ----------------------------------------------------- */

      const productImage =
        primaryImage?.image_url ||
        primaryImage?.image ||
        firstImage?.image_url ||
        firstImage?.image ||
        product.primary_image ||
        "";

      /* -----------------------------------------------------
         NORMALIZE STATUS
      ----------------------------------------------------- */

      const productStatus: ProductStatus =
        product.status === "INACTIVE"
          ? "INACTIVE"
          : "ACTIVE";

      /* -----------------------------------------------------
         SET FORM
      ----------------------------------------------------- */

      setForm({
        name: product.name || "",

        slug: product.slug || "",

        sku: product.sku || "",

        category_id:
          product.category?.id ||
          product.category_id ||
          "",

        product_type:
          product.product_type ||
          "FILTER",

        price:
          product.price !== undefined &&
          product.price !== null
            ? product.price.toString()
            : "",

        perfect_for:
          product.perfect_for || "",

        short_description:
          product.short_description || "",

        key_features:
          product.key_features || "",

        technical_specs:
          product.technical_specs || "",

        package_includes:
          product.package_includes || "",

        warranty_duration_months:
          product.warranty_duration_months !==
            undefined &&
          product.warranty_duration_months !== null
            ? product.warranty_duration_months.toString()
            : "12",

        recommended_replacement_months:
          product.recommended_replacement_months !==
            undefined &&
          product.recommended_replacement_months !== null
            ? product.recommended_replacement_months.toString()
            : "6",

        status: productStatus,

        is_featured:
          product.is_featured ?? false,

        image_url: productImage,
      });
    } catch (error) {
      console.error(
        "Failed to load product:",
        error
      );

      toast.error(
        "Failed to load product.",
        {
          position: "bottom-center",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     HANDLE IMAGE
  ======================================================= */

  const handleImage = (file: File | null) => {
    /* -----------------------------------------------------
       Remove previous preview
    ----------------------------------------------------- */

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(file);

    /* -----------------------------------------------------
       No file
    ----------------------------------------------------- */

    if (!file) {
      setPreview(null);
      return;
    }

    /* -----------------------------------------------------
       Create new preview
    ----------------------------------------------------- */

    const newPreview = URL.createObjectURL(file);

    setPreview(newPreview);
  };

  /* =======================================================
     SAVE PRODUCT
  ======================================================= */

  const handleSave = async () => {
    if (!slug) {
      return;
    }

    try {
      setSaving(true);

      /* ===================================================
         PRODUCT PAYLOAD
      =================================================== */

      const payload = {
        category_id:
          form.category_id || null,

        product_type:
          form.product_type,

        name:
          form.name.trim(),

        slug:
          form.slug.trim(),

        sku:
          form.sku.trim(),

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

        status:
          form.status,

        is_featured:
          form.is_featured,
      };

      /* ===================================================
         DEBUG
      =================================================== */

      console.log("Updating Product:");

      console.table(payload);

      /* ===================================================
         STEP 1
         UPDATE PRODUCT INFORMATION
      =================================================== */

      await productService.updateProduct(
        slug,
        payload
      );

      /* ===================================================
         STEP 2
         UPLOAD NEW IMAGE
      =================================================== */

      if (imageFile) {
        await productService.uploadImage(
          slug,
          imageFile,
          form.name.trim(),
          true
        );
      }

      /* ===================================================
         STEP 3
         REFRESH PRODUCT LIST
      =================================================== */

      await onUpdated();

      /* ===================================================
         STEP 4
         SUCCESS
      =================================================== */

      toast.success(
        "Product updated successfully!",
        {
          position: "bottom-center",

          autoClose: 5000,

          hideProgressBar: false,

          closeOnClick: true,

          pauseOnHover: true,

          draggable: true,

          progress: undefined,

          theme: "light",

          transition: Bounce,
        }
      );

      /* ===================================================
         STEP 5
         CLOSE
      =================================================== */

      onClose();

      /* ===================================================
         RESET
      =================================================== */

      setForm({
        ...initialForm,
      });

      setImageFile(null);

      setPreview(null);
    } catch (error) {
      console.error(
        "Failed to update product:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update product.",
        {
          position: "bottom-center",

          autoClose: 5000,

          hideProgressBar: false,

          closeOnClick: true,

          pauseOnHover: true,

          draggable: true,

          progress: undefined,

          theme: "light",

          transition: Bounce,
        }
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     MODAL
  ======================================================= */

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-8 py-5">
          <h2 className="text-2xl font-bold text-blue-900">
            Edit Product
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-100 hover:text-blue-600 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        {loading ? (
          <div className="flex h-96 items-center justify-center text-sm text-blue-500">
            Loading...
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto bg-gray-50 p-8">

              {/* ===========================================
                  PRODUCT IMAGE
              =========================================== */}

              <div className="mb-8">
                <ImageUploader
                  preview={
                    preview ||
                    form.image_url ||
                    null
                  }
                  onFileChange={handleImage}
                />
              </div>

              {/* ===========================================
                  PRODUCT FORM
              =========================================== */}

              <ProductForm
                form={form}
                setForm={setForm}
              />
            </div>

            {/* =============================================
                FOOTER
            ============================================= */}

            <div className="flex justify-end gap-4 border-t border-blue-100 bg-white px-8 py-5">

              {/* CANCEL */}

              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-lg border border-blue-200 px-6 py-3 text-slate-700 transition hover:bg-blue-50 disabled:opacity-50"
              >
                Cancel
              </button>

              {/* SAVE */}

              <button
                type="button"
                onClick={handleSave}
                disabled={
                  saving ||
                  loading
                }
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}