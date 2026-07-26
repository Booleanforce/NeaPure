"use client";

import React from "react";

/* ---------- Icons (outline style, matches Figma icon set) ---------- */

const iconProps = {
  width: 40,
  height: 40,
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

const PurchaseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_purchase)">
      <path
        d="M44.812 10.12L39.86 13.092L34.9 10.12V4.17195L39.858 1.19995L44.812 4.17195V10.12Z"
        stroke="#155DFC"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M34.902 21.02H24L36.884 15.074H43.822L45.804 30.932H34.902V21.02Z"
        stroke="#155DFC"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.82 30.9321L46.796 46.7901L39.856 35.8881L31.928 46.7881L36.884 30.9321M34.902 5.16406L44.812 7.14606M3.188 40.8441H15.08L21.026 20.0321"
        stroke="#155DFC"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.612 24.9858H1.204V32.9138L16.474 35.9698"
        stroke="#155DFC"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.17 45.8L4.17 44.8L3.17 45.8L4.17 46.8L5.17 45.8Z"
        stroke="#155DFC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.096 45.8L14.096 44.8L13.096 45.8L14.096 46.8L15.096 45.8Z"
        stroke="#155DFC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_purchase">
        <rect width="48" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const RegisterProductIcon = () => (
  <svg {...iconProps}>
    <rect x="6" y="9" width="36" height="24" rx="2.5" stroke="#155DFC" strokeWidth="3" />
    <path d="M18 40h12M24 33v7" stroke="#155DFC" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M15 22.5l5.5 5.5L33 15.5"
      stroke="#155DFC"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InstallationIcon = () => (
  <svg {...iconProps}>
    <rect x="6" y="9" width="36" height="24" rx="2.5" stroke="#155DFC" strokeWidth="3" />
    <path d="M18 40h12M24 33v7" stroke="#155DFC" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="21" r="6.5" stroke="#155DFC" strokeWidth="3" />
    <path
      d="M24 16.3v1.4M24 24.3v1.4M28.7 21h-1.4M20.7 21h-1.4M27.3 17.7l-1 1M21.7 22.3l-1 1M27.3 24.3l-1-1M21.7 19.7l-1-1"
      stroke="#155DFC"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const CalendarBellIcon = () => (
  <svg {...iconProps}>
    <rect x="8" y="10" width="28" height="26" rx="2.5" stroke="#155DFC" strokeWidth="3" />
    <path d="M8 17h28M16 6v7M32 6v7" stroke="#155DFC" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M22 22.5a4.5 4.5 0 0 1 9 0c0 3.2 1 4.6 2 5.5H20c1-.9 2-2.3 2-5.5Z"
      stroke="#155DFC"
      strokeWidth="2.6"
      strokeLinejoin="round"
    />
    <path d="M24.8 30.5a1.7 1.7 0 0 1-3.2 0" stroke="#155DFC" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

/* ---------- Data ---------- */

const steps = [
  { label: "Purchase", Icon: PurchaseIcon },
  { label: "Register\nProduct", Icon: RegisterProductIcon },
  { label: "Installation", Icon: InstallationIcon },
  { label: "Warranty\nActivated", Icon: CalendarBellIcon },
  { label: "Use\nPurifier", Icon: CalendarBellIcon },
  { label: "Reminder\nAlert", Icon: CalendarBellIcon },
  { label: "Book\nService", Icon: CalendarBellIcon },
  { label: "Enjoy Pure\nWater", Icon: CalendarBellIcon },
];

/* ---------- Dashed connector arrow ---------- */

const Connector = () => (
  <div className="flex items-center shrink-0 w-6 sm:w-8 md:w-10">
    <svg viewBox="0 0 40 10" className="w-full h-2.5" fill="none">
      <line
        x1="0"
        y1="5"
        x2="32"
        y2="5"
        stroke="#155DFC"
        strokeWidth="1.0"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />
      <path d="M30 1.5L35 5L30 8.5" stroke="#155DFC" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/* ---------- Main component ---------- */

export default function ServiceJourney() {
  return (
    <section className="w-full bg-white pb-10  py-[80px]">
   <div className="flex w-full flex-col items-center gap-8 px-[80px]">
        <h2 className="text-center text-base sm:text-lg font-semibold text-neutral-900">
          Your Neapure{" "}
          <span className="text-[#155DFC]">Service Journey</span>
        </h2>

        <div className="w-full overflow-x-auto">
          <div className="mx-auto flex min-w-max items-start justify-center">
            {steps.map((step, i) => (
              <React.Fragment key={step.label + i}>
                <div className="flex w-24 flex-col items-center gap-3">
                  <step.Icon />
                  <p className="text-center text-sm font-bold leading-tight whitespace-pre-line text-neutral-900">
                    {step.label}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div className="mx-3">
                    <Connector />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}