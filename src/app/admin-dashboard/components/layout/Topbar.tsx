/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NotificationDropdown from "@/components/ui/NotificationDropdown";

import {
  Search,
  Calendar,
  ChevronDown,
  MapPin,
  Menu,
  LogOut,
} from "lucide-react";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   TYPES
========================================================= */

interface Props {
  onMenuClick?: () => void;
  onLogout?: () => void;
}

interface StoredUser {
  id?: string;
  email?: string;
  full_name?: string;
  fullName?: string;
  name?: string;
  phone?: string | null;
  location?: string | null;
  role?: string | null;
  photo?: string | null;
}

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  searchPlaceholder: {
    English: "Search anything...",
    Bangla: "যেকোনো কিছু খুঁজুন...",
  },

  dateRange: {
    English: "24 May 2024 - 24 Jun 2024",
    Bangla: "২৪ মে ২০২৪ - ২৪ জুন ২০২৪",
  },

  allBranches: {
    English: "All Branches",
    Bangla: "সব শাখা",
  },

  admin: {
    English: "NeaPure Admin",
    Bangla: "নিয়াপিউর অ্যাডমিন",
  },

  superAdmin: {
    English: "Super Admin",
    Bangla: "সুপার অ্যাডমিন",
  },

  adminRole: {
    English: "Admin",
    Bangla: "অ্যাডমিন",
  },

  operationsAdmin: {
    English: "Operations Admin",
    Bangla: "অপারেশনস অ্যাডমিন",
  },

  logout: {
    English: "Logout",
    Bangla: "লগআউট",
  },

  loggingOut: {
    English: "Logging out...",
    Bangla: "লগআউট হচ্ছে...",
  },

  openMenu: {
    English: "Open sidebar",
    Bangla: "সাইডবার খুলুন",
  },

  search: {
    English: "Search",
    Bangla: "অনুসন্ধান",
  },

  profile: {
    English: "Profile",
    Bangla: "প্রোফাইল",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* =========================================================
   TRANSLATION HELPER
========================================================= */

function t(
  key: TranslationKey,
  language: AdminLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* =========================================================
   ROLE TRANSLATION
========================================================= */

function translateRole(
  role: string | undefined | null,
  language: AdminLanguage
): string {
  if (!role) {
    return t(
      "superAdmin",
      language
    );
  }

  const normalized =
    role
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_");

  switch (normalized) {
    case "SUPER_ADMIN":
      return t(
        "superAdmin",
        language
      );

    case "ADMIN":
      return t(
        "adminRole",
        language
      );

    case "OPERATIONS_ADMIN":
    case "OPERATION_ADMIN":
      return t(
        "operationsAdmin",
        language
      );

    default:
      return role
        .replace(/_/g, " ")
        .replace(
          /\b\w/g,
          (character) =>
            character.toUpperCase()
        );
  }
}

/* =========================================================
   TOPBAR
========================================================= */

export default function Topbar({
  onMenuClick,
  onLogout,
}: Props) {
  const router = useRouter();

  const {
    language,
    setLanguage,
  } = useAdmin();

  /* =======================================================
     LOGOUT
  ======================================================= */

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  /* =======================================================
     USER
  ======================================================= */

  const [
    user,
    setUser,
  ] = useState<StoredUser | null>(
    null
  );

  const [
    imageError,
    setImageError,
  ] = useState(false);

  /* =======================================================
     LOAD USER
  ======================================================= */

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (!storedUser) {
        return;
      }

      const parsedUser =
        JSON.parse(
          storedUser
        ) as StoredUser;

      setUser(parsedUser);
      setImageError(false);
    } catch (error) {
      console.error(
        "Failed to load admin user:",
        error
      );
    }
  }, []);

  /* =======================================================
     USER DISPLAY DATA
  ======================================================= */

  const userName =
    user?.full_name ||
    user?.fullName ||
    user?.name ||
    t(
      "admin",
      language
    );

  const userRole =
    translateRole(
      user?.role,
      language
    );

  const userInitial =
    userName
      .trim()
      .charAt(0)
      .toUpperCase() || "A";

  const userPhoto =
    user?.photo || "";

  const showPhoto =
    Boolean(userPhoto) &&
    !imageError;

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      localStorage.removeItem(
        "access"
      );

      localStorage.removeItem(
        "refresh"
      );

      localStorage.removeItem(
        "access_token"
      );

      localStorage.removeItem(
        "user"
      );

      if (onLogout) {
        onLogout();
        return;
      }

      router.replace("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      window.location.href =
        "/login";
    }
  };

  /* =======================================================
     LANGUAGE
  ======================================================= */

  const handleLanguageChange = async (
    nextLanguage: AdminLanguage
  ) => {
    if (
      nextLanguage === language
    ) {
      return;
    }

    try {
      await setLanguage(
        nextLanguage
      );
    } catch (error) {
      console.error(
        "Language change failed:",
        error
      );
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-2 sm:gap-3">

      {/* ===================================================
          LEFT
      =================================================== */}

      <div className="flex min-w-0 flex-1 items-center gap-2">

        {/* Mobile menu */}

        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-9 w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-gray-500
            transition
            hover:bg-gray-50
            hover:text-gray-900
            lg:hidden
          "
          aria-label={t(
            "openMenu",
            language
          )}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop search */}

        <div className="relative hidden w-full max-w-md md:block">
          <Search
            className="
              absolute
              left-3
              top-1/2
              h-4 w-4
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder={t(
              "searchPlaceholder",
              language
            )}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              py-2
              pl-10
              pr-4
              text-sm
              text-gray-700
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-400
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* Mobile search */}

        <button
          type="button"
          className="
            flex
            h-9 w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-gray-50
            text-gray-500
            transition
            hover:bg-gray-100
            md:hidden
          "
          aria-label={t(
            "search",
            language
          )}
        >
          <Search className="h-4 w-4" />
        </button>

      </div>

      {/* ===================================================
          RIGHT
      =================================================== */}

      <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">

        {/* Date */}

        <button
          type="button"
          className="
            hidden
            items-center
            gap-2
            rounded-lg
            border
            border-gray-200
            px-3
            py-2
            text-sm
            text-gray-600
            transition
            hover:bg-gray-50
            lg:flex
          "
        >
          <Calendar className="h-4 w-4 shrink-0" />

          <span className="whitespace-nowrap">
            {t(
              "dateRange",
              language
            )}
          </span>

          <ChevronDown className="h-4 w-4 shrink-0" />
        </button>

        {/* Branch */}

        <button
          type="button"
          className="
            hidden
            items-center
            gap-2
            rounded-lg
            border
            border-gray-200
            px-3
            py-2
            text-sm
            text-gray-600
            transition
            hover:bg-gray-50
            md:flex
          "
        >
          <MapPin className="h-4 w-4 shrink-0" />

          <span className="whitespace-nowrap">
            {t(
              "allBranches",
              language
            )}
          </span>

          <ChevronDown className="h-4 w-4 shrink-0" />
        </button>

        {/* =================================================
            LANGUAGE SWITCHER
        ================================================= */}

        <div
          className="
            flex
            items-center
            rounded-lg
            border
            border-gray-200
            bg-gray-50
            p-0.5
          "
        >
          <button
            type="button"
            onClick={() =>
              handleLanguageChange(
                "English"
              )
            }
            className={`
              rounded-md
              px-2
              py-1.5
              text-[11px]
              font-medium
              transition
              sm:px-3
              sm:text-xs

              ${
                language ===
                "English"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
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
            className={`
              rounded-md
              px-2
              py-1.5
              text-[11px]
              font-medium
              transition
              sm:px-3
              sm:text-xs

              ${
                language ===
                "Bangla"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            বাংলা
          </button>
        </div>

        {/* Notification */}

        <NotificationDropdown />

        {/* =================================================
            USER
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            border-l
            border-gray-200
            pl-2
            sm:gap-3
            sm:pl-3
          "
        >
          {/* Name + role */}

          <div className="hidden min-w-0 text-right sm:block">
            <h4
              className="
                max-w-[140px]
                truncate
                text-sm
                font-semibold
                text-gray-900
              "
              title={userName}
            >
              {userName}
            </h4>

            <p
              className="
                max-w-[140px]
                truncate
                text-xs
                text-gray-500
              "
              title={userRole}
            >
              {userRole}
            </p>
          </div>

          {/* Avatar */}

          {showPhoto ? (
            <img
              src={userPhoto}
              alt={userName}
              className="
                h-9 w-9
                shrink-0
                rounded-full
                object-cover
                ring-1
                ring-gray-200
                sm:h-10
                sm:w-10
              "
              onError={() =>
                setImageError(true)
              }
            />
          ) : (
            <div
              className="
                flex
                h-9 w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-cyan-500
                text-sm
                font-semibold
                text-white
                sm:h-10
                sm:w-10
              "
            >
              {userInitial}
            </div>
          )}
        </div>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="
            flex
            items-center
            justify-center
            rounded-lg
            bg-red-500
            px-2.5
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-red-600
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:px-4
          "
        >
          <span className="hidden sm:inline">
            {loggingOut
              ? t(
                  "loggingOut",
                  language
                )
              : t(
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