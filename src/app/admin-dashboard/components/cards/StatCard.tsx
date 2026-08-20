"use client";

import type { ElementType } from "react";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import Card from "../common/Card";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   TYPES
========================================================= */

type StatColor =
  | "blue"
  | "cyan"
  | "green"
  | "purple"
  | "orange";

interface StatCardProps {
  icon: ElementType;
  color: StatColor;
  title: string;
  value: string;
  change: string;
  up: boolean;
}

/* =========================================================
   COLORS
========================================================= */

const colors: Record<
  StatColor,
  {
    bg: string;
    text: string;
    stroke: string;
  }
> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    stroke: "#3b82f6",
  },

  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    stroke: "#06b6d4",
  },

  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    stroke: "#10b981",
  },

  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    stroke: "#8b5cf6",
  },

  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    stroke: "#f97316",
  },
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  "Total Customers": {
    English: "Total Customers",
    Bangla: "মোট গ্রাহক",
  },

  "Total Purifiers": {
    English: "Total Purifiers",
    Bangla: "মোট পিউরিফায়ার",
  },

  "Active Warranties": {
    English: "Active Warranties",
    Bangla: "সক্রিয় ওয়ারেন্টি",
  },

  "Total Services": {
    English: "Total Services",
    Bangla: "মোট সার্ভিস",
  },

  "Total Revenue": {
    English: "Total Revenue",
    Bangla: "মোট রাজস্ব",
  },

  "vs last 30 days": {
    English: "vs last 30 days",
    Bangla: "গত ৩০ দিনের তুলনায়",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION
========================================================= */

function translateText(
  text: string,
  language: AdminLanguage
): string {
  const translation =
    TRANSLATIONS[
      text as TranslationKey
    ];

  return translation
    ? translation[language]
    : text;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function StatCard({
  icon: Icon,
  color,
  title,
  value,
  change,
  up,
}: StatCardProps) {
  const { language } =
    useAdmin();

  const theme =
    colors[color];

  const translatedTitle =
    translateText(
      title,
      language
    );

  const translatedComparison =
    translateText(
      "vs last 30 days",
      language
    );

  return (
    <Card
      className="
        group
        min-w-0
        overflow-hidden
        p-3
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        sm:p-4
        lg:p-5
      "
    >
      {/* =====================================================
          TOP
      ===================================================== */}

      <div className="flex items-start justify-between gap-2">

        {/* Icon */}

        <div
          className={`
            flex
            h-9 w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${theme.bg}

            sm:h-10
            sm:w-10
          `}
        >
          <Icon
            className={`
              h-4 w-4
              ${theme.text}

              sm:h-5
              sm:w-5
            `}
          />
        </div>

        {/* Change badge */}

        <div
          className={`
            flex
            shrink-0
            items-center
            gap-0.5
            rounded-full
            px-1.5
            py-1
            text-[8px]
            font-semibold

            sm:px-2
            sm:text-[9px]

            ${
              up
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }
          `}
        >
          {up ? (
            <TrendingUp className="h-2.5 w-2.5 shrink-0" />
          ) : (
            <TrendingDown className="h-2.5 w-2.5 shrink-0" />
          )}

          <span>
            {change}
          </span>
        </div>
      </div>

      {/* =====================================================
          TITLE
      ===================================================== */}

      <div className="mt-3 min-w-0">

        <p
          className="
            min-h-[30px]
            text-[10px]
            font-medium
            leading-4
            text-gray-500

            sm:text-xs
          "
          title={translatedTitle}
        >
          {translatedTitle}
        </p>

        {/* Value */}

        <h2
          className="
            mt-1
            truncate
            text-[18px]
            font-bold
            leading-tight
            tracking-tight
            text-gray-900

            sm:text-xl
            lg:text-2xl
          "
          title={value}
        >
          {value}
        </h2>

      </div>

      {/* =====================================================
          COMPARISON
      ===================================================== */}

      <div className="mt-2 flex min-w-0 items-center gap-1">

        <span
          className={`
            shrink-0
            text-[9px]
            font-semibold

            ${
              up
                ? "text-emerald-600"
                : "text-red-500"
            }
          `}
        >
          {up ? "↗" : "↘"}
        </span>

        <span className="min-w-0 truncate text-[8px] text-gray-400 sm:text-[9px]">
          {translatedComparison}
        </span>

      </div>

      {/* =====================================================
          MINI CHART
      ===================================================== */}

      <div className="mt-3 h-6 w-full sm:h-8">

        <svg
          viewBox="0 0 100 30"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* baseline */}

          <line
            x1="0"
            y1="27"
            x2="100"
            y2="27"
            stroke="#f3f4f6"
            strokeWidth="1"
          />

          {/* chart */}

          <path
            d="
              M0,25
              Q10,20 20,22
              T40,15
              T60,18
              T80,10
              T100,5
            "
            fill="none"
            stroke={theme.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

      </div>
    </Card>
  );
}