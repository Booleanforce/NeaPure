import { CheckCircle2 } from "lucide-react";
import Card from "../common/Card";

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
    <Card className="flex flex-1 flex-col items-start gap-3">
      <div className="flex w-full items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
      </div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className={`text-base font-bold ${valueColor}`}>{value}</span>
          {badge && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
        </div>
      </div>

      <p className="text-[11px] text-slate-400">{sub}</p>

      <button className="text-xs font-medium text-blue-600 hover:underline">
        {action} <span className="ml-0.5">›</span>
      </button>
    </Card>
  );
}
