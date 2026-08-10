"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CustomerPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomerPagination({
  page,
  totalPages,
  onPageChange,
}: CustomerPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <div className="flex items-center gap-2">

        {pages.map((item) => (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition ${
              page === item
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}

      </div>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>

    </div>
  );
}