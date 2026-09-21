"use client";

import { ClipboardList } from "lucide-react";

import InstallationTable from "./InstallationTable";

import {
  InstallationRequest,
} from "@/services/installations";

interface InstallationListProps {
  requests: InstallationRequest[];
  loading: boolean;

  onView: (request: InstallationRequest) => void;
  onReview: (request: InstallationRequest) => void;
  onAssign: (request: InstallationRequest) => void;
  onDelete: (request: InstallationRequest) => void;

  deletingId: string | null;
}

export default function InstallationList({
  requests,
  loading,
  onView,
  onReview,
  onAssign,
  onDelete,
  deletingId,
}: InstallationListProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex min-h-[300px] items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

            <p className="text-sm text-blue-400">
              Loading installation requests...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 rounded-full bg-blue-50 p-4">
            <ClipboardList className="h-8 w-8 text-blue-400" />
          </div>

          <h3 className="text-lg font-semibold text-blue-900">
            No installation requests found
          </h3>

          <p className="mt-1 max-w-md text-sm text-blue-400">
            Try changing your search or check again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <InstallationTable
        requests={requests}
        onView={onView}
        onReview={onReview}
        onAssign={onAssign}
        onDelete={onDelete}
        deletingId={deletingId}
      />
    </div>
  );
}