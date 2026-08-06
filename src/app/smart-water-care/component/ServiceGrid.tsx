"use client";

import React from "react";

/* ---------- Types ---------- */

type CardProps = {
  title: string;
  line1: string;
  line2: string;
};

/* ---------- Icon ---------- */

const CalendarIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1 shrink-0"
  >
    <rect
      x="8"
      y="10"
      width="32"
      height="30"
      rx="3"
      stroke="#155DFC"
      strokeWidth="3"
    />
    <path
      d="M8 19H40"
      stroke="#155DFC"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M17 6V14M31 6V14"
      stroke="#155DFC"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------- Data ---------- */

const CARD: CardProps = {
  title: "100% Genuine Parts",
  line1: "Original Neapure Parts",
  line2: "dfgsfdgsdfgsdfgdfgsdfgfg",
};

/* ---------- Card ---------- */

const Card = ({ title, line1, line2 }: CardProps) => {
  return (
    <div className="flex items-start gap-4 w-full">
      <CalendarIcon />

      <div>
        <h3 className="text-[18px] font-semibold leading-7 text-[#111827]">
          {title}
        </h3>

        <p className="mt-1 text-[14px] leading-5 text-[#6B7280]">
          {line1}
        </p>

        <p className="mt-1 text-[14px] leading-5 text-[#9CA3AF]">
          {line2}
        </p>
      </div>
    </div>
  );
};

/* ---------- Main Component ---------- */

export default function GenuinePartsGrid() {
  return (
    <section className="w-full border-t border-dashed border-[#155DFC] bg-white pt-10 pb-20">
      <div className="mx-auto max-w-[1440px] px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-16">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} {...CARD} />
          ))}
        </div>
      </div>
    </section>
  );
}