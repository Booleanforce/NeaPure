"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/services/apiClient";

interface TechnicianJob {
  id: string;
  job_type?: string;
  status?: string;
  priority?: string;
  scheduled_date?: string;
  address?: string;
  notes?: string;
}

interface JobsTabProps {
  technicianId: string;
}

export default function JobsTab({
  technicianId,
}: JobsTabProps) {
  const [jobs, setJobs] = useState<TechnicianJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);

        const data = await apiClient.get<TechnicianJob[]>(
          `/api/technicians/operations/jobs/?technician=${technicianId}`
        );

        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load technician jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    if (technicianId) {
      loadJobs();
    }
  }, [technicianId]);

  const getStatusClass = (status?: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "ASSIGNED":
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700" />
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">
          No jobs assigned to this technician.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Job Type
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Priority
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Scheduled
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Address
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-sm text-gray-800">
                    {job.job_type || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        job.status
                      )}`}
                    >
                      {job.status || "UNKNOWN"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {job.priority || "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {job.scheduled_date
                      ? new Date(
                          job.scheduled_date
                        ).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="max-w-[250px] truncate px-5 py-4 text-sm text-gray-700">
                    {job.address || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}