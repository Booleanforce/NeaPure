/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Modal as BaseModal } from "@/components/ui/Modal";

import {
  dealerService,
  Dealer,
} from "@/services/dealer.service";

import Header from "./Header";
import Tabs from "./Tabs";
import OverviewTab from "./OverviewTab";

interface DealerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealerId: string | null;
  onEdit?: () => void;
}

function PlaceholderPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-6 text-center shadow-sm shadow-blue-100/50 sm:p-10">

      <h2 className="text-lg font-semibold text-blue-900 sm:text-xl">
        {title}
      </h2>

      <p className="mt-2 text-sm text-blue-400 sm:text-base">
        {description}
      </p>

    </div>
  );
}

export default function DealerModal({
  isOpen,
  onClose,
  dealerId,
  onEdit,
}: DealerModalProps) {
  const [dealer, setDealer] =
    useState<Dealer | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("Overview");

  const fetchDealer = useCallback(async () => {
    if (!dealerId) return;

    try {
      setLoading(true);

      const response =
        await dealerService.getDealer(
          dealerId
        );

      console.log(
        "Dealer Response:",
        response
      );

      setDealer(response);
    } catch (error) {
      console.error(
        "GET DEALER ERROR:",
        error
      );

      setDealer(null);
    } finally {
      setLoading(false);
    }
  }, [dealerId]);

  useEffect(() => {
    if (isOpen && dealerId) {
      fetchDealer();
    }
  }, [
    isOpen,
    dealerId,
    fetchDealer,
  ]);

  useEffect(() => {
    if (!isOpen) {
      setDealer(null);
      setActiveTab("Overview");
    }
  }, [isOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >

      {loading ? (

        /* Loading */
        <div className="flex h-64 items-center justify-center sm:h-96 lg:h-[500px]">

          <div className="px-6 text-center">

            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

            <p className="text-sm text-blue-400">
              Loading dealer...
            </p>

          </div>

        </div>

      ) : !dealer ? (

        /* Not Found */
        <div className="flex h-64 items-center justify-center sm:h-96 lg:h-[500px]">

          <div className="px-6 text-center">

            <h2 className="text-lg font-semibold text-blue-900 sm:text-xl">
              Dealer Not Found
            </h2>

            <p className="mt-2 text-sm text-blue-400">
              Unable to load dealer details.
            </p>

          </div>

        </div>

      ) : (

        /* Dealer Content */
        <div className="flex max-h-[85vh] flex-col sm:max-h-[80vh]">

          {/* Header */}
          <Header
            dealer={dealer}
            onEdit={onEdit}
          />

          {/* Tabs */}
          <div className="border-b border-blue-100 bg-white">
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-blue-50/40 p-4 sm:p-6">

            {/* Overview */}
            {activeTab === "Overview" && (
              <OverviewTab
                dealer={dealer}
              />
            )}

            {/* Customers */}
            {activeTab === "Customers" && (
              <PlaceholderPanel
                title="Customers"
                description="Customers registered by this dealer will appear here."
              />
            )}

            {/* Products */}
            {activeTab === "Products" && (
              <PlaceholderPanel
                title="Products"
                description="Products associated with this dealer will appear here."
              />
            )}

            {/* Installations */}
            {activeTab === "Installations" && (
              <PlaceholderPanel
                title="Installations"
                description="Dealer installation history will appear here."
              />
            )}

            {/* History */}
            {activeTab === "History" && (
              <PlaceholderPanel
                title="History"
                description="Dealer activity history will appear here."
              />
            )}

          </div>

        </div>

      )}

    </BaseModal>
  );
}