/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  Users,
  UserCheck,
  UserX,
  Plus,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  Technician,
  technicianService,
} from "@/services/technician.service";

import TechnicianSearch from "./components/TechnicianSearch";
import TechnicianTable from "./components/TechnicianTable";
import TechnicianPagination from "./components/TechnicianPagination";
import AddTechnicianModal from "./components/AddTechnicianModal";
import EditTechnicianModal from "./components/EditTechnicianModal";
import DeleteTechnicianModal from "./components/DeleteTechnicianModal";
import TechnicianModalView from "./components/technicianModalView/Modal";

export default function TechnicianList() {
  const [technicians, setTechnicians] =
    useState<Technician[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // ADD
  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  // VIEW
  const [isViewModalOpen, setIsViewModalOpen] =
    useState(false);

  const [selectedTechnicianId, setSelectedTechnicianId] =
    useState<string | null>(null);

  // EDIT
  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  // DELETE
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  useEffect(() => {
    loadTechnicians();
  }, [page, search]);

  const loadTechnicians = async () => {
    try {
      setLoading(true);

      const response =
        await technicianService.getTechnicians(
          search,
          page
        );

      console.log(
        "Technician API:",
        response
      );

      if (
        response &&
        typeof response === "object" &&
        "results" in response
      ) {
        setTechnicians(
          response.results
        );

        setTotalPages(
          Math.max(
            1,
            Math.ceil(
              response.count / 10
            )
          )
        );
      } else if (
        Array.isArray(response)
      ) {
        setTechnicians(response);
        setTotalPages(1);
      } else {
        setTechnicians([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error(
        "Technician API Error:",
        error
      );

      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  const activeTechnicians =
    technicians.filter(
      (technician) =>
        technician
          .technician_profile
          ?.status === "ACTIVE"
    ).length;

  const blockedTechnicians =
    technicians.filter(
      (technician) =>
        technician
          .technician_profile
          ?.status === "BLOCKED"
    ).length;

  const selectedTechnician =
    technicians.find(
      (technician) =>
        technician.id ===
        selectedTechnicianId
    );

  // VIEW
  const handleView = (id: string) => {
    setSelectedTechnicianId(id);
    setIsViewModalOpen(true);
  };

  // EDIT
  const handleEdit = (id: string) => {
    setSelectedTechnicianId(id);
    setIsEditModalOpen(true);
  };

  // DELETE
  const handleDelete = (id: string) => {
    setSelectedTechnicianId(id);
    setIsDeleteModalOpen(true);
  };

  // Close all modals
  const handleCloseModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTechnicianId(null);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Technicians
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all registered technicians from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddModalOpen(true)
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <Plus size={18} />
          Add Technician
        </button>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Technicians
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                {technicians.length}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Users size={28} />
            </div>
          </div>
        </div>

        {/* Active */}

        <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">
                Active Technicians
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-green-700">
                {activeTechnicians}
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <UserCheck size={28} />
            </div>
          </div>
        </div>

        {/* Blocked */}

        <div className="group rounded-2xl border border-red-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">
                Blocked Technicians
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-red-700">
                {blockedTechnicians}
              </h2>
            </div>

            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <UserX size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <TechnicianSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <TechnicianTable
            technicians={technicians}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* PAGINATION */}

      <div className="flex justify-center">
        <TechnicianPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* ADD */}

      <AddTechnicianModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
        onCreated={async () => {
          await loadTechnicians();
        }}
      />

      {/* VIEW */}

      <TechnicianModalView
        isOpen={isViewModalOpen}
        technicianId={selectedTechnicianId}
        onClose={handleCloseModals}
      />

      {/* EDIT */}

      <EditTechnicianModal
        isOpen={isEditModalOpen}
        technicianId={selectedTechnicianId}
        onClose={handleCloseModals}
        onUpdated={async () => {
          await loadTechnicians();
        }}
      />

      {/* DELETE */}

      <DeleteTechnicianModal
        isOpen={isDeleteModalOpen}
        technicianId={selectedTechnicianId}
        technicianName={
          selectedTechnician?.full_name
        }
        onClose={handleCloseModals}
        onDeleted={async () => {
          await loadTechnicians();
        }}
      />
    </div>
  );
}