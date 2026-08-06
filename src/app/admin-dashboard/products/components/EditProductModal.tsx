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
  });

  useEffect(() => {
    if (isOpen && slug) {
      loadProduct();
    }
  }, [isOpen, slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const product = await productService.getProduct(slug!);

      setForm({
        name: product.name || "",

        slug: product.slug || "",

        sku: product.sku || "",

        category_id: product.category?.id || "",

        product_type: product.product_type || "FILTER",

        price: product.price?.toString() || "",

        perfect_for: product.perfect_for || "",

        short_description: product.short_description || "",

        key_features: product.key_features || "",

        technical_specs: product.technical_specs || "",

        package_includes: product.package_includes || "",

        warranty_duration_months:
          product.warranty_duration_months?.toString() || "12",

        recommended_replacement_months:
          product.recommended_replacement_months?.toString() || "6",

        status: product.status || "ACTIVE",

        is_featured: product.is_featured || false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImage = (file: File | null) => {
    setImageFile(file);

    if (!file) {
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        category_id: form.category_id || null,

        product_type: form.product_type,

        name: form.name,

        slug: form.slug,

        sku: form.sku,

        price: Number(form.price),

        perfect_for: form.perfect_for,

        short_description: form.short_description,

        key_features: form.key_features,

        technical_specs: form.technical_specs,

        package_includes: form.package_includes,

        warranty_duration_months: Number(form.warranty_duration_months),

        recommended_replacement_months: Number(
          form.recommended_replacement_months,
        ),

        status: form.status,

        is_featured: form.is_featured,
      };

      await productService.updateProduct(slug!, payload);

      await onUpdated();
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
    } catch (error) {
      console.error(error);

      alert("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-blue-950/40 backdrop-blur-sm p-6">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-8 py-5">
          <h2 className="text-2xl font-bold text-blue-900">Edit Product</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-100 hover:text-blue-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex h-96 items-center justify-center text-sm text-blue-500">
            Loading...
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto bg-blue-50/40 p-8">
              <ProductForm form={form} setForm={setForm} />
            </div>

            <div className="flex justify-end gap-4 border-t border-blue-100 bg-white px-8 py-5">
              <button
                onClick={onClose}
                className="rounded-lg border border-blue-200 px-6 py-3 text-slate-700 transition hover:bg-blue-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
