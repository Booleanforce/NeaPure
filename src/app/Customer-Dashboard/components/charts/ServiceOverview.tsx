// ServiceOverview.tsx

"use client";

import {
  Camera,
  History,
  MapPin,
  QrCode,
  Wrench,
} from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { ReminderBellIcon } from "../common/icons";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  serviceShortcuts: {
    English: "Service Shortcuts",
    Bangla: "সার্ভিস শর্টকাট",
  },

  serviceRequests: {
    English: "Service Requests",
    Bangla: "সার্ভিস অনুরোধ",
  },

  installationTracking: {
    English: "Installation Tracking",
    Bangla: "ইনস্টলেশন ট্র্যাকিং",
  },

  beforeAfterSetup: {
    English: "Before & After Setup",
    Bangla: "আগে ও পরে সেটআপ",
  },

  qrCodeService: {
    English: "QR Code Service",
    Bangla: "QR কোড সার্ভিস",
  },

  serviceHistory: {
    English: "Service History",
    Bangla: "সার্ভিস ইতিহাস",
  },

  remindersAlerts: {
    English: "Reminders & Alerts",
    Bangla: "রিমাইন্ডার ও সতর্কতা",
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

export default function ServiceOverview() {
  const { language } = useUser();

  const items = [
    {
      icon: (
        <Wrench className="h-5 w-5" />
      ),
      label: t(
        "serviceRequests",
        language
      ),
      bg: "bg-pink-50",
      color: "text-pink-500",
      badge: 2,
    },

    {
      icon: (
        <MapPin className="h-5 w-5" />
      ),
      label: t(
        "installationTracking",
        language
      ),
      bg: "bg-emerald-50",
      color: "text-emerald-500",
    },

    {
      icon: (
        <Camera className="h-5 w-5" />
      ),
      label: t(
        "beforeAfterSetup",
        language
      ),
      bg: "bg-blue-50",
      color: "text-blue-500",
    },

    {
      icon: (
        <QrCode className="h-5 w-5" />
      ),
      label: t(
        "qrCodeService",
        language
      ),
      bg: "bg-violet-50",
      color: "text-violet-500",
    },

    {
      icon: (
        <History className="h-5 w-5" />
      ),
      label: t(
        "serviceHistory",
        language
      ),
      bg: "bg-amber-50",
      color: "text-amber-500",
    },

    {
      icon: (
        <ReminderBellIcon className="h-5 w-5" />
      ),
      label: t(
        "remindersAlerts",
        language
      ),
      bg: "bg-rose-50",
      color: "text-rose-500",
    },
  ];

  return (
    <Card
      rounded="rounded-xl"
      padding="p-4"
      className="flex h-full min-w-0 flex-col overflow-hidden"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "serviceShortcuts",
          language
        )}
        className="mb-3"
      />

      {/* =====================================================
          SERVICE ITEMS
      ===================================================== */}

      <div className="grid flex-1 grid-cols-2 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">

        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className="group flex min-w-0 flex-col items-center gap-2 px-1 text-center transition"
          >
            {/* Icon */}

            <div className="relative shrink-0">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:-translate-y-0.5 ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>

              {/* Badge */}

              {item.badge !== undefined && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}

            </div>

            {/* Label */}

            <span className="w-full min-w-0 px-1 text-[10px] leading-[1.25] text-slate-500 sm:text-[11px]">
              {item.label}
            </span>
          </button>
        ))}

      </div>
    </Card>
  );
}