"use client";

import { Star } from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import { technicians } from "../../data/technicians";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  topTechnicians: {
    English: "Top Technicians",
    Bangla: "সেরা টেকনিশিয়ান",
  },

  viewAll: {
    English: "View All",
    Bangla: "সব দেখুন",
  },

  technician: {
    English: "Technician",
    Bangla: "টেকনিশিয়ান",
  },

  completed: {
    English: "Completed",
    Bangla: "সম্পন্ন",
  },

  rating: {
    English: "Rating",
    Bangla: "রেটিং",
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

export default function TopTechnicians() {
  const { language } = useAdmin();

  return (
    <Card
      className="
        col-span-1
        min-w-0
        overflow-hidden
        sm:col-span-2
        xl:col-span-4
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t("topTechnicians", language)}
        action={
          <button
            type="button"
            className="
              shrink-0
              text-xs
              font-semibold
              text-blue-600
              transition
              hover:text-blue-700
              hover:underline
            "
          >
            {t("viewAll", language)}
          </button>
        }
      />

      {/* =====================================================
          DESKTOP / TABLET
      ===================================================== */}

      <div className="hidden sm:block">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="w-[50%] px-2 pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
                {t("technician", language)}
              </th>

              <th className="w-[25%] px-2 pb-2 text-right text-[10px] font-semibold uppercase text-gray-400">
                {t("completed", language)}
              </th>

              <th className="w-[25%] px-2 pb-2 text-right text-[10px] font-semibold uppercase text-gray-400">
                {t("rating", language)}
              </th>
            </tr>
          </thead>

          <tbody>
            {technicians.map((tech) => (
              <tr
                key={tech.name}
                className="
                  border-b
                  border-gray-50
                  transition-colors
                  hover:bg-gray-50
                "
              >
                {/* Technician */}

                <td className="px-2 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className="
                        flex
                        h-8 w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-gray-200
                        to-gray-300
                        text-[10px]
                        font-bold
                        text-gray-600
                      "
                    >
                      {tech.avatar}
                    </div>

                    <span
                      className="
                        min-w-0
                        truncate
                        text-xs
                        font-medium
                        text-gray-700
                      "
                      title={tech.name}
                    >
                      {tech.name}
                    </span>
                  </div>
                </td>

                {/* Completed */}

                <td className="px-2 py-3 text-right">
                  <span className="text-xs font-semibold text-gray-700">
                    {tech.completed}
                  </span>
                </td>

                {/* Rating */}

                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Star
                      className="
                        h-3 w-3
                        shrink-0
                        fill-yellow-400
                        text-yellow-400
                      "
                    />

                    <span className="text-xs font-semibold text-gray-700">
                      {tech.rating}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="space-y-2 sm:hidden">
        {technicians.map((tech) => (
          <div
            key={tech.name}
            className="
              rounded-xl
              border
              border-gray-100
              bg-gray-50/70
              p-3
              transition
              hover:bg-gray-50
            "
          >
            {/* =================================================
                TOP ROW
            ================================================= */}

            <div className="flex items-center justify-between gap-3">
              {/* Technician */}

              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className="
                    flex
                    h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-gray-200
                    to-gray-300
                    text-[10px]
                    font-bold
                    text-gray-600
                  "
                >
                  {tech.avatar}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-xs
                      font-semibold
                      text-gray-800
                    "
                    title={tech.name}
                  >
                    {tech.name}
                  </p>

                  <p className="mt-0.5 text-[9px] uppercase text-gray-400">
                    {t("technician", language)}
                  </p>
                </div>
              </div>

              {/* Rating */}

              <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-50 px-2 py-1">
                <Star
                  className="
                    h-3 w-3
                    fill-yellow-400
                    text-yellow-400
                  "
                />

                <span className="text-[10px] font-semibold text-gray-700">
                  {tech.rating}
                </span>
              </div>
            </div>

            {/* =================================================
                COMPLETED
            ================================================= */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                border-t
                border-gray-100
                pt-2.5
              "
            >
              <span className="text-[9px] font-medium uppercase text-gray-400">
                {t("completed", language)}
              </span>

              <span className="text-xs font-bold text-gray-700">
                {tech.completed}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}