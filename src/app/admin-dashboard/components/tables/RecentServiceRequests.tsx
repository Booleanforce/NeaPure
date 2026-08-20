"use client";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";

import { serviceRequests } from "../../data/serviceRequests";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  recentServiceRequests: {
    English: "Recent Service Requests",
    Bangla: "সাম্প্রতিক সার্ভিস অনুরোধ",
  },

  viewAll: {
    English: "View All",
    Bangla: "সব দেখুন",
  },

  customer: {
    English: "Customer",
    Bangla: "গ্রাহক",
  },

  type: {
    English: "Type",
    Bangla: "ধরন",
  },

  status: {
    English: "Status",
    Bangla: "স্ট্যাটাস",
  },

  date: {
    English: "Date",
    Bangla: "তারিখ",
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

export default function RecentServiceRequests() {
  const { language } = useAdmin();

  return (
    <Card
      className="
        col-span-1
        min-w-0
        overflow-hidden
        sm:col-span-2
        xl:col-span-5
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "recentServiceRequests",
          language
        )}
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
              <th className="w-[32%] px-2 pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
                {t("customer", language)}
              </th>

              <th className="w-[26%] px-2 pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
                {t("type", language)}
              </th>

              <th className="w-[20%] px-2 pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
                {t("status", language)}
              </th>

              <th className="w-[22%] px-2 pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
                {t("date", language)}
              </th>
            </tr>
          </thead>

          <tbody>
            {serviceRequests.map((req) => (
              <tr
                key={req.id}
                className="
                  border-b
                  border-gray-50
                  transition-colors
                  hover:bg-gray-50
                "
              >
                {/* Customer */}

                <td className="px-2 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className={`
                        flex
                        h-7 w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-[10px]
                        font-bold
                        ${req.color}
                      `}
                    >
                      {req.initials}
                    </div>

                    <span
                      className="
                        min-w-0
                        truncate
                        text-xs
                        font-medium
                        text-gray-700
                      "
                      title={req.customer}
                    >
                      {req.customer}
                    </span>
                  </div>
                </td>

                {/* Type */}

                <td className="px-2 py-3">
                  <span
                    className="
                      block
                      truncate
                      text-xs
                      text-gray-600
                    "
                    title={req.type}
                  >
                    {req.type}
                  </span>
                </td>

                {/* Status */}

                <td className="px-2 py-3">
                  <StatusBadge status={req.status} />
                </td>

                {/* Date */}

                <td className="px-2 py-3">
                  <span
                    className="
                      block
                      truncate
                      text-xs
                      text-gray-500
                    "
                    title={req.date}
                  >
                    {req.date}
                  </span>
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
        {serviceRequests.map((req) => (
          <div
            key={req.id}
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
                CUSTOMER + STATUS
            ================================================= */}

            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className={`
                    flex
                    h-8 w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-[10px]
                    font-bold
                    ${req.color}
                  `}
                >
                  {req.initials}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-xs
                      font-semibold
                      text-gray-800
                    "
                    title={req.customer}
                  >
                    {req.customer}
                  </p>
                </div>
              </div>

              <StatusBadge status={req.status} />
            </div>

            {/* =================================================
                TYPE + DATE
            ================================================= */}

            <div
              className="
                mt-3
                grid
                grid-cols-2
                gap-3
                border-t
                border-gray-100
                pt-2.5
              "
            >
              <div className="min-w-0">
                <p className="text-[9px] font-medium uppercase text-gray-400">
                  {t("type", language)}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[11px]
                    font-medium
                    text-gray-600
                  "
                  title={req.type}
                >
                  {req.type}
                </p>
              </div>

              <div className="min-w-0 text-right">
                <p className="text-[9px] font-medium uppercase text-gray-400">
                  {t("date", language)}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[11px]
                    text-gray-500
                  "
                  title={req.date}
                >
                  {req.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}