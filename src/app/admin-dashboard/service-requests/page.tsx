"use client";

import { useEffect, useState, useCallback } from "react";
import { Download, FileText } from "lucide-react";
import { getCurrentUser } from "@/services/auth.service";
import { ServiceBooking, serviceBookingService } from "@/services/serviceBooking.service";
import ServiceRequestTable from "./components/ServiceRequestTable";
import ServiceRequestSearch from "./components/ServiceRequestSearch";
import DeleteServiceRequestModal from "./components/DeleteServiceRequestModal";
import ServiceRequestModalView from "./components/serviceRequestModalView/Modal";

// Since we are lacking a dedicated TechnicianPagination component in the prompt's provided scope,
// we will reuse a simple local pagination or assume a standard paginator structure if one existed.
// Here we'll build a simple pagination control mimicking common patterns.

export default function ServiceRequestsPage() {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Stats
  const [stats, setStats] = useState<{
    total: number;
    pending: number;
    today: number;
    completed: number;
  } | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const data = await serviceBookingService.getStats();
      setStats({
        total: data.total_bookings || 0,
        pending: data.pending_bookings || 0,
        today: data.todays_bookings || 0,
        completed: data.completed_bookings || 0,
      });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await serviceBookingService.getBookings({
        search,
        status: statusFilter,
        service_type: typeFilter,
        page,
      });

      if ("results" in res) {
        setBookings(res.results);
        setTotalPages(Math.ceil(res.count / 10)); // Assuming 10 per page
      } else {
        setBookings(res);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to load service bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, typeFilter, page]);

  useEffect(() => {
    loadBookings();
    loadStats();
  }, [loadBookings, loadStats]);

  // Actions
  const handleSearchChange = (val: string, status: string, serviceType: string) => {
    setSearch(val);
    setStatusFilter(status);
    setTypeFilter(serviceType);
    setPage(1);
  };

  const handleExport = async () => {
    try {
      const blob = await serviceBookingService.exportCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `service_requests_export_${new Date().getTime()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export Service Requests.");
    }
  };

  const handleView = (id: string) => {
    setSelectedBookingId(id);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedBookingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = (id: string) => {
    setIsDeleteModalOpen(false);
    setBookings((current) => current.filter((b) => b.id !== id));
    loadBookings();
  };

  const user = getCurrentUser();
  const canExport = user?.role === "SUPER_ADMIN" || user?.role === "OPERATIONS_ADMIN";
  const selectedBookingRef = bookings.find(b => b.id === selectedBookingId)?.booking_id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Service Requests</h1>
            <p className="text-sm text-slate-500">Manage customer service and installation requests.</p>
          </div>
        </div>

        {canExport && (
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 transition hover:bg-slate-50"
          >
            <Download size={18} className="text-slate-500" />
            Export CSV
          </button>
        )}
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Requests</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-blue-600">Pending Services</p>
            <p className="mt-2 text-3xl font-bold text-blue-900">{stats.pending}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-amber-600">Today's Services</p>
            <p className="mt-2 text-3xl font-bold text-amber-900">{stats.today}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-emerald-600">Completed Services</p>
            <p className="mt-2 text-3xl font-bold text-emerald-900">{stats.completed}</p>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <ServiceRequestSearch
          value={search}
          status={statusFilter}
          serviceType={typeFilter}
          onChange={handleSearchChange}
        />
      </div>

      {/* Table */}
      <ServiceRequestTable
        bookings={bookings}
        loading={loading}
        onView={handleView}
        onDelete={handleDeleteClick}
      />

      {/* Basic Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ServiceRequestModalView
        isOpen={isViewModalOpen}
        bookingId={selectedBookingId}
        onClose={() => setIsViewModalOpen(false)}
      />

      <DeleteServiceRequestModal
        isOpen={isDeleteModalOpen}
        bookingId={selectedBookingId}
        bookingRefId={selectedBookingRef}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleted={handleDeleteSuccess}
      />
    </div>
  );
}
