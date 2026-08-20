"use client";

import { ChevronDown } from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  salesOverview: {
    English: "Sales Overview",
    Bangla: "বিক্রয় ওভারভিউ",
  },

  thisMonth: {
    English: "This Month",
    Bangla: "এই মাস",
  },

  purifiers: {
    English: "Purifiers",
    Bangla: "পিউরিফায়ার",
  },

  kits: {
    English: "Kits",
    Bangla: "কিট",
  },

  services: {
    English: "Services",
    Bangla: "সার্ভিস",
  },

  may17: {
    English: "17 May",
    Bangla: "১৭ মে",
  },

  may24: {
    English: "24 May",
    Bangla: "২৪ মে",
  },

  may31: {
    English: "31 May",
    Bangla: "৩১ মে",
  },

  jun07: {
    English: "07 Jun",
    Bangla: "০৭ জুন",
  },

  jun14: {
    English: "14 Jun",
    Bangla: "১৪ জুন",
  },

  jun21: {
    English: "21 Jun",
    Bangla: "২১ জুন",
  },

  jun28: {
    English: "28 Jun",
    Bangla: "২৮ জুন",
  },

  jul05: {
    English: "05 Jul",
    Bangla: "০৫ জুলাই",
  },

  jul12: {
    English: "12 Jul",
    Bangla: "১২ জুলাই",
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
   COMPONENT
========================================================= */

export default function SalesChart() {
  const { language } =
    useAdmin();

  /* =======================================================
     X AXIS LABELS
  ======================================================= */

  const xAxisLabels: TranslationKey[] = [
    "may17",
    "may24",
    "may31",
    "jun07",
    "jun14",
    "jun21",
    "jun28",
    "jul05",
    "jul12",
  ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Card
      className="
        col-span-1
        min-w-0
        overflow-hidden
        sm:col-span-2
        xl:col-span-6
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "salesOverview",
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
              px-2.5 py-1.5
              text-xs
              text-gray-600
              transition
              hover:bg-gray-50
              sm:px-3
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
          LEGEND
      ===================================================== */}

      <div
        className="
          mb-4
          flex
          flex-wrap
          items-center
          gap-x-5
          gap-y-2
        "
      >
        {/* Purifiers */}

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />

          <span className="text-xs text-gray-500">
            {t(
              "purifiers",
              language
            )}
          </span>
        </div>

        {/* Kits */}

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 shrink-0 rounded-full bg-green-500" />

          <span className="text-xs text-gray-500">
            {t(
              "kits",
              language
            )}
          </span>
        </div>

        {/* Services */}

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 shrink-0 rounded-full bg-purple-500" />

          <span className="text-xs text-gray-500">
            {t(
              "services",
              language
            )}
          </span>
        </div>
      </div>

      {/* =====================================================
          CHART
      ===================================================== */}

      <div
        className="
          relative
          h-52
          w-full
          sm:h-60
          lg:h-64
        "
      >
        <svg
          viewBox="0 0 500 230"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-label={t(
            "salesOverview",
            language
          )}
          role="img"
        >
          {/* ===============================================
              GRID
          =============================================== */}

          {[0, 40, 80, 120, 160, 200].map(
            (y) => (
              <line
                key={y}
                x1="25"
                y1={y}
                x2="495"
                y2={y}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            )
          )}

          {/* ===============================================
              Y AXIS
          =============================================== */}

          {[
            "50K",
            "40K",
            "30K",
            "20K",
            "10K",
            "0",
          ].map(
            (label, index) => (
              <text
                key={label}
                x="20"
                y={
                  index * 40 + 5
                }
                fontSize="10"
                fill="#9ca3af"
                textAnchor="end"
              >
                {label}
              </text>
            )
          )}

          {/* ===============================================
              X AXIS
          =============================================== */}

          {xAxisLabels.map(
            (label, index) => (
              <text
                key={label}
                x={
                  index * 58.5 +
                  30
                }
                y="222"
                fontSize="9"
                fill="#9ca3af"
                textAnchor="middle"
              >
                {t(
                  label,
                  language
                )}
              </text>
            )
          )}

          {/* ===============================================
              BLUE - PURIFIERS
          =============================================== */}

          <path
            d="
              M30,120
              Q60,100 120,110
              T240,90
              T360,70
              T480,50
            "
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* ===============================================
              GREEN - KITS
          =============================================== */}

          <path
            d="
              M30,160
              Q60,150 120,145
              T240,130
              T360,120
              T480,110
            "
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* ===============================================
              PURPLE - SERVICES
          =============================================== */}

          <path
            d="
              M30,180
              Q60,175 120,170
              T240,165
              T360,155
              T480,145
            "
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </Card>
  );
}