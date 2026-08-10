"use client";

import {
  Mail,
  Phone,
  User,
  Store,
  Shield,
  FileText,
  Users,
} from "lucide-react";

import { Dealer } from "@/services/dealer.service";

interface Props {
  dealer: Dealer;
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm shadow-blue-100/50">

      <div className="border-b border-blue-50 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className="text-sm font-semibold text-blue-900 sm:text-base">
          {title}
        </h3>
      </div>

      <div className="space-y-4 p-4 sm:space-y-5 sm:p-5">
        {children}
      </div>

    </div>
  );
}

function Item({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-1 shrink-0 text-blue-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs text-blue-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-900">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}

export default function DealerOverviewTab({
  dealer,
}: Props) {
  const profile = dealer.dealer_profile;

  const status =
    profile?.status || "N/A";

  const isActive =
    status === "ACTIVE";

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      {/* Contact Information */}
      <InfoCard title="Contact Information">

        <Item
          icon={<User size={18} />}
          label="Full Name"
          value={dealer.full_name}
        />

        <Item
          icon={<Mail size={18} />}
          label="Email"
          value={dealer.email}
        />

        <Item
          icon={<Phone size={18} />}
          label="Phone"
          value={dealer.phone}
        />

        <Item
          icon={<User size={18} />}
          label="Contact Person"
          value={profile?.contact_person}
        />

      </InfoCard>

      {/* Business Information */}
      <InfoCard title="Business Information">

        <Item
          icon={<Store size={18} />}
          label="Company Name"
          value={profile?.company_name}
        />

        <Item
          icon={<FileText size={18} />}
          label="Trade License"
          value={profile?.trade_license}
        />

        <Item
          icon={<Shield size={18} />}
          label="Dealer Status"
          value={
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          }
        />

      </InfoCard>

      {/* Dealer Statistics */}
      <div className="lg:col-span-2">

        <InfoCard title="Dealer Statistics">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Registered Customers */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-medium text-blue-500">
                    Registered Customers
                  </p>

                  <p className="mt-2 text-3xl font-bold text-blue-900">
                    {profile?.total_customers_registered ?? 0}
                  </p>

                </div>

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>

              </div>

            </div>

            {/* Status */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-medium text-blue-500">
                    Account Status
                  </p>

                  <p
                    className={`mt-2 text-xl font-bold ${
                      isActive
                        ? "text-emerald-700"
                        : "text-red-700"
                    }`}
                  >
                    {isActive
                      ? "Active"
                      : "Blocked"}
                  </p>

                </div>

                <div
                  className={`rounded-xl p-3 ${
                    isActive
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <Shield className="h-6 w-6" />
                </div>

              </div>

            </div>

          </div>

        </InfoCard>

      </div>

    </div>
  );
}