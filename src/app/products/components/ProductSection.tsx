import { ReactNode } from "react";

import ProductCard from "./ProductCard";

import { Product } from "@/services/product.service";

/* -------------------------------------------------------------------------- */
/*  NoData (reusable empty state)                                             */
/*  Chaile eta alada file e (components/NoData.tsx) move kore export korte    */
/*  paro, onno page e reuse korar jonno.                                      */
/* -------------------------------------------------------------------------- */

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function NoData({
  title = "No data found",
  description = "There is nothing to show here right now.",
  icon,
  actionLabel,
  onAction,
  className = "",
}: NoDataProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center ${className}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        {icon ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0h-5l-1 2h-4l-1-2H4"
            />
          </svg>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ProductSection                                                            */
/* -------------------------------------------------------------------------- */

interface Props {
  products: Product[];
  onViewDetails: (slug: string) => void;
}

export default function ProductSection({ products, onViewDetails }: Props) {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <section className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Water Purifiers</h2>
          <p className="text-gray-500">Advanced purification technology.</p>
        </div>

        {hasProducts && (
          <button className="rounded-full border px-5 py-3">
            Compare Models
          </button>
        )}
      </div>

      {hasProducts ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <NoData
          title="No products available"
          description="We couldn't find any water purifiers right now. Please check back later."
        />
      )}
    </section>
  );
}