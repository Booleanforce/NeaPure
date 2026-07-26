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
    <section className="bg-sky-50 py-18">
      <div className="container mx-auto max-w-[1600px] px-6">

        {/* Heading */}
        <div className="mb-16 text-center">

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            HOW NEAPURE WORKS
          </span>

          <h2 className="mt-3 text-3xl font-black text-slate-900 xl:text-5xl">
            Customer Experience
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            A seamless journey from product purchase to lifetime after-sales
            support with NeaPure.
          </p>

        </div>

        {/* Timeline */}
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 xl:gap-x-5 mx-0 xl:mx-6">

          {customerJourney.map((step, index) => {

            const Icon =
              icons[step.icon as keyof typeof icons];

            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center text-center"
              >

                {/* Number */}
                <div
                  className={`
                    mb-4
                    flex h-10 w-10 items-center justify-center
                    rounded-xl
                    shadow-md
                    text-sm font-bold
                    bg-white text-slate-600 border border-slate-200
                  `}
                >
                  {step.id}
                </div>

                {/* Icon */}
                <Icon
                  size={40}
                  strokeWidth={1.8}
                  className="mb-3 text-blue-600"
                />

                {/* Title */}
                <h3 className="max-w-[150px] text-base font-semibold leading-7 text-slate-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-[150px] text-xs leading-6 text-slate-500">
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
        <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">

          {kpiData.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-2xl
                  border border-blue-100
                  bg-white/80
                  backdrop-blur-md
                  p-5
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
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    ${item.color}
                    text-white
                    shadow-md
                  `}
                >
                  <Icon size={22} />
                </div>

                {/* Value */}
                <h3 className="text-3xl font-extrabold text-slate-900">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-1 text-sm text-slate-600">
                  {item.subtitle}
                </p>

                {/* Accent Line */}
                <div
                  className={`
                    mt-4
                    h-1
                    w-12
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