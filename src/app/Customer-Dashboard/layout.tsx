// app/dashboard/layout.tsx
"use client";

import { useState, type ReactNode } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* sticky + z-10 keeps this pinned while <main> scrolls beneath it */}
        <header className="sticky top-0 z-10 border-b border-slate-100 bg-white px-4 py-3 sm:px-5">
          <Topbar onMenuClick={() => setMobileNavOpen(true)} />
        </header>

        <main className="flex-1 overflow-y-auto p-3 sm:p-5">
          <div className="flex w-full flex-col gap-4">{children}</div>
        </main>
      </div>
    </div>
  );
}