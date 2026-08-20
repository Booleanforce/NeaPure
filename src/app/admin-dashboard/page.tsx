"use client";

import StatsCards from "./components/cards/StatsCards";
import SalesChart from "./components/charts/SalesChart";
import ServiceOverview from "./components/charts/ServiceOverview";
import InstallationOverview from "./components/charts/InstallationOverview";
import RecentServiceRequests from "./components/tables/RecentServiceRequests";
import TopTechnicians from "./components/tables/TopTechnicians";
import RevenueBreakdown from "./components/cards/RevenueBreakdown";
import QuickStats from "./components/cards/QuickStats";

export default function DashboardPage() {
  return (
    <div className="min-w-0 space-y-6">

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="min-w-0">
        <StatsCards />
      </section>

      {/* =========================================================
          ANALYTICS

          Mobile  -> 1 column
          Tablet  -> 2 columns
          Desktop -> 12-column dashboard
      ========================================================= */}

      <section className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">

        <SalesChart />

        <ServiceOverview />

        <InstallationOverview />

      </section>

      {/* =========================================================
          RECENT REQUESTS / TOP TECHNICIANS / REVENUE

          Mobile  -> 1 column
          Tablet  -> 2 columns
          Desktop -> 12-column dashboard
      ========================================================= */}

      <section className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">

        <RecentServiceRequests />

        <TopTechnicians />

        <RevenueBreakdown />

      </section>

      {/* =========================================================
          QUICK STATS
      ========================================================= */}

      <section className="min-w-0">
        <QuickStats />
      </section>

    </div>
  );
}