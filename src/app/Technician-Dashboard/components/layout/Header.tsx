"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Bell,
  LogOut,
  Menu,
  Languages,
} from "lucide-react";

import {
  useTechnician,
} from "../../context/TechnicianContext";

import {
  useTranslation,
} from "../../i18n/useTranslation";

export default function Header() {
  const router =
    useRouter();

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  const {
    technician,
    language,
    setLanguage,
  } = useTechnician();

  const { t } =
    useTranslation();

  const userName =
    technician.fullName ||
    "Technician";

  const userAvatar =
    technician.profile
      .profilePhoto || "";

  const userLocation =
    technician.profile
      .region ||
    t("header", "location");

  const initials =
    userName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (part) =>
          part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T";

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout =
    () => {
      if (loggingOut) {
        return;
      }

      try {
        setLoggingOut(true);

        localStorage.removeItem(
          "access"
        );

        localStorage.removeItem(
          "refresh"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "access_token"
        );

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "authToken"
        );

        localStorage.removeItem(
          "jwt"
        );

        router.replace(
          "/login"
        );
      } catch {
        window.location.href =
          "/login";
      }
    };

  /* =========================================================
     LANGUAGE
  ========================================================= */

  const handleLanguageChange =
    async (
      nextLanguage:
        | "English"
        | "Bangla"
    ) => {
      if (
        nextLanguage ===
        language
      ) {
        return;
      }

      try {
        await setLanguage(
          nextLanguage
        );
      } catch (error) {
        console.error(
          "Language update failed:",
          error
        );
      }
    };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6">

      {/* =================================================
          LEFT
      ================================================= */}

      <div className="flex min-w-0 items-center gap-3">

        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        <div className="min-w-0">

          <h1 className="truncate text-sm font-bold text-gray-900 sm:text-lg">
            {t(
              "header",
              "goodMorning"
            )}
            ,{" "}
            {userName} 👋
          </h1>

          <p className="hidden text-sm text-gray-500 sm:block">
            {t(
              "dashboard",
              "subtitle"
            )}
          </p>
        </div>
      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* LOCATION */}

        <div className="hidden items-center gap-2 text-sm text-gray-600 lg:flex">
          <MapPin className="h-4 w-4 text-blue-600" />

          <span>
            {userLocation}
          </span>
        </div>

        {/* LANGUAGE */}

        <div className="hidden items-center rounded-lg border border-gray-200 bg-gray-50 p-1 sm:flex">

          <Languages className="ml-1 h-4 w-4 text-gray-500" />

          <button
            type="button"
            onClick={() =>
              handleLanguageChange(
                "English"
              )
            }
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
              language ===
              "English"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            English
          </button>

          <button
            type="button"
            onClick={() =>
              handleLanguageChange(
                "Bangla"
              )
            }
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
              language ===
              "Bangla"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            বাংলা
          </button>
        </div>

        {/* MOBILE LANGUAGE */}

        <button
          type="button"
          onClick={() =>
            handleLanguageChange(
              language ===
                "English"
                ? "Bangla"
                : "English"
            )
          }
          className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-2 text-xs font-medium text-gray-600 sm:hidden"
          aria-label="Change language"
        >
          <Languages className="h-4 w-4" />

          {language ===
          "English"
            ? "বাং"
            : "EN"}
        </button>

        {/* NOTIFICATION */}

        <button
          type="button"
          className="relative rounded-lg p-2 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-600" />

          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span>
        </button>

        {/* USER */}

        <div className="flex items-center gap-2 border-l border-gray-200 pl-3 sm:gap-3 sm:pl-4">

          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white sm:h-10 sm:w-10">
              {initials}
            </div>
          )}

          <div className="hidden sm:block">
            <div className="max-w-[130px] truncate text-sm font-semibold text-gray-900">
              {userName}
            </div>

            <div className="text-xs uppercase text-gray-500">
              {technician.role}
            </div>
          </div>
        </div>

        {/* LOGOUT */}

        <button
          type="button"
          onClick={
            handleLogout
          }
          disabled={
            loggingOut
          }
          className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60 sm:px-4"
        >
          <span className="hidden sm:inline">
            {loggingOut
              ? "..."
              : t(
                  "common",
                  "logout"
                )}
          </span>

          <LogOut className="h-4 w-4 sm:hidden" />
        </button>
      </div>
    </header>
  );
}