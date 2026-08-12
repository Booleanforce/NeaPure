/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import {
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Wrench,
} from "lucide-react";

import { Technician } from "@/services/technician.service";

/* =========================================================
   TYPES
========================================================= */

interface Props {
  technicians: Technician[];
  loading: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

/* =========================================================
   PROFILE PHOTO URL
========================================================= */

function getProfilePhotoUrl(
  photo?: string | null
): string | null {
  if (!photo) {
    return null;
  }

  const value = photo.trim();

  if (!value) {
    return null;
  }

  /* Already absolute URL */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  /* Protocol relative URL */

  if (value.startsWith("//")) {
    return `http:${value}`;
  }

  /* Relative URL */

  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }

  /* Relative path */

  return `${API_BASE_URL}/${value}`;
}

/* =========================================================
   TECHNICIAN AVATAR
========================================================= */

function TechnicianAvatar({
  name,
  photo,
}: {
  name?: string;
  photo?: string | null;
}) {
  const [imageError, setImageError] =
    useState(false);

  const initial =
    name?.trim()?.charAt(0)?.toUpperCase() ||
    "T";

  const photoUrl =
    getProfilePhotoUrl(photo);

  /* Reset error when photo changes */

  useEffect(() => {
    setImageError(false);
  }, [photoUrl]);

  /* No image */

  if (!photoUrl || imageError) {
    return (
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          border-blue-100
          bg-blue-100
          font-semibold
          text-blue-700
          shadow-sm
        "
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt={name || "Technician"}
      className="
        h-11
        w-11
        shrink-0
        rounded-full
        border-2
        border-blue-100
        object-cover
        shadow-sm
      "
      onError={() => {
        console.error(
          "Failed to load technician photo:",
          photoUrl
        );

        setImageError(true);
      }}
    />
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function TechnicianTable({
  technicians,
  loading,
  onView,
  onEdit,
  onDelete,
}: Props) {
  /* =======================================================
     STATUS
  ======================================================= */

  const getStatusBadge = (
    status?: string
  ) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";

      case "BLOCKED":
        return "bg-red-100 text-red-700";

      case "AVAILABLE":
        return "bg-slate-100 text-slate-600";

      case "BUSY":
        return "bg-amber-100 text-amber-700";

      case "OFFLINE":
        return "bg-slate-200 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-blue-500">
        Loading technicians...
      </div>
    );
  }

  /* =======================================================
     EMPTY
  ======================================================= */

  if (technicians.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-blue-400">
        No technicians found.
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          MOBILE / TABLET
      ===================================================== */}

      <div className="grid grid-cols-1 gap-3 bg-blue-50/40 p-3 sm:grid-cols-2 md:hidden">
        {technicians.map((technician) => {
          const status =
            technician.technician_profile?.status;

          return (
            <div
              key={technician.id}
              className="
                rounded-xl
                border
                border-blue-100
                bg-white
                p-4
                shadow-sm
                shadow-blue-100/50
              "
            >
              {/* Header */}

              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <TechnicianAvatar
                    name={technician.full_name}
                    photo={
                      technician
                        .technician_profile
                        ?.profile_photo
                    }
                  />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {technician.full_name}
                    </p>

                    <p className="truncate text-xs text-blue-400">
                      {technician.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    ${getStatusBadge(status)}
                  `}
                >
                  {status ?? "N/A"}
                </span>
              </div>

              {/* Information */}

              <div className="mt-3 space-y-2 border-t border-blue-50 pt-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-blue-300" />

                  <span className="truncate">
                    {technician.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-blue-300" />

                  <span>
                    {technician.phone || "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-300" />

                  <span className="truncate">
                    {technician
                      .technician_profile
                      ?.region || "-"}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-slate-600">
                  <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-300" />

                  <span className="line-clamp-2">
                    {technician
                      .technician_profile
                      ?.skills || "-"}
                  </span>
                </div>
              </div>

              {/* Footer */}

              <div className="mt-3 flex items-center justify-between border-t border-blue-50 pt-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {technician.role}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      onView(technician.id)
                    }
                    className="rounded-lg p-2 transition hover:bg-blue-50 active:bg-blue-100"
                    aria-label="View technician"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onEdit(technician.id)
                    }
                    className="rounded-lg p-2 transition hover:bg-sky-50 active:bg-sky-100"
                    aria-label="Edit technician"
                  >
                    <Pencil className="h-4 w-4 text-sky-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete(technician.id)
                    }
                    className="rounded-lg p-2 transition hover:bg-red-50 active:bg-red-100"
                    aria-label="Delete technician"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="hidden overflow-x-auto rounded-xl border border-blue-100 md:block">
        <table className="w-full min-w-[900px] table-fixed">
          <thead className="border-b border-blue-100 bg-blue-50">
            <tr>
              <th className="w-[25%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Technician
              </th>

              <th className="w-[22%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Email
              </th>

              <th className="w-[13%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Phone
              </th>

              <th className="w-[13%] px-4 py-4 text-left text-sm font-semibold text-blue-900">
                Region
              </th>

              <th className="w-[11%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Status
              </th>

              <th className="w-[16%] px-4 py-4 text-center text-sm font-semibold text-blue-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {technicians.map((technician) => {
              const status =
                technician.technician_profile?.status;

              return (
                <tr
                  key={technician.id}
                  className="
                    border-b
                    border-blue-50
                    transition
                    hover:bg-blue-50/60
                  "
                >
                  {/* Technician */}

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <TechnicianAvatar
                        name={technician.full_name}
                        photo={
                          technician
                            .technician_profile
                            ?.profile_photo
                        }
                      />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {technician.full_name}
                        </p>

                        <p className="truncate text-xs text-blue-400">
                          {technician.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}

                  <td className="px-4 py-4">
                    <p className="truncate text-slate-600">
                      {technician.email}
                    </p>
                  </td>

                  {/* Phone */}

                  <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                    {technician.phone || "-"}
                  </td>

                  {/* Region */}

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-blue-300" />

                      <span className="truncate">
                        {technician
                          .technician_profile
                          ?.region || "-"}
                      </span>
                    </div>
                  </td>

                  {/* Status */}

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${getStatusBadge(status)}
                      `}
                    >
                      {status ?? "N/A"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onView(technician.id)
                        }
                        className="rounded-lg p-2 transition hover:bg-blue-50"
                        aria-label="View technician"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit(technician.id)
                        }
                        className="rounded-lg p-2 transition hover:bg-sky-50"
                        aria-label="Edit technician"
                      >
                        <Pencil className="h-4 w-4 text-sky-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(technician.id)
                        }
                        className="rounded-lg p-2 transition hover:bg-red-50"
                        aria-label="Delete technician"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}