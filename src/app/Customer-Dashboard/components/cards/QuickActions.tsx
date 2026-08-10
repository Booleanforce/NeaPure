import {
  ChevronRight,
  ClipboardList,
  QrCode,
  Users,
  CalendarCheck,
} from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { ReplacementKitIcon } from "../common/icons";

export default function QuickActions() {
  const actions = [
    {
      icon: <CalendarCheck className="h-4 w-4" />,
      title: "Book a Service",
      sub: "Request a new service",
    },
    {
      icon: <QrCode className="h-4 w-4" />,
      title: "QR Code Service",
      sub: "Scan & request service",
    },
    {
      icon: <ReplacementKitIcon className="h-4 w-4" />,
      title: "Buy Replacement Kit",
      sub: "Genuine NeaPure kits",
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Manual Emergency Attendance",
      sub: "Mark attendance manually",
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Refer & Earn",
      sub: "Invite friends & earn points",
    },
  ];

  return (
    <Card className="flex w-full flex-col">
      <SectionHeader title="Quick Actions" className="mb-1 w-full" />
      <div className="flex flex-col divide-y divide-slate-100">
        {actions.map((a) => (
          <button
            key={a.title}
            className="flex w-full items-center gap-3 py-4 text-left hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              {a.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-700">
                {a.title}
              </p>
              <p className="text-[11px] text-slate-400">{a.sub}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
          </button>
        ))}
      </div>
    </Card>
  );
}