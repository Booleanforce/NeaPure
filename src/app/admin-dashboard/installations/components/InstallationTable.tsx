"use client";

import {
  Eye,
  CheckCircle,
  UserPlus,
  Trash2,
  Loader2,
} from "lucide-react";

import { InstallationRequest } from "@/services/installations";

interface InstallationTableProps {
  requests: InstallationRequest[];

  onView: (request: InstallationRequest) => void;
  onReview: (request: InstallationRequest) => void;
  onAssign: (request: InstallationRequest) => void;
  onDelete: (request: InstallationRequest) => void;

  deletingId: string | null;
}

/* ============================================================
   STATUS STYLE
============================================================ */

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING_APPROVAL":
      return "bg-amber-100 text-amber-700";

    case "APPROVED":
      return "bg-emerald-100 text-emerald-700";

    case "DISAPPROVED":
      return "bg-red-100 text-red-700";

    case "ASSIGNED":
      return "bg-blue-100 text-blue-700";

    case "SCHEDULED":
      return "bg-purple-100 text-purple-700";

    case "ACCEPTED":
      return "bg-indigo-100 text-indigo-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    case "RESCHEDULED":
      return "bg-purple-100 text-purple-700";

    case "IN_PROGRESS":
      return "bg-orange-100 text-orange-700";

    case "COMPLETED":
      return "bg-emerald-100 text-emerald-700";

    case "CANCELLED":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

/* ============================================================
   FORMAT STATUS
============================================================ */

