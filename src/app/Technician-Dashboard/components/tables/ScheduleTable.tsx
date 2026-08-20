"use client";

import {
  Calendar,
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
  todaysSchedule: {
    English: "Today's Schedule",
    Bangla: "আজকের সময়সূচি",
  },

  viewAll: {
    English: "View All",
    Bangla: "সব দেখুন",
  },

  viewFullSchedule: {
    English: "View Full Schedule",
    Bangla: "সম্পূর্ণ সময়সূচি দেখুন",
  },

  onTheWay: {
    English: "On the way",
    Bangla: "পথে আছে",
  },

  upcoming: {
    English: "Upcoming",
    Bangla: "আসন্ন",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: TechnicianLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   STATUS TRANSLATION
========================================================= */

function translateStatus(
  status: string,
  language: TechnicianLanguage
): string {
  switch (status) {
    case "On the way":
      return t(
        "onTheWay",
        language
      );

    case "Upcoming":
      return t(
        "upcoming",
        language
      );

    default:
      return status;
  }
}

/* =========================================================
   SCHEDULE DATA
========================================================= */

const schedule = [
  {
    time: "09:30 AM",
    status: "On the way",
    statusColor:
      "bg-green-100 text-green-700",
    name: "Rakib Hasan",
    initials: "RH",
    phone: "01712-345678",
    address:
      "Mirpur DOHS, Dhaka",
    product: "NeaPure Pro Max",
    sn: "NPX12457896",
  },

  {
    time: "11:30 AM",
    status: "Upcoming",
    statusColor:
      "bg-blue-100 text-blue-700",
    name: "Shamima Akter",
    initials: "SA",
    phone: "01823-456789",
    address:
      "Uttara Sector 7, Dhaka",
    product: "NeaPure Plus",
    sn: "NPP98765432",
  },

  {
    time: "02:30 PM",
    status: "Upcoming",
    statusColor:
      "bg-blue-100 text-blue-700",
    name: "Ariful Islam",
    initials: "AI",
    phone: "01678-910111",
    address:
      "Bashundhara R/A, Dhaka",
    product: "NeaPure Max",
    sn: "NPM11223344",
  },

  {
    time: "04:30 PM",
    status: "Upcoming",
    statusColor:
      "bg-blue-100 text-blue-700",
    name: "Farjana Islam",
    initials: "FI",
    phone: "01798-765432",
    address:
      "Dhanmondi 27, Dhaka",
    product: "NeaPure Pro",
    sn: "NPP55667788",
  },

  {
    time: "06:30 PM",
    status: "Upcoming",
    statusColor:
      "bg-blue-100 text-blue-700",
    name: "Monir Hossain",
    initials: "MH",
    phone: "01324-567890",
    address:
      "Mohammadpur, Dhaka",
    product: "NeaPure Lite",
    sn: "NPL33445566",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function ScheduleTable() {
  const { language } =
    useTechnician();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

        <h3 className="font-bold text-gray-900">
          {t(
            "todaysSchedule",
            language
          )}
        </h3>

        <button
          type="button"
          className="flex items-center text-xs font-semibold text-blue-600 hover:underline"
        >
          {t(
            "viewAll",
            language
          )}

          <ChevronRight className="ml-1 h-3 w-3" />
        </button>

      </div>

      {/* =====================================================
          SCHEDULE ITEMS
      ===================================================== */}

      <div className="divide-y divide-gray-50">

        {schedule.map(
          (item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50"
            >

              {/* =========================================
                  CUSTOMER
              ========================================= */}

              <div className="flex items-center space-x-4">

                {/* Time + Status */}

                <div className="text-center">

                  <div className="text-sm font-bold text-blue-600">
                    {item.time}
                  </div>

                  <div
                    className={`mt-1 rounded-full px-2 py-0.5 text-[10px] ${item.statusColor}`}
                  >
                    {translateStatus(
                      item.status,
                      language
                    )}
                  </div>

                </div>

                {/* Avatar */}

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  {item.initials}
                </div>

                {/* Customer Information */}

                <div>

                  <div className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </div>

                  <div className="text-xs text-gray-500">
                    {item.phone}
                  </div>

                  <div className="text-xs text-gray-400">
                    {item.address}
                  </div>

                </div>

              </div>

              {/* =========================================
                  PRODUCT
              ========================================= */}

              <div className="flex items-center space-x-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">

                  <div className="h-8 w-6 rounded bg-blue-200" />

                </div>

                <div>

                  <div className="text-sm font-semibold text-gray-900">
                    {item.product}
                  </div>

                  <div className="text-xs text-gray-500">
                    SN: {item.sn}
                  </div>

                </div>

                <ChevronRight className="h-4 w-4 text-gray-400" />

              </div>

            </div>
          )
        )}

      </div>

      {/* =====================================================
          FULL SCHEDULE BUTTON
      ===================================================== */}

      <div className="border-t border-gray-100 px-5 py-4">

        <button
          type="button"
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >

          <Calendar className="h-4 w-4" />

          <span>
            {t(
              "viewFullSchedule",
              language
            )}
          </span>

        </button>

      </div>
    </div>
  );
}