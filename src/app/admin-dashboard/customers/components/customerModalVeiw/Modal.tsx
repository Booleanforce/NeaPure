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

function PlaceholderPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/50 sm:p-10">
      <h2 className="text-base font-semibold text-blue-900 sm:text-lg">
        {title}
      </h2>

      <p className="mt-2 text-sm text-blue-400 sm:text-base">
        {description}
      </p>
    </div>
  );
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
        <div className="flex h-64 items-center justify-center sm:h-96 lg:h-125">
          <div className="text-center">

            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

            <p className="text-sm text-blue-400">
              Loading customer...
            </p>

          </div>
        </div>
      ) : !customer ? (
        <div className="flex h-64 items-center justify-center sm:h-96 lg:h-125">
          <div className="px-6 text-center">

            <h2 className="text-lg font-semibold text-blue-900 sm:text-xl">
              Customer Not Found
            </h2>

            <p className="mt-2 text-sm text-blue-400">
              Unable to load customer details.
            </p>

          </div>
        </div>
      ) : (
        <div className="flex max-h-[85vh] flex-col sm:max-h-[80vh]">

          {/* Header */}

          <Header
            customer={customer}
          />

          {/* Tabs */}

          <div className=" border-b h-full border-blue-100">
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Content */}

          <div className="flex-1 overflow-y-auto bg-blue-50/40 p-4 sm:p-6">

            {activeTab === "Overview" && (
              <OverviewTab customer={customer} />
            )}

            {activeTab === "Products" && (
              <PlaceholderPanel
                title="Products"
                description="Product management coming next."
              />
            )}

            {activeTab === "Services" && (
              <PlaceholderPanel
                title="Service History"
                description="Service history will appear here."
              />
            )}

            {activeTab === "Warranty" && (
              <PlaceholderPanel
                title="Warranty"
                description="Warranty information will appear here."
              />
            )}

            {activeTab === "History" && (
              <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:p-8">

                <h2 className="mb-5 text-base font-semibold text-blue-900 sm:mb-6 sm:text-lg">
                  History Logs
                </h2>

                {customer.history_logs.length === 0 ? (
                  <p className="text-sm text-blue-400">
                    No history found.
                  </p>
                ) : (
                  <div className="space-y-4 sm:space-y-5">
                    {customer.history_logs.map((log) => (
                      <div
                        key={log.id}
                        className="border-l-4 border-blue-400 pl-3 sm:pl-4"
                      >
                        <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                          {log.event_type}
                        </h4>

                        <p className="text-sm text-slate-600">
                          {log.description}
                        </p>

                        <p className="mt-1 text-xs text-blue-300">
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
              <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/50 sm:p-8">

                <h2 className="mb-5 text-base font-semibold text-blue-900 sm:mb-6 sm:text-lg">
                  Notes
                </h2>

                {customer.notes.length === 0 ? (
                  <p className="text-sm text-blue-400">
                    No notes available.
                  </p>
                ) : (
                  <div className="space-y-4 sm:space-y-5">
                    {customer.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-lg border border-blue-100 bg-blue-50/30 p-3 sm:p-4"
                      >
                        <p className="text-sm text-slate-800">{note.text}</p>

                        <p className="mt-3 text-xs text-blue-400">
                          {note.author_name} (
                          {note.author_email})
                        </p>

                        <p className="text-xs text-blue-300">
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