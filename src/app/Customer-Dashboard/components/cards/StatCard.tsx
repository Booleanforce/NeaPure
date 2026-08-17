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
  subDate,
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
  subDate?:string;
  action: string;
}) {
  return (
    <Card className="flex min-w-0 w-77 h-38 flex-1 flex-col items-start">
      <div className="flex w-full items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold">{label}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className={`text-xl font-bold ${valueColor}`}>{value}</span>
            {badge && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            )}
          </div>
          <p className="text-[11px] text-slate-400">{sub}</p>
          <p className="text-[11px] font-bold">{subDate}</p>
        </div>
      </div>
      <div className="h-px w-full bg-[#F8FAFC] mt-4" />
      <div className="flex">
        <button className="text-xs font-bold text-blue-600 hover:underline hover:cursor-pointer">
        {action} 
      </button>
      <span className="ml-2 text-blue-600">›</span>
      </div>
    </Card>
  );
}
