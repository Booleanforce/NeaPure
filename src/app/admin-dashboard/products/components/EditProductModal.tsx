/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";
import {
  productService,
} from "@/services/product.service";
import ProductForm from "./ProductForm";

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
  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

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

  useEffect(() => {
    if (isOpen && slug) {
      setImageFile(null);
      setPreview(null);
      loadProduct();
    }
  }, [isOpen, slug]);

const loadProduct = async () => {
  try {
    setLoading(true);

    const product =
      await productService.getProduct(slug!);

    const primaryImage = product.images?.find(
      (img) => img.is_primary
    );

    setForm({
      name: product.name || "",

      slug: product.slug || "",

      sku: product.sku || "",

      category_id:
        product.category?.id || "",

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
        product.warranty_duration_months?.toString() ||
        "12",

      recommended_replacement_months:
        product.recommended_replacement_months?.toString() ||
        "6",

      status:
        product.status || "ACTIVE",

      is_featured:
        product.is_featured || false,

      image_url:
        primaryImage?.image_url || product.image || "",
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
      category_id:
        form.category_id || null,

      product_type:
        form.product_type,

      name: form.name,

      slug: form.slug,

      sku: form.sku,

      price: Number(form.price),

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

      status: form.status,

      is_featured:
        form.is_featured,
    };

    await productService.updateProduct(
      slug!,
      payload
    );

    if (imageFile) {
      const uploadSlug = form.slug || slug;

      const uploaded: any =
        await productService.uploadImage(
          uploadSlug,
          imageFile,
          form.name,
          true
        );

      const imgUrl =
        uploaded?.image_url ||
        uploaded?.image ||
        "";

      if (imgUrl) {
        await productService.updateProduct(
          uploadSlug,
          {
            image: imgUrl,
            thumbnail: imgUrl,
          }
        );
      }
    }

    await onUpdated();

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-6">

      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-5">

          <h2 className="text-2xl font-bold">
            Edit Product
          </h2>

          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>

        </div>

        {loading ? (
          <div className="flex h-96 items-center justify-center">
            Loading...
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
              <div className="mb-8">
                <ImageUploader
                  preview={preview || form.image_url || null}
                  onFileChange={handleImage}
                />
              </div>

              <ProductForm
                form={form}
                setForm={setForm}
              />
            </div>

            <div className="flex justify-end gap-4 border-t bg-white px-8 py-5">
              <button
                onClick={onClose}
                className="rounded-lg border px-6 py-3"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
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