/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { productService, Category } from "@/services/product.service";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({
  value,
  onChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await productService.getCategories();

      // Supports both paginated and non-paginated responses
      if (Array.isArray(response)) {
        setCategories(response);
      } else if ("results" in response) {
        setCategories(response.results);
      }
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Category
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
      >
        <option value="">
          {loading
            ? "Loading categories..."
            : "Select Category"}
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}