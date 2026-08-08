// RecentServiceRequests.tsx
import { Layers, UserCheck, Wrench } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";

export default function RecentServiceRequests() {
  const rows = [
    { icon: <Wrench className="h-4 w-4" />, title: "General Service", time: "24 May 2024, 10:30 AM", status: "Completed" },
    { icon: <Layers className="h-4 w-4" />, title: "Filter Replacement", time: "10 Apr 2024, 02:15 PM", status: "Completed" },
    { icon: <UserCheck className="h-4 w-4" />, title: "Installation", time: "24 Mar 2024, 04:00 PM", status: "Completed" },
    { icon: <Layers className="h-4 w-4" />, title: "Maintenance Check", time: "15 May 2024, 11:30 AM", status: "Pending" },
  ];

  return (
    <Card className="flex flex-1 flex-col gap-3">
      <SectionHeader
        title="Recent Service History"
        actionLabel="View All"
        className="w-full"
      />

      <div className="flex flex-col gap-7">
        {rows.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between rounded-xl px-2 py-2.5 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                {r.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  {r.title}
                </p>
                <p className="text-[11px] text-slate-400">{r.time}</p>
              </div>
            </div>
            <StatusBadge
              label={r.status}
              tone={r.status === "Completed" ? "success" : "warning"}
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}