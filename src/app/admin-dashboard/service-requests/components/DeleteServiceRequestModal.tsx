"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { serviceBookingService } from "@/services/serviceBooking.service";

interface DeleteServiceRequestModalProps {
  isOpen: boolean;
  bookingId: string | null;
  bookingRefId: string | undefined;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export default function DeleteServiceRequestModal({
  isOpen,
  bookingId,
  bookingRefId,
  onClose,
  onDeleted,
}: DeleteServiceRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!bookingId) return;

    try {
      setLoading(true);
      setError(null);
      await serviceBookingService.deleteBooking(bookingId);
      onDeleted(bookingId);
    } catch (err: any) {
      console.error("Failed to delete booking:", err);
      setError(err.message || "An error occurred while deleting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>

          <div className="mt-5 text-center">
            <h3 className="text-xl font-bold text-slate-900">Delete Service Request</h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete <span className="font-semibold text-slate-700">{bookingRefId || "this request"}</span>? This action cannot be undone.
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 active:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95 disabled:opacity-70"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Delete Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
