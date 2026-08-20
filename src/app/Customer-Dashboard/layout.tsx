// app/dashboard/layout.tsx
"use client";

import {
  useState,
  type ReactNode,
} from "react";

import Sidebar from "./components/layout/Sidebar";
import { UserProvider } from "./context/UserContext";
import Topbar from "./components/layout/Topbar";


export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] =
    useState(false);

  return (
    <UserProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">

        {/* =========================================================
            SIDEBAR
        ========================================================= */}

        <Sidebar
          isOpen={mobileNavOpen}
          onClose={() =>
            setMobileNavOpen(false)
          }
        />

        {/* =========================================================
            MAIN CONTENT AREA
        ========================================================= */}

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* =======================================================
              TOPBAR
          ======================================================= */}

          <header className="sticky top-0 z-20 border-b border-slate-100 bg-white px-4 py-3 sm:px-5">
            <Topbar
              onMenuClick={() =>
                setMobileNavOpen(true)
              }
            />
          </header>

          {/* =======================================================
              PAGE CONTENT
          ======================================================= */}

          <main className="flex-1 overflow-y-auto p-3 sm:p-5">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4">
              {children}
            </div>
          </main>

        </div>
      </div>
    </UserProvider>
  );
}