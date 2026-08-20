"use client";

import { ChevronDown } from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import { revenue } from "../../data/revenue";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  revenueBreakdown: {
    English: "Revenue Breakdown",
    Bangla: "রাজস্বের বিবরণ",
  },

  thisMonth: {
    English: "This Month",
    Bangla: "এই মাস",
  },

  totalRevenue: {
    English: "TOTAL REVENUE",
    Bangla: "মোট রাজস্ব",
  },

  purifiers: {
    English: "Purifiers",
    Bangla: "পিউরিফায়ার",
  },

  replacementKits: {
    English: "Replacement Kits",
    Bangla: "রিপ্লেসমেন্ট কিট",
  },

  services: {
    English: "Services",
    Bangla: "সার্ভিস",
  },

  others: {
    English: "Others",
    Bangla: "অন্যান্য",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: AdminLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   LABEL TRANSLATION
========================================================= */

function translateRevenueLabel(
  label: string,
  language: AdminLanguage
): string {
  const normalized =
    label.trim().toLowerCase();

  switch (normalized) {
    case "purifiers":
      return t(
        "purifiers",
        language
      );

    case "replacement kits":
      return t(
        "replacementKits",
        language
      );

    case "services":
      return t(
        "services",
        language
      );

    case "others":
      return t(
        "others",
        language
      );

    default:
      return label;
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function RevenueBreakdown() {
  const { language } =
    useAdmin();

  return (
    <Card
      className="
        col-span-1
        min-w-0
        sm:col-span-2
        xl:col-span-3
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "revenueBreakdown",
          language
        )}
        action={
          <button
            type="button"
            className="
              flex shrink-0
              items-center gap-1
              rounded-lg
              border border-gray-200
              px-2 py-1
              text-xs
              text-gray-600
              transition
              hover:bg-gray-50
            "
          >
            <span>
              {t(
                "thisMonth",
                language
              )}
            </span>

            <ChevronDown className="h-3 w-3 shrink-0" />
          </button>
        }
      />

      {/* =====================================================
          DONUT CHART
      ===================================================== */}

      <div className="mb-4 flex w-full justify-center">
        <div
          className="
            relative
            h-28 w-28
            sm:h-32 sm:w-32
          "
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full -rotate-90"
            aria-label={t(
              "revenueBreakdown",
              language
            )}
          >
            {/* Background */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="14"
            />

            {/* Purifiers */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="14"
              strokeDasharray="158 251"
              strokeLinecap="butt"
            />

            {/* Replacement Kits */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="14"
              strokeDasharray="57 251"
              strokeDashoffset="-158"
              strokeLinecap="butt"
            />

            {/* Services */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f97316"
              strokeWidth="14"
              strokeDasharray="31 251"
              strokeDashoffset="-215"
              strokeLinecap="butt"
            />

            {/* Others */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="14"
              strokeDasharray="5 251"
              strokeDashoffset="-246"
              strokeLinecap="butt"
            />
          </svg>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
            <h2 className="text-sm font-bold text-gray-900 sm:text-base">
              ৳24,85,600
            </h2>

            <p className="mt-0.5 text-[8px] leading-tight text-gray-500 sm:text-[9px]">
              {t(
                "totalRevenue",
                language
              )}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          REVENUE LIST
      ===================================================== */}

      <div className="space-y-2">

        {revenue.map(
          (item) => (
            <div
              key={item.label}
              className="
                flex min-w-0
                items-center
                justify-between
                gap-2
                text-xs
              "
            >
              {/* Left */}

              <div className="flex min-w-0 items-center gap-2">

                <div
                  className={`
                    h-2 w-2
                    shrink-0
                    rounded-full
                    ${item.color}
                  `}
                />

                <span className="min-w-0 truncate text-gray-600">
                  {translateRevenueLabel(
                    item.label,
                    language
                  )}
                </span>

              </div>

              {/* Right */}

              <div className="flex shrink-0 items-center text-right">

                <span className="font-semibold text-gray-900">
                  {item.value}
                </span>

                <span className="ml-1 text-gray-400">
                  {item.pct}
                </span>

              </div>
            </div>
          )
        )}

      </div>
    </Card>
  );
}