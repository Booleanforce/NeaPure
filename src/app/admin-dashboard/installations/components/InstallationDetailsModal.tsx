"use client";

import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Hash,
  Image as ImageIcon,
  Mail,
  Package,
  Phone,
  ShieldCheck,
  User,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import { InstallationRequest } from "@/services/installations";

interface InstallationDetailsModalProps {
  request: InstallationRequest;
  isOpen: boolean;
  onClose: () => void;
}

/* ============================================================================
   STATUS
============================================================================ */

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  PENDING_APPROVAL: {
    label: "Pending Approval",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    dotClassName: "bg-amber-500",
  },

  APPROVED: {
    label: "Approved",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    dotClassName: "bg-emerald-500",
  },

  DISAPPROVED: {
    label: "Disapproved",
    className:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    dotClassName: "bg-red-500",
  },

  SCHEDULED: {
    label: "Scheduled",
    className:
      "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
    dotClassName: "bg-blue-500",
  },

  ASSIGNED: {
    label: "Assigned",
    className:
      "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200",
    dotClassName: "bg-indigo-500",
  },

  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-200",
    dotClassName: "bg-cyan-500",
  },

  REJECTED: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    dotClassName: "bg-red-500",
  },

  RESCHEDULED: {
    label: "Rescheduled",
    className:
      "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200",
    dotClassName: "bg-orange-500",
  },

  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
    dotClassName: "bg-violet-500",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200",
    dotClassName: "bg-green-500",
  },

  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
    dotClassName: "bg-slate-400",
  },
};

/* ============================================================================
   HELPERS
============================================================================ */

function formatDate(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatus(status: string) {
  return (
    statusConfig[status] || {
      label: status
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ),
      className:
        "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
      dotClassName: "bg-slate-400",
    }
  );
}

