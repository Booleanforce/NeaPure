"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Loader2,
  MessageSquare,
  X,
  XCircle,
} from "lucide-react";

import {
  installationsService,
  InstallationRequest,
} from "@/services/installations";

interface InstallationReviewModalProps {
  request: InstallationRequest;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InstallationReviewModal({
  request,
  isOpen,
  onClose,
  onSuccess,
}: InstallationReviewModalProps) {
  const [notes, setNotes] = useState(
    request.admin_notes || ""
  );

  const [loading, setLoading] = useState<
    "approve" | "disapprove" | null
  >(null);

  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleApprove = async () => {
    try {
      setError("");
      setLoading("approve");

      await installationsService.approveRequest(
        request.id,
        {
          admin_notes: notes,
        }
      );

      onSuccess();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to approve request."
      );
    } finally {
      setLoading(null);
    }
  };

  const handleDisapprove = async () => {
    try {
      setError("");
      setLoading("disapprove");

      await installationsService.disapproveRequest(
        request.id,
        {
          admin_notes: notes,
        }
      );

      onSuccess();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to disapprove request."
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Review Installation
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Review and approve this request
            </p>
          </div>

          <button
            type="button"
            disabled={!!loading}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              {request.customer_name}
            </p>

            <p className="mt-1 text-sm text-blue-600">
              {request.registered_product_name}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Serial:{" "}
              {request.registered_product_serial_number}
            </p>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MessageSquare className="h-4 w-4 text-slate-400" />
              Admin Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              rows={4}
              placeholder="Add a note about this request..."
              disabled={!!loading}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-50"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={!!loading}
            onClick={handleDisapprove}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {loading === "disapprove" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            Disapprove
          </button>

          <button
            type="button"
            disabled={!!loading}
            onClick={handleApprove}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading === "approve" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Approve Request
          </button>
        </div>
      </div>
    </div>
  );
}