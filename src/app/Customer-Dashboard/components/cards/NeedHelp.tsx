// NeedHelp.tsx

"use client";

import {
  Headphones,
  HeartHandshake,
  MessageSquare,
  Phone,
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
  needHelp: {
    English: "Need Help?",
    Bangla: "সাহায্য দরকার?",
  },

  supportTeam: {
    English:
      "Our support team is here for you.",
    Bangla:
      "আমাদের সাপোর্ট টিম আপনার পাশে আছে।",
  },

  chatWithUs: {
    English: "Chat with Us",
    Bangla: "আমাদের সাথে চ্যাট করুন",
  },

  chatDescription: {
    English:
      "We reply in a few minutes",
    Bangla:
      "আমরা কয়েক মিনিটের মধ্যে উত্তর দিই",
  },

  chat: {
    English: "Chat",
    Bangla: "চ্যাট",
  },

  callUs: {
    English: "Call Us",
    Bangla: "আমাদের কল করুন",
  },

  callTime: {
    English: "09:00 AM - 09:00 PM",
    Bangla: "সকাল ০৯:০০ - রাত ০৯:০০",
  },

  call: {
    English: "Call",
    Bangla: "কল",
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

/**
 * Mobile: each action item is itself a horizontal row
 * (icon | text | link), so the two items stack vertically
 * below `sm`.
 */
export default function NeedHelp() {
  const { language } = useUser();

  return (
    <Card className="flex flex-1 flex-col gap-3">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between">

        <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">

          <HeartHandshake className="h-4 w-4 text-blue-500" />

          {t(
            "needHelp",
            language
          )}

        </p>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
          <Headphones className="h-4 w-4" />
        </span>

      </div>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <p className="text-[11px] text-slate-400">
        {t(
          "supportTeam",
          language
        )}
      </p>

      {/* =====================================================
          SUPPORT ACTIONS
      ===================================================== */}

      <div className="flex flex-col gap-2 sm:flex-row">

        {/* ===================================================
            CHAT
        =================================================== */}

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-blue-200 px-3 py-2.5">

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <MessageSquare className="h-4 w-4" />
          </span>

          <div className="min-w-0 flex-1">

            <p className="truncate text-xs font-semibold text-slate-700">
              {t(
                "chatWithUs",
                language
              )}
            </p>

            <p className="truncate text-[8px] text-slate-400">
              {t(
                "chatDescription",
                language
              )}
            </p>

          </div>

          <button
            type="button"
            className="shrink-0 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
          >
            {t(
              "chat",
              language
            )}
          </button>

        </div>

        {/* ===================================================
            CALL
        =================================================== */}

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-blue-200 px-3 py-2.5">

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <Phone className="h-4 w-4" />
          </span>

          <div className="min-w-0 flex-1">

            <p className="truncate text-xs font-semibold text-slate-700">
              {t(
                "callUs",
                language
              )}
            </p>

            <p className="truncate text-[8px] text-slate-400">
              {t(
                "callTime",
                language
              )}
            </p>

          </div>

          <button
            type="button"
            className="shrink-0 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
          >
            {t(
              "call",
              language
            )}
          </button>

        </div>

      </div>
    </Card>
  );
}