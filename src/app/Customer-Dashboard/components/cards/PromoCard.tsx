// PromoCard.tsx

"use client";

import {
  Copy,
  ShoppingBag,
} from "lucide-react";

import Card from "../common/Card";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  specialOffer: {
    English: "SPECIAL OFFER",
    Bangla: "বিশেষ অফার",
  },

  promoTitle: {
    English:
      "Get 15% OFF on all Genuine NeaPure Kits",
    Bangla:
      "সব অরিজিনাল NeaPure কিটে ১৫% ছাড় পান",
  },

  shopNow: {
    English: "Shop Now",
    Bangla: "এখনই কিনুন",
  },

  auto: {
    English: "Auto",
    Bangla: "অটো",
  },

  off: {
    English: "OFF",
    Bangla: "ছাড়",
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

export default function PromoCard() {
  const { language } = useUser();

  return (
    <Card
      bg="bg-[#EFF6FE]"
      border="border border-[#DBEAFE]"
      padding="p-4 sm:p-6 sm:pr-[45px]"
      className="relative flex flex-1 flex-col items-start justify-between gap-5 self-stretch overflow-visible sm:flex-row sm:items-center sm:gap-4"
    >
      {/* =====================================================
          PROMO CONTENT
      ===================================================== */}

      <div className="flex flex-col items-start gap-3">

        {/* Special Offer */}

        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
          {t(
            "specialOffer",
            language
          )}
        </span>

        {/* Promo Title */}

        <p className="max-w-xs text-base font-bold leading-snug text-slate-800">
          {t(
            "promoTitle",
            language
          )}
        </p>

        {/* Coupon */}

        <button
          type="button"
          title="Copy coupon code"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold tracking-wide text-slate-700 transition hover:bg-slate-50"
          onClick={() => {
            void navigator.clipboard?.writeText(
              "NEAPURE15"
            );
          }}
        >
          NEAPURE15

          <Copy className="h-3 w-3" />
        </button>

        {/* Shop Now */}

        <button
          type="button"
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          <ShoppingBag className="h-3.5 w-3.5" />

          {t(
            "shopNow",
            language
          )}
        </button>

      </div>

      {/* =====================================================
          PRODUCT ILLUSTRATION
      ===================================================== */}

      <div className="relative flex shrink-0 items-end gap-1.5 self-center sm:self-auto">

        {/* Left Filter */}

        <div className="flex h-20 w-4 flex-col items-center justify-end gap-1 rounded-full border border-slate-200 bg-white pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        </div>

        {/* Main Filter */}

        <div className="relative flex h-28 w-5 flex-col items-center justify-center overflow-hidden rounded-full border border-blue-200 bg-blue-50">

          <span className="rounded bg-blue-500 px-1 py-0.5 text-[7px] font-bold leading-none text-white">
            {t(
              "auto",
              language
            )}
          </span>

          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />

        </div>

        {/* Right Filter */}

        <div className="flex h-20 w-4 flex-col items-center justify-end gap-1 rounded-full border border-slate-200 bg-white pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        </div>

        {/* Discount Badge */}

        <span className="absolute -right-3 -top-4 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-blue-600 text-center text-[8px] font-bold leading-tight text-white shadow-md">
          15%
          <span>
            {t(
              "off",
              language
            )}
          </span>
        </span>

      </div>
    </Card>
  );
}