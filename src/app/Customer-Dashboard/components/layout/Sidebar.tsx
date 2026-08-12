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
  { label: "Service Requests", icon: Wrench, badge: 2, href: "/Customer-Dashboard/service-requests" },
  { label: "Installation Tracking", icon: MapPin, href: "/Customer-Dashboard/installation-tracking" },
  { label: "Before & After Setup", icon: Camera, href: "/Customer-Dashboard/before-after-setup" },
  { label: "QR Code Service", icon: QrCode, href: "/Customer-Dashboard/qr-code-service" },
  { label: "Service History", icon: History, href: "/Customer-Dashboard/service-history" },
];

const mainNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/Customer-Dashboard" },
  { label: "My Products", icon: Package, href: "/Customer-Dashboard/my-products" },
  { label: "Warranty & Registration", icon: ShieldCheck, href: "/Customer-Dashboard/warranty-registration" },
];

const bottomNavItems = [
  { label: "Buy Replacement Kit", icon: Boxes, href: "/Customer-Dashboard/replacement-kit" },
  { label: "My Orders", icon: ClipboardList, href: "/Customer-Dashboard/my-orders" },
  { label: "Reminders & Alerts", icon: Bell, href: "/Customer-Dashboard/reminders-alerts" },
  { label: "Offers & Rewards", icon: Gift, href: "/Customer-Dashboard/offers-rewards" },
  // Links to the My Profile page
  { label: "My Profile", icon: User, href: "/Customer-Dashboard/my-profile" },
  { label: "Support Center", icon: Headphones, href: "/Customer-Dashboard/support-center" },
  { label: "Settings", icon: Settings, href: "/Customer-Dashboard/settings" },
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
      <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
      <span className="flex-1 text-left">{label}</span>
      {badge ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
      {trailing}
    </>
  );

  // Items with an href are real routes: render as a Link so users get
  // client-side navigation, prefetching, and correct <a> semantics.
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  // Items without an href (e.g. the Smart Water Care collapsible toggle)
  // stay as plain buttons.
  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

interface SidebarProps {
  /** Whether the mobile drawer is open. Ignored at lg+ where the sidebar is always visible. */
  isOpen?: boolean;
  /** Called when the drawer should close (backdrop click, close button, or nav item tap). */
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [smartWaterOpen, setSmartWaterOpen] = useState(true);
  const pathname = usePathname();

  // A nav item is active when the current route matches its href exactly,
  // or sits under it (so /Customer-Dashboard/my-profile/edit still
  // highlights "My Profile").
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  // Close the mobile drawer after picking a nav item, but not on the
  // Smart Water Care toggle itself (that just expands/collapses).
  const handleNavigate = () => onClose?.();

  return (
    <>
      {/* Backdrop — only rendered/interactive on mobile while the drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Figma: display:flex; min-width:256px; padding:20px 16px; flex-direction:column; align-items:flex-start;
          Below lg: fixed slide-in drawer, translated off-screen when closed.
          At lg+: static, always visible, back to the original in-flow sidebar. */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-72 max-w-[85vw] shrink-0 flex-col items-start overflow-y-auto border-r border-slate-100 bg-white px-4 py-5 transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:w-64 lg:min-w-64 lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="w-full flex-1 space-y-1 overflow-y-auto pr-1">
          {mainNavItems.map((item) => (
            <NavRow key={item.label} {...item} onClick={handleNavigate} />
          ))}

          {/* Smart Water Care (collapsible) */}
          <div>
            <NavRow
              icon={Droplet}
              label="Smart Water Care"
              onClick={() => setSmartWaterOpen((v) => !v)}
              trailing={
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    smartWaterOpen ? "rotate-180" : ""
                  }`}
                />
              }
            />
            {smartWaterOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-slate-100 pl-3">
                {smartWaterItems.map((item) => (
                  <NavRow key={item.label} {...item} onClick={handleNavigate} />
                ))}
              </div>
            )}
          </div>

          <div className="my-3 border-t border-slate-100" />

          {bottomNavItems.map((item) => (
            <NavRow key={item.label} {...item} onClick={handleNavigate} />
          ))}
        </nav>

        {/* Download app card — Figma: width 100%, height "hug" (~229px) */}
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
                <span className="text-[8px] text-slate-300">Download on the</span>
                <span className="text-[11px] font-semibold text-white">App Store</span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-md bg-black px-2 py-1 leading-tight hover:bg-slate-800"
            >
              <Play className="h-4 w-4 shrink-0" />
              <span className="flex flex-col">
                <span className="text-[8px] text-slate-300">GET IT ON</span>
                <span className="text-[11px] font-semibold text-white">Google Play</span>
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
            (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
          const filled = isFinder
            ? cell
            : noise[(r + c) % noise.length][(r * c) % 7] ?? cell;
          return (
            <span
              key={`${r}-${c}`}
              className={filled ? "bg-slate-900" : "bg-white"}
            />
          );
        })
      )}
    </div>
  );
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.365 1.43c0 1.14-.417 2.11-1.25 2.91-.833.8-1.833 1.25-3 1.35-.083-1.1.334-2.09 1.167-2.92.834-.83 1.917-1.29 3.083-1.34zM20 17.06c-.5 1.15-1.083 2.24-1.75 3.27-1 1.48-1.917 2.5-2.75 3.04-.834.55-1.75.83-2.75.86-.75.02-1.667-.2-2.75-.66-1.084-.46-1.917-.68-2.5-.68-.667 0-1.5.22-2.5.68-1 .46-1.917.7-2.75.72-.917.03-1.75-.26-2.5-.86-.917-.65-1.917-1.85-3-3.6-.917-1.5-1.583-3.1-2-4.8C-.75 12.8-.417 10.6.75 8.86c1-1.48 2.334-2.24 4-2.28.75-.03 1.667.24 2.75.8 1.083.56 1.833.84 2.25.84.417 0 1.25-.32 2.5-.96 1.25-.64 2.334-.9 3.25-.78 1.834.15 3.167.85 4 2.1-1.667 1.01-2.5 2.42-2.5 4.24 0 1.44.5 2.65 1.5 3.62.417.4.917.68 1.5.86-.083.32-.167.6-.25.84z" />
    </svg>
  );
}

function PlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M3.6 2.6a1 1 0 0 0-.6.9v17a1 1 0 0 0 .6.9l10-9.4-10-9.4z" fill="#00D9FF" />
      <path d="M16.6 11l-3-2.8L3.6 2.6a1 1 0 0 1 1.1.1l11.9 6.9v1.4z" fill="#00F076" />
      <path d="M16.6 13v1.4L4.7 21.3a1 1 0 0 1-1.1.1l9.9-8.4h.1z" fill="#FF3A44" />
      <path d="M16.6 11v2l3.5-2c.6-.4.9-1 .9-1.5s-.3-1.1-.9-1.5l-3.5 2v1z" fill="#FFCE00" />
    </svg>
  );
}

