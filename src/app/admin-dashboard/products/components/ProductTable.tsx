"use client";

import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Product,
  productService,
} from "@/services/product.service";

import ProductViewModal from "./ProductViewModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

interface Props {
  products: Product[];
  loading: boolean;
  onRefresh: () => Promise<void>;
}

export default function ProductTable({
  products,
  loading,
  onRefresh,
}: Props) {
  const [viewSlug, setViewSlug] =
    useState<string | null>(null);

  const [editSlug, setEditSlug] =
    useState<string | null>(null);

  const [deleteSlug, setDeleteSlug] =
    useState<string | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";

      case "INACTIVE":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

const handleDelete = async () => {
  if (!deleteSlug) return;

  try {
    setDeleting(true);

    await productService.deleteProduct(deleteSlug);

    await onRefresh();

    setDeleteSlug(null);
  } catch (error) {
    console.error(error);
    alert("Failed to delete product.");
  } finally {
    setDeleting(false);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        Loading products...
      </div>
    );
  }

  return (
    <>
      <table className="w-full table-fixed">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="w-[28%] px-4 py-4 text-left">
              Product
            </th>

            <th className="w-[18%] px-4 py-4 text-left">
              Category
            </th>

            <th className="w-[12%] px-4 py-4 text-center">
              Price
            </th>

            <th className="w-[10%] px-4 py-4 text-center">
              Stock
            </th>

            <th className="w-[10%] px-4 py-4 text-center">
              Featured
            </th>

            <th className="w-[10%] px-4 py-4 text-center">
              Status
            </th>

            <th className="w-[12%] px-4 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-gray-500"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.slug}
                className="border-b hover:bg-gray-50"
              >
                {/* Product */}

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">

                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold">
                        {product.name.charAt(0)}
                      </div>
                    )}

                    <div>

                      <p className="font-semibold">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {product.slug}
                      </p>

                    </div>
                  </div>
                </td>

                {/* Category */}

                <td className="px-4 py-4">
                  {product.category?.name || "-"}
                </td>

                {/* Price */}

                <td className="px-4 py-4 text-center">
                  ৳{product.price}
                </td>

                {/* Stock */}

                <td className="px-4 py-4 text-center">
                  {product.stock}
                </td>

                {/* Featured */}

                <td className="px-4 py-4 text-center">
                  {product.featured ? (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                      Yes
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      No
                    </span>
                  )}
                </td>

                {/* Status */}

                <td className="px-4 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${getStatusBadge(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>

                {/* Actions */}

                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        setViewSlug(product.slug)
                      }
                      className="rounded-lg p-2 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </button>

                    <button
                      onClick={() =>
                        setEditSlug(product.slug)
                      }
                      className="rounded-lg p-2 hover:bg-yellow-50"
                    >
                      <Pencil className="h-4 w-4 text-yellow-600" />
                    </button>

                    <button
                      onClick={() =>
                        setDeleteSlug(product.slug)
                      }
                      className="rounded-lg p-2 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>

                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* View */}

      <ProductViewModal
        isOpen={!!viewSlug}
        slug={viewSlug}
        onClose={() => setViewSlug(null)}
      />

      {/* Edit */}

      <EditProductModal
        isOpen={!!editSlug}
        slug={editSlug}
        onClose={() => setEditSlug(null)}
        onUpdated={async () => {
          await onRefresh();
          setEditSlug(null);
        }}
      />

      {/* Delete */}

      <DeleteProductModal
        isOpen={!!deleteSlug}
        loading={deleting}
        onClose={() => setDeleteSlug(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}