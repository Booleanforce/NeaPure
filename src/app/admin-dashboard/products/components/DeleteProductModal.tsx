"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProductModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="flex flex-col items-center p-8">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle className="h-8 w-8 text-red-600" />

          </div>

          <h2 className="text-xl font-bold">
            Delete Product
          </h2>

          <p className="mt-3 text-center text-gray-500">
            Are you sure you want to delete this product?
            <br />
            This action cannot be undone.
          </p>

          <div className="mt-8 flex w-full gap-3">

            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
            >
              {loading
                ? "Deleting..."
                : "Delete"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}