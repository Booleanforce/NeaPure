"use client";

import {
  Phone,
  Clock,
  MapPin,
  Play,
} from "lucide-react";

import { useTechnician } from "../../context/TechnicianContext";

export default function CurrentJobCard() {
  const { language } =
    useTechnician();

  const isBangla =
    language === "Bangla";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

        <h3 className="font-bold text-gray-900">
          {isBangla
            ? "বর্তমান কাজ"
            : "Current Job"}
        </h3>

        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          {isBangla
            ? "পথে আছে"
            : "On the way"}
        </span>

      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="p-5">

        {/* =======================================================
            MAP
        ======================================================= */}

        <div className="relative mb-4 h-32 overflow-hidden rounded-lg bg-gradient-to-br from-green-100 to-blue-100">

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="relative">

              <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow-lg" />

              <div className="absolute left-0 top-4 h-0.5 w-16 bg-blue-600" />

              <div className="absolute left-16 top-4 h-12 w-0.5 bg-blue-600" />

              <div className="absolute left-16 top-16 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-lg" />

            </div>

          </div>

          <div className="absolute inset-0 opacity-20">

            <div className="grid h-full grid-cols-4 grid-rows-3">

              {[...Array(12)].map(
                (_, index) => (
                  <div
                    key={index}
                    className="border border-gray-300"
                  />
                )
              )}

            </div>

          </div>

        </div>

        {/* =======================================================
            CUSTOMER
        ======================================================= */}

        <div className="mb-3 flex items-center justify-between">

          <div className="flex items-center space-x-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              RH
            </div>

            <div>

              <div className="text-sm font-semibold text-gray-900">
                Rakib Hasan
              </div>

              <div className="text-xs text-gray-500">
                01712-345678
              </div>

              <div className="text-xs text-gray-400">
                Mirpur DOHS, Dhaka
              </div>

            </div>

          </div>

          <button
            type="button"
            aria-label={
              isBangla
                ? "গ্রাহককে কল করুন"
                : "Call customer"
            }
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
          >
            <Phone className="h-4 w-4" />
          </button>

        </div>

        {/* =======================================================
            PRODUCT
        ======================================================= */}

        <div className="mb-4 rounded-lg bg-gray-50 p-3">

          <div className="flex items-center space-x-3">

            <div className="h-10 w-8 rounded bg-blue-200" />

            <div>

              <div className="text-sm font-semibold text-gray-900">
                NeaPure Pro Max
              </div>

              <div className="text-xs text-gray-500">
                SN: NPX12457896
              </div>

              <button
                type="button"
                className="mt-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                {isBangla
                  ? "বিস্তারিত দেখুন"
                  : "View Details"}
              </button>

            </div>

          </div>

        </div>

        {/* =======================================================
            JOB DETAILS
        ======================================================= */}

        <div className="mb-4 space-y-2">

          {/* Appointment */}
          <div className="flex items-center space-x-2 text-xs">

            <Clock className="h-3 w-3 text-gray-400" />

            <span className="text-gray-500">
              {isBangla
                ? "অ্যাপয়েন্টমেন্ট সময়"
                : "Appointment Time"}
            </span>

            <span className="ml-auto font-semibold text-gray-900">
              09:30 AM – 10:30 AM
            </span>

          </div>

          {/* Service Type */}
          <div className="flex items-center space-x-2 text-xs">

            <MapPin className="h-3 w-3 text-red-400" />

            <span className="text-gray-500">
              {isBangla
                ? "সেবার ধরন"
                : "Service Type"}
            </span>

            <span className="ml-auto font-semibold text-blue-600">
              {isBangla
                ? "ইনস্টলেশন"
                : "Installation"}
            </span>

          </div>

        </div>

        {/* =======================================================
            START JOB
        ======================================================= */}

        <button
          type="button"
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >

          <Play
            className="h-4 w-4"
            fill="currentColor"
          />

          <span>
            {isBangla
              ? "কাজ শুরু করুন"
              : "Start Job"}
          </span>

        </button>

      </div>
    </div>
  );
}