// app/Customer-Dashboard/components/layout/Sidebar.tsx

"use client";

import { useState } from "react";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShieldCheck,
  Droplet,
  Wrench,
  MapPin,
  Camera,
  QrCode,
  History,
  Boxes,
  ClipboardList,
  Bell,
  Gift,
  User,
  Headphones,
  Settings,
  ChevronDown,
  Smartphone,
  Apple,
  Play,
  X,
} from "lucide-react";

import {
  useUser,
  type CustomerLanguage,
} from "../../context/UserContext";

/* ============================================================================
   TRANSLATIONS
============================================================================ */

const TRANSLATIONS = {
  dashboard: {
    English: "Dashboard",
    Bangla: "ড্যাশবোর্ড",
  },

  myProducts: {
    English: "My Products",
    Bangla: "আমার পণ্য",
  },

  warranty: {
    English: "Warranty & Registration",
    Bangla: "ওয়ারেন্টি ও রেজিস্ট্রেশন",
  },

  smartWaterCare: {
    English: "Smart Water Care",
    Bangla: "স্মার্ট ওয়াটার কেয়ার",
  },

  serviceRequests: {
    English: "Service Requests",
    Bangla: "সার্ভিস অনুরোধ",
  },

  installationTracking: {
    English: "Installation Tracking",
    Bangla: "ইনস্টলেশন ট্র্যাকিং",
  },

  beforeAfterSetup: {
    English: "Before & After Setup",
    Bangla: "সেটআপের আগে ও পরে",
  },

  qrCodeService: {
    English: "QR Code Service",
    Bangla: "QR কোড সার্ভিস",
  },

  serviceHistory: {
    English: "Service History",
    Bangla: "সার্ভিস ইতিহাস",
  },

  buyReplacementKit: {
    English: "Buy Replacement Kit",
    Bangla: "রিপ্লেসমেন্ট কিট কিনুন",
  },

  myOrders: {
    English: "My Orders",
    Bangla: "আমার অর্ডার",
  },

  reminders: {
    English: "Reminders & Alerts",
    Bangla: "রিমাইন্ডার ও সতর্কতা",
  },

  offers: {
    English: "Offers & Rewards",
    Bangla: "অফার ও পুরস্কার",
  },

  myProfile: {
    English: "My Profile",
    Bangla: "আমার প্রোফাইল",
  },

  supportCenter: {
    English: "Support Center",
    Bangla: "সাপোর্ট সেন্টার",
  },

  settings: {
    English: "Settings",
    Bangla: "সেটিংস",
  },

  downloadApp: {
    English: "Download NeaPure App",
    Bangla: "NeaPure অ্যাপ ডাউনলোড করুন",
  },

  downloadDescription: {
    English:
      "Manage your products, track services and get alerts on the go.",
    Bangla:
      "আপনার পণ্য পরিচালনা করুন, সার্ভিস ট্র্যাক করুন এবং যেকোনো সময় সতর্কতা পান।",
  },

  downloadOn: {
    English: "Download on the",
    Bangla: "ডাউনলোড করুন",
  },

  appStore: {
    English: "App Store",
    Bangla: "অ্যাপ স্টোর",
  },

  getItOn: {
    English: "GET IT ON",
    Bangla: "পাবেন",
  },

  googlePlay: {
    English: "Google Play",
    Bangla: "গুগল প্লে",
  },

  closeMenu: {
    English: "Close menu",
    Bangla: "মেনু বন্ধ করুন",
  },
} as const;

type TranslationKey =
  keyof typeof TRANSLATIONS;

/* ============================================================================
   TRANSLATION
============================================================================ */

function t(
  key: TranslationKey,
  language: CustomerLanguage
): string {
  return TRANSLATIONS[key][language];
}

/* ============================================================================
   NAVIGATION DATA
============================================================================ */

const SMART_WATER_ITEMS = [
  {
    key:
      "serviceRequests" as const,
    icon: Wrench,
    badge: 2,
    href:
      "/Customer-Dashboard/service-requests",
  },

  {
    key:
      "installationTracking" as const,
    icon: MapPin,
    href:
      "/Customer-Dashboard/installation-tracking",
  },

  {
    key:
      "beforeAfterSetup" as const,
    icon: Camera,
    href:
      "/Customer-Dashboard/before-after-setup",
  },

  {
    key:
      "qrCodeService" as const,
    icon: QrCode,
    href:
      "/Customer-Dashboard/qr-code-service",
  },

  {
    key:
      "serviceHistory" as const,
    icon: History,
    href:
      "/Customer-Dashboard/service-history",
  },
];

