"use client";

import {
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
} from "lucide-react";

import { Customer } from "@/services/customer.service";

interface Props {
  customer: Customer;
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
      <div className="border-b border-blue-50 bg-blue-50/60 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className="font-semibold text-blue-900">
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
    <div className="flex gap-3">

      <div className="mt-1 shrink-0 text-blue-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs text-blue-400">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-medium text-slate-900">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}

export default function OverviewTab({
  customer,
}: Props) {

  const address =
    customer.addresses?.find(
      (a) => a.is_default
    ) || customer.addresses?.[0];

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">

      {/* Contact */}

      <InfoCard title="Contact Information">

        <Item
          icon={<User size={18} />}
          label="Full Name"
          value={customer.full_name}
        />

        <Item
          icon={<Mail size={18} />}
          label="Email"
          value={customer.email}
        />

        <Item
          icon={<Phone size={18} />}
          label="Phone"
          value={customer.phone}
        />

      </InfoCard>

      {/* Account */}

      <InfoCard title="Account Information">

        <Item
          icon={<Shield size={18} />}
          label="Role"
          value={customer.role}
        />

        <Item
          icon={<User size={18} />}
          label="Customer Status"
          value={
            customer.customer_profile?.status ??
            "N/A"
          }
        />

        <Item
          icon={<Phone size={18} />}
          label="Alternate Phone"
          value={
            customer.customer_profile
              ?.alternate_phone || "-"
          }
        />

      </InfoCard>

      {/* Address */}

      <div className="lg:col-span-2">

        <InfoCard title="Primary Address">

          {address ? (
            <>

              <Item
                icon={<MapPin size={18} />}
                label="Full Address"
                value={address.full_address}
              />

              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">

                <Item
                  icon={<MapPin size={18} />}
                  label="Area"
                  value={address.area}
                />

                <Item
                  icon={<MapPin size={18} />}
                  label="City"
                  value={address.city}
                />

                <Item
                  icon={<MapPin size={18} />}
                  label="Division / State"
                  value={address.division_state}
                />

                <Item
                  icon={<MapPin size={18} />}
                  label="Country"
                  value={address.country}
                />

                <Item
                  icon={<MapPin size={18} />}
                  label="Postal Code"
                  value={address.postal_code}
                />

                <Item
                  icon={<MapPin size={18} />}
                  label="Default Address"
                  value={
                    address.is_default
                      ? "Yes"
                      : "No"
                  }
                />

                <Item
                  icon={<MapPin size={18} />}
                  label="Latitude"
                  value={String(address.latitude)}
                />

                <Item
                  icon={<MapPin size={18} />}
                  label="Longitude"
                  value={String(address.longitude)}
                />

              </div>

            </>
          ) : (
            <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/40 p-8 text-center text-sm text-blue-400 sm:p-10">
              No address available.
            </div>
          )}

        </InfoCard>

      </div>

    </div>
  );
}