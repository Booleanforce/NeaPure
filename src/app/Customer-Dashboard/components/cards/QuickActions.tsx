// QuickActions.tsx

"use client";

import {
  ChevronRight,
  ClipboardList,
  QrCode,
  Users,
  CalendarCheck,
} from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { ReplacementKitIcon } from "../common/icons";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  quickActions: {
    English: "Quick Actions",
    Bangla: "দ্রুত কার্যক্রম",
  },

  bookService: {
    English: "Book a Service",
    Bangla: "সার্ভিস বুক করুন",
  },

  bookServiceSub: {
    English: "Request a new service",
    Bangla: "নতুন সার্ভিসের জন্য অনুরোধ করুন",
  },

  qrCodeService: {
    English: "QR Code Service",
    Bangla: "QR কোড সার্ভিস",
  },

  qrCodeServiceSub: {
    English: "Scan & request service",
    Bangla: "স্ক্যান করে সার্ভিসের অনুরোধ করুন",
  },

  replacementKit: {
    English: "Buy Replacement Kit",
    Bangla: "রিপ্লেসমেন্ট কিট কিনুন",
  },

  replacementKitSub: {
    English: "Genuine NeaPure kits",
    Bangla: "অরিজিনাল NeaPure কিট",
  },

  emergencyAttendance: {
    English: "Manual Emergency Attendance",
    Bangla: "ম্যানুয়াল জরুরি উপস্থিতি",
  },

  emergencyAttendanceSub: {
    English: "Mark attendance manually",
    Bangla: "ম্যানুয়ালি উপস্থিতি চিহ্নিত করুন",
  },

  referEarn: {
    English: "Refer & Earn",
    Bangla: "রেফার করুন ও উপার্জন করুন",
  },

  referEarnSub: {
    English: "Invite friends & earn points",
    Bangla: "বন্ধুদের আমন্ত্রণ করে পয়েন্ট অর্জন করুন",
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

export default function QuickActions() {
  const { language } = useUser();

  const actions = [
    {
      icon: (
        <CalendarCheck className="h-4 w-4" />
      ),

      title: t(
        "bookService",
        language
      ),

      sub: t(
        "bookServiceSub",
        language
      ),
    },

    {
      icon: (
        <QrCode className="h-4 w-4" />
      ),

      title: t(
        "qrCodeService",
        language
      ),

      sub: t(
        "qrCodeServiceSub",
        language
      ),
    },

    {
      icon: (
        <ReplacementKitIcon className="h-4 w-4" />
      ),

      title: t(
        "replacementKit",
        language
      ),

      sub: t(
        "replacementKitSub",
        language
      ),
    },

    {
      icon: (
        <ClipboardList className="h-4 w-4" />
      ),

      title: t(
        "emergencyAttendance",
        language
      ),

      sub: t(
        "emergencyAttendanceSub",
        language
      ),
    },

    {
      icon: (
        <Users className="h-4 w-4" />
      ),

      title: t(
        "referEarn",
        language
      ),

      sub: t(
        "referEarnSub",
        language
      ),
    },
  ];

  return (
    <Card className="flex w-full flex-col">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "quickActions",
          language
        )}
        className="mb-1 w-full"
      />

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="flex flex-col divide-y divide-slate-100">

        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            className="flex w-full items-center gap-3 py-4 text-left transition-colors hover:bg-slate-50"
          >
            {/* Icon */}

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              {action.icon}
            </div>

            {/* Content */}

            <div className="min-w-0 flex-1">

              <p className="text-xs font-semibold text-slate-700">
                {action.title}
              </p>

              <p className="truncate text-[11px] text-slate-400">
                {action.sub}
              </p>

            </div>

            {/* Arrow */}

            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
          </button>
        ))}

      </div>
    </Card>
  );
}