// ProductPanel.tsx

"use client";

import {
  ChevronRight,
} from "lucide-react";

import Image from "next/image";

import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  model: {
    English: "Model",
    Bangla: "মডেল",
  },

  serialNo: {
    English: "Serial No",
    Bangla: "সিরিয়াল নম্বর",
  },

  technology: {
    English: "Technology",
    Bangla: "প্রযুক্তি",
  },

  active: {
    English: "Active",
    Bangla: "সক্রিয়",
  },

  viewProductDetails: {
    English: "View Product Details",
    Bangla: "পণ্যের বিস্তারিত দেখুন",
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

export default function ProductPanel() {
  const { language } = useUser();

  return (
    <Card
      bg="bg-blue-100"
      className="flex flex-1 items-center gap-6 self-stretch"
    >
      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}

      <div className="relative h-[273px] w-[151px] shrink-0 overflow-hidden rounded-[30px] bg-blue-100">
        <Image
          src="/images/pic23.png"
          alt="NeaPure Pro Max"
          fill
          className="object-cover"
        />
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div className="flex flex-1 flex-col items-start gap-4 self-stretch">

        {/* Product Name */}

        <p className="text-sm font-bold text-slate-800">
          NeaPure Pro Max
        </p>

        {/* Product Details */}

        <div className="space-y-1 text-[11px] text-slate-400">

          {/* Model */}

          <div className="flex gap-2">
            <span>
              {t(
                "model",
                language
              )}
              :
            </span>

            <span className="font-medium text-slate-600">
              NP-Pro Max
            </span>
          </div>

          {/* Serial Number */}

          <div className="flex gap-2">
            <span>
              {t(
                "serialNo",
                language
              )}
              :
            </span>

            <span className="font-medium text-slate-600">
              MPX12457896
            </span>
          </div>

          {/* Technology */}

          <div className="flex gap-2">
            <span>
              {t(
                "technology",
                language
              )}
              :
            </span>

            <span className="font-medium text-slate-600">
              RO + UV + Copper Active
            </span>
          </div>

        </div>

        {/* ===================================================
            STATUS
        =================================================== */}

        <StatusBadge
          label={t(
            "active",
            language
          )}
          tone="success"
          dot
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
        />

        {/* ===================================================
            VIEW DETAILS
        =================================================== */}

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:underline"
        >
          {t(
            "viewProductDetails",
            language
          )}

          <ChevronRight className="h-3 w-3" />
        </button>

      </div>
    </Card>
  );
}