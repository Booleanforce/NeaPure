/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";

import { Modal } from "@/components/ui/Modal";
import {
  customerService,
  Customer,
} from "@/services/customer.service";

import Header from "./Header";
import Tabs from "./Tabs";
import OverviewTab from "./OverviewTab";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

export default function CustomerModal({
  isOpen,
  onClose,
  customerId,
}: CustomerModalProps) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

const fetchCustomer = useCallback(async () => {
  if (!customerId) return;

  try {
    setLoading(true);

    const response = await customerService.getCustomer(customerId);

    console.log("Customer Response:", response);

    setCustomer(response);
  } catch (error) {
    console.error("GET CUSTOMER ERROR:", error);
    setCustomer(null);
  } finally {
    setLoading(false);
  }
}, [customerId]);

  useEffect(() => {
    if (isOpen) {
      fetchCustomer();
    }
  }, [isOpen, fetchCustomer]);

  useEffect(() => {
    if (!isOpen) {
      setCustomer(null);
      setActiveTab("Overview");
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <div className="text-center">

            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

            <p className="text-gray-500">
              Loading customer...
            </p>

          </div>
        </div>
      ) : !customer ? (
        <div className="flex h-[500px] items-center justify-center">
          <div className="text-center">

            <h2 className="text-xl font-semibold">
              Customer Not Found
            </h2>

            <p className="mt-2 text-gray-500">
              Unable to load customer details.
            </p>

          </div>
        </div>
      ) : (
        <div className="flex max-h-[85vh] flex-col">

          {/* Header */}

          <Header
            customer={customer}
          />

          {/* Tabs */}

          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Content */}

          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">

            {activeTab === "Overview" && (
              <OverviewTab customer={customer} />
            )}

            {activeTab === "Products" && (
              <div className="rounded-xl bg-white p-10 shadow-sm">
                <h2 className="text-lg font-semibold">
                  Products
                </h2>

                <p className="mt-2 text-gray-500">
                  Product management coming next.
                </p>
              </div>
            )}

            {activeTab === "Services" && (
              <div className="rounded-xl bg-white p-10 shadow-sm">
                <h2 className="text-lg font-semibold">
                  Service History
                </h2>

                <p className="mt-2 text-gray-500">
                  Service history will appear here.
                </p>
              </div>
            )}

            {activeTab === "Warranty" && (
              <div className="rounded-xl bg-white p-10 shadow-sm">
                <h2 className="text-lg font-semibold">
                  Warranty
                </h2>

                <p className="mt-2 text-gray-500">
                  Warranty information will appear here.
                </p>
              </div>
            )}

            {activeTab === "History" && (
              <div className="rounded-xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-lg font-semibold">
                  History Logs
                </h2>

                {customer.history_logs.length === 0 ? (
                  <p className="text-gray-500">
                    No history found.
                  </p>
                ) : (
                  <div className="space-y-5">
                    {customer.history_logs.map((log) => (
                      <div
                        key={log.id}
                        className="border-l-4 border-blue-600 pl-4"
                      >
                        <h4 className="font-semibold">
                          {log.event_type}
                        </h4>

                        <p className="text-sm text-gray-600">
                          {log.description}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {log.performed_by_name} •{" "}
                          {new Date(
                            log.created_at
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {activeTab === "Notes" && (
              <div className="rounded-xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-lg font-semibold">
                  Notes
                </h2>

                {customer.notes.length === 0 ? (
                  <p className="text-gray-500">
                    No notes available.
                  </p>
                ) : (
                  <div className="space-y-5">
                    {customer.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-lg border p-4"
                      >
                        <p>{note.text}</p>

                        <p className="mt-3 text-xs text-gray-500">
                          {note.author_name} (
                          {note.author_email})
                        </p>

                        <p className="text-xs text-gray-400">
                          {new Date(
                            note.created_at
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}
    </Modal>
  );
}