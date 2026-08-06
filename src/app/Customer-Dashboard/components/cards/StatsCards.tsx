import { ShieldCheck, CheckCircle2, Clock, Award } from "lucide-react";
import StatCard from "./StatCard";

/**
 * Groups the 4 top stat cards that were previously written out inline in
 * Dashboard.tsx. Returned as a Fragment (no wrapping div) so it still
 * drops straight into the parent's 5-column CSS grid exactly as before —
 * each StatCard remains its own grid item.
 */
export default function StatsCards() {
  return (
    <>
      <StatCard
        icon={<ShieldCheck className="h-4 w-4" />}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        label="Warranty Status"
        value="Active"
        valueColor="text-slate-800"
        badge
        sub="Valid till 24 Aug 2026"
        action="View Warranty"
      />
      <StatCard
        icon={<CheckCircle2 className="h-4 w-4" />}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        label="Service Status"
        value="All Good"
        valueColor="text-emerald-600"
        badge
        sub="Last service on 24 May 2024"
        action="View Service History"
      />
      <StatCard
        icon={<Clock className="h-4 w-4" />}
        iconBg="bg-slate-100"
        iconColor="text-slate-500"
        label="Next Service Due"
        value="45 Days Left"
        valueColor="text-blue-600"
        sub="Estimated on 24 May 2024"
        action="Set reminder"
      />
      <StatCard
        icon={<Award className="h-4 w-4" />}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        label="Neapure Points"
        value="320"
        valueColor="text-blue-600"
        sub="Available points 24 May 2024"
        action="Redeem now"
      />
    </>
  );
}
