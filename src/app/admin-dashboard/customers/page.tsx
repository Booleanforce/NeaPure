/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Users, UserCheck, UserX, Plus } from "lucide-react";

import { useEffect, useState } from "react";

import AddCustomerModal from "./components/AddCustomerModal";
import { customerService, Customer } from "@/services/customer.service";

import CustomerSearch from "./components/CustomerSearch";
import CustomerTable from "./components/CustomerTable";
import CustomerPagination from "./components/CustomerPagination";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const response = await customerService.getCustomers(search, page);

      console.log("Customer API:", response);

      if ("results" in response) {
        setCustomers(response.results);

        setTotalPages(Math.max(1, Math.ceil(response.count / 10)));
      } else if (Array.isArray(response)) {
        setCustomers(response);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Customer API Error:", error);

      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const activeCustomers = customers.filter(
    (customer) => customer.customer_profile?.status === "ACTIVE",
  ).length;

  const inactiveCustomers = customers.length - activeCustomers;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Customers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all registered customers from one place.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Customers
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                {customers.length}
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
                Active Customers
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-green-700">
                {activeCustomers}
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <UserCheck size={28} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="group rounded-2xl border border-red-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">
                Inactive Customers
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-red-700">
                {inactiveCustomers}
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
        <CustomerSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <CustomerTable
            customers={customers}
            loading={loading}
            onRefresh={loadCustomers}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <CustomerPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreated={async () => {
          await loadCustomers();
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}