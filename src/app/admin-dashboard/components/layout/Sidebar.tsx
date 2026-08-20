"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Droplets,
  X,
} from "lucide-react";

import {
  useAdmin,
  type AdminLanguage,
} from "../../context/AdminContext";

import { navItems } from "../../data/navItems";
import UserProfile from "./UserProfile";

/* =========================================================
   TYPES
========================================================= */

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/* =========================================================
   TRANSLATIONS
========================================================= */

const NAV_TRANSLATIONS: Record<
  string,
  {
    English: string;
    Bangla: string;
  }
> = {
  Dashboard: {
    English: "Dashboard",
    Bangla: "ড্যাশবোর্ড",
  },

  Customers: {
    English: "Customers",
    Bangla: "গ্রাহক",
  },

  Products: {
    English: "Products",
    Bangla: "পণ্য",
  },

  Dealers: {
    English: "Dealers",
    Bangla: "ডিলার",
  },

  Technicians: {
    English: "Technicians",
    Bangla: "টেকনিশিয়ান",
  },

  "Sales & Orders": {
    English: "Sales & Orders",
    Bangla: "বিক্রয় ও অর্ডার",
  },

  Installations: {
    English: "Installations",
    Bangla: "ইনস্টলেশন",
  },

  "Service Requests": {
    English: "Service Requests",
    Bangla: "সার্ভিস অনুরোধ",
  },

  "Service Tracking": {
    English: "Service Tracking",
    Bangla: "সার্ভিস ট্র্যাকিং",
  },

  "Replacement Kits": {
    English: "Replacement Kits",
    Bangla: "রিপ্লেসমেন্ট কিট",
  },

  Warranty: {
    English: "Warranty",
    Bangla: "ওয়ারেন্টি",
  },

  Payments: {
    English: "Payments",
    Bangla: "পেমেন্ট",
  },

  "Reports & Analytics": {
    English: "Reports & Analytics",
    Bangla: "রিপোর্ট ও অ্যানালিটিক্স",
  },

  Notifications: {
    English: "Notifications",
    Bangla: "নোটিফিকেশন",
  },
    "My Profile": {
    English: "My Profile",
    Bangla: "আমার প্রোফাইল",
  },

  Settings: {
    English: "Settings",
    Bangla: "সেটিংস",
  },

  "User Management": {
    English: "User Management",
    Bangla: "ইউজার ম্যানেজমেন্ট",
  },
};

/* =========================================================
   TRANSLATE NAV LABEL
========================================================= */

function translateNavLabel(
  label: string,
  language: AdminLanguage
): string {
  return (
    NAV_TRANSLATIONS[label]?.[language] ??
    label
  );
}

/* =========================================================
   ACTIVE ROUTE
========================================================= */

function isRouteActive(
  pathname: string | null,
  href: string
): boolean {
  if (!pathname) {
    return false;
  }

  if (href === "/admin-dashboard") {
    return pathname === "/admin-dashboard";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

export default function Sidebar({
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const { language } =
    useAdmin();

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const handleNavigate = () => {
    onClose?.();
  };

  return (
    <>
      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex h-screen w-72 max-w-[85vw]
          flex-col
          border-r border-gray-200
          bg-white
          shadow-xl
          transition-transform duration-200 ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:w-64
          lg:max-w-none
          lg:translate-x-0
          lg:shadow-none
        `}
      >
        {/* ===================================================
            LOGO
        =================================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
              <Droplets className="h-6 w-6 text-white" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900">
                NeaPure
              </h2>

              <p className="truncate text-[10px] font-medium tracking-wide text-gray-400">
                SMART WATER CARE
              </p>
            </div>

          </div>

          {/* Mobile close */}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <nav className="min-h-0 flex-1 overflow-y-auto p-3">

          <div className="space-y-1">

            {navItems.map(
              (item) => {
                const active =
                  isRouteActive(
                    pathname,
                    item.href
                  );

                const label =
                  translateNavLabel(
                    item.name,
                    language
                  );

                return (
                  <Link
                    key={`${item.name}-${item.href}`}
                    href={item.href}
                    onClick={handleNavigate}
                    aria-current={
                      active
                        ? "page"
                        : undefined
                    }
                    className={`
                      group flex w-full
                      items-center gap-3
                      rounded-xl
                      px-3 py-2.5
                      text-sm font-medium
                      transition-all duration-200

                      ${
                        active
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        h-5 w-5 shrink-0
                        transition-colors

                        ${
                          active
                            ? "text-white"
                            : "text-gray-400 group-hover:text-blue-600"
                        }
                      `}
                    />

                    <span className="min-w-0 flex-1 truncate text-left">
                      {label}
                    </span>

                    {item.badge !==
                      undefined && (
                      <span
                        className={`
                          flex h-5 min-w-5
                          items-center justify-center
                          rounded-full px-1
                          text-[10px] font-bold

                          ${
                            active
                              ? "bg-white text-blue-600"
                              : "bg-red-500 text-white"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }
            )}

          </div>
        </nav>

        {/* ===================================================
            USER PROFILE
        =================================================== */}

        <div className="shrink-0 border-t border-gray-100 bg-white p-3">
          <UserProfile />
        </div>

      </aside>
    </>
  );
}