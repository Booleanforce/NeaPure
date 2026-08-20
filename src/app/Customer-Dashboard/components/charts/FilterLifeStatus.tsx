// FilterLifeStatus.tsx

"use client";

import {
  Cpu,
  Droplet,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  filterLifeStatus: {
    English: "Filter Life Status",
    Bangla: "ফিল্টারের অবস্থা",
  },

  viewAllFilters: {
    English: "View All Filters",
    Bangla: "সব ফিল্টার দেখুন",
  },

  sedimentFilter: {
    English: "Sediment Filter",
    Bangla: "সেডিমেন্ট ফিল্টার",
  },

  carbonFilter: {
    English: "Carbon Filter",
    Bangla: "কার্বন ফিল্টার",
  },

  roMembrane: {
    English: "RO Membrane",
    Bangla: "RO মেমব্রেন",
  },

  good: {
    English: "Good",
    Bangla: "ভালো",
  },

  left: {
    English: "Left",
    Bangla: "বাকি",
  },

  simulateClean: {
    English: "Simulate Clean",
    Bangla: "ক্লিন সিমুলেট করুন",
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
   FILTER BAR
========================================================= */

function FilterBar({
  label,
  percent,
  iconColor,
  barColor,
  icon: Icon,
  language,
}: {
  label: string;
  percent: number;
  iconColor: string;
  barColor: string;
  icon: React.ElementType;
  language: CustomerLanguage;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-slate-100 bg-white p-3 sm:p-4">

      {/* =====================================================
          TOP
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-2">

        {/* Icon */}

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-slate-100">
          <Icon
            className={`h-4 w-4 ${iconColor}`}
          />
        </span>

        {/* Label */}

        <p className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-700">
          {label}
        </p>

      </div>

      {/* =====================================================
          STATUS + PERCENT
      ===================================================== */}

      <div className="mt-5 flex min-w-0 items-center justify-between gap-2">

        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
          {t(
            "good",
            language
          )}
        </span>

        <span className="min-w-0 truncate text-right text-sm font-bold text-slate-800">
          {percent}% {t("left", language)}
        </span>

      </div>

      {/* =====================================================
          PROGRESS BAR
      ===================================================== */}

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{
            width: `${Math.max(
              0,
              Math.min(100, percent)
            )}%`,
          }}
        />
      </div>

      {/* =====================================================
          ACTION
      ===================================================== */}

      <button
        type="button"
        className="mt-4 flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-2 py-2 text-[11px] font-medium text-slate-500 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600"
      >
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-500" />

        <span className="truncate">
          {t(
            "simulateClean",
            language
          )}
        </span>
      </button>

    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function FilterLifeStatus() {
  const { language } = useUser();

  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "filterLifeStatus",
          language
        )}
        actionLabel={t(
          "viewAllFilters",
          language
        )}
        className="w-full min-w-0"
      />

      {/* =====================================================
          FILTER CARDS
      ===================================================== */}

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

        <FilterBar
          label={t(
            "sedimentFilter",
            language
          )}
          percent={85}
          iconColor="text-emerald-500"
          barColor="bg-emerald-500"
          icon={Droplet}
          language={language}
        />

        <FilterBar
          label={t(
            "carbonFilter",
            language
          )}
          percent={72}
          iconColor="text-emerald-500"
          barColor="bg-emerald-500"
          icon={ShieldCheck}
          language={language}
        />

        <FilterBar
          label={t(
            "roMembrane",
            language
          )}
          percent={65}
          iconColor="text-blue-500"
          barColor="bg-blue-400"
          icon={Cpu}
          language={language}
        />

      </div>

      {/* =====================================================
          FOOTER BUTTON
      ===================================================== */}

      <button
        type="button"
        className="w-full rounded-lg bg-blue-50/60 px-3 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
      >
        {t(
          "viewAllFilters",
          language
        )}

        <span className="ml-0.5">
          ›
        </span>
      </button>

    </Card>
  );
}