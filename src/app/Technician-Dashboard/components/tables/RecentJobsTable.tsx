"use client";

import {
  Wrench,
  ChevronRight,
} from "lucide-react";

import {
  useTechnician,
  type TechnicianLanguage,
} from "../../context/TechnicianContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  recentJobs: {
    English: "Recent Jobs",
    Bangla: "সাম্প্রতিক কাজ",
  },

  viewAll: {
    English: "View All",
    Bangla: "সব দেখুন",
  },

  customerName: {
    English: "Customer Name",
    Bangla: "গ্রাহকের নাম",
  },

  jobType: {
    English: "Job Type",
    Bangla: "কাজের ধরন",
  },

  product: {
    English: "Product",
    Bangla: "পণ্য",
  },

  status: {
    English: "Status",
    Bangla: "স্ট্যাটাস",
  },

  time: {
    English: "Time",
    Bangla: "সময়",
  },

  action: {
    English: "Action",
    Bangla: "অ্যাকশন",
  },

  service: {
    English: "Service",
    Bangla: "সার্ভিস",
  },

  installation: {
    English: "Installation",
    Bangla: "ইনস্টলেশন",
  },

  filterChange: {
    English: "Filter Change",
    Bangla: "ফিল্টার পরিবর্তন",
  },

  completed: {
    English: "Completed",
    Bangla: "সম্পন্ন",
  },

  pending: {
    English: "Pending",
    Bangla: "অপেক্ষমাণ",
  },

  view: {
    English: "View",
    Bangla: "দেখুন",
  },

  yesterday: {
    English: "Yesterday",
    Bangla: "গতকাল",
  },

  daysAgo: {
    English: "Days Ago",
    Bangla: "দিন আগে",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION
========================================================= */

function t(
  key: TranslationKey,
  language: TechnicianLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   JOB TYPE
========================================================= */

function translateJobType(
  type: string,
  language: TechnicianLanguage
): string {
  switch (type) {
    case "Service":
      return t("service", language);

    case "Installation":
      return t("installation", language);

    case "Filter Change":
      return t("filterChange", language);

    default:
      return type;
  }
}

/* =========================================================
   STATUS
========================================================= */

function translateStatus(
  status: string,
  language: TechnicianLanguage
): string {
  switch (status) {
    case "Completed":
      return t("completed", language);

    case "Pending":
      return t("pending", language);

    default:
      return status;
  }
}

/* =========================================================
   TIME
========================================================= */

function translateTime(
  time: string,
  language: TechnicianLanguage
): string {
  if (time.startsWith("Yesterday")) {
    return time.replace(
      "Yesterday",
      t("yesterday", language)
    );
  }

  if (time.includes("Days Ago")) {
    return time.replace(
      "Days Ago",
      t("daysAgo", language)
    );
  }

  return time;
}

/* =========================================================
   DATA
========================================================= */

const recentJobs = [
  {
    initials: "SI",
    name: "Saiful Islam",
    type: "Service",
    product: "NeaPure Pro Max",
    sn: "NPX11223344",
    status: "Completed",
    statusColor:
      "bg-green-100 text-green-700",
    time: "Yesterday, 11:30 AM",
  },

  {
    initials: "NJ",
    name: "Nusrat Jahan",
    type: "Installation",
    product: "NeaPure Plus",
    sn: "NPP44332211",
    status: "Completed",
    statusColor:
      "bg-green-100 text-green-700",
    time: "Yesterday, 03:15 PM",
  },

  {
    initials: "MH",
    name: "Mahbub Hasan",
    type: "Filter Change",
    product: "NeaPure Max",
    sn: "NPM99887766",
    status: "Pending",
    statusColor:
      "bg-orange-100 text-orange-700",
    time: "Yesterday, 06:00 PM",
  },

  {
    initials: "TA",
    name: "Tania Akter",
    type: "Service",
    product: "NeaPure Lite",
    sn: "NPL77556633",
    status: "Completed",
    statusColor:
      "bg-green-100 text-green-700",
    time: "2 Days Ago, 10:00 AM",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function RecentJobsTable() {
  const { language } =
    useTechnician();

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">

        <h3 className="truncate font-bold text-gray-900">
          {t(
            "recentJobs",
            language
          )}
        </h3>

        <button
          type="button"
          className="ml-3 flex shrink-0 items-center text-xs font-semibold text-blue-600 transition hover:underline"
        >
          <span>
            {t(
              "viewAll",
              language
            )}
          </span>

          <ChevronRight className="ml-1 h-3 w-3 shrink-0" />
        </button>

      </div>

      {/* =====================================================
          FIXED TABLE
      ===================================================== */}

      <div className="w-full overflow-hidden">

        <table className="w-full table-fixed border-collapse">

          {/* =================================================
              COLUMN WIDTHS
          ================================================= */}

          <colgroup>

            <col className="w-[22%]" />

            <col className="w-[16%]" />

            <col className="w-[22%]" />

            <col className="w-[12%]" />

            <col className="w-[18%]" />

            <col className="w-[10%]" />

          </colgroup>

          {/* =================================================
              HEADER
          ================================================= */}

          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">

              <th className="overflow-hidden px-3 py-3 text-left text-[10px] font-semibold uppercase text-gray-400 sm:px-4">
                <span className="block truncate">
                  {t(
                    "customerName",
                    language
                  )}
                </span>
              </th>

              <th className="overflow-hidden px-3 py-3 text-left text-[10px] font-semibold uppercase text-gray-400 sm:px-4">
                <span className="block truncate">
                  {t(
                    "jobType",
                    language
                  )}
                </span>
              </th>

              <th className="overflow-hidden px-3 py-3 text-left text-[10px] font-semibold uppercase text-gray-400 sm:px-4">
                <span className="block truncate">
                  {t(
                    "product",
                    language
                  )}
                </span>
              </th>

              <th className="overflow-hidden px-3 py-3 text-left text-[10px] font-semibold uppercase text-gray-400 sm:px-4">
                <span className="block truncate">
                  {t(
                    "status",
                    language
                  )}
                </span>
              </th>

              <th className="overflow-hidden px-3 py-3 text-left text-[10px] font-semibold uppercase text-gray-400 sm:px-4">
                <span className="block truncate">
                  {t(
                    "time",
                    language
                  )}
                </span>
              </th>

              <th className="overflow-hidden px-3 py-3 text-center text-[10px] font-semibold uppercase text-gray-400 sm:px-4">
                <span className="block truncate">
                  {t(
                    "action",
                    language
                  )}
                </span>
              </th>

            </tr>
          </thead>

          {/* =================================================
              BODY
          ================================================= */}

          <tbody>

            {recentJobs.map(
              (job, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                >

                  {/* =========================================
                      CUSTOMER
                  ========================================= */}

                  <td className="max-w-0 overflow-hidden px-3 py-4 sm:px-4">

                    <div className="flex min-w-0 items-center gap-2">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                        {job.initials}
                      </div>

                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">
                        {job.name}
                      </span>

                    </div>

                  </td>

                  {/* =========================================
                      JOB TYPE
                  ========================================= */}

                  <td className="max-w-0 overflow-hidden px-3 py-4 sm:px-4">

                    <div className="flex min-w-0 items-center gap-1">

                      <Wrench className="h-3 w-3 shrink-0 text-gray-400" />

                      <span className="min-w-0 truncate text-sm font-medium text-blue-600">
                        {translateJobType(
                          job.type,
                          language
                        )}
                      </span>

                    </div>

                  </td>

                  {/* =========================================
                      PRODUCT
                  ========================================= */}

                  <td className="max-w-0 overflow-hidden px-3 py-4 sm:px-4">

                    <div className="min-w-0">

                      <div
                        className="truncate text-sm font-medium text-gray-900"
                        title={job.product}
                      >
                        {job.product}
                      </div>

                      <div
                        className="truncate text-xs text-gray-500"
                        title={`SN: ${job.sn}`}
                      >
                        SN: {job.sn}
                      </div>

                    </div>

                  </td>

                  {/* =========================================
                      STATUS
                  ========================================= */}

                  <td className="max-w-0 overflow-hidden px-3 py-4 sm:px-4">

                    <span
                      className={`inline-flex max-w-full items-center rounded-full px-2 py-1 text-[10px] font-semibold ${job.statusColor}`}
                    >
                      <span className="truncate">
                        {translateStatus(
                          job.status,
                          language
                        )}
                      </span>
                    </span>

                  </td>

                  {/* =========================================
                      TIME
                  ========================================= */}

                  <td className="max-w-0 overflow-hidden px-3 py-4 sm:px-4">

                    <span
                      className="block truncate text-sm text-gray-500"
                      title={translateTime(
                        job.time,
                        language
                      )}
                    >
                      {translateTime(
                        job.time,
                        language
                      )}
                    </span>

                  </td>

                  {/* =========================================
                      ACTION
                  ========================================= */}

                  <td className="overflow-hidden px-2 py-4 text-center sm:px-3">

                    <button
                      type="button"
                      className="inline-flex max-w-full items-center justify-center rounded-lg border border-blue-200 px-2.5 py-1 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <span className="truncate">
                        {t(
                          "view",
                          language
                        )}
                      </span>
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>
        </table>

      </div>
    </div>
  );
}