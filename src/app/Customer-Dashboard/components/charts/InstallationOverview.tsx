// InstallationOverview.tsx
import { Check, MapPin, Package, Phone, Truck } from "lucide-react";
import Image from "next/image";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

type StepState = "done" | "active" | "pending";

function StepIcon({
  state,
  icon,
}: {
  state: StepState;
  icon: React.ReactNode;
}) {
  if (state === "done") {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm sm:h-8 sm:w-8">
        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm sm:h-8 sm:w-8">
        {icon}
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-300 sm:h-8 sm:w-8">
      {icon}
    </div>
  );
}

/**
 * Matches Figma's two connector styles: a wavy/squiggly line between
 * steps that are BOTH already completed ("Line 3" in the Illustrations
 * panel), and a plain straight line everywhere else (leading into the
 * active step, or between pending steps — "Line 2").
 */
function Connector({ variant }: { variant: "wavy" | "solid" | "none" }) {
  if (variant === "none") {
    return <div className="h-0.5 flex-1 bg-transparent" />;
  }
  if (variant === "wavy") {
    return (
      <svg
        viewBox="0 0 40 10"
        preserveAspectRatio="none"
        className="h-2.5 flex-1 text-emerald-400"
      >
        <path
          d="M0,5 C2.5,1 7.5,1 10,5 C12.5,9 17.5,9 20,5 C22.5,1 27.5,1 30,5 C32.5,9 37.5,9 40,5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return <div className="h-0.5 flex-1 bg-slate-200" />;
}

function labelClasses(state: StepState) {
  if (state === "done") return "font-semibold text-emerald-600";
  if (state === "active") return "font-semibold text-blue-600";
  return "font-medium text-slate-400";
}

export default function InstallationOverview() {
  const steps: { label: string; state: StepState; icon: React.ReactNode }[] = [
    { label: "Order Placed", state: "done", icon: <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} /> },
    { label: "Confirmed", state: "done", icon: <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} /> },
    { label: "Technician Assigned", state: "done", icon: <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} /> },
    { label: "On The Way", state: "active", icon: <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> },
    { label: "Installed", state: "pending", icon: <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> },
  ];

  return (
    <Card
      padding="p-10 sm:p-6"
      className="h-100 flex flex-[1_0_0] flex-col items-start justify-between gap-6 self-stretch sm:gap-10"
    >
      <SectionHeader className="font-bold text-[14px] text-black" title="Installation Tracking" />

      {/* Step row: icons shrink on mobile (see StepIcon) so 5 steps + labels
          still fit a ~320px card without wrapping the connecting lines. */}
      <div className="flex w-full items-start">
        {steps.map((step, i) => {
          const prevDoneToDone =
            i > 0 && steps[i - 1].state === "done" && step.state === "done";
          const nextDoneToDone =
            i < steps.length - 1 &&
            step.state === "done" &&
            steps[i + 1].state === "done";

          return (
            <div key={step.label} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <Connector variant={i === 0 ? "none" : prevDoneToDone ? "wavy" : "solid"} />
                <StepIcon state={step.state} icon={step.icon} />
                <Connector
                  variant={i === steps.length - 1 ? "none" : nextDoneToDone ? "wavy" : "solid"}
                />
              </div>
              <p
                className={`mt-2 max-w-13 text-center text-[9px] leading-tight sm:max-w-17.5 sm:text-[10px] ${labelClasses(
                  step.state
                )}`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Technician row was the real mobile break: name + ETA on the left and
          a phone pill + TrackLive button on the right, all in one
          justify-between row, don't fit a narrow card without squeezing or
          overflowing. Stack below sm, go back to the original side-by-side
          row from sm up. */}
      <div className="flex w-full flex-col gap-3 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200">
            <Image
              src="https://i.pravatar.cc/72?img=13"
              alt="Jahid Hasan"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-700">
              Technician <span className="font-medium">Jahid Hasan</span>
            </p>
            <p className="flex items-center gap-1 text-[11px] text-slate-400">
              <MapPin className="h-3 w-3 shrink-0" /> ETA: 25 May 2024, 04:00 PM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex flex-1 items-center justify-center gap-1 rounded-2xl bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm sm:flex-none">
            <Phone className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" /> 01712345678
          </span>
          <button className="flex-1 rounded-2xl bg-blue-600 px-3.5 py-1.5 text-[11px] font-semibold text-white sm:flex-none">
            TrackLive
          </button>
        </div>
      </div>
    </Card>
  );
}