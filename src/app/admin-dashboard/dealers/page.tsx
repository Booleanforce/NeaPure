/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import {
  Store,
  Users,
  UserCheck,
  UserX,
  Plus,
} from "lucide-react";

import DealerSearch from "./components/DealerSearch";
import DealerTable from "./components/DealerTable";
import DealerPagination from "./components/DealerPagination";
import AddDealerModal from "./components/AddDealerModal";
import {
  dealerService,
  Dealer,
} from "@/services/dealer.service";

export default function DealerList() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  useEffect(() => {
    loadDealers();
  }, [page, search]);

  const loadDealers = async () => {
    try {
      setLoading(true);

      const response =
        await dealerService.getDealers(
          search,
          page
        );

      console.log("Dealer API:", response);

      if ("results" in response) {
        setDealers(response.results);

        setTotalPages(
          Math.max(
            1,
            Math.ceil(response.count / 10)
          )
        );
      } else if (Array.isArray(response)) {
        setDealers(response);
        setTotalPages(1);
      }
    } catch (error) {
      console.error(
        "Dealer API Error:",
        error
      );

      setDealers([]);
    } finally {
      setLoading(false);
    }
  };

  const activeDealers = dealers.filter(
    (dealer) =>
      dealer.dealer_profile?.status === "ACTIVE"
  ).length;

  const blockedDealers = dealers.filter(
    (dealer) =>
      dealer.dealer_profile?.status === "BLOCKED"
  ).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Store className="h-7 w-7 text-blue-600" />

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dealers
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Manage all registered dealers and their business information.
          </p>
        </div>

        <button
          onClick={() =>
            setIsAddModalOpen(true)
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <Plus size={18} />
          Add Dealer
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {/* Total */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Dealers
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                {dealers.length}
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
                Active Dealers
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-green-700">
                {activeDealers}
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
                Blocked Dealers
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-red-700">
                {blockedDealers}
              </h2>
            </div>

            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <UserX size={28} />
            </div>

          </div>
        </div>

      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <DealerSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <DealerTable
          dealers={dealers}
          loading={loading}
          onRefresh={loadDealers}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <DealerPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Add Modal */}
      <AddDealerModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
        onCreated={async () => {
          await loadDealers();
          setIsAddModalOpen(false);
        }}
      />

    </div>
  );
}