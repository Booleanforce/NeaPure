// FilterLifeStatus.tsx
import { Droplet, Filter, ShieldCheck } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

function FilterBar({
  label,
  percent,
  color,
  badgeBg,
  icon: Icon,
}: {
  label: string;
  percent: number;
  color: string;
  badgeBg: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-1 flex-col gap-8 rounded-xl border border-slate-100 p-3.5">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${badgeBg}`}
        >
          <Icon className={`h-3.5 w-3.5 ${color}`} />
        </span>
        {label}
      </div>

      {/* Figma: "GOOD" is a small gray uppercase tag, the percentage is bold
          dark text — not a green-colored percent like the previous version */}
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold uppercase tracking-wide text-emerald-600">
          Good
        </span>
        <span className="font-semibold text-slate-700">{percent}% Left</span>
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

export default function FilterLifeStatus() {
  return (
    <Card className="flex flex-1 flex-col gap-4">
      <SectionHeader
        title="Filter Life Status"
        actionLabel="View All Filters"
        className="w-full"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <FilterBar
          label="Sediment Filter"
          percent={85}
          color="text-blue-500"
          badgeBg="bg-blue-50"
          icon={Droplet}
        />
        <FilterBar
          label="Carbon Filter"
          percent={72}
          color="text-emerald-500"
          badgeBg="bg-emerald-50"
          icon={ShieldCheck}
        />
        <FilterBar
          label="RO Membrane"
          percent={65}
          color="text-violet-500"
          badgeBg="bg-violet-50"
          icon={Filter}
        />
      </div>

      {/* Figma shows a second, centered "View All Filters" link below the
          cards in addition to the top-right one */}
      <button className="mx-auto flex items-center text-xs font-medium text-blue-600">
        View All Filters <span className="ml-0.5">›</span>
      </button>
    </Card>
  );
}