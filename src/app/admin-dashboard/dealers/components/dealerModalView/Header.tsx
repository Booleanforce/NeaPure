"use client";

import {
  Mail,
  Phone,
  Pencil,
  Store,
} from "lucide-react";

import { Dealer } from "@/services/dealer.service";

interface Props {
  dealer: Dealer;
  onEdit?: () => void;
}

export default function DealerHeader({
  dealer,
  onEdit,
}: Props) {
  const fullName =
    `${dealer.full_name || ""}`.trim() ||
    "Unknown Dealer";

  const profile = dealer.dealer_profile;

  const companyName =
    profile?.company_name?.trim() ||
    "Dealer";

  const isActive =
    profile?.status === "ACTIVE";

  return (
    <div className="border-b border-blue-100 bg-white px-4 py-4 sm:px-6 sm:py-5">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Dealer Information */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">

          {/* Avatar */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white ring-4 ring-blue-50 sm:h-20 sm:w-20 sm:text-2xl">
            {fullName.charAt(0).toUpperCase()}
          </div>

          {/* Details */}
          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h2 className="truncate text-lg font-bold text-blue-950 sm:text-2xl">
                {fullName}
              </h2>

            </div>

            {/* Company */}
            <div className="mt-1 flex min-w-0 items-center gap-2 text-sm text-blue-500 sm:text-base">

              <Store className="h-4 w-4 shrink-0" />

              <span className="truncate">
                {companyName}
              </span>

            </div>

            {/* Email */}
            <div className="mt-1 flex min-w-0 items-center gap-2 text-sm text-blue-400">

              <Mail className="h-4 w-4 shrink-0" />

              <span className="truncate">
                {dealer.email}
              </span>

            </div>

            {/* Status + ID */}
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isActive
                  ? "Active"
                  : "Blocked"}
              </span>

              <span className="truncate text-xs text-blue-400">
                ID: {dealer.id}
              </span>

            </div>

          </div>
        </div>

        {/* Edit Button */}
        {onEdit && (
          <button
            onClick={onEdit}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white sm:self-center"
          >
            <Pencil className="h-4 w-4" />
            Edit Dealer
          </button>
        )}

      </div>

      {/* Phone */}
      {dealer.phone && (
        <div className="mt-3 flex items-center gap-2 text-sm text-blue-500 sm:hidden">
          <Phone className="h-4 w-4" />
          <span>{dealer.phone}</span>
        </div>
      )}

    </div>
  );
}
