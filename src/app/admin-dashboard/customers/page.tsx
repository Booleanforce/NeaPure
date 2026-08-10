/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import AddCustomerModal from "./components/AddCustomerModal";
import {
  customerService,
  Customer,
} from "@/services/customer.service";

import CustomerSearch from "./components/CustomerSearch";
import CustomerTable from "./components/CustomerTable";
import CustomerPagination from "./components/CustomerPagination";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] =
  useState(false);

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const response = await customerService.getCustomers(
        search,
        page
      );

      console.log("Customer API:", response);

      if ("results" in response) {
        setCustomers(response.results);

        setTotalPages(
          Math.max(
            1,
            Math.ceil(response.count / 10)
          )
        );
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
    (customer) =>
      customer.customer_profile?.status === "ACTIVE"
  ).length;

  const inactiveCustomers =
    customers.length - activeCustomers;

  return (
  <div className="w-full max-w-full overflow-x-hidden space-y-6">

    {/* Header */}

    <div className="flex flex-wrap items-center justify-between gap-4">

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-gray-500">
          Manage all registered customers
        </p>

      </div>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
      >
        + Add Customer
      </button>

    </div>

    {/* Statistics */}

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Total Customers
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {customers.length}
        </h2>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Active Customers
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          {activeCustomers}
        </h2>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Inactive Customers
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600">
          {inactiveCustomers}
        </h2>
      </div>

    </div>

    {/* Search */}

    <CustomerSearch
      value={search}
      onChange={(value) => {
        setSearch(value);
        setPage(1);
      }}
    />

    {/* Table */}

    <div className="w-full max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <CustomerTable
        customers={customers}
        loading={loading}
        onRefresh={loadCustomers}
      />
    </div>

    </div>

    {/* Pagination */}

    <CustomerPagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
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