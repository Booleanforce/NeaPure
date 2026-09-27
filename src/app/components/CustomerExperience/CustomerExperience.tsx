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
  History as HistoryIcon,
  BadgeCheck,
} from "lucide-react";

import { customerJourney, } from "./customerExperienceData";

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
const kpiData = [
  {
    title: "24 Hours",
    subtitle: "Installation Support",
    icon: Clock3,
    color: "from-sky-500 to-cyan-400",
  },
  {
    title: "100%",
    subtitle: "Digital Warranty",
    icon: ShieldCheck,
    color: "from-blue-600 to-indigo-500",
  },
  {
    title: "Lifetime",
    subtitle: "Service Record",
    icon: HistoryIcon,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Original",
    subtitle: "Genuine Parts",
    icon: BadgeCheck,
    color: "from-emerald-500 to-teal-500",
  },
];

export default function CustomerExperience() {
  return (
    <section className="bg-sky-50 py-12 sm:py-16 xl:py-18">
      <div className="container mx-auto max-w-[1600px] px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-10 sm:mb-16 text-center">

          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-blue-600">
            HOW NEAPURE WORKS
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 xl:text-5xl">
            Customer Experience
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600 px-2">
            A seamless journey from product purchase to lifetime after-sales
            support with NeaPure.
          </p>

        </div>

        {/* Timeline */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-8 sm:gap-y-10 md:gap-x-4 lg:grid-cols-5 xl:grid-cols-9 xl:gap-x-5">

          {customerJourney.map((step, index) => {

            const Icon =
              icons[step.icon as keyof typeof icons];

            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center text-center px-1"
              >

                {/* Number */}
                <div
                  className="
                    mb-2 sm:mb-4
                    flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center
                    rounded-lg sm:rounded-xl
                    shadow-md
                    text-xs sm:text-sm font-bold
                    bg-white text-slate-600 border border-slate-200
                  "
                >
                  {step.id}
                </div>

                {/* Icon */}
                <Icon
                  size={28}
                  strokeWidth={1.8}
                  className="mb-2 sm:mb-3 text-blue-600 sm:hidden"
                />
                <Icon
                  size={40}
                  strokeWidth={1.8}
                  className="mb-3 text-blue-600 hidden sm:block"
                />

                {/* Title */}
                <h3 className="max-w-[120px] sm:max-w-[150px] text-xs sm:text-base font-semibold leading-5 sm:leading-7 text-slate-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-1 sm:mt-2 max-w-[120px] sm:max-w-[150px] text-[10px] sm:text-xs leading-4 sm:leading-6 text-slate-500">
                  {step.description}
                </p>

                {/* Arrow */}
                {index !== customerJourney.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="absolute right-[-22px] top-[58px] hidden text-blue-500 xl:block"
                  />
                )}
              </div>
            );
          })}
        </div>

  
        {/* KPI Section */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

          {kpiData.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-xl sm:rounded-2xl
                  border border-blue-100
                  bg-white/80
                  backdrop-blur-md
                  p-3 sm:p-5
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* Icon */}
                <div
                  className={`
                    mb-3 sm:mb-4
                    flex
                    h-9 w-9 sm:h-12 sm:w-12
                    items-center
                    justify-center
                    rounded-lg sm:rounded-xl
                    bg-gradient-to-br
                    ${item.color}
                    text-white
                    shadow-md
                  `}
                >
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>

                {/* Value */}
                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  {item.subtitle}
                </p>

                {/* Accent Line */}
                <div
                  className={`
                    mt-3 sm:mt-4
                    h-1
                    w-10 sm:w-12
                    rounded-full
                    bg-gradient-to-r
                    ${item.color}
                  `}
                />
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}