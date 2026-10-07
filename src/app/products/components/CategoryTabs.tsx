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
  const base =
    "rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200";
  const activeCls = "bg-blue-600 text-white shadow-sm";
  const inactiveCls =
    "border border-gray-300 bg-white text-gray-900 hover:border-blue-600 hover:text-blue-600";

  return (
    <section className="w-full bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => onChange("all")}
            className={`${base} ${active === "all" ? activeCls : inactiveCls}`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.slug)}
              className={`${base} ${
                active === category.slug ? activeCls : inactiveCls
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}