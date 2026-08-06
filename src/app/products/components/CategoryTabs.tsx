"use client";

import { Category } from "@/services/product.service";

interface Props {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
}

export default function CategoryTabs({
  categories,
  active,
  onChange,
}: Props) {
  return (
    <section className="container mx-auto py-8">

      <div className="flex flex-wrap gap-4">

        <button
          onClick={() => onChange("all")}
          className={`rounded-full px-6 py-3 ${
            active === "all"
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              onChange(category.slug)
            }
            className={`rounded-full px-6 py-3 ${
              active === category.slug
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {category.name}
          </button>
        ))}

      </div>

    </section>
  );
}