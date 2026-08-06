// app/dashboard/layout.tsx
// (Place this wherever your route group lives — e.g. app/(dashboard)/layout.tsx
// if you're using a route group. Adjust the "./components/..." import paths
// to match this file's actual location.)

import type { ReactNode } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar renders once here and stays mounted across every
          page in this route segment, instead of remounting per page. */}
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {/* Topbar is also shared across all dashboard pages now. */}
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex max-w-[1200px] flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}