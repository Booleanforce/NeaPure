/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";

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
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all products
          </p>

        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          + Add Product
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {products.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Featured Products
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {featuredProducts}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Products
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {activeProducts}
          </h2>
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

      {/* Table */}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <ProductTable
          products={products}
          loading={loading}
          onRefresh={loadProducts}
        />

      </div>

      {/* Pagination */}

      <ProductPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Add Modal */}

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