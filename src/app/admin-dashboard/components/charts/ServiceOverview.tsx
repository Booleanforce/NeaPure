"use client";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   SERVICE DATA
========================================================= */

const serviceData = [
  {
    label: "Completed",
    value: "1,560",
    pct: "(62.8%)",
    color: "bg-green-500",
  },

  {
    label: "In Progress",
    value: "540",
    pct: "(21.7%)",
    color: "bg-blue-500",
  },

  {
    label: "Pending",
    value: "264",
    pct: "(10.6%)",
    color: "bg-orange-500",
  },

  {
    label: "Cancelled",
    value: "122",
    pct: "(4.9%)",
    color: "bg-red-500",
  },
];

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  serviceRequestOverview: {
    English: "Service Request Overview",
    Bangla: "সার্ভিস অনুরোধের ওভারভিউ",
  },

  totalRequests: {
    English: "TOTAL REQUESTS",
    Bangla: "মোট অনুরোধ",
  },

  completed: {
    English: "Completed",
    Bangla: "সম্পন্ন",
  },

  inProgress: {
    English: "In Progress",
    Bangla: "চলমান",
  },

  pending: {
    English: "Pending",
    Bangla: "অপেক্ষমাণ",
  },

  cancelled: {
    English: "Cancelled",
    Bangla: "বাতিল",
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
   SERVICE LABEL TRANSLATION
========================================================= */

function translateServiceLabel(
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

    case "Pending":
      return t(
        "pending",
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

export default function ServiceOverview() {
  const { language } =
    useAdmin();

  return (
    <Card
      className="
        col-span-1
        min-w-0
        overflow-hidden
        sm:col-span-2
        xl:col-span-3
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "serviceRequestOverview",
          language
        )}
      />

      {/* =====================================================
          DONUT CHART
      ===================================================== */}

      <div className="mb-4 flex w-full justify-center">
        <div
          className="
            relative
            h-32 w-32
            sm:h-36 sm:w-36
            lg:h-40 lg:w-40
          "
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full -rotate-90"
            preserveAspectRatio="xMidYMid meet"
            aria-label={t(
              "serviceRequestOverview",
              language
            )}
            role="img"
          >
            {/* =============================================
                BACKGROUND
            ============================================= */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="12"
            />

            {/* =============================================
                COMPLETED
            ============================================= */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray="188 251"
              strokeDashoffset="0"
            />

            {/* =============================================
                IN PROGRESS
            ============================================= */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="12"
              strokeDasharray="54 251"
              strokeDashoffset="-188"
            />

            {/* =============================================
                PENDING
            ============================================= */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f97316"
              strokeWidth="12"
              strokeDasharray="26 251"
              strokeDashoffset="-242"
            />

            {/* =============================================
                CANCELLED
            ============================================= */}

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              strokeDasharray="12 251"
              strokeDashoffset="-268"
            />
          </svg>

          {/* ===============================================
              CENTER VALUE
          =============================================== */}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              2,486
            </h2>

            <p className="mt-0.5 text-[8px] leading-tight text-gray-500 sm:text-[10px]">
              {t(
                "totalRequests",
                language
              )}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          SERVICE LIST
      ===================================================== */}

      <div className="space-y-2">

        {serviceData.map(
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
              {/* ===========================================
                  LABEL
              =========================================== */}

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
                  {translateServiceLabel(
                    item.label,
                    language
                  )}
                </span>

              </div>

              {/* ===========================================
                  VALUE
              =========================================== */}

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