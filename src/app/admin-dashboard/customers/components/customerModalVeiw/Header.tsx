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
    `${customer.full_name || ""}`.trim() ||
    "Unknown Customer";

  const isActive =
    customer.customer_profile?.status === "active";

  return (
    <div className="border-b border-blue-100 bg-linear-to-r from-blue-50 to-cyan-50 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar — initials only, no photo field wired up yet */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white ring-4 ring-white/60 sm:h-20 sm:w-20 sm:text-2xl">
            {fullName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-blue-950 sm:text-2xl">
              {fullName}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-blue-500 sm:text-base">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{customer.email}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>

              <span className="truncate text-xs text-blue-400">
                ID: {customer.id}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          <Pencil className="h-4 w-4" />
          Edit Customer
        </button>
      </div>
    </div>
  );
}