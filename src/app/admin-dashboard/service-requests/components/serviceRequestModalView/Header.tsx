"use client";

import { ServiceBooking } from "@/services/serviceBooking.service";

interface HeaderProps {
  booking: ServiceBooking;
}

export default function Header({ booking }: HeaderProps) {
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
      return new Date(dateStr).toLocaleString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-blue-600 px-6 py-6 text-white sm:px-8 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">{booking.booking_id}</h2>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>
          <p className="mt-1 text-lg font-medium text-blue-50">{booking.customer_name}</p>
        </div>
        
        <div className="flex flex-col items-start gap-1 sm:items-end text-sm text-blue-100">
          <p>Phone: {booking.phone}</p>
          <p>Created: {formatDate(booking.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
