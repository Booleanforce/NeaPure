"use client";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Technician } from "@/services/technician.service";

interface Props {
  technician: Technician;
}

export default function TechnicianModalHeader({
  technician,
}: Props) {
  const profile =
    technician.technician_profile;

  const initials =
    technician.full_name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  const status =
    profile?.status || "UNKNOWN";

  const statusClass =
    status === "ACTIVE"
      ? "bg-emerald-100 text-emerald-700"
      : status === "BLOCKED"
      ? "bg-red-100 text-red-700"
      : "bg-slate-100 text-slate-600";

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 pb-6 pt-7 text-white">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-2xl font-bold shadow-lg backdrop-blur-sm">
          {initials}
        </div>

        {/* Main information */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-2xl font-bold">
              {technician.full_name}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
            >
              {status}
            </span>

          </div>

          <p className="mt-1 text-sm text-blue-100">
            Technician
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-blue-100">

            <div className="flex items-center gap-2">
              <Mail size={15} />
              <span className="truncate">
                {technician.email}
              </span>
            </div>

            {technician.phone && (
              <div className="flex items-center gap-2">
                <Phone size={15} />
                <span>
                  {technician.phone}
                </span>
              </div>
            )}

            {profile?.region && (
              <div className="flex items-center gap-2">
                <MapPin size={15} />
                <span>
                  {profile.region}
                </span>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}