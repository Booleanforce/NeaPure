import { Camera, History, MapPin, QrCode, Wrench } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { ReminderBellIcon } from "../common/icons";

/**
 * Renamed from the old `ServiceShortcuts` to fill the requested
 * charts/ServiceOverview.tsx slot — it's an overview grid rather than a
 * literal chart, but it's the closest match in your actual dashboard.
 * Content and classes are unchanged.
 */
export default function ServiceOverview() {
  const items = [
    { icon: <Wrench className="h-5 w-5" />, label: "Service Requests", bg: "bg-pink-50", color: "text-pink-500", badge: 2 },
    { icon: <MapPin className="h-5 w-5" />, label: "Installation Tracking", bg: "bg-emerald-50", color: "text-emerald-500" },
    { icon: <Camera className="h-5 w-5" />, label: "Before & After Setup", bg: "bg-blue-50", color: "text-blue-500" },
    { icon: <QrCode className="h-5 w-5" />, label: "QR Code Service", bg: "bg-violet-50", color: "text-violet-500" },
    { icon: <History className="h-5 w-5" />, label: "Service History", bg: "bg-amber-50", color: "text-amber-500" },
    { icon: <ReminderBellIcon className="h-5 w-5" />, label: "Reminders & Alerts", bg: "bg-rose-50", color: "text-rose-500" },
  ];

  return (
    <Card padding="p-6" className="flex h-47 flex-col rounded-2xl">
      <SectionHeader title="Service Shortcuts" className="mb-5" />
      <div className="grid flex-1 grid-cols-3 gap-0 sm:grid-cols-6">
        {items.map((it) => (
          <button
  key={it.label}
  className="flex flex-col border border-[#F1F5F9CC]/50 py-4 w-47 items-center gap-2 text-center rounded-xl transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
>
  {/* Button content */}
            <div className="relative">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${it.bg} ${it.color}`}
              >
                {it.icon}
              </div>
              {it.badge && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  {it.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-tight text-slate-500">
              {it.label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
