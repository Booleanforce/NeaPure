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
  /* =====================================================
     STATE
  ===================================================== */

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [addOpen, setAddOpen] =
    useState(false);

  /* =====================================================
     LOAD PRODUCTS
  ===================================================== */

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

      /* -------------------------------------------------
         PAGINATED RESPONSE
      ------------------------------------------------- */

      if ("results" in response) {
        setProducts(
          response.results
        );

        setTotalPages(
          Math.max(
            1,
            Math.ceil(
              response.count / 10
            )
          )
        );
      }

      /* -------------------------------------------------
         NON-PAGINATED RESPONSE
      ------------------------------------------------- */

      else {
        setProducts(
          response
        );

        setTotalPages(1);
      }
    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );

      setProducts([]);

      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     STATISTICS
  ===================================================== */

  const featuredProducts =
    products.filter(
      (product) =>
        product.is_featured
    ).length;

  const activeProducts =
    products.filter(
      (product) =>
        product.status === "ACTIVE"
    ).length;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
<<<<<<< HEAD
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
=======
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-blue-950 sm:text-3xl">
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-500">
<<<<<<< HEAD
            Manage your product inventory, featured items, and product status.
=======
            Manage your product inventory,
            featured items, and product status.
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
          </p>
        </div>

        <button
<<<<<<< HEAD
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <Plus size={18} />
=======
          type="button"
          onClick={() =>
            setAddOpen(true)
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <Plus size={18} />

>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
          Add Product
        </button>
      </div>

<<<<<<< HEAD
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
=======
      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {/* ===============================================
            TOTAL PRODUCTS
        =============================================== */}

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

        {/* ===============================================
            FEATURED PRODUCTS
        =============================================== */}

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

        {/* ===============================================
            ACTIVE PRODUCTS
        =============================================== */}

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

>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
        </div>
      </div>

<<<<<<< HEAD
      {/* Search */}
      
        <ProductSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
=======
      {/* =================================================
          SEARCH
      ================================================= */}

      <ProductSearch
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {/* =================================================
          PRODUCT TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <ProductTable
            products={products}
            loading={loading}
            onRefresh={loadProducts}
          />

        </div>

      </div>

      {/* =================================================
          PAGINATION
      ================================================= */}

      <div className="flex justify-center">

        <ProductPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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

<<<<<<< HEAD
      {/* Pagination */}
      <div className="flex justify-center">
        <ProductPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Add Product Modal */}
=======
      {/* =================================================
          ADD PRODUCT MODAL
      ================================================= */}

>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
      <AddProductModal
        isOpen={addOpen}
        onClose={() =>
          setAddOpen(false)
        }
        onCreated={async () => {
          await loadProducts();

          setAddOpen(false);
        }}
      />
    </div>
  );
}