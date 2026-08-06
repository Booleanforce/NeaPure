import { Check, MapPin, Package, Phone, Truck } from "lucide-react";
import Image from "next/image";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

function StepIcon({
  state,
  icon,
}: {
  state: "done" | "active" | "pending";
  icon: React.ReactNode;
}) {
  if (state === "done") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
        <Check className="h-4 w-4" strokeWidth={3} />
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
        {icon}
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-300">
      {icon}
    </div>
  );
}

/**
 * Renamed from the old `InstallationTracking`. This is the closest thing
 * your dashboard has to a "chart" (a step/progress visualization), so it
 * fills the charts/InstallationOverview.tsx slot from the requested
 * architecture. Content and classes are unchanged.
 */
export default function InstallationOverview() {
  const steps = [
    { label: "Order Placed", state: "done" as const, icon: <Check className="h-4 w-4" strokeWidth={3} /> },
    { label: "Confirmed", state: "done" as const, icon: <Check className="h-4 w-4" strokeWidth={3} /> },
    { label: "Technician Assigned", state: "done" as const, icon: <Check className="h-4 w-4" strokeWidth={3} /> },
    { label: "On The Way", state: "active" as const, icon: <Truck className="h-4 w-4" /> },
    { label: "Installed", state: "pending" as const, icon: <Package className="h-4 w-4" /> },
  ];

  return (
    <Card padding="p-6" className="flex flex-[1_0_0] flex-col items-start justify-between gap-15 self-stretch">
      <SectionHeader title="Installation Tracking" />

      <div className="flex w-full items-start">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div
                className={`h-0.5 flex-1 ${
                  i === 0
                    ? "bg-transparent"
                    : steps[i - 1].state === "done" || (steps[i - 1].state === "active" && step.state !== "pending")
                    ? "bg-emerald-400"
                    : "bg-slate-200"
                }`}
              />
              <StepIcon state={step.state} icon={step.icon} />
              <div
                className={`h-0.5 flex-1 ${
                  i === steps.length - 1
                    ? "bg-transparent"
                    : step.state === "done"
                    ? "bg-emerald-400"
                    : "bg-slate-200"
                }`}
              />
            </div>
            <p className="mt-2 max-w-[70px] text-center text-[10px] leading-tight text-slate-500">
              {step.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-slate-200">
            <Image
              src="https://i.pravatar.cc/72?img=13"
              alt="Jahid Hasan"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">
              Technician <span className="font-medium">Jahid Hasan</span>
            </p>
            <p className="flex items-center gap-1 text-[11px] text-slate-400">
              <MapPin className="h-3 w-3" /> ETA: 25 May 2024, 04:00 PM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-2xl bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm">
            <Phone className="h-5 w-5" /> 01712345678
          </span>
          <button className="rounded-2xl bg-blue-600 px-3.5 py-1.5 text-[11px] font-semibold text-white">
            TrackLive
          </button>
        </div>
      </div>
    </Card>
  );
}
