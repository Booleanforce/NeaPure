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

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState("all");

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

      <CategoryTabs
        categories={categories}
        active={active}
        onChange={setActive}
      />

      <ProductSection
        products={filtered}
      />

    </main>
  );
}