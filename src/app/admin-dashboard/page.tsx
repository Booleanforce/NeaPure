"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
import StatsCards from "./components/cards/StatsCards";
import SalesChart from "./components/charts/SalesChart";
import ServiceOverview from "./components/charts/ServiceOverview";
import InstallationOverview from "./components/charts/InstallationOverview";
import RecentServiceRequests from "./components/tables/RecentServiceRequests";
import TopTechnicians from "./components/tables/TopTechnicians";
import RevenueBreakdown from "./components/cards/RevenueBreakdown";
import QuickStats from "./components/cards/QuickStats";

export default function DashboardPage() {
  // const router = useRouter();


// const handleLogout = async () => {
//   console.log("Logout clicked");

//   await logout();

//   console.log("Logout completed");

//   router.replace("/login");
//   router.refresh();
// };

  return (
    <div className="space-y-6">
          {/* Stats */}

          <StatsCards />

          {/* Analytics */}

          <div className="grid grid-cols-12 gap-4">
            <SalesChart />

            <ServiceOverview />

            <InstallationOverview />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* KEEP THESE UNTIL WE REFACTOR THEM                                */}
          {/* ---------------------------------------------------------------- */}

          {/* Recent Service Requests */}

          <div className="grid grid-cols-12 gap-4">
            <RecentServiceRequests />

            <TopTechnicians />

            <RevenueBreakdown />
          </div>

          {/* Quick Stats */}

          <QuickStats />
      
    </div>
  );
}