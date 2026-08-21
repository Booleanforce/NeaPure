"use client";

import { Eye, Phone, Printer, Trash2, Calendar, MapPin, Wrench } from "lucide-react";
import { ServiceBooking } from "@/services/serviceBooking.service";
import { getCurrentUser } from "@/services/auth.service";

interface ServiceRequestTableProps {
  bookings: ServiceBooking[];
  loading: boolean;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ServiceRequestTable({
  bookings,
  loading,
  onView,
  onDelete,
}: ServiceRequestTableProps) {
  const user = getCurrentUser();
  const canDelete = user?.role === "SUPER_ADMIN" || user?.role === "OPERATIONS_ADMIN";

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "PENDING":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "CONTACTED":
        return "bg-sky-100 text-sky-700 border-sky-200";
      case "SCHEDULED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-12 text-sm text-blue-500">Loading service requests...</div>;
  }

  if (bookings.length === 0) {
    return <div className="py-16 text-center text-sm text-blue-400">No service requests found.</div>;
  }

  return (
    <>
      {/* MOBILE */}
      <div className="grid grid-cols-1 gap-3 bg-blue-50/40 p-3 sm:grid-cols-2 lg:hidden">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">{booking.booking_id}</p>
                <p className="truncate text-xs text-blue-400">{booking.customer_name}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                {booking.status}
              </span>
            </div>

            <div className="mt-3 space-y-2 border-t border-blue-50 pt-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Wrench className="h-3.5 w-3.5 shrink-0 text-blue-300" />
                <span className="truncate">{booking.service_type} - {booking.product_name || booking.product_model_text}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-blue-300" />
                <span>{formatDate(booking.preferred_date)} {booking.preferred_time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-300" />
                <span className="truncate">{booking.division}, {booking.district}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-blue-50 pt-3">
              <span className="truncate text-xs font-medium text-slate-500">
                Tech: {booking.technician_email || "Unassigned"}
              </span>

              <div className="flex items-center gap-1">
                <button type="button" onClick={() => onView(booking.id)} className="rounded-lg p-2 transition hover:bg-blue-50" aria-label="View">
                  <Eye className="h-4 w-4 text-blue-600" />
                </button>
                <button type="button" onClick={() => window.open(`tel:${booking.phone}`)} className="rounded-lg p-2 transition hover:bg-sky-50" aria-label="Call">
                  <Phone className="h-4 w-4 text-sky-600" />
                </button>
                <button type="button" onClick={() => window.print()} className="rounded-lg p-2 transition hover:bg-slate-100" aria-label="Print">
                  <Printer className="h-4 w-4 text-slate-600" />
                </button>
                {canDelete && (
                  <button type="button" onClick={() => onDelete(booking.id)} className="rounded-lg p-2 transition hover:bg-red-50" aria-label="Delete">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden overflow-x-auto rounded-xl border border-blue-100 lg:block">
        <table className="w-full min-w-[1000px] table-fixed">
          <thead className="border-b border-blue-100 bg-blue-50">
            <tr>
              <th className="w-[15%] px-4 py-4 text-left text-sm font-semibold text-blue-900">Booking ID</th>
              <th className="w-[15%] px-4 py-4 text-left text-sm font-semibold text-blue-900">Customer</th>
              <th className="w-[20%] px-4 py-4 text-left text-sm font-semibold text-blue-900">Service & Product</th>
              <th className="w-[12%] px-4 py-4 text-left text-sm font-semibold text-blue-900">Pref. Date</th>
              <th className="w-[13%] px-4 py-4 text-center text-sm font-semibold text-blue-900">Status</th>
              <th className="w-[15%] px-4 py-4 text-left text-sm font-semibold text-blue-900">Technician</th>
              <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold text-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-blue-50 transition hover:bg-blue-50/60">
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{booking.booking_id}</p>
                  <p className="text-xs text-slate-500">{formatDate(booking.created_at)}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="truncate font-medium text-slate-900">{booking.customer_name}</p>
                  <p className="truncate text-xs text-blue-500">{booking.phone}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="truncate font-medium text-slate-900">{booking.service_type}</p>
                  <p className="truncate text-xs text-slate-500">{booking.product_name || booking.product_model_text}</p>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  <p>{formatDate(booking.preferred_date)}</p>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="truncate text-sm text-slate-600">{booking.technician_email || "—"}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button type="button" onClick={() => onView(booking.id)} className="rounded-lg p-2 transition hover:bg-blue-50" aria-label="View">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </button>
                    <button type="button" onClick={() => window.open(`tel:${booking.phone}`)} className="rounded-lg p-2 transition hover:bg-sky-50" aria-label="Call">
                      <Phone className="h-4 w-4 text-sky-600" />
                    </button>
                    <button type="button" onClick={() => window.print()} className="rounded-lg p-2 transition hover:bg-slate-100" aria-label="Print">
                      <Printer className="h-4 w-4 text-slate-600" />
                    </button>
                    {canDelete && (
                      <button type="button" onClick={() => onDelete(booking.id)} className="rounded-lg p-2 transition hover:bg-red-50" aria-label="Delete">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
