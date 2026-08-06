/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import {
  X,
  Loader2,
  User,
  Briefcase,
  Activity,
  CheckCircle2,
  Clock3,
  XCircle,
  Star,
  MapPin,
} from "lucide-react";

import {
  Technician,
  technicianService,
} from "@/services/technician.service";

import { apiClient } from "@/services/apiClient";

import Header from "./Header";
import OverviewTab from "./OverviewTab";

interface TechnicianModalViewProps {
  isOpen: boolean;
  technicianId: string | null;
  onClose: () => void;
}

interface TechnicianJob {
  id: string;
  job_type?: string;
  status?: string;
  priority?: string;
  scheduled_date?: string;
  address?: string;
  notes?: string;
}

interface JobsResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: TechnicianJob[];
}

interface TechnicianPerformance {
  technician_id: string;
  full_name: string;
  email: string;
  status: string;
  total_jobs: number;
  completed_jobs: number;
  pending_jobs: number;
  cancelled_jobs: number;
  average_rating: number | null;
}

export default function TechnicianModalView({
  isOpen,
  technicianId,
  onClose,
}: TechnicianModalViewProps) {
  const [technician, setTechnician] =
    useState<Technician | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<
      "overview" | "jobs" | "performance"
    >("overview");

  const [jobs, setJobs] =
    useState<TechnicianJob[]>([]);

  const [jobsLoading, setJobsLoading] =
    useState(false);

  const [performance, setPerformance] =
    useState<TechnicianPerformance | null>(null);

  const [performanceLoading, setPerformanceLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * ------------------------------------------------------------
   * Load Technician
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (!isOpen || !technicianId) {
      return;
    }

    loadTechnician();
  }, [isOpen, technicianId]);

  /*
   * ------------------------------------------------------------
   * Reset modal when closed
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (!isOpen) {
      setTechnician(null);
      setJobs([]);
      setPerformance(null);
      setActiveTab("overview");
      setError(null);
    }
  }, [isOpen]);

  /*
   * ------------------------------------------------------------
   * Load technician details
   * ------------------------------------------------------------
   */

  const loadTechnician = async () => {
    if (!technicianId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data =
        await technicianService.getTechnician(
          technicianId
        );

      setTechnician(data);
    } catch (error) {
      console.error(
        "Failed to load technician:",
        error
      );

      setError(
        "Unable to load technician information."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ------------------------------------------------------------
   * Load technician jobs
   * ------------------------------------------------------------
   */

  const loadJobs = async () => {
    if (!technicianId) {
      return;
    }

    try {
      setJobsLoading(true);

      const response =
        await apiClient.get<
          TechnicianJob[] | JobsResponse
        >(
          `/api/technicians/operations/jobs/?technician=${technicianId}`
        );

      if (Array.isArray(response)) {
        setJobs(response);
      } else {
        setJobs(response.results || []);
      }
    } catch (error) {
      console.error(
        "Failed to load technician jobs:",
        error
      );

      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  /*
   * ------------------------------------------------------------
   * Load technician performance
   * ------------------------------------------------------------
   */

  const loadPerformance = async () => {
    if (!technicianId) {
      return;
    }

    try {
      setPerformanceLoading(true);

      const data =
        await apiClient.get<TechnicianPerformance>(
          `/api/technicians/operations/technicians/${technicianId}/`
        );

      setPerformance(data);
    } catch (error) {
      console.error(
        "Failed to load technician performance:",
        error
      );

      setPerformance(null);
    } finally {
      setPerformanceLoading(false);
    }
  };

  /*
   * ------------------------------------------------------------
   * Handle tab change
   * ------------------------------------------------------------
   */

  const handleTabChange = (
    tab:
      | "overview"
      | "jobs"
      | "performance"
  ) => {
    setActiveTab(tab);

    if (tab === "jobs") {
      loadJobs();
    }

    if (tab === "performance") {
      loadPerformance();
    }
  };

  /*
   * ------------------------------------------------------------
   * Status helper
   * ------------------------------------------------------------
   */

  const getStatusClass = (
    status?: string
  ) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "IN_PROGRESS":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "ASSIGNED":
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";

      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "BLOCKED":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  /*
   * ------------------------------------------------------------
   * Format date
   * ------------------------------------------------------------
   */

  const formatDate = (
    date?: string
  ) => {
    if (!date) {
      return "—";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  /*
   * ------------------------------------------------------------
   * Don't render when closed
   * ------------------------------------------------------------
   */

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      {/* ====================================================== */}
      {/* Modal */}
      {/* ====================================================== */}

      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* ==================================================== */}
        {/* Close Button */}
        {/* ==================================================== */}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* ==================================================== */}
        {/* Loading */}
        {/* ==================================================== */}

        {loading && (
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2
                size={34}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm text-slate-500">
                Loading technician...
              </p>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* Error */}
        {/* ==================================================== */}

        {!loading && error && (
          <div className="flex min-h-[500px] flex-col items-center justify-center px-6">
            <div className="rounded-full bg-red-50 p-4 text-red-500">
              <User size={28} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              Technician not found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        )}

        {/* ==================================================== */}
        {/* Content */}
        {/* ==================================================== */}

        {!loading &&
          !error &&
          technician && (
            <>
              {/* ============================================== */}
              {/* Header */}
              {/* ============================================== */}

              <Header
                technician={technician}
              />

              {/* ============================================== */}
              {/* Tabs */}
              {/* ============================================== */}

              <div className="border-b border-slate-200 px-6">
                <div className="flex gap-6">
                  {/* Overview */}

                  <button
                    type="button"
                    onClick={() =>
                      handleTabChange(
                        "overview"
                      )
                    }
                    className={`relative flex items-center gap-2 py-4 text-sm font-medium transition ${
                      activeTab ===
                      "overview"
                        ? "text-blue-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <User size={16} />

                    Overview

                    {activeTab ===
                      "overview" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                    )}
                  </button>

                  {/* Jobs */}

                  <button
                    type="button"
                    onClick={() =>
                      handleTabChange(
                        "jobs"
                      )
                    }
                    className={`relative flex items-center gap-2 py-4 text-sm font-medium transition ${
                      activeTab === "jobs"
                        ? "text-blue-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Briefcase size={16} />

                    Jobs

                    {activeTab ===
                      "jobs" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                    )}
                  </button>

                  {/* Performance */}

                  <button
                    type="button"
                    onClick={() =>
                      handleTabChange(
                        "performance"
                      )
                    }
                    className={`relative flex items-center gap-2 py-4 text-sm font-medium transition ${
                      activeTab ===
                      "performance"
                        ? "text-blue-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Activity size={16} />

                    Performance

                    {activeTab ===
                      "performance" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* ============================================== */}
              {/* Tab Content */}
              {/* ============================================== */}

              <div className="min-h-0 flex-1 overflow-y-auto">
                {/* ============================================ */}
                {/* Overview */}
                {/* ============================================ */}

                {activeTab ===
                  "overview" && (
                  <div className="p-6">
                    <OverviewTab
                      technician={
                        technician
                      }
                    />
                  </div>
                )}

                {/* ============================================ */}
                {/* Jobs */}
                {/* ============================================ */}

                {activeTab === "jobs" && (
                  <div className="p-6">
                    {jobsLoading ? (
                      <div className="flex min-h-[300px] items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2
                            size={30}
                            className="animate-spin text-blue-600"
                          />

                          <p className="text-sm text-slate-500">
                            Loading jobs...
                          </p>
                        </div>
                      </div>
                    ) : jobs.length ===
                      0 ? (
                      <div className="flex min-h-[300px] flex-col items-center justify-center">
                        <div className="rounded-full bg-slate-100 p-4">
                          <Briefcase
                            size={28}
                            className="text-slate-400"
                          />
                        </div>

                        <h3 className="mt-4 text-base font-semibold text-slate-700">
                          No jobs found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          This technician has no
                          assigned jobs.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-hidden rounded-xl border border-slate-200">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[800px] text-left">
                            <thead className="bg-slate-50">
                              <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  Job Type
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  Status
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  Priority
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  Scheduled
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  Address
                                </th>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                              {jobs.map(
                                (job) => (
                                  <tr
                                    key={
                                      job.id
                                    }
                                    className="transition hover:bg-slate-50"
                                  >
                                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                                      {job.job_type ||
                                        "—"}
                                    </td>

                                    <td className="px-5 py-4">
                                      <span
                                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                                          job.status
                                        )}`}
                                      >
                                        {job.status ||
                                          "UNKNOWN"}
                                      </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600">
                                      {job.priority ||
                                        "—"}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600">
                                      {formatDate(
                                        job.scheduled_date
                                      )}
                                    </td>

                                    <td className="max-w-[280px] px-5 py-4">
                                      <div className="flex items-center gap-2">
                                        <MapPin
                                          size={
                                            15
                                          }
                                          className="shrink-0 text-slate-400"
                                        />

                                        <span className="truncate text-sm text-slate-600">
                                          {job.address ||
                                            "—"}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================ */}
                {/* Performance */}
                {/* ============================================ */}

                {activeTab ===
                  "performance" && (
                  <div className="p-6">
                    {performanceLoading ? (
                      <div className="flex min-h-[300px] items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2
                            size={30}
                            className="animate-spin text-blue-600"
                          />

                          <p className="text-sm text-slate-500">
                            Loading performance...
                          </p>
                        </div>
                      </div>
                    ) : !performance ? (
                      <div className="flex min-h-[300px] flex-col items-center justify-center">
                        <div className="rounded-full bg-slate-100 p-4">
                          <Activity
                            size={28}
                            className="text-slate-400"
                          />
                        </div>

                        <h3 className="mt-4 text-base font-semibold text-slate-700">
                          Performance unavailable
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Unable to load technician
                          performance.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Performance Header */}

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-slate-800">
                            Technician Performance
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Job performance summary for{" "}
                            {
                              performance.full_name
                            }
                          </p>
                        </div>

                        {/* Performance Cards */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {/* Total */}

                          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="rounded-lg bg-blue-50 p-2.5">
                                <Briefcase
                                  size={20}
                                  className="text-blue-600"
                                />
                              </div>

                              <span className="text-xs font-medium text-slate-400">
                                TOTAL
                              </span>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-slate-800">
                              {
                                performance.total_jobs
                              }
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Total Jobs
                            </p>
                          </div>

                          {/* Completed */}

                          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="rounded-lg bg-emerald-50 p-2.5">
                                <CheckCircle2
                                  size={20}
                                  className="text-emerald-600"
                                />
                              </div>

                              <span className="text-xs font-medium text-emerald-600">
                                DONE
                              </span>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-slate-800">
                              {
                                performance.completed_jobs
                              }
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Completed Jobs
                            </p>
                          </div>

                          {/* Pending */}

                          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="rounded-lg bg-amber-50 p-2.5">
                                <Clock3
                                  size={20}
                                  className="text-amber-600"
                                />
                              </div>

                              <span className="text-xs font-medium text-amber-600">
                                PENDING
                              </span>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-slate-800">
                              {
                                performance.pending_jobs
                              }
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Pending Jobs
                            </p>
                          </div>

                          {/* Cancelled */}

                          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="rounded-lg bg-red-50 p-2.5">
                                <XCircle
                                  size={20}
                                  className="text-red-600"
                                />
                              </div>

                              <span className="text-xs font-medium text-red-600">
                                CANCELLED
                              </span>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-slate-800">
                              {
                                performance.cancelled_jobs
                              }
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Cancelled Jobs
                            </p>
                          </div>
                        </div>

                        {/* Rating */}

                        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-500">
                                Average Customer Rating
                              </p>

                              <div className="mt-2 flex items-center gap-2">
                                <Star
                                  size={22}
                                  className="fill-amber-400 text-amber-400"
                                />

                                <span className="text-2xl font-bold text-slate-800">
                                  {performance.average_rating !==
                                  null
                                    ? performance.average_rating.toFixed(
                                        1
                                      )
                                    : "N/A"}
                                </span>

                                {performance.average_rating !==
                                  null && (
                                  <span className="text-sm text-slate-500">
                                    / 5.0
                                  </span>
                                )}
                              </div>
                            </div>

                            <div
                              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusClass(
                                performance.status
                              )}`}
                            >
                              {
                                performance.status
                              }
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* ============================================== */}
              {/* Footer */}
              {/* ============================================== */}

              <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </>
          )}
      </div>
    </div>
  );
}