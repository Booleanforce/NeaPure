"use client";

import React from "react";
import {
  TrendingUp,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import {
  useTechnician,
  type TechnicianLanguage,
} from "../../context/TechnicianContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  earningsSummary: {
    English: "Earnings Summary",
    Bangla: "আয়ের সারসংক্ষেপ",
  },

  thisMonth: {
    English: "This Month",
    Bangla: "এই মাস",
  },

  totalEarnings: {
    English: "Total Earnings",
    Bangla: "মোট আয়",
  },

  serviceIncome: {
    English: "Service Income",
    Bangla: "সার্ভিস আয়",
  },

  installationIncome: {
    English: "Installation Income",
    Bangla: "ইনস্টলেশন আয়",
  },

  bonus: {
    English: "Bonus",
    Bangla: "বোনাস",
  },

  viewEarningsDetails: {
    English: "View Earnings Details",
    Bangla: "আয়ের বিস্তারিত দেখুন",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: TechnicianLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   COMPONENT
========================================================= */

export default function EarningsSummaryCard() {
  const { language } =
    useTechnician();

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-bold text-gray-900">
          {t(
            "earningsSummary",
            language
          )}
        </h3>

        <button
          type="button"
          className="flex items-center space-x-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600 transition hover:bg-gray-50"
        >
          <span>
            {t(
              "thisMonth",
              language
            )}
          </span>

          <ChevronRight className="h-3 w-3" />
        </button>

      </div>

      {/* =====================================================
          TOTAL EARNINGS
      ===================================================== */}

      <div className="mb-4 flex items-center justify-between">

        <div>

          <div className="text-3xl font-bold text-gray-900">
            ৳1,850
          </div>

          <div className="text-xs text-gray-500">
            {t(
              "totalEarnings",
              language
            )}
          </div>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">

          <TrendingUp className="h-6 w-6 text-green-600" />

        </div>

      </div>

      {/* =====================================================
          BREAKDOWN
      ===================================================== */}

      <div className="mb-4 grid grid-cols-3 gap-3">

        {/* Service Income */}

        <div className="rounded-lg bg-gray-50 p-3 text-center">

          <div className="text-sm font-bold text-gray-900">
            ৳1,200
          </div>

          <div className="text-[10px] text-gray-500">
            {t(
              "serviceIncome",
              language
            )}
          </div>

        </div>

        {/* Installation Income */}

        <div className="rounded-lg bg-gray-50 p-3 text-center">

          <div className="text-sm font-bold text-gray-900">
            ৳450
          </div>

          <div className="text-[10px] text-gray-500">
            {t(
              "installationIncome",
              language
            )}
          </div>

        </div>

        {/* Bonus */}

        <div className="rounded-lg bg-gray-50 p-3 text-center">

          <div className="text-sm font-bold text-gray-900">
            ৳200
          </div>

          <div className="text-[10px] text-gray-500">
            {t(
              "bonus",
              language
            )}
          </div>

        </div>

      </div>

      {/* =====================================================
          DETAILS BUTTON
      ===================================================== */}

      <button
        type="button"
        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <span>
          {t(
            "viewEarningsDetails",
            language
          )}
        </span>

        <ArrowRight className="h-4 w-4" />
      </button>

    </div>
  );
}