// FilterLifeStatus.tsx
import { Cpu, Droplet, ShieldCheck, Sparkles } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

function FilterBar({
  label,
  percent,
  iconColor,
  barColor,
  icon: Icon,
}: {
  label: string;
  percent: number;
  iconColor: string;
  barColor: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-1 flex-col gap-8 rounded-xl border border-slate-100 p-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        {/* Figma: icon badge is white/very light, not a tinted color chip —
            the color lives in the icon glyph itself */}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </span>
        {label}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">
          Good
        </span>
        <span className="text-sm font-bold text-slate-800">{percent}% Left</span>
      </div>

      {/* Bar color is independent of icon color — Carbon Filter's icon is
          green but its bar is blue, matching Figma exactly */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <button className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-100 py-2 text-[11px] font-medium text-slate-500">
        <Sparkles className="h-3.5 w-3.5 text-blue-500" /> Simulate Clean
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

      {/* Mobile: stacked full-width cards; sm+: original 3-up row */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <FilterBar
          label="Sediment Filter"
          percent={85}
          iconColor="text-emerald-500"
          barColor="bg-emerald-500"
          icon={Droplet}
        />
        <FilterBar
        label="Sediment Filter"
          percent={72}
          iconColor="text-emerald-500"
          barColor="bg-emerald-500"
          icon={ShieldCheck}
        />
        <FilterBar
          label="RO Membrane"
          percent={65}
          iconColor="text-blue-500"
          barColor="bg-blue-400"
          icon={Cpu}
        />
      </div>

      <button className="w-full rounded-lg  bg-blue-50/40 py-2.5 text-xs font-semibold text-blue-600 sm:py-2">
        View All Filters <span className="ml-0.5">›</span>
      </button>
    </Card>
  );
}