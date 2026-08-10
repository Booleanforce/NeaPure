"use client";

import { Plus } from "lucide-react";

export default function CustomerHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage all registered customers and their information.
        </p>
      </div>

      <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition">
        <Plus className="h-4 w-4" />
        Add Customer
      </button>
    </div>
  );
}