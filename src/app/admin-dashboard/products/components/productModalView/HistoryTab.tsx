"use client";

import { History } from "lucide-react";
import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function HistoryTab({
  product,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <History className="h-6 w-6 text-blue-600" />

        <h2 className="text-xl font-semibold">
          Product History
        </h2>

      </div>

      <div className="rounded-lg border border-dashed p-12 text-center text-gray-500">

        Product activity logs will appear here.

      </div>

    </div>
  );
}