// app/dashboard/components/layout/Topbar.tsx

"use client";

import { useRouter } from "next/navigation";

import {
  Bell,
  LogOut,
  Menu,
  MessageSquare,
  Search,
} from "lucide-react";

import UserProfile from "./UserProfile";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* ============================================================================
   TRANSLATIONS
============================================================================ */

const TRANSLATIONS = {
  welcomeBack: {
    English: "Welcome back",
    Bangla: "স্বাগতম",
  },

  waterCareToday: {
    English:
      "Here's what's happening with your water care today.",
    Bangla:
      "আজ আপনার পানি ব্যবস্থাপনায় যা ঘটছে তার সংক্ষিপ্ত বিবরণ।",
  },

  search: {
    English: "Search anything...",
    Bangla: "যেকোনো কিছু খুঁজুন...",
  },

  searchAria: {
    English: "Search",
    Bangla: "অনুসন্ধান",
  },

  notifications: {
    English: "Notifications",
    Bangla: "নোটিফিকেশন",
  },

  messages: {
    English: "Messages",
    Bangla: "বার্তা",
  },

  logout: {
    English: "Logout",
    Bangla: "লগআউট",
  },

  openMenu: {
    English: "Open menu",
    Bangla: "মেনু খুলুন",
  },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS;

/* ============================================================================
   TRANSLATION HELPER
============================================================================ */

function t(
  key: TranslationKey,
  language: CustomerLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* ============================================================================
   PROPS
============================================================================ */

interface TopbarProps {
  onMenuClick?: () => void;
}

/* ============================================================================
   COMPONENT
============================================================================ */

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  const router = useRouter();

  const {
    profile,
    language,
  } = useUser();

  /* ==========================================================================
     USER INFORMATION
  ========================================================================== */

  const userName =
    profile.fullName || "User";

  const userAvatar =
    profile.avatarUrl ||
    "https://i.pravatar.cc/72?img=12";

  /* ==========================================================================
     LOGOUT
  ========================================================================== */

  const handleLogout = () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      router.replace("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      window.location.href = "/login";
    }
  };

  /* ==========================================================================
     RENDER
  ========================================================================== */

  return (
    <div className="flex w-full items-center justify-between gap-2">

      {/* ======================================================================
          LEFT SIDE
      ====================================================================== */}

      <div className="flex min-w-0 items-center gap-2">

        {/* Mobile Menu */}

        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-50 lg:hidden"
          aria-label={t(
            "openMenu",
            language
          )}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Welcome */}

        <div className="min-w-0">

          <p className="truncate text-sm font-bold text-slate-800 sm:text-base">

            {t(
              "welcomeBack",
              language
            )}

            ,{" "}

            <span className="text-slate-900">
              {userName}
            </span>{" "}
            👋

          </p>

          <p className="hidden truncate text-xs text-slate-400 sm:block">
            {t(
              "waterCareToday",
              language
            )}
          </p>

        </div>
      </div>

      {/* ======================================================================
          RIGHT SIDE
      ====================================================================== */}

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

        {/* ====================================================================
            DESKTOP SEARCH
        ==================================================================== */}

        <div className="relative hidden items-center rounded-lg bg-slate-50 px-3 py-1.5 md:flex">

          <Search className="h-4 w-4 text-slate-400" />

          <input
            type="text"
            placeholder={t(
              "search",
              language
            )}
            className="ml-2 w-32 bg-transparent text-xs text-slate-500 placeholder:text-slate-400 focus:outline-none lg:w-40"
          />

        </div>

        {/* ====================================================================
            MOBILE SEARCH
        ==================================================================== */}

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100 md:hidden"
          aria-label={t(
            "searchAria",
            language
          )}
        >
          <Search className="h-4 w-4" />
        </button>

        {/* ====================================================================
            NOTIFICATIONS
        ==================================================================== */}

        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100"
          aria-label={t(
            "notifications",
            language
          )}
        >
          <Bell className="h-4 w-4" />

          {/* Notification Dot */}

          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        {/* ====================================================================
            MESSAGES
        ==================================================================== */}

        <button
          type="button"
          className="relative hidden h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100 sm:flex"
          aria-label={t(
            "messages",
            language
          )}
        >
          <MessageSquare className="h-4 w-4" />

          {/* Message Dot */}

          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        {/* ====================================================================
            USER PROFILE
        ==================================================================== */}

        <UserProfile
          name={userName}
          avatarSrc={userAvatar}
        />

        {/* ====================================================================
            LOGOUT
        ==================================================================== */}

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center rounded-lg bg-rose-500 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600 sm:px-3.5"
        >
          <span className="hidden sm:inline">
            {t(
              "logout",
              language
            )}
          </span>

          <LogOut className="h-4 w-4 sm:hidden" />
        </button>

      </div>
    </div>
  );
}