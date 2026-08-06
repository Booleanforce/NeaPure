"use client";

import {
  Mail,
  Phone,
  MapPin,
  Wrench,
  ShieldCheck,
  CalendarDays,
  UserRound,
} from "lucide-react";

import { Technician } from "@/services/technician.service";

interface Props {
  technician: Technician;
}

export default function TechnicianOverviewTab({
  technician,
}: Props) {
  const profile =
    technician.technician_profile;

  const formatDate = (
    value?: string
  ) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <div className="space-y-6">

      {/* ================================================= */}
      {/* PERSONAL INFORMATION */}
      {/* ================================================= */}

      <section>

        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
            <UserRound size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Personal Information
            </h3>

            <p className="text-xs text-slate-500">
              Basic technician account details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <InfoCard
            icon={<Mail size={17} />}
            label="Email"
            value={technician.email}
          />

          <InfoCard
            icon={<Phone size={17} />}
            label="Phone"
            value={technician.phone || "-"}
          />

          <InfoCard
            icon={<ShieldCheck size={17} />}
            label="Account Role"
            value={technician.role}
          />

          <InfoCard
            icon={<CalendarDays size={17} />}
            label="Joined"
            value={formatDate(
              technician.created_at
            )}
          />

        </div>
      </section>

      {/* ================================================= */}
      {/* TECHNICIAN INFORMATION */}
      {/* ================================================= */}

      <section>

        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
            <Wrench size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Technician Information
            </h3>

            <p className="text-xs text-slate-500">
              Professional profile information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <InfoCard
            icon={<MapPin size={17} />}
            label="Region"
            value={
              profile?.region || "-"
            }
          />

          <InfoCard
            icon={<ShieldCheck size={17} />}
            label="Profile Status"
            value={
              profile?.status || "-"
            }
          />

        </div>

        {/* Skills */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <Wrench size={16} />

            <span className="text-xs font-medium uppercase tracking-wide">
              Skills
            </span>
          </div>

          <p className="text-sm leading-6 text-slate-700">
            {profile?.skills || "No skills added."}
          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* ACCOUNT STATUS */}
      {/* ================================================= */}

      <section className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">

        <div className="flex items-start gap-3">

          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <ShieldCheck size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              Account Status
            </h3>

            <p className="mt-1 text-sm text-blue-700">
              This technician account is currently{" "}
              <strong>
                {technician.is_active
                  ? "active"
                  : "inactive"}
              </strong>
              .
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">

      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-medium text-slate-800">
        {value}
      </p>

    </div>
  );
}