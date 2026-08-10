"use client";

import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
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
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedCustomerId, setSelectedCustomerId] =
    useState<string | null>(null);

  // Edit Modal
  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [selectedEditCustomerId, setSelectedEditCustomerId] =
    useState<string | null>(null);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const [deleting, setDeleting] =
    useState(false);

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
        return "bg-green-100 text-green-700";

      case "NEW":
        return "bg-blue-100 text-blue-700";

      case "BLOCKED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
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
      <div className="flex items-center justify-center p-12">
        Loading customers...
      </div>
    );
  }

  return (
    <>
      <table className="w-full table-fixed">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="w-[30%] px-4 py-4 text-left text-sm font-semibold">
              Customer
            </th>

            <th className="w-[25%] px-4 py-4 text-left text-sm font-semibold">
              Email
            </th>

            <th className="w-[12%] px-4 py-4 text-left text-sm font-semibold">
              Phone
            </th>

            <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold">
              Role
            </th>

            <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold">
              Status
            </th>

            <th className="w-[13%] px-4 py-4 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-gray-500"
              >
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => {
              const avatar =
                customer.full_name?.charAt(0).toUpperCase() ||
                "U";

              return (
                <tr
                  key={customer.id}
                  className="border-b transition hover:bg-gray-50"
                >
                  {/* Customer */}

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {customer.photo ? (
                        <img
                          src={customer.photo}
                          alt={customer.full_name}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {avatar}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {customer.full_name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}

                  <td className="px-4 py-4">
                    <p className="truncate">
                      {customer.email}
                    </p>
                  </td>

                  {/* Phone */}

                  <td className="px-4 py-4 whitespace-nowrap">
                    {customer.phone || "-"}
                  </td>

                  {/* Role */}

                  <td className="px-4 py-4 text-center">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {customer.role}
                    </span>
                  </td>

                  {/* Status */}

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                        customer.customer_profile?.status
                      )}`}
                    >
                      {customer.customer_profile?.status ??
                        "N/A"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          handleViewCustomer(customer.id)
                        }
                        className="rounded-lg p-2 transition hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() =>
                          handleEditCustomer(customer.id)
                        }
                        className="rounded-lg p-2 transition hover:bg-yellow-50"
                      >
                        <Pencil className="h-4 w-4 text-yellow-600" />
                      </button>

                        <button
                          onClick={() => setDeleteId(customer.id)}
                          className="rounded-lg p-2 transition hover:bg-red-50"
                        >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
                              );
            })
          )}
        </tbody>
      </table>

      {/* View Customer Modal */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomerId(null);
        }}
        customerId={selectedCustomerId}
      />

      {/* Edit Customer Modal */}

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