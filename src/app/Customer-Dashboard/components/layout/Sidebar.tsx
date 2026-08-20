// app/dashboard/components/layout/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const smartWaterItems = [
  {
    label: "Service Requests",
    icon: Wrench,
    badge: 2,
    href: "/Customer-Dashboard/service-requests",
  },
  {
    label: "Installation Tracking",
    icon: MapPin,
    href: "/Customer-Dashboard/installation-tracking",
  },
  {
    label: "Before & After Setup",
    icon: Camera,
    href: "/Customer-Dashboard/before-after-setup",
  },
  {
    label: "QR Code Service",
    icon: QrCode,
    href: "/Customer-Dashboard/qr-code-service",
  },
  {
    label: "Service History",
    icon: History,
    href: "/Customer-Dashboard/service-history",
  },
];

const mainNavItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/Customer-Dashboard",
  },
  {
    label: "My Products",
    icon: Package,
    href: "/Customer-Dashboard/my-products",
  },
  {
    label: "Warranty & Registration",
    icon: ShieldCheck,
    href: "/Customer-Dashboard/warranty-registration",
  },
];

const bottomNavItems = [
  {
    label: "Buy Replacement Kit",
    icon: Boxes,
    href: "/Customer-Dashboard/replacement-kit",
  },
  {
    label: "My Orders",
    icon: ClipboardList,
    href: "/Customer-Dashboard/my-orders",
  },
  {
    label: "Reminders & Alerts",
    icon: Bell,
    href: "/Customer-Dashboard/reminders-alerts",
  },
  {
    label: "Offers & Rewards",
    icon: Gift,
    href: "/Customer-Dashboard/offers-rewards",
  },
  {
    label: "My Profile",
    icon: User,
    href: "/Customer-Dashboard/my-profile",
  },
  {
    label: "Support Center",
    icon: Headphones,
    href: "/Customer-Dashboard/support-center",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/Customer-Dashboard/settings",
  },
];

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
  const classes = `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
    active
      ? "bg-blue-600 text-white font-medium shadow-sm"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
  }`;

  const content = (
    <>
      <Icon
        className={`h-[18px] w-[18px] shrink-0 ${
          active ? "text-white" : "text-slate-400"
        }`}
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

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  isOpen = false,
  onClose,
}: SidebarProps) {
  const [smartWaterOpen, setSmartWaterOpen] =
    useState(true);

  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const handleNavigate = () =>
    onClose?.();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-72 max-w-[85vw] shrink-0 flex-col items-start overflow-y-auto border-r border-slate-100 bg-white px-4 py-5 transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:w-64 lg:min-w-64 lg:max-w-none lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
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
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="w-full flex-1 space-y-1 overflow-y-auto pr-1">
          {mainNavItems.map((item) => (
            <NavRow
              key={item.label}
              {...item}
              active={isActive(item.href)}
              onClick={handleNavigate}
            />
          ))}

          {/* Smart Water Care */}
          <div>
            <NavRow
              icon={Droplet}
              label="Smart Water Care"
              onClick={() =>
                setSmartWaterOpen((v) => !v)
              }
              trailing={
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    smartWaterOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              }
            />

            {smartWaterOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-slate-100 pl-3">
                {smartWaterItems.map((item) => (
                  <NavRow
                    key={item.label}
                    {...item}
                    active={isActive(item.href)}
                    onClick={handleNavigate}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="my-3 border-t border-slate-100" />

          {bottomNavItems.map((item) => (
            <NavRow
              key={item.label}
              {...item}
              active={isActive(item.href)}
              onClick={handleNavigate}
            />
          ))}
        </nav>

        {/* Download App */}
        <div className="mt-4 flex w-full flex-col items-start justify-end gap-[12.096px] self-stretch rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white">
          <div className="flex items-start gap-2">
            <Smartphone className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p className="text-[13px] font-semibold leading-tight">
                Download NeaPure App
              </p>

              <p className="mt-1 text-[11px] leading-snug text-blue-100">
                Manage your products, track services and get alerts on the go.
              </p>
            </div>
          </div>

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

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-md bg-black px-2 py-1 leading-tight hover:bg-slate-800"
            >
              <Apple className="h-4 w-4 shrink-0 text-white" />

              <span className="flex flex-col">
                <span className="text-[8px] text-slate-300">
                  Download on the
                </span>

                <span className="text-[11px] font-semibold text-white">
                  App Store
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
                  GET IT ON
                </span>

                <span className="text-[11px] font-semibold text-white">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

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
      {pattern.map((row, r) =>
        row.map((cell, c) => {
          const isFinder =
            (r < 2 && c < 2) ||
            (r < 2 && c > 4) ||
            (r > 4 && c < 2);

          const filled = isFinder
            ? cell
            : noise[(r + c) % noise.length][
                (r * c) % 7
              ] ?? cell;

          return (
            <span
              key={`${r}-${c}`}
              className={
                filled
                  ? "bg-slate-900"
                  : "bg-white"
              }
            />
          );
        })
      )}
    </div>
  );
}