// app/page.tsx (or app/dashboard/page.tsx — put it wherever your router
// expects this route; adjust the relative "../components/..." import paths
// below to match that location, e.g. "@/components/..." if you have that
// alias set up).

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar"; // Assuming this is the correct path

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

export default function dashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex max-w-[1200px] flex-col gap-6">
          <Topbar />

          {/* Stat cards + Account Verification/Quick Actions sidebar + Service
              Overview all share one 5-column grid so the right-hand sidebar
              (Account Verification + Quick Actions) can span all three rows,
              matching the Figma layout. Same grid as before — only the
              pieces inside are now imported components instead of inline
              JSX. */}
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
        </div>
      </main>
    </div>
  );
}
