"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Bounce, toast } from "react-toastify";

import { technicianService } from "@/services/technician.service";

interface Props {
  isOpen: boolean;
  technicianId: string | null;
  technicianName?: string;
  onClose: () => void;
  onDeleted: () => Promise<void>;
}

export default function DeleteTechnicianModal({
  isOpen,
  technicianId,
  technicianName,
  onClose,
  onDeleted,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !technicianId) {
    return null;
  }

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await technicianService.deleteTechnician(
        technicianId
      );

      await onDeleted();

      toast.success(
        "Technician deleted successfully!",
        {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
          transition: Bounce,
        }
      );

      onClose();
    } catch (error) {
      console.error(
        "Delete technician error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete technician.",
        {
          position: "bottom-center",
          autoClose: 5000,
          theme: "light",
        }
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !deleting
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-red-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Delete Technician
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={28} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Are you sure?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to delete{" "}
              <span className="font-semibold text-slate-800">
                {technicianName || "this technician"}
              </span>
              .
            </p>

            <p className="mt-1 text-xs text-slate-400">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="w-full rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {deleting && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            {deleting
              ? "Deleting..."
              : "Delete Technician"}
          </button>
        </div>
      </div>
    </div>
  );
}