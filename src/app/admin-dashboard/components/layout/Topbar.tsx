"use client";

import {
  Search,
  Calendar,
  ChevronDown,
  MapPin,
  Bell,
} from "lucide-react";

interface Props {
  onLogout?: () => void;
}

export default function Topbar({
  onLogout,
}: Props) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">

      {/* Search */}

      <div className="max-w-md flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">

        {/* Date */}

        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">

          <Calendar className="h-4 w-4" />

          <span>24 May 2024 - 24 Jun 2024</span>

          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Branch */}

        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">

          <MapPin className="h-4 w-4" />

          <span>All Branches</span>

          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Notification */}

        <button className="relative rounded-lg p-2 hover:bg-gray-100">

          <Bell className="h-5 w-5 text-gray-600" />

          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            15
          </span>
        </button>

        {/* User */}

        <div className="flex items-center gap-4 border-l border-gray-200 pl-4">

          <div className="text-right">
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
            onClick={() => {
              if (onLogout) {
                onLogout();
              } else {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("user");

                window.location.href = "/login";
              }
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