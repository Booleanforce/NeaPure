"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
// import { toast, Bounce } from "react-toastify";
interface Props {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteCustomerModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-blue-950/40 p-3 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl shadow-blue-900/20">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-100 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-11 sm:w-11">
              <AlertTriangle className="h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-blue-900 sm:text-lg">
                Delete Customer
              </h2>

              <p className="text-xs text-blue-400 sm:text-sm">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-full p-1.5 text-blue-400 transition hover:bg-blue-50 hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="bg-blue-50/40 px-4 py-5 sm:px-6 sm:py-6">

          <p className="text-sm leading-6 text-slate-600">
            Are you sure you want to delete this customer?
            <br />
            The customer will be removed from the customer list.
          </p>

        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-blue-100 px-4 py-3.5 sm:flex-row sm:justify-end sm:px-6 sm:py-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full rounded-lg border border-blue-100 px-5 py-2.5 text-sm font-medium text-blue-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2"
          >
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {loading ? "Deleting..." : "Delete Customer"}
          </button>

        </div>

      </div>
    </div>
  );
}