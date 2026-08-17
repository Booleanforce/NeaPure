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
    <Card className="flex w-full flex-col h-117">
      <SectionHeader title="Quick Actions" className=" text-[#1D293D] font-bold text-sm w-full mb-3" />
      <div className="flex flex-col gap-3 divide-y divide-slate-100">
        {actions.map((a) => (
          <button
            key={a.title}
            className="flex w-full items-center bg-[#F1F5F980] rounded-2xl gap-3 px-2 py-4 text-left hover:bg-slate-50 hover:underline hover:cursor-pointer"
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