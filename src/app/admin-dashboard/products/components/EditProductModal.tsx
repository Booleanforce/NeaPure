/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";
import { productService } from "@/services/product.service";
import ProductForm from "./ProductForm";
import { Bounce, toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  slug: string | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditProductModal({
  isOpen,
  slug,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
    image_url: "",
  });

  /* -------------------------------------------------------------------------- */
  /*                              Load Product                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isOpen && slug) {
      setImageFile(null);
      setPreview(null);
      loadProduct();
    }
  }, [isOpen, slug]);

  /* -------------------------------------------------------------------------- */
  /*                            Cleanup Preview                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* -------------------------------------------------------------------------- */
  /*                            Get Product                                     */
  /* -------------------------------------------------------------------------- */

  const loadProduct = async () => {
    if (!slug) return;

    try {
      setLoading(true);

      const product = await productService.getProduct(slug);

      /*
       * Find primary product image
       */
      const primaryImage = product.images?.find(
        (img) => img.is_primary
      );

      /*
       * Try all possible image fields
       */
      const productImage =
        primaryImage?.image_url ||
        primaryImage?.image ||
        product.thumbnail ||
        product.image ||
        "";

      setForm({
        name: product.name || "",

        slug: product.slug || "",

        sku: product.sku || "",

        category_id:
          product.category?.id ||
          product.category_id ||
          "",

        product_type:
          product.product_type || "FILTER",

        price:
          product.price?.toString() || "",

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
          product.warranty_duration_months?.toString() || "12",

        recommended_replacement_months:
          product.recommended_replacement_months?.toString() || "6",

        status:
          product.status || "ACTIVE",

        is_featured:
          product.is_featured ??
          product.featured ??
          false,

        /*
         * Existing product image
         */
        image_url: productImage,
      });
    } catch (error) {
      console.error("Failed to load product:", error);

      toast.error("Failed to load product.", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                           Handle Image                                     */
  /* -------------------------------------------------------------------------- */

  const handleImage = (file: File | null) => {
    /*
     * Remove previous preview URL
     */
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(file);

    /*
     * User removed the new image
     *
     * Keep form.image_url so the existing
     * product image can still be displayed.
     */
    if (!file) {
      setPreview(null);
      return;
    }

    /*
     * Show newly selected image immediately
     */
    const newPreview = URL.createObjectURL(file);

    setPreview(newPreview);
  };

  /* -------------------------------------------------------------------------- */
  /*                            Save Product                                    */
  /* -------------------------------------------------------------------------- */

  const handleSave = async () => {
    if (!slug) return;

    try {
      setSaving(true);

      /*
       * Product information
       */
      const payload = {
        category_id: form.category_id || null,

        product_type: form.product_type,

        name: form.name.trim(),

        slug: form.slug.trim(),

        sku: form.sku.trim(),

        price: Number(form.price),

        perfect_for: form.perfect_for,

        short_description: form.short_description,

        key_features: form.key_features,

        technical_specs: form.technical_specs,

        package_includes: form.package_includes,

        warranty_duration_months:
          Number(form.warranty_duration_months),

        recommended_replacement_months:
          Number(form.recommended_replacement_months),

        status: form.status,

        is_featured: form.is_featured,
      };

      /* ---------------------------------------------------------------------- */
      /* STEP 1: Update Product Information                                     */
      /* ---------------------------------------------------------------------- */

      await productService.updateProduct(
        slug,
        payload
      );

      /* ---------------------------------------------------------------------- */
      /* STEP 2: Upload New Image                                               */
      /* ---------------------------------------------------------------------- */

      if (imageFile) {
        /*
         * IMPORTANT:
         * Use the original slug for the upload endpoint.
         *
         * This is safer if the user changed the slug
         * while editing the product.
         */
        await productService.uploadImage(
          slug,
          imageFile,
          form.name.trim(),
          true
        );
      }

      /* ---------------------------------------------------------------------- */
      /* STEP 3: Refresh Product List                                           */
      /* ---------------------------------------------------------------------- */

      await onUpdated();

      /* ---------------------------------------------------------------------- */
      /* STEP 4: Success                                                        */
      /* ---------------------------------------------------------------------- */

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

      /* ---------------------------------------------------------------------- */
      /* STEP 5: Close Modal                                                    */
      /* ---------------------------------------------------------------------- */

      onClose();
    } catch (error) {
      console.error(
        "Failed to update product:",
        error
      );

      toast.error(
        "Failed to update product.",
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

  /* -------------------------------------------------------------------------- */
  /*                              Modal                                         */
  /* -------------------------------------------------------------------------- */

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ------------------------------------------------------------------ */}
        {/* Header                                                             */}
        {/* ------------------------------------------------------------------ */}

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

        {/* ------------------------------------------------------------------ */}
        {/* Content                                                            */}
        {/* ------------------------------------------------------------------ */}

        {loading ? (
          <div className="flex h-96 items-center justify-center text-sm text-blue-500">
            Loading...
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto bg-gray-50 p-8">

              {/* Product Image */}

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

              {/* Product Form */}

              <ProductForm
                form={form}
                setForm={setForm}
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Footer                                                           */}
            {/* ---------------------------------------------------------------- */}

            <div className="flex justify-end gap-4 border-t border-blue-100 bg-white px-8 py-5">

              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-lg border border-blue-200 px-6 py-3 text-slate-700 transition hover:bg-blue-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
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