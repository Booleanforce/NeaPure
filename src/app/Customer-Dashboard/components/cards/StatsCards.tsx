"use client";

import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";

import StatCard from "./StatCard";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  warrantyStatus: {
    English: "Warranty Status",
    Bangla: "ওয়ারেন্টির স্ট্যাটাস",
  },

  active: {
    English: "Active",
    Bangla: "সক্রিয়",
  },

  warrantyValidTill: {
    English: "Valid till 24 Aug 2026",
    Bangla: "২৪ আগস্ট ২০২৬ পর্যন্ত বৈধ",
  },

  viewWarranty: {
    English: "View Warranty",
    Bangla: "ওয়ারেন্টি দেখুন",
  },

  serviceStatus: {
    English: "Service Status",
    Bangla: "সার্ভিস স্ট্যাটাস",
  },

  allGood: {
    English: "All Good",
    Bangla: "সব ঠিক আছে",
  },

  lastService: {
    English: "Last service on 24 May 2024",
    Bangla: "শেষ সার্ভিস ২৪ মে ২০২৪",
  },

  viewServiceHistory: {
    English: "View Service History",
    Bangla: "সার্ভিস ইতিহাস দেখুন",
  },

  nextServiceDue: {
    English: "Next Service Due",
    Bangla: "পরবর্তী সার্ভিসের সময়",
  },

  daysLeft: {
    English: "45 Days Left",
    Bangla: "৪৫ দিন বাকি",
  },

  estimatedOn: {
    English: "Estimated on 24 May 2024",
    Bangla: "আনুমানিক তারিখ ২৪ মে ২০২৪",
  },

  setReminder: {
    English: "Set Reminder",
    Bangla: "রিমাইন্ডার সেট করুন",
  },

  neapurePoints: {
    English: "NeaPure Points",
    Bangla: "NeaPure পয়েন্ট",
  },

  availablePoints: {
    English: "Available points 24 May 2024",
    Bangla: "উপলব্ধ পয়েন্ট ২৪ মে ২০২৪",
  },

  redeemNow: {
    English: "Redeem Now",
    Bangla: "এখনই রিডিম করুন",
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

export default function StatsCards() {
  const { language } = useUser();

  return (
    <>
      {/* =====================================================
          WARRANTY
      ===================================================== */}

      <StatCard
        icon={
          <ShieldCheck className="h-4 w-4" />
        }
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        label={t(
          "warrantyStatus",
          language
        )}
        value={t(
          "active",
          language
        )}
        valueColor="text-slate-800"
        badge
        sub={t(
          "warrantyValidTill",
          language
        )}
        action={t(
          "viewWarranty",
          language
        )}
      />

      {/* =====================================================
          SERVICE STATUS
      ===================================================== */}

      <StatCard
        icon={
          <CheckCircle2 className="h-4 w-4" />
        }
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        label={t(
          "serviceStatus",
          language
        )}
        value={t(
          "allGood",
          language
        )}
        valueColor="text-emerald-600"
        badge
        sub={t(
          "lastService",
          language
        )}
        action={t(
          "viewServiceHistory",
          language
        )}
      />

      {/* =====================================================
          NEXT SERVICE
      ===================================================== */}

      <StatCard
        icon={
          <Clock className="h-4 w-4" />
        }
        iconBg="bg-slate-100"
        iconColor="text-slate-500"
        label={t(
          "nextServiceDue",
          language
        )}
        value={t(
          "daysLeft",
          language
        )}
        valueColor="text-blue-600"
        sub={t(
          "estimatedOn",
          language
        )}
        action={t(
          "setReminder",
          language
        )}
      />

      {/* =====================================================
          NEAPURE POINTS
      ===================================================== */}

      <StatCard
        icon={
          <Award className="h-4 w-4" />
        }
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        label={t(
          "neapurePoints",
          language
        )}
        value="320"
        valueColor="text-blue-600"
        sub={t(
          "availablePoints",
          language
        )}
        action={t(
          "redeemNow",
          language
        )}
      />
    </>
  );
}