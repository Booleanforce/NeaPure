"use client";

import { Globe } from "lucide-react";
import { Product } from "@/services/product.service";

interface Props {
  product: Product;
}

export default function SeoTab({
  product,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <Globe className="h-6 w-6 text-blue-600" />

        <h2 className="text-xl font-semibold">
          SEO Information
        </h2>

      </div>

      <div className="rounded-lg border border-dashed p-12 text-center text-gray-500">

        Meta Title, Description, Keywords and OpenGraph data will appear here.

      </div>

    </div>
  );
}