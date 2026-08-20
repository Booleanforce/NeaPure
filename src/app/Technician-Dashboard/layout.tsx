import type { Metadata } from "next";

import { TechnicianProvider } from "./context/TechnicianContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

export const metadata: Metadata = {
  title: "Technician Dashboard - NeaPure",
  description: "Technician work overview dashboard",
};

export default function TechnicianDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TechnicianProvider>
      <div className="min-h-screen bg-gray-50">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <Sidebar />

        {/* =====================================================
            MAIN AREA
        ===================================================== */}

        <div className="ml-64 min-h-screen">

          {/* ===================================================
              HEADER
          =================================================== */}

          <Header />

          {/* ===================================================
              PAGE CONTENT
          =================================================== */}

          <main className="min-h-[calc(100vh-73px)] p-4 sm:p-6 lg:p-8">
            {children}
          </main>

        </div>
      </div>
    </TechnicianProvider>
  );
}