/* ============================================================================
   SMALL COMPONENTS
============================================================================ */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>

      <p className="truncate text-sm font-semibold text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-4.5 w-4.5" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        {description && (
          <p className="mt-0.5 text-xs text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   MODAL
============================================================================ */

export default function InstallationDetailsModal({
  request,
  isOpen,
  onClose,
}: InstallationDetailsModalProps) {
  if (!isOpen) {
    return null;
  }

  const status = getStatus(request.status);

  const beforePhotos =
    request.photos?.filter(
      (photo) =>
        photo.photo_type === "BEFORE"
    ) || [];

  const afterPhotos =
    request.photos?.filter(
      (photo) =>
        photo.photo_type === "AFTER"
    ) || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          flex
          max-h-[94vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          ring-1
          ring-black/5
        "
      >
        {/* ================================================================
            HEADER
        ================================================================ */}

        <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Package className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                    Installation Details
                  </h2>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.dotClassName}`}
                    />

                    {status.label}
                  </span>
                </div>

                <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-400">
                  <Hash className="h-3.5 w-3.5" />

                  {request.id}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/30
              "
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ================================================================
            CONTENT
        ================================================================ */}

        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/70">
          <div className="space-y-4 p-4 sm:p-6">

            {/* ============================================================
                TOP SUMMARY
            ============================================================ */}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

              {/* CUSTOMER */}

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <SectionTitle
                  icon={UserRound}
                  title="Customer"
                />

                <div className="space-y-3">
                  <div>
                    <p className="text-base font-bold text-slate-900">
                      {request.customer_name ||
                        "Unknown customer"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="truncate">
                      {request.customer || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* PRODUCT */}

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <SectionTitle
                  icon={Package}
                  title="Registered Product"
                />

                <div>
                  <p className="text-base font-bold text-slate-900">
                    {request.registered_product_name ||
                      "Unknown product"}
                  </p>

                  <div className="mt-2 inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    SN:{" "}
                    {request.registered_product_serial_number ||
                      "—"}
                  </div>
                </div>
              </div>

              {/* DEALER */}

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <SectionTitle
                  icon={ShieldCheck}
                  title="Dealer"
                />

                <div>
                  <p className="text-base font-bold text-slate-900">
                    {request.dealer_name ||
                      "No dealer assigned"}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="truncate">
                      {request.dealer || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
                REQUEST INFORMATION
            ============================================================ */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle
                icon={FileText}
                title="Request Information"
                description="Basic information about this installation request"
              />

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                <InfoItem
                  icon={Hash}
                  label="Request ID"
                  value={request.id}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Created"
                  value={formatDateTime(
                    request.created_at
                  )}
                />

                <InfoItem
                  icon={Clock3}
                  label="Last Updated"
                  value={formatDateTime(
                    request.updated_at
                  )}
                />

                <InfoItem
                  icon={Package}
                  label="Product Serial"
                  value={
                    request.registered_product_serial_number
                  }
                />
              </div>
            </div>

            {/* ============================================================
                ADMIN NOTES
            ============================================================ */}

            {request.admin_notes && (
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <FileText className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900">
                      Admin Notes
                    </h3>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                      {request.admin_notes}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================
                INSTALLATION PROGRESS
            ============================================================ */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle
                icon={ClipboardCheck}
                title="Installation Progress"
                description="Current installation workflow status"
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {/* HISTORY */}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-blue-500" />

                    <span className="text-xs font-medium text-slate-500">
                      History
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {request.history_logs?.length || 0}
                  </p>

                  <p className="text-xs text-slate-400">
                    Events
                  </p>
                </div>

                {/* PHOTOS */}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-purple-500" />

                    <span className="text-xs font-medium text-slate-500">
                      Photos
                    </span>
                  </div>

                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {request.photos?.length || 0}
                  </p>

                  <p className="text-xs text-slate-400">
                    Uploaded
                  </p>
                </div>

                {/* CHECKLIST */}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    {request.checklist ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-400" />
                    )}

                    <span className="text-xs font-medium text-slate-500">
                      Checklist
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {request.checklist
                      ? "Submitted"
                      : "Not submitted"}
                  </p>

                  <p className="text-xs text-slate-400">
                    Installation checklist
                  </p>
                </div>

                {/* SIGNATURE */}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    {request.signature ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-400" />
                    )}

                    <span className="text-xs font-medium text-slate-500">
                      Signature
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {request.signature
                      ? "Collected"
                      : "Not collected"}
                  </p>

                  <p className="text-xs text-slate-400">
                    Customer signature
                  </p>
                </div>
              </div>
            </div>

            {/* ============================================================
                PHOTOS
            ============================================================ */}

            {(beforePhotos.length > 0 ||
              afterPhotos.length > 0) && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <SectionTitle
                  icon={ImageIcon}
                  title="Installation Photos"
                  description="Photos uploaded during the installation"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* BEFORE */}

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800">
                        Before Installation
                      </h4>

                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
                        {beforePhotos.length}
                      </span>
                    </div>

                    {beforePhotos.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {beforePhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="group relative aspect-video overflow-hidden rounded-lg bg-slate-100"
                          >
                            <img
                              src={photo.photo}
                              alt="Before installation"
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400">
                        No before photos
                      </div>
                    )}
                  </div>

                  {/* AFTER */}

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800">
                        After Installation
                      </h4>

                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
                        {afterPhotos.length}
                      </span>
                    </div>

                    {afterPhotos.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {afterPhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="group relative aspect-video overflow-hidden rounded-lg bg-slate-100"
                          >
                            <img
                              src={photo.photo}
                              alt="After installation"
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400">
                        No after photos
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================
                HISTORY TIMELINE
            ============================================================ */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle
                icon={Clock3}
                title="Installation History"
                description="Activity and status changes"
              />

              {request.history_logs &&
              request.history_logs.length > 0 ? (
                <div className="relative ml-2">
                  <div className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" />

                  <div className="space-y-5">
                    {request.history_logs.map(
                      (history, index) => (
                        <div
                          key={history.id}
                          className="relative flex gap-4"
                        >
                          <div className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-sm" />

                          <div className="min-w-0 flex-1 rounded-lg border border-slate-100 bg-slate-50 p-3">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {history.event_type
                                    ?.replaceAll(
                                      "_",
                                      " "
                                    )
                                    .toLowerCase()
                                    .replace(
                                      /\b\w/g,
                                      (char) =>
                                        char.toUpperCase()
                                    )}
                                </p>

                                <p className="mt-1 text-sm leading-5 text-slate-500">
                                  {history.description}
                                </p>
                              </div>

                              <span className="shrink-0 text-[11px] font-medium text-slate-400">
                                {formatDateTime(
                                  history.created_at
                                )}
                              </span>
                            </div>

                            {history.performed_by_name && (
                              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                                <User className="h-3.5 w-3.5" />

                                {history.performed_by_name}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
                  <Clock3 className="h-8 w-8 text-slate-300" />

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    No history available
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Installation activity will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================
            FOOTER
        ================================================================ */}

        <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/30
                sm:w-auto
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}