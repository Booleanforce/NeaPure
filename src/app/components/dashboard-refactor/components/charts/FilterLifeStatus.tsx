import { Droplet } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

function FilterBar({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl border border-slate-100 p-3.5">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <Droplet className={`h-3.5 w-3.5 ${color}`} />
        {label}
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-emerald-600">Good</span>
        <span className="text-slate-400">{percent}% Left</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <button className="mt-1 rounded-lg border border-slate-100 py-1.5 text-[11px] font-medium text-slate-500">
        Simulate Clean
      </button>
    </div>
  );
}

/**
 * Not one of the 3 files literally named in the requested charts/ folder
 * (SalesChart / ServiceOverview / InstallationOverview), but it's a
 * progress-bar data visualization, so it belongs here rather than in
 * cards/ or tables/. There's no "SalesChart" equivalent in your dashboard
 * at all — no sales/revenue data exists anywhere in the current app, so
 * that file was intentionally not created rather than fabricated.
 */
export default function FilterLifeStatus() {
  return (
    <Card className="flex flex-1 flex-col gap-4">
      <SectionHeader
        title="Filter Life Status"
        actionLabel="View All Filters"
        className="w-full"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <FilterBar label="Sediment Filter" percent={85} color="text-blue-500" />
        <FilterBar label="Carbon Filter" percent={72} color="text-emerald-500" />
        <FilterBar label="RO Membrane" percent={65} color="text-violet-500" />
      </div>
    </Card>
  );
}
