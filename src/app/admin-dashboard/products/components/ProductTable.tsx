"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Product, productService } from "@/services/product.service";

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
  const [viewSlug, setViewSlug] = useState<string | null>(null);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";
      case "INACTIVE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-50 text-blue-700";
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
      <div className="flex items-center justify-center p-12 text-sm text-blue-500">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-blue-400">
        No products found.
      </div>
    );
  }

  return (
    <>
      {/* ---------- Mobile / tablet: stacked cards (below md) ---------- */}
      <div className="grid grid-cols-1 gap-3 bg-blue-50/40 p-3 sm:grid-cols-2 md:hidden">
        {products.map((product) => {
          const avatar = product.name?.charAt(0).toUpperCase() || "P";

          return (
            <div
              key={product.slug}
              className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="h-11 w-11 shrink-0 rounded-lg object-cover ring-2 ring-blue-100"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-semibold text-blue-700">
                      {avatar}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {product.name}
                    </p>
                    <p className="truncate text-xs text-blue-400">
                      {product.slug}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(
                    product.status
                  )}`}
                >
                  {product.status ?? "N/A"}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 border-t border-blue-50 pt-3 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Category</span>
                  <span className="font-medium text-slate-900">
                    {product.category?.name || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Price</span>
                  <span className="font-medium text-slate-900">
                    ৳{product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Stock</span>
                  <span className="font-medium text-slate-900">
                    {product.stock}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-blue-50 pt-3">
                {product.featured ? (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Featured
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                    Not Featured
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewSlug(product.slug)}
                    className="rounded-lg p-2 transition hover:bg-blue-50 active:bg-blue-100"
                    aria-label="View product"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => setEditSlug(product.slug)}
                    className="rounded-lg p-2 transition hover:bg-sky-50 active:bg-sky-100"
                    aria-label="Edit product"
                  >
                    <Pencil className="h-4 w-4 text-sky-600" />
                  </button>

                  <button
                    onClick={() => setDeleteSlug(product.slug)}
                    className="rounded-lg p-2 transition hover:bg-red-50 active:bg-red-100"
                    aria-label="Delete product"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Desktop / laptop: table (md and up) ---------- */}
      <div className="hidden overflow-x-auto rounded-xl border border-blue-100 md:block">
        <table className="w-full min-w-180 table-fixed">
          <thead className="border-b border-blue-100 bg-blue-50">
            <tr>
              <th className="w-[28%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Product
              </th>
              <th className="w-[18%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Category
              </th>
              <th className="w-[12%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Price
              </th>
              <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Stock
              </th>
              <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Featured
              </th>
              <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Status
              </th>
              <th className="w-[12%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {products.map((product) => {
              const avatar = product.name?.charAt(0).toUpperCase() || "P";

              return (
                <tr
                  key={product.slug}
                  className="border-b border-blue-50 transition hover:bg-blue-50/60"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="h-11 w-11 shrink-0 rounded-lg object-cover ring-2 ring-blue-100"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-semibold text-blue-700">
                          {avatar}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="truncate text-xs text-blue-400">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="truncate text-slate-600">
                      {product.category?.name || "-"}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-center whitespace-nowrap text-slate-600">
                    ৳{product.price}
                  </td>

                  <td className="px-4 py-4 text-center text-slate-600">
                    {product.stock}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {product.featured ? (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                        No
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setViewSlug(product.slug)}
                        className="rounded-lg p-2 transition hover:bg-blue-50"
                        aria-label="View product"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() => setEditSlug(product.slug)}
                        className="rounded-lg p-2 transition hover:bg-sky-50"
                        aria-label="Edit product"
                      >
                        <Pencil className="h-4 w-4 text-sky-600" />
                      </button>

                      <button
                        onClick={() => setDeleteSlug(product.slug)}
                        className="rounded-lg p-2 transition hover:bg-red-50"
                        aria-label="Delete product"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ProductViewModal
        isOpen={!!viewSlug}
        slug={viewSlug}
        onClose={() => setViewSlug(null)}
      />

      <EditProductModal
        isOpen={!!editSlug}
        slug={editSlug}
        onClose={() => setEditSlug(null)}
        onUpdated={async () => {
          await onRefresh();
          setEditSlug(null);
        }}
      />

      <DeleteProductModal
        isOpen={!!deleteSlug}
        loading={deleting}
        onClose={() => setDeleteSlug(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}