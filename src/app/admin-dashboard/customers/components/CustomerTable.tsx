"use client";

import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import { Customer, customerService } from "@/services/customer.service";

import Modal from "./customerModalVeiw/Modal";
import EditCustomerModal from "./customerModalVeiw/EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

interface Props {
  customers: Customer[];
  loading: boolean;
  onRefresh: () => Promise<void>;
}

export default function CustomerTable({
  customers,
  loading,
  onRefresh,
}: Props) {
  // View Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] =
    useState<string | null>(null);

  // Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEditCustomerId, setSelectedEditCustomerId] =
    useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleViewCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (id: string) => {
    setSelectedEditCustomerId(id);
    setIsEditOpen(true);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";
      case "NEW":
        return "bg-sky-100 text-sky-700";
      case "BLOCKED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      await customerService.deleteCustomer(deleteId);
      await onRefresh();
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete customer.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-blue-500">
        Loading customers...
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-blue-400">
        No customers found.
      </div>
    );
  }

  return (
    <>
      {/* ---------- Mobile / tablet: stacked cards (below md) ---------- */}
      <div className="grid grid-cols-1 gap-3 bg-blue-50/40 p-3 sm:grid-cols-2 md:hidden">
        {customers.map((customer) => {
          const avatar =
            customer.full_name?.charAt(0).toUpperCase() || "U";

          return (
            <div
              key={customer.id}
              className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {customer.photo ? (
                    <img
                      src={customer.photo}
                      alt={customer.full_name}
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-blue-100"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                      {avatar}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {customer.full_name}
                    </p>
                    <p className="truncate text-xs text-blue-400">
                      {customer.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(
                    customer.customer_profile?.status
                  )}`}
                >
                  {customer.customer_profile?.status ?? "N/A"}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 border-t border-blue-50 pt-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-blue-300" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-blue-300" />
                  <span>{customer.phone || "-"}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-blue-50 pt-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {customer.role}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleViewCustomer(customer.id)}
                    className="rounded-lg p-2 transition hover:bg-blue-50 active:bg-blue-100"
                    aria-label="View customer"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleEditCustomer(customer.id)}
                    className="rounded-lg p-2 transition hover:bg-sky-50 active:bg-sky-100"
                    aria-label="Edit customer"
                  >
                    <Pencil className="h-4 w-4 text-sky-600" />
                  </button>

                  <button
                    onClick={() => setDeleteId(customer.id)}
                    className="rounded-lg p-2 transition hover:bg-red-50 active:bg-red-100"
                    aria-label="Delete customer"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Desktop / laptop: table (md and up) ---------- */}
      <div className="hidden overflow-x-auto rounded-xl border border-blue-100 md:block">
        <table className="w-full min-w-180 table-fixed">
          <thead className="border-b border-blue-100 bg-blue-50">
            <tr>
              <th className="w-[28%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Customer
              </th>
              <th className="w-[24%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Email
              </th>
              <th className="w-[14%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Phone
              </th>
              <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Role
              </th>
              <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Status
              </th>
              <th className="w-[14%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {customers.map((customer) => {
              const avatar =
                customer.full_name?.charAt(0).toUpperCase() || "U";

              return (
                <tr
                  key={customer.id}
                  className="border-b border-blue-50 transition hover:bg-blue-50/60"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {customer.photo ? (
                        <img
                          src={customer.photo}
                          alt={customer.full_name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-blue-100"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {avatar}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {customer.full_name}
                        </p>
                        <p className="truncate text-xs text-blue-400">
                          {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="truncate text-slate-600">{customer.email}</p>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    {customer.phone || "-"}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {customer.role}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                        customer.customer_profile?.status
                      )}`}
                    >
                      {customer.customer_profile?.status ?? "N/A"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewCustomer(customer.id)}
                        className="rounded-lg p-2 transition hover:bg-blue-50"
                        aria-label="View customer"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleEditCustomer(customer.id)}
                        className="rounded-lg p-2 transition hover:bg-sky-50"
                        aria-label="Edit customer"
                      >
                        <Pencil className="h-4 w-4 text-sky-600" />
                      </button>

                      <button
                        onClick={() => setDeleteId(customer.id)}
                        className="rounded-lg p-2 transition hover:bg-red-50"
                        aria-label="Delete customer"
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

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomerId(null);
        }}
        customerId={selectedCustomerId}
      />

      <EditCustomerModal
        isOpen={isEditOpen}
        customerId={selectedEditCustomerId}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedEditCustomerId(null);
        }}
        onUpdated={async () => {
          await onRefresh();
          setIsEditOpen(false);
          setSelectedEditCustomerId(null);
        }}
      />

      <DeleteCustomerModal
        isOpen={!!deleteId}
        loading={deleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}