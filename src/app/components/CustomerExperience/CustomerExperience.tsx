"use client";

import {
  ShoppingCart,
  Calendar,
  UserCheck,
  QrCode,
  Bell,
  Wrench,
  Package,
  Smile,
  ArrowRight,
  Clock3,
  ShieldCheck,
  Headset,
  BadgeCheck,
  Droplets,
} from "lucide-react";

import { customerJourney } from "./customerExperienceData";

const icons = {
  ShoppingCart,
  Calendar,
  UserCheck,
  QrCode,
  ShieldCheck,
  Bell,
  Wrench,
  Package,
  Smile,
};

/* Each step gets its own colour, same order as the reference design */
const palette = [
  { badge: "bg-blue-500", tile: "from-blue-600 to-sky-500", line: "bg-blue-500" },
  { badge: "bg-cyan-500", tile: "from-cyan-500 to-sky-400", line: "bg-cyan-400" },
  { badge: "bg-indigo-500", tile: "from-indigo-500 to-violet-500", line: "bg-indigo-500" },
  { badge: "bg-emerald-500", tile: "from-emerald-500 to-teal-400", line: "bg-emerald-500" },
  { badge: "bg-blue-600", tile: "from-blue-600 to-blue-500", line: "bg-blue-600" },
  { badge: "bg-purple-500", tile: "from-purple-600 to-fuchsia-500", line: "bg-purple-500" },
  { badge: "bg-emerald-600", tile: "from-emerald-600 to-green-500", line: "bg-emerald-500" },
  { badge: "bg-blue-500", tile: "from-blue-600 to-sky-500", line: "bg-blue-500" },
  { badge: "bg-fuchsia-500", tile: "from-fuchsia-500 to-pink-500", line: "bg-fuchsia-500" },
];

const FEATURED_INDEX = 4; // step 05 – Warranty Activated

const kpiData = [
  { title: "24 Hours", subtitle: "Installation Support", icon: Clock3, color: "from-blue-600 to-sky-500" },
  { title: "100%", subtitle: "Digital Warranty", icon: ShieldCheck, color: "from-indigo-500 to-violet-500" },
  { title: "Lifetime", subtitle: "Service Record", icon: Headset, color: "from-teal-500 to-cyan-500" },
  { title: "Original", subtitle: "Genuine Parts", icon: BadgeCheck, color: "from-emerald-500 to-green-500" },
];

export default function CustomerExperience() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-sky-50 py-12 sm:py-16 xl:py-20">
      {/* Pop-up animation for the featured step */}
      <style>{`
        @keyframes pop-up {
          0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 6px 14px rgba(37,99,235,0.18)); }
          50% { transform: translateY(-12px) scale(1.07); filter: drop-shadow(0 22px 28px rgba(37,99,235,0.35)); }
        }
        .animate-pop-up { animation: pop-up 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-pop-up { animation: none; transform: scale(1.04); }
        }
      `}</style>

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />

      <div className="container relative mx-auto max-w-[1600px] px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-10 bg-blue-500 sm:w-20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 sm:text-xs sm:tracking-[0.35em]">
              Your Journey with NeaPure
            </span>
            <span className="h-px w-10 bg-blue-500 sm:w-20" />
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl xl:text-6xl">
            Customer <span className="text-blue-600">Experience</span>
          </h2>

          <p className="mx-auto mt-3 max-w-3xl px-2 text-xs leading-6 text-slate-600 sm:mt-4 sm:text-base">
            A seamless journey from product purchase to lifetime after-sales
            support with NeaPure.
          </p>
        </div>

        {/* Timeline */}
        <ol className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 xl:grid-cols-9 xl:gap-x-5">
          {customerJourney.map((step, index) => {
            const Icon = icons[step.icon as keyof typeof icons];
            const c = palette[index % palette.length];
            const featured = index === FEATURED_INDEX;

            return (
              <li
                key={step.id}
                className={`relative pt-5 ${featured ? "animate-pop-up z-10" : ""}`}
              >
                {/* Sparkle rays on featured step */}
                {featured && (
                  <svg
                    aria-hidden
                    viewBox="0 0 48 20"
                    className="absolute -top-4 left-1/2 h-5 w-12 -translate-x-1/2 text-blue-500"
                  >
                    <path
                      d="M6 16 L10 8 M24 14 V4 M42 16 L38 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                )}

                {/* Number badge */}
                <div
                  className={`absolute left-1/2 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg ring-4 ring-white sm:h-11 sm:w-11 ${c.badge}`}
                >
                  {step.id}
                </div>

                {/* Card */}
                <div
                  className={`flex h-full flex-col items-center rounded-3xl border px-2 pb-3 pt-8 text-center backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl ${
                    featured
                      ? "border-blue-200 bg-gradient-to-b from-sky-50 to-white"
                      : "border-white bg-white/80 shadow-[0_8px_24px_-10px_rgba(30,64,175,0.25)]"
                  }`}
                >
                  <div
                    className={`mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${c.tile}`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-sm font-bold leading-[18px] text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-[15px] text-slate-500">
                    {step.description}
                  </p>

                  <div className="mt-auto pt-3">
                    <span className={`block h-[3px] w-10 rounded-full ${c.line}`} />
                  </div>
                </div>

                {/* Arrow between cards (desktop only) */}
                {index !== customerJourney.length - 1 && (
                  <span className="absolute right-[-24px] top-[78px] z-20 hidden h-7 w-7 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-md xl:flex">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {/* KPI strip */}
        <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-r from-sky-100/80 via-white to-white shadow-[0_12px_40px_-12px_rgba(30,64,175,0.25)] sm:mt-16">
          <Droplets
            aria-hidden
            size={110}
            strokeWidth={1.2}
            className="pointer-events-none absolute -bottom-4 -left-2 hidden text-sky-300/50 lg:block"
          />

          <div className="relative grid grid-cols-2 gap-3 p-3 sm:gap-5 sm:p-5 lg:grid-cols-4">
            {kpiData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-2xl border border-sky-100/70 bg-white px-3 py-5 text-center shadow-[0_0_22px_rgba(37,99,235,0.14)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.28)] sm:py-7"
                >
                  <div
                    className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md sm:h-14 sm:w-14 sm:rounded-2xl ${item.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}