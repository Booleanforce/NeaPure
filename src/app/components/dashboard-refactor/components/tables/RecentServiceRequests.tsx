import { ClipboardList, Droplet, Package, Wrench } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";

/**
 * Renamed from the old `RecentServiceHistory` to match the requested
 * tables/RecentServiceRequests.tsx name. Note: the heading text itself
 * ("Recent Service History") is left exactly as it was — only the
 * component/file name changed, not the displayed content.
 */
export default function RecentServiceRequests() {
  const rows = [
    { icon: <Wrench className="h-4 w-4" />, title: "General Service", time: "24 May 2024, 10:30 AM", status: "Completed" },
    { icon: <Droplet className="h-4 w-4" />, title: "Filter Replacement", time: "18 Apr 2024, 02:15 PM", status: "Completed" },
    { icon: <Package className="h-4 w-4" />, title: "Installation", time: "24 Mar 2024, 04:00 PM", status: "Completed" },
    { icon: <ClipboardList className="h-4 w-4" />, title: "Maintenance Check", time: "13 Mar 2024, 11:30 AM", status: "Pending" },
  ];

  return (
    <Card className="p-6">
      <SectionHeader
        title="Recent Service History"
        actionLabel="View All"
        className="w-full  mb-5"
      />

      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-slate-50"
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
