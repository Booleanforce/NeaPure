// app/dashboard/page.tsx
// Sidebar and Topbar now live in layout.tsx, so this file only needs the
// actual dashboard content. It's automatically wrapped by DashboardLayout.

import AccountVerification from "./components/cards/AccountVerification";
import NeedHelp from "./components/cards/NeedHelp";
import ProductPanel from "./components/cards/ProductPanel";
import PromoCard from "./components/cards/PromoCard";
import QuickActions from "./components/cards/QuickActions";
import StatsCards from "./components/cards/StatsCards";
import FilterLifeStatus from "./components/charts/FilterLifeStatus";
import InstallationOverview from "./components/charts/InstallationOverview";
import ServiceOverview from "./components/charts/ServiceOverview";
import RecentServiceRequests from "./components/tables/RecentServiceRequests";

export default function DashboardPage() {
  return (
    <>
      {/* Stat cards + Account Verification/Quick Actions sidebar + Service
          Overview all share one 5-column grid so the right-hand sidebar
          (Account Verification + Quick Actions) can span all three rows,
          matching the Figma layout. */}
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCards />

        <div className="row-span-3 flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <AccountVerification />
          <QuickActions />
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <ProductPanel />
        </div>
        <div className="sm:col-span-2 lg:col-span-2">
          <InstallationOverview />
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <ServiceOverview />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_0.85fr]">
        <FilterLifeStatus />
        <RecentServiceRequests />
        <div className="flex flex-col gap-4">
          <PromoCard />
          <NeedHelp />
        </div>
      </div>
    </>
  );
}