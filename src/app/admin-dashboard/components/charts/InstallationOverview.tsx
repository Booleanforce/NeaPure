"use client";

import { TrendingUp } from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   INSTALLATION DATA
========================================================= */

const installationData = [
  {
    label: "Completed",
    value: "980",
    color: "text-green-600",
  },

  {
    label: "In Progress",
    value: "168",
    color: "text-blue-600",
  },

  {
    label: "Scheduled",
    value: "70",
    color: "text-orange-600",
  },

  {
    label: "Cancelled",
    value: "30",
    color: "text-red-600",
  },
];

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  installationOverview: {
    English: "Installation Overview",
    Bangla: "ইনস্টলেশন ওভারভিউ",
  },

  installations: {
    English: "INSTALLATIONS",
    Bangla: "ইনস্টলেশন",
  },

  completed: {
    English: "Completed",
    Bangla: "সম্পন্ন",
  },

  inProgress: {
    English: "In Progress",
    Bangla: "চলমান",
  },

  scheduled: {
    English: "Scheduled",
    Bangla: "নির্ধারিত",
  },

  cancelled: {
    English: "Cancelled",
    Bangla: "বাতিল",
  },

  vsLast30Days: {
    English: "vs last 30 days",
    Bangla: "গত ৩০ দিনের তুলনায়",
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

function translateInstallationLabel(
  label: string,
  language: AdminLanguage
): string {
  switch (label) {
    case "Completed":
      return t(
        "completed",
        language
      );

    case "In Progress":
      return t(
        "inProgress",
        language
      );

    case "Scheduled":
      return t(
        "scheduled",
        language
      );

    case "Cancelled":
      return t(
        "cancelled",
        language
      );

    default:
      return label;
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function InstallationOverview() {
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
          "installationOverview",
          language
        )}
      />

      {/* =====================================================
          GAUGE CHART
      ===================================================== */}

      <div className="mb-4 flex w-full justify-center">
        <div
          className="
            relative
            h-24
            w-40
            max-w-full
            sm:h-28
            sm:w-44
          "
        >
          <svg
            viewBox="0 0 100 50"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Background Arc */}

            <path
              d="M10 50 A40 40 0 0 1 90 50"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Progress Arc */}

            <path
              d="M10 50 A40 40 0 0 1 90 50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="100 126"
            />
          </svg>

          {/* Center Value */}

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">

            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              1,248
            </h2>

            <p className="text-[9px] text-gray-500 sm:text-[10px]">
              {t(
                "installations",
                language
              )}
            </p>

          </div>
        </div>
      </div>

      {/* =====================================================
          GROWTH
      ===================================================== */}

      <div className="mb-4 flex min-w-0 items-center justify-center gap-1">

        <TrendingUp className="h-3 w-3 shrink-0 text-green-500" />

        <span className="shrink-0 text-xs font-semibold text-green-500">
          15.6%
        </span>

        <span className="min-w-0 truncate text-xs text-gray-400">
          {t(
            "vsLast30Days",
            language
          )}
        </span>

      </div>

      {/* =====================================================
          INSTALLATION STATS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          text-center
          sm:grid-cols-4
          sm:gap-2
        "
      >
        {installationData.map(
          (item) => (
            <div
              key={
                item.label
              }
              className="
                min-w-0
                rounded-lg
                bg-gray-50
                px-2
                py-2
              "
            >
              <p className="truncate text-[10px] text-gray-500">
                {translateInstallationLabel(
                  item.label,
                  language
                )}
              </p>

              <p
                className={`
                  text-sm
                  font-bold
                  ${item.color}
                `}
              >
                {item.value}
              </p>
            </div>
          )
        )}
      </div>
    </Card>
  );
}