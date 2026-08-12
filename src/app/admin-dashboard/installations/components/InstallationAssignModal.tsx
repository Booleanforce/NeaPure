"use client";

import { useEffect, useState } from "react";

import {
  CalendarDays,
  Loader2,
  MapPin,
  UserRound,
  X,
} from "lucide-react";

import {
  installationsService,
  InstallationRequest,
} from "@/services/installations";

import { Technician } from "@/services/technician.service";

interface InstallationAssignModalProps {
  request: InstallationRequest;
  technicians: Technician[];
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InstallationAssignModal({
  request,
  technicians,
  loading: technicianLoading,
  isOpen,
  onClose,
  onSuccess,
}: InstallationAssignModalProps) {
  const [technicianId, setTechnicianId] =
    useState("");

  const [scheduledDate, setScheduledDate] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTechnicianId("");
      setScheduledDate("");
      setAddress("");
      setError("");
    }
  }, [isOpen, request.id]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!technicianId) {
      setError(
        "Please select a technician."
      );
      return;
    }

    if (!scheduledDate) {
      setError(
        "Please select a scheduled date."
      );
      return;
    }

    if (!address.trim()) {
      setError(
        "Please enter the installation address."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await installationsService.assignTechnician(
        request.id,
        {
          technician_id: technicianId,
          scheduled_date: new Date(
            scheduledDate
          ).toISOString(),
          address: address.trim(),
        }
      );

      onSuccess();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to assign technician."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Assign Technician
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Schedule the installation job
            </p>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-bold text-slate-900">
                {request.customer_name}
              </p>

              <p className="mt-1 text-sm text-blue-600">
                {request.registered_product_name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                SN:{" "}
                {request.registered_product_serial_number}
              </p>
            </div>

            {/* TECHNICIAN */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <UserRound className="h-4 w-4 text-slate-400" />
                Technician
              </label>

              <select
                value={technicianId}
                onChange={(event) =>
                  setTechnicianId(
                    event.target.value
                  )
                }
                disabled={
                  technicianLoading ||
                  submitting
                }
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-50"
              >
                <option value="">
                  {technicianLoading
                    ? "Loading technicians..."
                    : "Select technician"}
                </option>

                {technicians.map(
                  (technician) => (
                    <option
                      key={technician.id}
                      value={String(
                        technician.id
                      )}
                    >
                      {technician.name ||
                        technician.email}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* DATE */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                Scheduled Date & Time
              </label>

              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(event) =>
                  setScheduledDate(
                    event.target.value
                  )
                }
                disabled={submitting}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-50"
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-slate-400" />
                Installation Address
              </label>

              <textarea
                value={address}
                onChange={(event) =>
                  setAddress(
                    event.target.value
                  )
                }
                rows={3}
                placeholder="Enter the customer's installation address..."
                disabled={submitting}
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:bg-slate-50"
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
              disabled={submitting}
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                technicianLoading
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {submitting
                ? "Assigning..."
                : "Assign Technician"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}