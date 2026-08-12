"use client";

import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { InstallationRequest } from "@/services/installations";

interface DeleteInstallationModalProps {
  request: InstallationRequest;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteInstallationModal({
  request,
  isOpen,
  loading,
  onClose,
  onConfirm,
}: DeleteInstallationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-slate-900">
            Delete Installation
          </h2>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Delete this request?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            You are about to delete the installation
            request for{" "}
            <span className="font-semibold text-slate-700">
              {request.customer_name ||
                "this customer"}
            </span>
            .
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-700">
              {request.registered_product_name ||
                "Installation request"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              SN:{" "}
              {request.registered_product_serial_number ||
                "—"}
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-red-100 bg-red-50 p-3">
            <p className="text-xs leading-5 text-red-700">
              This action will permanently remove the
              installation request and its related
              installation records.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}