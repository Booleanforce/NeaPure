"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  Wrench,
  FileText,
  QrCode,
  Users,
  Package,
  BarChart3,
  Wallet,
  HelpCircle,
  Bell,
  User,
  Settings,
  Droplets,
  Power,
} from "lucide-react";

import {
  useTranslation,
} from "../../i18n/useTranslation";

interface NavItem {
  key: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  href: string;
  translation:
    | [
        "dashboard",
        "title"
      ]
    | [
        "sidebar",
        "todaysJobs"
      ]
    | [
        "sidebar",
        "schedule"
      ]
    | [
        "sidebar",
        "installations"
      ]
    | [
        "sidebar",
        "serviceRequests"
      ]
    | [
        "sidebar",
        "qrCode"
      ]
    | [
        "sidebar",
        "customers"
      ]
    | [
        "sidebar",
        "products"
      ]
    | [
        "sidebar",
        "reports"
      ]
    | [
        "sidebar",
        "earnings"
      ]
    | [
        "sidebar",
        "support"
      ]
    | [
        "common",
        "notifications"
      ]
    | [
        "common",
        "profile"
      ]
    | [
        "common",
        "settings"
      ];

  badge?: number;
}

const navItems: NavItem[] = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    href: "/Technician-Dashboard",
    translation: [
      "dashboard",
      "title",
    ],
  },

  {
    key: "todaysJobs",
    icon: Calendar,
    href: "/Technician-Dashboard/todays-jobs",
    translation: [
      "sidebar",
      "todaysJobs",
    ],
  },

  {
    key: "schedule",
    icon: CalendarDays,
    href: "/Technician-Dashboard/schedule",
    translation: [
      "sidebar",
      "schedule",
    ],
  },

  {
    key: "installations",
    icon: Wrench,
    href: "/Technician-Dashboard/installations",
    translation: [
      "sidebar",
      "installations",
    ],
  },

  {
    key: "serviceRequests",
    icon: FileText,
    href: "/Technician-Dashboard/service-requests",
    translation: [
      "sidebar",
      "serviceRequests",
    ],
  },

  {
    key: "qrCode",
    icon: QrCode,
    href: "/Technician-Dashboard/qr-code",
    translation: [
      "sidebar",
      "qrCode",
    ],
  },

  {
    key: "customers",
    icon: Users,
    href: "/Technician-Dashboard/customers",
    translation: [
      "sidebar",
      "customers",
    ],
  },

  {
    key: "products",
    icon: Package,
    href: "/Technician-Dashboard/products",
    translation: [
      "sidebar",
      "products",
    ],
  },

  {
    key: "reports",
    icon: BarChart3,
    href: "/Technician-Dashboard/reports",
    translation: [
      "sidebar",
      "reports",
    ],
  },

  {
    key: "earnings",
    icon: Wallet,
    href: "/Technician-Dashboard/earnings",
    translation: [
      "sidebar",
      "earnings",
    ],
  },

  {
    key: "support",
    icon: HelpCircle,
    href: "/Technician-Dashboard/support",
    translation: [
      "sidebar",
      "support",
    ],
  },

  {
    key: "notifications",
    icon: Bell,
    href: "/Technician-Dashboard/notifications",
    translation: [
      "common",
      "notifications",
    ],
    badge: 3,
  },

  {
    key: "profile",
    icon: User,
    href: "/Technician-Dashboard/profile",
    translation: [
      "common",
      "profile",
    ],
  },

  {
    key: "settings",
    icon: Settings,
    href: "/Technician-Dashboard/settings",
    translation: [
      "common",
      "settings",
    ],
  },
];

export default function Sidebar() {
  const pathname =
    usePathname();

  const {
    t,
  } = useTranslation();

  const isActive = (
    href: string
  ) => {
    if (
      href ===
      "/Technician-Dashboard"
    ) {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

      {/* LOGO */}

      <div className="flex items-center gap-3 border-b border-gray-100 p-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <Droplets className="h-6 w-6 text-white" />
        </div>

        <div>
          <div className="text-lg font-bold leading-none text-gray-900">
            NeaPure
          </div>

          <div className="mt-1 text-[10px] font-medium text-gray-500">
            Smart Water Care
          </div>
        </div>
      </div>

      {/* NAV */}

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">

        {navItems.map(
          (item) => {
            const Icon =
              item.icon;

            const active =
              isActive(
                item.href
              );

            const label =
              t(
                item.translation[0] as never,
                item.translation[1] as never
              );

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />

                  <span className="truncate">
                    {label}
                  </span>
                </div>

                {item.badge !==
                  undefined && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {
                      item.badge
                    }
                  </span>
                )}
              </Link>
            );
          }
        )}
      </nav>

      {/* OFFLINE */}

      <div className="border-t border-gray-100 p-3">

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <Power className="h-4 w-4" />

          {t(
            "sidebar",
            "goOffline"
          )}
        </button>
      </div>
    </aside>
  );
}