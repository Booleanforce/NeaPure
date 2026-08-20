// RecentServiceRequests.tsx

"use client";

import {
  Layers,
  UserCheck,
  Wrench,
} from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  recentServiceHistory: {
    English: "Recent Service History",
    Bangla: "সাম্প্রতিক সার্ভিস ইতিহাস",
  },

  viewAll: {
    English: "View All",
    Bangla: "সব দেখুন",
  },

  generalService: {
    English: "General Service",
    Bangla: "সাধারণ সার্ভিস",
  },

  filterReplacement: {
    English: "Filter Replacement",
    Bangla: "ফিল্টার পরিবর্তন",
  },

  installation: {
    English: "Installation",
    Bangla: "ইনস্টলেশন",
  },

  maintenanceCheck: {
    English: "Maintenance Check",
    Bangla: "রক্ষণাবেক্ষণ পরীক্ষা",
  },

  completed: {
    English: "Completed",
    Bangla: "সম্পন্ন",
  },

  pending: {
    English: "Pending",
    Bangla: "অপেক্ষমাণ",
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
   SERVICE TYPE TRANSLATION
========================================================= */

function translateServiceTitle(
  title: string,
  language: CustomerLanguage
): string {
  switch (title) {
    case "General Service":
      return t(
        "generalService",
        language
      );

    case "Filter Replacement":
      return t(
        "filterReplacement",
        language
      );

    case "Installation":
      return t(
        "installation",
        language
      );

    case "Maintenance Check":
      return t(
        "maintenanceCheck",
        language
      );

    default:
      return title;
  }
}

/* =========================================================
   STATUS TRANSLATION
========================================================= */

function translateStatus(
  status: string,
  language: CustomerLanguage
): string {
  switch (status) {
    case "Completed":
      return t(
        "completed",
        language
      );

    case "Pending":
      return t(
        "pending",
        language
      );

    default:
      return status;
  }
}

/* =========================================================
   DATA
========================================================= */

const rows = [
  {
    id: "general-service",
    icon: (
      <Wrench className="h-4 w-4" />
    ),
    title: "General Service",
    time: "24 May 2024, 10:30 AM",
    status: "Completed",
  },

  {
    id: "filter-replacement",
    icon: (
      <Layers className="h-4 w-4" />
    ),
    title: "Filter Replacement",
    time: "10 Apr 2024, 02:15 PM",
    status: "Completed",
  },

  {
    id: "installation",
    icon: (
      <UserCheck className="h-4 w-4" />
    ),
    title: "Installation",
    time: "24 Mar 2024, 04:00 PM",
    status: "Completed",
  },

  {
    id: "maintenance-check",
    icon: (
      <Layers className="h-4 w-4" />
    ),
    title: "Maintenance Check",
    time: "15 May 2024, 11:30 AM",
    status: "Pending",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function RecentServiceRequests() {
  const { language } = useUser();

  return (
    <Card className="flex flex-1 flex-col gap-3">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title={t(
          "recentServiceHistory",
          language
        )}
        actionLabel={t(
          "viewAll",
          language
        )}
        className="w-full"
      />

      {/* =====================================================
          SERVICE ROWS
      ===================================================== */}

      <div className="flex flex-col gap-7">

        {rows.map((row) => {
          const isCompleted =
            row.status === "Completed";

          return (
            <div
              key={row.id}
              className="flex items-center justify-between rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
            >

              {/* =================================================
                  LEFT SIDE
              ================================================= */}

              <div className="flex min-w-0 items-center gap-3">

                {/* Icon */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {row.icon}
                </div>

                {/* Information */}

                <div className="min-w-0">

                  <p className="truncate text-xs font-semibold text-slate-700">
                    {translateServiceTitle(
                      row.title,
                      language
                    )}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    {row.time}
                  </p>

                </div>
              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <StatusBadge
                label={translateStatus(
                  row.status,
                  language
                )}
                tone={
                  isCompleted
                    ? "success"
                    : "warning"
                }
                className="ml-3 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold"
              />

            </div>
          );
        })}

      </div>
    </Card>
  );
}