"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import Card from "../common/Card";

import { quickStats } from "../../data/quickStats";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   COLORS
========================================================= */

const colors = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
  },

  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
  },

  pink: {
    bg: "bg-pink-50",
    text: "text-pink-600",
  },

  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
  },

  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
  },

  green: {
    bg: "bg-green-50",
    text: "text-green-600",
  },
} as const;

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  quickStats: {
    English: "Quick Stats",
    Bangla: "দ্রুত পরিসংখ্যান",
  },

  online: {
    English: "Online",
    Bangla: "অনলাইন",
  },

  "New Customers": {
    English: "New Customers",
    Bangla: "নতুন গ্রাহক",
  },

  "New Purifiers Sold": {
    English: "New Purifiers Sold",
    Bangla: "নতুন পিউরিফায়ার বিক্রি",
  },

  "Kits Sold": {
    English: "Kits Sold",
    Bangla: "বিক্রিত কিট",
  },

  "Today's Services": {
    English: "Today's Services",
    Bangla: "আজকের সার্ভিস",
  },

  "Pending Requests": {
    English: "Pending Requests",
    Bangla: "অপেক্ষমাণ অনুরোধ",
  },

  "Active Technicians": {
    English: "Active Technicians",
    Bangla: "সক্রিয় টেকনিশিয়ান",
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
   STAT TITLE TRANSLATION
========================================================= */

function translateStatTitle(
  title: string,
  language: AdminLanguage
): string {
  const key =
    title as TranslationKey;

  return TRANSLATIONS[key]
    ? t(key, language)
    : title;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function QuickStats() {
  const {
    language,
  } = useAdmin();

  return (
    <section className="min-w-0">

      {/* =====================================================
          SECTION TITLE
      ===================================================== */}

      <h3
        className="
          mb-4
          text-lg
          font-bold
          text-gray-900
          sm:text-xl
        "
      >
        {t(
          "quickStats",
          language
        )}
      </h3>

      {/* =====================================================
          RESPONSIVE GRID

          Mobile  → 2 columns
          Tablet  → 3 columns
          Desktop → 6 columns
      ===================================================== */}

      <div
        className="
          grid
          min-w-0
          grid-cols-2
          gap-3
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-6
          xl:gap-4
        "
      >

        {quickStats.map(
          (stat) => {
            const theme =
              colors[
                stat.color as keyof typeof colors
              ] ?? colors.blue;

            const translatedTitle =
              translateStatTitle(
                stat.title,
                language
              );

            const isOnline =
              stat.change ===
              "Online";

            return (
              <Card
                key={
                  stat.title
                }
                className="
                  min-w-0
                  overflow-hidden
                  p-3
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                  sm:p-4
                "
              >
                {/* =========================================
                    TOP
                ========================================= */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-2
                  "
                >

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
                    <stat.icon
                      className={`
                        h-4 w-4
                        ${theme.text}

                        sm:h-5
                        sm:w-5
                      `}
                    />
                  </div>

                  {/* Change */}

                  {isOnline ? (
                    <span
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                        rounded-full
                        bg-emerald-50
                        px-1.5
                        py-1
                        text-[8px]
                        font-semibold
                        text-emerald-600

                        sm:px-2
                        sm:text-[9px]
                      "
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-emerald-500
                        "
                      />

                      {t(
                        "online",
                        language
                      )}
                    </span>
                  ) : (
                    <span
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
                          stat.up
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                        }
                      `}
                    >
                      {stat.up ? (
                        <ArrowUpRight
                          className="
                            h-2.5
                            w-2.5
                            shrink-0
                          "
                        />
                      ) : (
                        <ArrowDownRight
                          className="
                            h-2.5
                            w-2.5
                            shrink-0
                          "
                        />
                      )}

                      {stat.change}
                    </span>
                  )}

                </div>

                {/* =========================================
                    CONTENT
                ========================================= */}

                <div className="mt-3 min-w-0">

                  {/* Title */}

                  <p
                    className="
                      min-h-[30px]
                      text-[10px]
                      font-medium
                      leading-4
                      text-gray-500

                      sm:text-xs
                    "
                    title={
                      translatedTitle
                    }
                  >
                    {translatedTitle}
                  </p>

                  {/* Value */}

                  <p
                    className="
                      mt-1
                      truncate
                      text-[18px]
                      font-bold
                      leading-tight
                      tracking-tight
                      text-gray-900

                      sm:text-xl
                    "
                    title={
                      stat.value
                    }
                  >
                    {stat.value}
                  </p>

                </div>

                {/* =========================================
                    TREND DETAILS
                ========================================= */}

                {!isOnline && (
                  <div
                    className="
                      mt-2
                      flex
                      min-w-0
                      items-center
                      gap-1
                    "
                  >
                    <span
                      className={`
                        shrink-0
                        text-[9px]
                        font-semibold
                        ${
                          stat.up
                            ? "text-emerald-600"
                            : "text-red-500"
                        }
                      `}
                    >
                      {stat.up
                        ? "↗"
                        : "↘"}
                    </span>

                    <span
                      className="
                        min-w-0
                        truncate
                        text-[8px]
                        text-gray-400

                        sm:text-[9px]
                      "
                    >
                      {language ===
                      "Bangla"
                        ? "গত সময়ের তুলনায়"
                        : "vs previous period"}
                    </span>
                  </div>
                )}

                {/* =========================================
                    DECORATIVE LINE
                ========================================= */}

                <div
                  className="
                    mt-3
                    h-1
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-gray-100
                  "
                >
                  <div
                    className={`
                      h-full
                      rounded-full
                      ${theme.bg}
                    `}
                    style={{
                      width:
                        stat.up
                          ? "72%"
                          : "42%",
                    }}
                  />
                </div>

              </Card>
            );
          }
        )}

      </div>
    </section>
  );
}