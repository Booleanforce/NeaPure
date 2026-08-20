"use client";

import React from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import {
  useTechnician,
  type TechnicianLanguage,
} from "../../context/TechnicianContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  taskSummary: {
    English: "Today's Task Summary",
    Bangla: "আজকের কাজের সারসংক্ষেপ",
  },

  updatedJustNow: {
    English: "Updated just now",
    Bangla: "এইমাত্র আপডেট হয়েছে",
  },

  totalJobs: {
    English: "Total Jobs",
    Bangla: "মোট কাজ",
  },

  completed: {
    English: "Completed",
    Bangla: "সম্পন্ন",
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
  language: TechnicianLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   COMPONENT
========================================================= */

export default function TaskSummaryCard() {
  const { language } =
    useTechnician();

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <h3 className="mb-1 font-bold text-gray-900">
        {t(
          "taskSummary",
          language
        )}
      </h3>

      <div className="mb-4 text-xs text-gray-500">
        {t(
          "updatedJustNow",
          language
        )}
      </div>

      {/* =====================================================
          TASK LIST
      ===================================================== */}

      <div className="space-y-3">

        {/* Total Jobs */}

        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-2">

            <Calendar className="h-4 w-4 text-gray-400" />

            <span className="text-sm text-gray-600">
              {t(
                "totalJobs",
                language
              )}
            </span>

          </div>

          <span className="font-bold text-blue-600">
            5
          </span>

        </div>

        {/* Completed */}

        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-2">

            <CheckCircle className="h-4 w-4 text-green-500" />

            <span className="text-sm text-gray-600">
              {t(
                "completed",
                language
              )}
            </span>

          </div>

          <span className="font-bold text-green-600">
            3
          </span>

        </div>

        {/* Pending */}

        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-2">

            <Clock className="h-4 w-4 text-orange-500" />

            <span className="text-sm text-gray-600">
              {t(
                "pending",
                language
              )}
            </span>

          </div>

          <span className="font-bold text-orange-600">
            2
          </span>

        </div>

        {/* Cancelled */}

        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-2">

            <XCircle className="h-4 w-4 text-red-500" />

            <span className="text-sm text-gray-600">
              {t(
                "cancelled",
                language
              )}
            </span>

          </div>

          <span className="font-bold text-red-600">
            0
          </span>

        </div>

      </div>
    </div>
  );
}