const MAIN_NAV_ITEMS = [
  {
    key: "dashboard" as const,
    icon: LayoutDashboard,
    href:
      "/Customer-Dashboard",
  },

  {
    key: "myProducts" as const,
    icon: Package,
    href:
      "/Customer-Dashboard/my-products",
  },

  {
    key: "warranty" as const,
    icon: ShieldCheck,
    href:
      "/Customer-Dashboard/warranty-registration",
  },
];

const BOTTOM_NAV_ITEMS = [
  {
    key:
      "buyReplacementKit" as const,
    icon: Boxes,
    href:
      "/Customer-Dashboard/replacement-kit",
  },

  {
    key: "myOrders" as const,
    icon: ClipboardList,
    href:
      "/Customer-Dashboard/my-orders",
  },

  {
    key:
      "reminders" as const,
    icon: Bell,
    href:
      "/Customer-Dashboard/reminders-alerts",
  },

  {
    key: "offers" as const,
    icon: Gift,
    href:
      "/Customer-Dashboard/offers-rewards",
  },

  {
    key: "myProfile" as const,
    icon: User,
    href:
      "/Customer-Dashboard/my-profile",
  },

  {
    key:
      "supportCenter" as const,
    icon: Headphones,
    href:
      "/Customer-Dashboard/support-center",
  },

  {
    key: "settings" as const,
    icon: Settings,
    href:
      "/Customer-Dashboard/settings",
  },
];

/* ============================================================================
   NAV ROW
============================================================================ */

function NavRow({
  icon: Icon,
  label,
  href,
  active = false,
  badge,
  onClick,
  trailing,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  trailing?: React.ReactNode;
}) {
  const classes = `
    flex
    w-full
    items-center
    gap-3
    rounded-xl
    px-3
    py-2.5
    text-sm
    transition-colors
    ${
      active
        ? "bg-blue-600 font-medium text-white shadow-sm"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
    }
  `;

  const content = (
    <>
      <Icon
        className={`
          h-[18px]
          w-[18px]
          shrink-0
          ${
            active
              ? "text-white"
              : "text-slate-400"
          }
        `}
      />

      <span className="flex-1 text-left">
        {label}
      </span>

      {badge ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
          {badge}
        </span>
      ) : null}

      {trailing}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
}

/* ============================================================================
   PROPS
============================================================================ */

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/* ============================================================================
   COMPONENT
============================================================================ */

