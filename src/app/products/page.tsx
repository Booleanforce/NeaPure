/* eslint-disable react-hooks/immutability */
"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import CategoryTabs from "./components/CategoryTabs";
import ProductSection from "./components/ProductSection";
import ProductDetailModal from "./components/ProductDetailModal";
import SmartCareSection from "./components/ecoSystemSection";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/features/products/api/productsApi";

export default function ProductsPage() {
  const [active, setActive] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery();

  const loading = categoriesLoading || productsLoading;

  const categories = categoriesData
    ? (Array.isArray(categoriesData) ? categoriesData : categoriesData.results)
    : [];
    
  const products = productsData?.results || [];

  const filtered =
    active === "all"
      ? products
      : products.filter(
          (p) => p.category?.slug === active
        );

  return (
    <main>

      <Hero  />

      {loading ? (
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Products...</h3>
            <p className="text-gray-500">Please wait while we fetch the best products for you</p>
          </div>
        </div>
      ) : (
        <>
          <CategoryTabs
            categories={categories}
            active={active}
            onChange={setActive}
          />

          <ProductSection
            products={filtered}
            onViewDetails={setSelectedSlug}
          />
        </>
      )}

      <ProductDetailModal
        isOpen={selectedSlug !== null}
        slug={selectedSlug}
        onClose={() => setSelectedSlug(null)}
      />

            <SmartCareSection />

    </main>
  );
}