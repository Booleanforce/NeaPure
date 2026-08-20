"use client";

import {
  useState,
  type ReactNode,
} from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import { AdminProvider } from "./context/AdminContext";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [
    mobileNavOpen,
    setMobileNavOpen,
  ] = useState(false);

  const openMobileNav = () => {
    setMobileNavOpen(true);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <Sidebar
          isOpen={mobileNavOpen}
          onClose={closeMobileNav}
        />

        {/* =====================================================
            MAIN AREA

            Desktop:
            Reserve 256px for the fixed sidebar.

            Mobile:
            No margin because sidebar becomes an overlay.
        ===================================================== */}

        <div className="flex min-h-screen min-w-0 flex-col lg:ml-64">

          {/* ===================================================
              TOPBAR
          =================================================== */}

          <header className="sticky top-0 z-20 shrink-0 border-b border-gray-100 bg-white">
            <div className="px-3 py-3 sm:px-4 lg:px-5">
              <Topbar
                onMenuClick={openMobileNav}
              />
            </div>
          </header>

          {/* ===================================================
              CONTENT
          =================================================== */}

          <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
            <div className="w-full p-3 sm:p-4 lg:p-6">
              {children}
            </div>
          </main>

        </div>
      </div>
    </AdminProvider>
  );
}