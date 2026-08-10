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
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4">
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      <div className="space-y-5 p-5">
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

      <div className="mt-1 text-blue-600">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-gray-900">
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
    <div className="grid gap-6 lg:grid-cols-2">

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

              <div className="grid gap-5 md:grid-cols-2">

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
            <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500">
              No address available.
            </div>
          )}

        </InfoCard>

      </div>

    </div>
  );
}