export default function Sidebar({
  isOpen = false,
  onClose,
}: SidebarProps) {
  const [
    smartWaterOpen,
    setSmartWaterOpen,
  ] = useState(true);

  const pathname =
    usePathname();

  const {
    language,
  } = useUser();

  const isActive = (
    href: string
  ) =>
    pathname === href ||
    pathname?.startsWith(
      `${href}/`
    );

  const handleNavigate = () =>
    onClose?.();

  return (
    <>
      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-40
          flex
          h-full
          w-72
          max-w-[85vw]
          shrink-0
          flex-col
          items-start
          overflow-y-auto
          border-r
          border-slate-100
          bg-white
          px-4
          py-5
          transition-transform
          duration-200
          ease-in-out
          lg:static
          lg:z-auto
          lg:w-64
          lg:min-w-64
          lg:max-w-none
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <div className="mb-6 flex w-full items-center justify-between gap-2.5 px-2">

          <div className="flex items-center gap-2.5">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
              <Droplet className="h-4 w-4 fill-white text-white" />
            </div>

            <div>

              <p className="text-[15px] font-bold leading-tight text-slate-800">
                Nea Pure
              </p>

              <p className="text-[9px] font-medium tracking-[0.12em] text-slate-400">
                PURE WATER, PURE LIFE
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 lg:hidden"
            aria-label={t(
              "closeMenu",
              language
            )}
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="w-full flex-1 space-y-1 overflow-y-auto pr-1">

          {/* Main */}

          {MAIN_NAV_ITEMS.map(
            (item) => (
              <NavRow
                key={item.key}
                icon={item.icon}
                label={t(
                  item.key,
                  language
                )}
                href={item.href}
                active={isActive(
                  item.href
                )}
                onClick={
                  handleNavigate
                }
              />
            )
          )}

          {/* Smart Water Care */}

          <div>

            <NavRow
              icon={Droplet}
              label={t(
                "smartWaterCare",
                language
              )}
              onClick={() =>
                setSmartWaterOpen(
                  (value) =>
                    !value
                )
              }
              trailing={
                <ChevronDown
                  className={`
                    h-4 w-4
                    text-slate-400
                    transition-transform
                    ${
                      smartWaterOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              }
            />

            {smartWaterOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-slate-100 pl-3">

                {SMART_WATER_ITEMS.map(
                  (item) => (
                    <NavRow
                      key={item.key}
                      icon={item.icon}
                      label={t(
                        item.key,
                        language
                      )}
                      href={item.href}
                      active={isActive(
                        item.href
                      )}
                      badge={
                        item.badge
                      }
                      onClick={
                        handleNavigate
                      }
                    />
                  )
                )}

              </div>
            )}
          </div>

          <div className="my-3 border-t border-slate-100" />

          {/* Bottom */}

          {BOTTOM_NAV_ITEMS.map(
            (item) => (
              <NavRow
                key={item.key}
                icon={item.icon}
                label={t(
                  item.key,
                  language
                )}
                href={item.href}
                active={isActive(
                  item.href
                )}
                onClick={
                  handleNavigate
                }
              />
            )
          )}

        </nav>

        {/* =================================================
            DOWNLOAD APP
        ================================================= */}

        <div className="mt-4 flex w-full flex-col items-start justify-end gap-[12.096px] self-stretch rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white">

          <div className="flex items-start gap-2">

            <Smartphone className="mt-0.5 h-4 w-4 shrink-0" />

            <div>

              <p className="text-[13px] font-semibold leading-tight">
                {t(
                  "downloadApp",
                  language
                )}
              </p>

              <p className="mt-1 text-[11px] leading-snug text-blue-100">
                {t(
                  "downloadDescription",
                  language
                )}
              </p>

            </div>

          </div>

          {/* Images */}

          <div className="flex items-start gap-12">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-white p-1.5">

              <QRPlaceholder />

            </div>

            <img
              src="/images/pic22.png"
              alt="NeaPure app dashboard preview"
              className="h-[100px] w-[47.75px] shrink-0 rounded-[8px] object-cover"
            />

          </div>

          {/* Store Buttons */}

          <div className="flex items-center gap-2">

            <a
              href="#"
              className="flex items-center gap-1.5 rounded-md bg-black px-2 py-1 leading-tight hover:bg-slate-800"
            >

              <Apple className="h-4 w-4 shrink-0 text-white" />

              <span className="flex flex-col">

                <span className="text-[8px] text-slate-300">
                  {t(
                    "downloadOn",
                    language
                  )}
                </span>

                <span className="text-[11px] font-semibold text-white">
                  {t(
                    "appStore",
                    language
                  )}
                </span>

              </span>

            </a>

            <a
              href="#"
              className="flex items-center gap-1.5 rounded-md bg-black px-2 py-1 leading-tight hover:bg-slate-800"
            >

              <Play className="h-4 w-4 shrink-0" />

              <span className="flex flex-col">

                <span className="text-[8px] text-slate-300">
                  {t(
                    "getItOn",
                    language
                  )}
                </span>

                <span className="text-[11px] font-semibold text-white">
                  {t(
                    "googlePlay",
                    language
                  )}
                </span>

              </span>

            </a>

          </div>
        </div>

      </aside>
    </>
  );
}

/* ============================================================================
   QR PLACEHOLDER
============================================================================ */

function QRPlaceholder() {
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];

  const noise = [
    [0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1],
  ];

  return (
    <div className="grid h-full w-full grid-cols-7 grid-rows-7 gap-0">

      {pattern.map(
        (row, rowIndex) =>
          row.map(
            (
              cell,
              columnIndex
            ) => {
              const isFinder =
                (rowIndex < 2 &&
                  columnIndex <
                    2) ||
                (rowIndex < 2 &&
                  columnIndex >
                    4) ||
                (rowIndex > 4 &&
                  columnIndex <
                    2);

              const filled =
                isFinder
                  ? cell
                  : noise[
                      (
                        rowIndex +
                        columnIndex
                      ) %
                        noise.length
                    ][
                      (
                        rowIndex *
                          columnIndex
                      ) %
                        7
                    ] ??
                    cell;

              return (
                <span
                  key={`${rowIndex}-${columnIndex}`}
                  className={
                    filled
                      ? "bg-slate-900"
                      : "bg-white"
                  }
                />
              );
            }
          )
      )}

    </div>
  );
}