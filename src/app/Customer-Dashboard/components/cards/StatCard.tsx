"use client";

import { CheckCircle2 } from "lucide-react";

import Card from "../common/Card";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  activeProducts: {
    English: "Active Products",
    Bangla: "সক্রিয় পণ্য",
  },

  products: {
    English: "Products",
    Bangla: "পণ্য",
  },

  warranty: {
    English: "Warranty",
    Bangla: "ওয়ারেন্টি",
  },

  active: {
    English: "Active",
    Bangla: "সক্রিয়",
  },

  services: {
    English: "Services",
    Bangla: "সেবা",
  },

  pending: {
    English: "Pending",
    Bangla: "অপেক্ষমাণ",
  },

  completed: {
    English: "Completed",
    Bangla: "সম্পন্ন",
  },

  view: {
    English: "View",
    Bangla: "দেখুন",
  },

  viewAll: {
    English: "View All",
    Bangla: "সব দেখুন",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: CustomerLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   COMPONENT
========================================================= */

export default function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  valueColor,
  badge,
  sub,
  action,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  valueColor: string;
  badge?: boolean;
  sub: string;
  action: string;
}) {
  const { language } = useUser();

  return (
    <Card className="flex min-w-0 flex-1 flex-col items-start gap-3">

      {/* =====================================================
          ICON
      ===================================================== */}

      <div className="flex w-full items-start justify-between">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>

      {/* =====================================================
          VALUE
      ===================================================== */}

      <div className="min-w-0 w-full">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <div className="mt-1 flex items-center gap-1.5">

          <span
            className={`text-base font-bold ${valueColor}`}
          >
            {value}
          </span>

          {badge && (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          )}

        </div>

      </div>

      {/* =====================================================
          SUB TEXT
      ===================================================== */}

      <p className="text-[11px] text-slate-400">
        {sub}
      </p>

      {/* =====================================================
          ACTION
      ===================================================== */}

      <button
        type="button"
        className="text-xs font-medium text-blue-600 transition hover:underline"
      >
        {action}

        <span className="ml-0.5">
          ›
        </span>
      </button>

    </Card>
  );
}