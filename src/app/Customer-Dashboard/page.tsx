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
      <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-5">
        <StatsCards />

        {/* row-span-3 only applies at lg, where this column actually sits
            beside 3 stacked rows of content. Below lg it's just two cards
            stacked in normal flow, spanning the full 2-col width so it
            doesn't get squeezed into a single 160px column. */}
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1 lg:row-span-3">
          <AccountVerification />
          <QuickActions />
        </div>

        <div className="col-span-2 lg:col-span-2">
          <ProductPanel />
        </div>
        <div className="col-span-2 lg:col-span-2">
          <InstallationOverview />
        </div>

        <div className="col-span-2 lg:col-span-4">
          <ServiceOverview />
        </div>
      </div>

      {/* Bottom row — equal thirds, matching the ~equal container widths
          in Figma (Filter Life Status / Recent Service History / Promo +
          Need Help all measure to roughly the same width). The previous
          0.85fr third column was too narrow, which is what forced the
          PromoCard illustration and badge to overlap. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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