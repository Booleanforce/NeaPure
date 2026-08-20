"use client";

import React from "react";
import { Camera } from "lucide-react";

import {
  useTechnician,
  type TechnicianLanguage,
} from "../../context/TechnicianContext";

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  uploadJobPhotos: {
    English: "Upload Job Photos",
    Bangla: "কাজের ছবি আপলোড করুন",
  },

  mandatory: {
    English: "Mandatory for every job",
    Bangla: "প্রতিটি কাজের জন্য বাধ্যতামূলক",
  },

  beforeInstallation: {
    English: "Before Installation",
    Bangla: "ইনস্টলেশনের আগে",
  },

  afterInstallation: {
    English: "After Installation",
    Bangla: "ইনস্টলেশনের পরে",
  },

  upload: {
    English: "Upload",
    Bangla: "আপলোড",
  },

  savedToHistory: {
    English:
      "Photos will be saved to customer history",
    Bangla:
      "ছবিগুলো গ্রাহকের ইতিহাসে সংরক্ষণ করা হবে",
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
   COMPONENT
========================================================= */

export default function UploadPhotos() {
  const { language } =
    useTechnician();

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <h3 className="mb-1 font-bold text-gray-900">
        {t(
          "uploadJobPhotos",
          language
        )}
      </h3>

      <div className="mb-4 text-xs text-gray-500">
        {t(
          "mandatory",
          language
        )}
      </div>

      {/* =====================================================
          PHOTO UPLOAD OPTIONS
      ===================================================== */}

      <div className="grid grid-cols-2 gap-3">

        {/* ===================================================
            BEFORE INSTALLATION
        =================================================== */}

        <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 p-4 text-center transition-colors hover:border-blue-400">

          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Camera className="h-5 w-5 text-gray-400" />
          </div>

          <div className="mb-1 text-xs font-medium text-gray-600">
            {t(
              "beforeInstallation",
              language
            )}
          </div>

          <button
            type="button"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            {t(
              "upload",
              language
            )}
          </button>
        </div>

        {/* ===================================================
            AFTER INSTALLATION
        =================================================== */}

        <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 p-4 text-center transition-colors hover:border-blue-400">

          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Camera className="h-5 w-5 text-gray-400" />
          </div>

          <div className="mb-1 text-xs font-medium text-gray-600">
            {t(
              "afterInstallation",
              language
            )}
          </div>

          <button
            type="button"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            {t(
              "upload",
              language
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-3 text-center">
        <span className="text-[10px] text-gray-400">
          {t(
            "savedToHistory",
            language
          )}
        </span>
      </div>

    </div>
  );
}