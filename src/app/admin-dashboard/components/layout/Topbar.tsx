"use client";

import NotificationDropdown from "@/components/ui/NotificationDropdown";
import {
  Search,
  Calendar,
  ChevronDown,
  MapPin,
} from "lucide-react";



interface Props {
  onLogout?: () => void;
}

export default function Topbar({
  onLogout,
}: Props) {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">

      {/* ================================================================== */}
      {/* Search                                                            */}
      {/* ================================================================== */}

      <div className="max-w-md flex-1">
        <div className="relative">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />

        </div>
      </div>

      {/* ================================================================== */}
      {/* Right Side                                                        */}
      {/* ================================================================== */}

      <div className="ml-6 flex items-center gap-4">

        {/* ---------------------------------------------------------------- */}
        {/* Date                                                             */}
        {/* ---------------------------------------------------------------- */}

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 lg:flex"
        >
          <Calendar className="h-4 w-4" />

          <span>
            24 May 2024 - 24 Jun 2024
          </span>

          <ChevronDown className="h-4 w-4" />
        </button>

        {/* ---------------------------------------------------------------- */}
        {/* Branch                                                           */}
        {/* ---------------------------------------------------------------- */}

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 md:flex"
        >
          <MapPin className="h-4 w-4" />

          <span>
            All Branches
          </span>

          <ChevronDown className="h-4 w-4" />
        </button>

        {/* ---------------------------------------------------------------- */}
        {/* Notification                                                     */}
        {/* ---------------------------------------------------------------- */}

        <NotificationDropdown />

        {/* ---------------------------------------------------------------- */}
        {/* User                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex items-center gap-4 border-l border-gray-200 pl-4">

          <div className="hidden text-right sm:block">
            <h4 className="text-sm font-semibold text-gray-900">
              NeaPure Admin
            </h4>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 font-semibold text-white">
            A
          </div>

          <button
            type="button"
            onClick={() => {
              if (onLogout) {
                onLogout();
                return;
              }

              localStorage.removeItem(
                "access"
              );

              localStorage.removeItem(
                "refresh"
              );

              localStorage.removeItem(
                "user"
              );

              window.location.href =
                "/login";
            }}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}