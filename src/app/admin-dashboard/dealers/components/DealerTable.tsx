// app/admin-dashboard/dealers/components/DealerTable.tsx
"use client";

import { useState } from "react";

import {
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Users,
} from "lucide-react";

import {
  Dealer,
  dealerService,
} from "@/services/dealer.service";

import Modal from "./dealerModalView/Modal";
import EditDealerModal from "./EditDealerModal";
import DeleteDealerModal from "./DeletdealerModal";

interface Props {
  dealers: Dealer[];
  loading: boolean;
  onRefresh: () => Promise<void>;
}

export default function DealerTable({
  dealers,
  loading,
  onRefresh,
}: Props) {
  /* =========================================================
     VIEW MODAL
  ========================================================= */

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedDealerId, setSelectedDealerId] =
    useState<string | null>(null);

  /* =========================================================
     EDIT MODAL
  ========================================================= */

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [
    selectedEditDealerId,
    setSelectedEditDealerId,
  ] = useState<string | null>(null);

  /* =========================================================
     DELETE MODAL
  ========================================================= */

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  const getStatusBadge = (
    status?: string
  ) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";

      case "BLOCKED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  /* =========================================================
     DELETE DEALER
  ========================================================= */

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      setDeleting(true);

      await dealerService.deleteDealer(
        deleteId
      );

      await onRefresh();

      setDeleteId(null);
    } catch (error) {
      console.error(
        "Failed to delete dealer:",
        error
      );

      alert(
        "Failed to delete dealer."
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-blue-500">
        Loading dealers...
      </div>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (dealers.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-blue-400">
        No dealers found.
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="grid grid-cols-1 gap-3 bg-blue-50/40 p-3 sm:grid-cols-2 md:hidden">
        {dealers.map((dealer) => {
          const avatar =
            dealer.full_name
              ?.charAt(0)
              .toUpperCase() || "D";

          const profile =
            dealer.dealer_profile;

          return (
            <div
              key={dealer.id}
              className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm"
            >
              {/* Header */}

              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                    {avatar}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {dealer.full_name}
                    </p>

                    <p className="truncate text-xs text-blue-400">
                      {profile?.company_name ||
                        "Dealer"}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(
                    profile?.status
                  )}`}
                >
                  {profile?.status ||
                    "N/A"}
                </span>
              </div>

              {/* Dealer information */}

              <div className="mt-3 space-y-1.5 border-t border-blue-50 pt-3 text-sm">
                <div className="flex min-w-0 items-center gap-2 text-slate-600">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-blue-300" />

                  <span className="truncate">
                    {dealer.email}
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-2 text-slate-600">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-blue-300" />

                  <span className="truncate">
                    {dealer.phone || "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="h-3.5 w-3.5 shrink-0 text-blue-300" />

                  <span>
                    {profile?.total_customers_registered ??
                      0}{" "}
                    customers
                  </span>
                </div>
              </div>

              {/* Actions */}

              <div className="mt-3 flex items-center justify-between border-t border-blue-50 pt-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Dealer
                </span>

                <div className="flex items-center gap-1">
                  {/* View */}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDealerId(
                        dealer.id
                      );

                      setIsModalOpen(true);
                    }}
                    className="rounded-lg p-2 transition hover:bg-blue-50"
                    aria-label="View dealer"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>

                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEditDealerId(
                        dealer.id
                      );

                      setIsEditOpen(true);
                    }}
                    className="rounded-lg p-2 transition hover:bg-sky-50"
                    aria-label="Edit dealer"
                  >
                    <Pencil className="h-4 w-4 text-sky-600" />
                  </button>

                  {/* Delete */}

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteId(
                        dealer.id
                      )
                    }
                    className="rounded-lg p-2 transition hover:bg-red-50"
                    aria-label="Delete dealer"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="hidden w-full md:block">
        <table className="w-full table-fixed border-collapse">
          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <thead className="border-b border-blue-100 bg-blue-50">
            <tr>
              <th className="w-[23%] px-3 py-4 text-left text-sm font-semibold text-blue-900">
                Dealer
              </th>

              <th className="w-[14%] px-3 py-4 text-left text-sm font-semibold text-blue-900">
                Company
              </th>

              <th className="w-[19%] px-3 py-4 text-left text-sm font-semibold text-blue-900">
                Email
              </th>

              <th className="w-[15%] px-3 py-4 text-left text-sm font-semibold text-blue-900">
                Phone
              </th>

              <th className="w-[10%] px-3 py-4 text-center text-sm font-semibold text-blue-900">
                Customers
              </th>

              <th className="w-[10%] px-3 py-4 text-center text-sm font-semibold text-blue-900">
                Status
              </th>

              <th className="w-[9%] px-3 py-4 text-center text-sm font-semibold text-blue-900">
                Actions
              </th>
            </tr>
          </thead>

          {/* =================================================
              TABLE BODY
          ================================================= */}

          <tbody className="bg-white">
            {dealers.map((dealer) => {
              const avatar =
                dealer.full_name
                  ?.charAt(0)
                  .toUpperCase() || "D";

              const profile =
                dealer.dealer_profile;

              return (
                <tr
                  key={dealer.id}
                  className="border-b border-blue-50 transition hover:bg-blue-50/60"
                >
                  {/* =================================================
                      DEALER
                  ================================================= */}

                  <td className="px-3 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        {avatar}
                      </div>

                      <div className="min-w-0">
                        <p
                          className="truncate font-semibold text-slate-900"
                          title={
                            dealer.full_name
                          }
                        >
                          {dealer.full_name}
                        </p>

                        <p
                          className="truncate text-xs text-blue-400"
                          title={dealer.id}
                        >
                          {dealer.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* =================================================
                      COMPANY
                  ================================================= */}

                  <td className="min-w-0 px-3 py-4">
                    <p
                      className="truncate text-slate-600"
                      title={
                        profile?.company_name ||
                        "-"
                      }
                    >
                      {profile?.company_name ||
                        "-"}
                    </p>
                  </td>

                  {/* =================================================
                      EMAIL
                  ================================================= */}

                  <td className="min-w-0 px-3 py-4">
                    <p
                      className="truncate text-slate-600"
                      title={dealer.email}
                    >
                      {dealer.email}
                    </p>
                  </td>

                  {/* =================================================
                      PHONE
                  ================================================= */}

                  <td className="min-w-0 px-3 py-4">
                    <p
                      className="truncate text-slate-600"
                      title={
                        dealer.phone ||
                        "-"
                      }
                    >
                      {dealer.phone || "-"}
                    </p>
                  </td>

                  {/* =================================================
                      CUSTOMERS
                  ================================================= */}

                  <td className="px-3 py-4 text-center">
                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      <Users className="h-3.5 w-3.5 shrink-0" />

                      <span>
                        {profile?.total_customers_registered ??
                          0}
                      </span>
                    </span>
                  </td>

                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <td className="px-3 py-4 text-center">
                    <span
                      className={`inline-flex max-w-full truncate rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(
                        profile?.status
                      )}`}
                    >
                      {profile?.status ||
                        "N/A"}
                    </span>
                  </td>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <td className="px-3 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {/* View */}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDealerId(
                            dealer.id
                          );

                          setIsModalOpen(true);
                        }}
                        className="rounded-lg p-1.5 transition hover:bg-blue-50"
                        aria-label="View dealer"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>

                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEditDealerId(
                            dealer.id
                          );

                          setIsEditOpen(true);
                        }}
                        className="rounded-lg p-1.5 transition hover:bg-sky-50"
                        aria-label="Edit dealer"
                      >
                        <Pencil className="h-4 w-4 text-sky-600" />
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteId(
                            dealer.id
                          )
                        }
                        className="rounded-lg p-1.5 transition hover:bg-red-50"
                        aria-label="Delete dealer"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDealerId(null);
        }}
        dealerId={selectedDealerId}
        onEdit={() => {
          if (!selectedDealerId) {
            return;
          }

          setSelectedEditDealerId(
            selectedDealerId
          );

          setIsEditOpen(true);
          setIsModalOpen(false);
        }}
      />

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      <EditDealerModal
        isOpen={isEditOpen}
        dealerId={selectedEditDealerId}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedEditDealerId(null);
        }}
        onUpdated={async () => {
          await onRefresh();

          setIsEditOpen(false);
          setSelectedEditDealerId(null);
        }}
      />

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <DeleteDealerModal
        isOpen={!!deleteId}
        loading={deleting}
        onClose={() =>
          setDeleteId(null)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}