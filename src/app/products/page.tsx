/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";


import {
  productService,
  Category,
  Product,
} from "@/services/product.service";
import Hero from "./components/Hero";
import CategoryTabs from "./components/CategoryTabs";
import ProductSection from "./components/ProductSection";
import ProductDetailModal from "./components/ProductDetailModal";
import SmartCareSection from "./components/ecoSystemSection";

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const cats = await productService.getCategories();
    const prods = await productService.getProducts();

    setCategories(
      Array.isArray(cats)
        ? cats
        : cats.results
    );

    setProducts(prods.results);
    setLoading(false);
  }

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