/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ChevronDown,
} from "lucide-react";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

/* =========================================================
   USER TYPE
========================================================= */

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  photo?: string | null;
}

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  guestUser: {
    English: "Guest User",
    Bangla: "অতিথি ব্যবহারকারী",
  },

  guest: {
    English: "Guest",
    Bangla: "অতিথি",
  },

  superAdmin: {
    English: "Super Admin",
    Bangla: "সুপার অ্যাডমিন",
  },

  admin: {
    English: "Admin",
    Bangla: "অ্যাডমিন",
  },

  operationsAdmin: {
    English: "Operations Admin",
    Bangla: "অপারেশনস অ্যাডমিন",
  },

  technician: {
    English: "Technician",
    Bangla: "টেকনিশিয়ান",
  },

  customer: {
    English: "Customer",
    Bangla: "গ্রাহক",
  },

  dealer: {
    English: "Dealer",
    Bangla: "ডিলার",
  },

  user: {
    English: "User",
    Bangla: "ব্যবহারকারী",
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
  role: string | undefined,
  language: AdminLanguage
): string {
  if (!role) {
    return t(
      "guest",
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
        "admin",
        language
      );

    case "OPERATIONS_ADMIN":
    case "OPERATION_ADMIN":
      return t(
        "operationsAdmin",
        language
      );

    case "TECHNICIAN":
      return t(
        "technician",
        language
      );

    case "CUSTOMER":
      return t(
        "customer",
        language
      );

    case "DEALER":
      return t(
        "dealer",
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
   USER PROFILE
========================================================= */

export default function UserProfile() {
  const { language } =
    useAdmin();

  const [
    user,
    setUser,
  ] = useState<User | null>(
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
        ) as User;

      setUser(parsedUser);
      setImageError(false);
    } catch (error) {
      console.error(
        "Invalid user data:",
        error
      );
    }
  }, []);

  /* =======================================================
     INITIALS
  ======================================================= */

  const initials =
    user?.full_name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (word) =>
          word.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "NA";

  /* =======================================================
     DISPLAY NAME
  ======================================================= */

  const displayName =
    user?.full_name?.trim() ||
    t(
      "guestUser",
      language
    );

  /* =======================================================
     DISPLAY ROLE
  ======================================================= */

  const displayRole =
    translateRole(
      user?.role,
      language
    );

  /* =======================================================
     IMAGE
  ======================================================= */

  const showImage =
    Boolean(user?.photo) &&
    !imageError;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="border-t border-gray-100 bg-white p-3">

      <button
        type="button"
        className="
          flex w-full
          min-w-0
          items-center
          gap-3
          rounded-xl
          p-2
          text-left
          transition
          hover:bg-gray-50
        "
      >

        {/* =================================================
            AVATAR
        ================================================= */}

        <div className="shrink-0">

          {showImage ? (
            <img
              src={user?.photo ?? ""}
              alt={
                user?.full_name ||
                "User"
              }
              className="
                h-10
                w-10
                rounded-full
                object-cover
                ring-1
                ring-gray-100
              "
              onError={() =>
                setImageError(true)
              }
            />
          ) : (
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-cyan-500
                text-sm
                font-bold
                text-white
              "
            >
              {initials}
            </div>
          )}

        </div>

        {/* =================================================
            USER INFORMATION
        ================================================= */}

        <div className="min-w-0 flex-1">

          <p
            className="
              truncate
              text-sm
              font-semibold
              text-gray-900
            "
            title={displayName}
          >
            {displayName}
          </p>

          <p
            className="
              truncate
              text-xs
              text-gray-500
            "
            title={displayRole}
          >
            {displayRole}
          </p>

        </div>

        {/* =================================================
            DROPDOWN
        ================================================= */}

        <ChevronDown
          className="
            h-4
            w-4
            shrink-0
            text-gray-400
          "
        />

      </button>

    </div>
  );
}