const formatStatus = (status: string) => {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/* ============================================================
   PRODUCT NAME
============================================================ */

const getProductName = (
  request: InstallationRequest
) => {
  return (
    request.registered_product_name ||
    "Unknown Product"
  );
};

/* ============================================================
   PRODUCT SERIAL
   IMPORTANT:
   Your InstallationRequest interface uses:
   registered_product_serial_number
============================================================ */

const getProductSerial = (
  request: InstallationRequest
) => {
  return (
    request.registered_product_serial_number ||
    ""
  );
};

/* ============================================================
   DATE
============================================================ */

const formatDate = (date: string) => {
  if (!date) {
    return "N/A";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
};

/* ============================================================
   TIME
============================================================ */

const formatTime = (date: string) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

/* ============================================================
   COMPONENT
============================================================ */

export default function InstallationTable({
  requests,
  onView,
  onReview,
  onAssign,
  onDelete,
  deletingId,
}: InstallationTableProps) {
  return (
    <>
      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="grid grid-cols-1 gap-3 bg-blue-50/40 p-3 md:hidden">
        {requests.map((request) => {
          const isDeleting =
            deletingId === String(request.id);

          return (
            <div
              key={request.id}
              className="
                rounded-xl
                border
                border-blue-100
                bg-white
                p-4
                shadow-sm
                transition
                hover:shadow-md
              "
            >
              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {request.customer_name || "N/A"}
                  </p>

                  <p className="mt-1 truncate text-xs text-blue-400">
                    Request #{request.id}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    ${getStatusStyle(
                      request.status
                    )}
                  `}
                >
                  {formatStatus(
                    request.status
                  )}
                </span>
              </div>

              {/* =================================================
                  DETAILS
              ================================================= */}

              <div className="mt-4 space-y-3 border-t border-blue-50 pt-3">
                {/* PRODUCT */}

                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="shrink-0 text-blue-400">
                    Product
                  </span>

                  <div className="min-w-0 text-right">
                    <p className="truncate font-medium text-slate-700">
                      {getProductName(
                        request
                      )}
                    </p>

                    {getProductSerial(
                      request
                    ) && (
                      <p className="mt-0.5 truncate text-xs text-blue-300">
                        SN:{" "}
                        {getProductSerial(
                          request
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* DEALER */}

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="shrink-0 text-blue-400">
                    Dealer
                  </span>

                  <span className="truncate text-right font-medium text-slate-700">
                    {request.dealer_name ||
                      "N/A"}
                  </span>
                </div>

                {/* CREATED */}

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-blue-400">
                    Created
                  </span>

                  <div className="text-right">
                    <p className="text-slate-600">
                      {formatDate(
                        request.created_at
                      )}
                    </p>

                    <p className="text-xs text-blue-300">
                      {formatTime(
                        request.created_at
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="mt-4 flex items-center justify-end gap-1 border-t border-blue-50 pt-3">
                {/* VIEW */}

                <button
                  type="button"
                  onClick={() =>
                    onView(request)
                  }
                  className="
                    rounded-lg
                    p-2
                    transition
                    hover:bg-blue-50
                  "
                  title="View"
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                </button>

                {/* REVIEW */}

                {request.status ===
                  "PENDING_APPROVAL" && (
                  <button
                    type="button"
                    onClick={() =>
                      onReview(request)
                    }
                    className="
                      rounded-lg
                      p-2
                      transition
                      hover:bg-amber-50
                    "
                    title="Review"
                  >
                    <CheckCircle className="h-4 w-4 text-amber-600" />
                  </button>
                )}

                {/* ASSIGN */}

                {(request.status ===
                  "APPROVED" ||
                  request.status ===
                    "SCHEDULED") && (
                  <button
                    type="button"
                    onClick={() =>
                      onAssign(request)
                    }
                    className="
                      rounded-lg
                      p-2
                      transition
                      hover:bg-green-50
                    "
                    title="Assign Technician"
                  >
                    <UserPlus className="h-4 w-4 text-green-600" />
                  </button>
                )}

                {/* DELETE */}

                <button
                  type="button"
                  onClick={() =>
                    onDelete(request)
                  }
                  disabled={isDeleting}
                  className="
                    rounded-lg
                    p-2
                    transition
                    hover:bg-red-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  title="Delete"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          DESKTOP / TABLET
      ===================================================== */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-blue-100 bg-blue-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-blue-900">
                Customer / Product
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-blue-900">
                Dealer
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-blue-900">
                Status
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-blue-900">
                Created
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-blue-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {requests.map((request) => {
              const isDeleting =
                deletingId ===
                String(request.id);

              return (
                <tr
                  key={request.id}
                  className="
                    border-b
                    border-blue-50
                    transition
                    hover:bg-blue-50/50
                  "
                >
                  {/* =================================================
                      CUSTOMER / PRODUCT
                  ================================================= */}

                  <td className="px-5 py-4">
                    <div className="min-w-[220px]">
                      <p className="font-semibold text-slate-900">
                        {request.customer_name ||
                          "N/A"}
                      </p>

                      <p className="mt-1 text-sm font-medium text-blue-500">
                        {getProductName(
                          request
                        )}
                      </p>

                      {getProductSerial(
                        request
                      ) && (
                        <p className="text-xs text-blue-300">
                          SN:{" "}
                          {getProductSerial(
                            request
                          )}
                        </p>
                      )}

                      <p className="mt-1 text-xs text-blue-300">
                        Request #{request.id}
                      </p>
                    </div>
                  </td>

                  {/* =================================================
                      DEALER
                  ================================================= */}

                  <td className="px-5 py-4">
                    <p className="max-w-[180px] truncate text-sm font-medium text-slate-700">
                      {request.dealer_name ||
                        "N/A"}
                    </p>
                  </td>

                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`
                        inline-flex
                        whitespace-nowrap
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${getStatusStyle(
                          request.status
                        )}
                      `}
                    >
                      {formatStatus(
                        request.status
                      )}
                    </span>
                  </td>

                  {/* =================================================
                      CREATED
                  ================================================= */}

                  <td className="px-5 py-4 text-center">
                    <p className="text-sm text-slate-600">
                      {formatDate(
                        request.created_at
                      )}
                    </p>

                    <p className="mt-1 text-xs text-blue-300">
                      {formatTime(
                        request.created_at
                      )}
                    </p>
                  </td>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() =>
                          onView(request)
                        }
                        className="
                          rounded-lg
                          p-2
                          transition
                          hover:bg-blue-50
                        "
                        title="View"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>

                      {/* REVIEW */}

                      {request.status ===
                        "PENDING_APPROVAL" && (
                        <button
                          type="button"
                          onClick={() =>
                            onReview(request)
                          }
                          className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-amber-50
                          "
                          title="Review"
                        >
                          <CheckCircle className="h-4 w-4 text-amber-600" />
                        </button>
                      )}

                      {/* ASSIGN */}

                      {(request.status ===
                        "APPROVED" ||
                        request.status ===
                          "SCHEDULED") && (
                        <button
                          type="button"
                          onClick={() =>
                            onAssign(request)
                          }
                          className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-green-50
                          "
                          title="Assign Technician"
                        >
                          <UserPlus className="h-4 w-4 text-green-600" />
                        </button>
                      )}

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(request)
                        }
                        disabled={isDeleting}
                        className="
                          rounded-lg
                          p-2
                          transition
                          hover:bg-red-50
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                        title="Delete"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-500" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}