/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";

import {
  Package,
  Star,
  BadgeCheck,
  Plus,
} from "lucide-react";

import {
  Product,
  productService,
} from "@/services/product.service";

import ProductSearch from "./components/ProductSearch";
import ProductTable from "./components/ProductTable";
import ProductPagination from "./components/ProductPagination";
import AddProductModal from "./components/AddProductModal";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response =
        await productService.getProducts(
          search,
          page
        );

      if ("results" in response) {
        setProducts(response.results);

        setTotalPages(
          Math.max(
            1,
            Math.ceil(response.count / 10)
          )
        );
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = products.filter(
    (product) => product.featured
  ).length;

  const activeProducts = products.filter(
    (product) => product.status === "ACTIVE"
  ).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your product inventory, featured items, and product status.
          </p>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Products */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Products
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                {products.length}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Package size={28} />
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="group rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">
                Featured Products
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-yellow-700">
                {featuredProducts}
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
              <Star size={28} />
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Active Products
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-green-700">
                {activeProducts}
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <BadgeCheck size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      
        <ProductSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
     

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <ProductTable
            products={products}
            loading={loading}
            onRefresh={loadProducts}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <ProductPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={async () => {
          await loadProducts();
          setAddOpen(false);
        }}
      />
    </div>
  );
}