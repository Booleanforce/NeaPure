// StatCard.tsx
import { CheckCircle2 } from "lucide-react";
import Card from "../common/Card";

/**
 * Mobile: added min-w-0 to the Card so this can actually shrink inside a
 * flex/grid parent (StatsCards sits in a grid that goes to 2 columns at sm,
 * and without min-w-0 a flex/grid item won't shrink below its content's
 * intrinsic width, which can cause the row to overflow). Icon box got
 * shrink-0 for the same reason. Text/button already wrap naturally
 * (no whitespace-nowrap), so no other changes needed.
 */
export default function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  valueColor,
  badge,
  sub,
  action,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  valueColor: string;
  badge?: boolean;
  sub: string;
  action: string;
}) {
  return (
    <Card className="flex min-w-0 flex-1 flex-col items-start gap-3">
      <div className="flex w-full items-start justify-between">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
      </div>

      <div className="min-w-0 w-full">
        <p className="text-xs text-slate-400">{label}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className={`text-base font-bold ${valueColor}`}>{value}</span>
          {badge && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
        </div>
      </div>

      <p className="text-[11px] text-slate-400">{sub}</p>

      <button className="text-xs font-medium text-blue-600 hover:underline">
        {action} <span className="ml-0.5">›</span>
      </button>
    </Card>
  );
}