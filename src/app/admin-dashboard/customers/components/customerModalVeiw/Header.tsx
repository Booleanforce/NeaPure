"use client";

import { Mail, Pencil } from "lucide-react";
import { Customer } from "@/services/customer.service";

interface Props {
  customer: Customer;
  onEdit?: () => void;
}

export default function CustomerHeader({
  customer,
  onEdit,
}: Props) {
  const fullName =
    `${customer.full_name|| ""}`.trim() ||
    "Unknown Customer";

  return (
    <div className="border-b bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            {fullName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {fullName}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-gray-500">
              <Mail className="h-4 w-4" />
              <span>{customer.email}</span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  customer.customer_profile?.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {customer.customer_profile?.status === "active" ? "Active" : "Inactive"}
              </span>

              <span className="text-xs text-gray-400">
                ID: {customer.id}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          <Pencil className="h-4 w-4" />
          Edit Customer
        </button>
      </div>
    </div>
  );
}