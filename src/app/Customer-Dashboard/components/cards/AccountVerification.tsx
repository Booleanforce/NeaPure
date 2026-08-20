"use client";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";
import { VerifiedCheckIcon } from "../common/icons";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  accountVerification: {
    English: "Account Verification",
    Bangla: "অ্যাকাউন্ট যাচাইকরণ",
  },

  verified: {
    English: "VERIFIED",
    Bangla: "যাচাইকৃত",
  },

  verifiedMessage: {
    English: "Your account is fully verified",
    Bangla: "আপনার অ্যাকাউন্ট সম্পূর্ণভাবে যাচাইকৃত",
  },

  verifiedDescription: {
    English:
      "Enjoy all NeaPure Smart Water Care services seamlessly.",
    Bangla:
      "NeaPure স্মার্ট ওয়াটার কেয়ারের সব সেবা নির্বিঘ্নে উপভোগ করুন।",
  },

  viewProfile: {
    English: "View Profile",
    Bangla: "প্রোফাইল দেখুন",
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

export default function AccountVerification() {
  const { language } = useUser();

  return (
    <Card className="flex-1 items-start justify-between gap-4">

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "accountVerification",
          language
        )}
        right={
          <StatusBadge
            label={t(
              "verified",
              language
            )}
            tone="success"
          />
        }
      />

      {/* =====================================================
          VERIFIED ICON
      ===================================================== */}

      <div className="flex w-full items-center justify-center py-4">
        <VerifiedCheckIcon />
      </div>

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      <div className="w-full text-center">

        <p className="text-xs font-semibold text-emerald-600">
          {t(
            "verifiedMessage",
            language
          )}
        </p>

        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          {t(
            "verifiedDescription",
            language
          )}
        </p>

      </div>

      {/* =====================================================
          VIEW PROFILE
      ===================================================== */}

      <button
        type="button"
        className="w-full rounded-lg border border-slate-100 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
      >
        {t(
          "viewProfile",
          language
        )}

        <span className="ml-0.5">
          ›
        </span>
      </button>

    </Card>
  );
}