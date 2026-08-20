// InstallationOverview.tsx

"use client";

import {
  Check,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";

import Image from "next/image";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TYPES
========================================================= */

type StepState =
  | "done"
  | "active"
  | "pending";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  installationTracking: {
    English: "Installation Tracking",
    Bangla: "ইনস্টলেশন ট্র্যাকিং",
  },

  orderPlaced: {
    English: "Order Placed",
    Bangla: "অর্ডার করা হয়েছে",
  },

  confirmed: {
    English: "Confirmed",
    Bangla: "নিশ্চিত হয়েছে",
  },

  technicianAssigned: {
    English: "Technician Assigned",
    Bangla: "টেকনিশিয়ান নির্ধারিত",
  },

  onTheWay: {
    English: "On The Way",
    Bangla: "পথে রয়েছে",
  },

  installed: {
    English: "Installed",
    Bangla: "ইনস্টল করা হয়েছে",
  },

  technician: {
    English: "Technician",
    Bangla: "টেকনিশিয়ান",
  },

  eta: {
    English: "ETA",
    Bangla: "সম্ভাব্য সময়",
  },

  trackLive: {
    English: "Track Live",
    Bangla: "লাইভ ট্র্যাক করুন",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: CustomerLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   STEP ICON
========================================================= */

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
        <Check
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          strokeWidth={3}
        />
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

/* =========================================================
   CONNECTOR
========================================================= */

function Connector({
  variant,
}: {
  variant:
    | "wavy"
    | "solid"
    | "none";
}) {
  if (variant === "none") {
    return (
      <div className="h-0.5 min-w-1 flex-1 bg-transparent" />
    );
  }

  if (variant === "wavy") {
    return (
      <svg
        viewBox="0 0 40 10"
        preserveAspectRatio="none"
        className="h-2.5 min-w-1 flex-1 text-emerald-400"
        aria-hidden="true"
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

  return (
    <div className="h-0.5 min-w-1 flex-1 bg-slate-200" />
  );
}

/* =========================================================
   LABEL STYLES
========================================================= */

function labelClasses(
  state: StepState
) {
  if (state === "done") {
    return "font-semibold text-emerald-600";
  }

  if (state === "active") {
    return "font-semibold text-blue-600";
  }

  return "font-medium text-slate-400";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function InstallationOverview() {
  const { language } = useUser();

  const steps: {
    label: string;
    state: StepState;
    icon: React.ReactNode;
  }[] = [
    {
      label: t(
        "orderPlaced",
        language
      ),
      state: "done",
      icon: (
        <Check
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          strokeWidth={3}
        />
      ),
    },

    {
      label: t(
        "confirmed",
        language
      ),
      state: "done",
      icon: (
        <Check
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          strokeWidth={3}
        />
      ),
    },

    {
      label: t(
        "technicianAssigned",
        language
      ),
      state: "done",
      icon: (
        <Check
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          strokeWidth={3}
        />
      ),
    },

    {
      label: t(
        "onTheWay",
        language
      ),
      state: "active",
      icon: (
        <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      ),
    },

    {
      label: t(
        "installed",
        language
      ),
      state: "pending",
      icon: (
        <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      ),
    },
  ];

  return (
    <Card
      padding="p-4 sm:p-6 lg:p-8"
      className="flex min-w-0 flex-[1_0_0] flex-col gap-5 self-stretch sm:gap-7"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "installationTracking",
          language
        )}
        className="w-full"
      />

      {/* =====================================================
          STEP TRACKING
      ===================================================== */}

      <div className="w-full min-w-0 overflow-hidden">
        <div className="flex w-full min-w-[420px] items-start sm:min-w-0">
          {steps.map((step, index) => {
            const previousDone =
              index > 0 &&
              steps[index - 1].state ===
                "done" &&
              step.state === "done";

            const nextDone =
              index <
                steps.length - 1 &&
              step.state === "done" &&
              steps[index + 1].state ===
                "done";

            return (
              <div
                key={step.label}
                className="flex min-w-0 flex-1 flex-col items-center"
              >
                {/* Step + connectors */}

                <div className="flex w-full items-center">
                  <Connector
                    variant={
                      index === 0
                        ? "none"
                        : previousDone
                        ? "wavy"
                        : "solid"
                    }
                  />

                  <StepIcon
                    state={step.state}
                    icon={step.icon}
                  />

                  <Connector
                    variant={
                      index ===
                      steps.length - 1
                        ? "none"
                        : nextDone
                        ? "wavy"
                        : "solid"
                    }
                  />
                </div>

                {/* Label */}

                <p
                  className={`mt-2 w-full px-0.5 text-center text-[8px] leading-tight sm:max-w-[72px] sm:text-[10px] ${labelClasses(
                    step.state
                  )}`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          TECHNICIAN INFORMATION
      ===================================================== */}

      <div className="flex w-full min-w-0 flex-col gap-3 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">

        {/* Technician */}

        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200">
            <Image
              src="https://i.pravatar.cc/72?img=13"
              alt="Jahid Hasan"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-700">
              {t(
                "technician",
                language
              )}{" "}
              <span className="font-medium">
                Jahid Hasan
              </span>
            </p>

            <p className="flex items-center gap-1 truncate text-[11px] text-slate-400">
              <MapPin className="h-3 w-3 shrink-0" />

              <span className="truncate">
                {t(
                  "eta",
                  language
                )}
                : 25 May 2024, 04:00 PM
              </span>
            </p>
          </div>
        </div>

        {/* Contact + Tracking */}

        <div className="flex w-full items-center gap-2 sm:w-auto">

          <span className="flex min-w-0 flex-1 items-center justify-center gap-1 rounded-2xl bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm sm:flex-none">
            <Phone className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

            <span className="truncate">
              01712345678
            </span>
          </span>

          <button
            type="button"
            className="flex-1 rounded-2xl bg-blue-600 px-3.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-blue-700 sm:flex-none"
          >
            {t(
              "trackLive",
              language
            )}
          </button>

        </div>
      </div>
    </Card>
  );
}