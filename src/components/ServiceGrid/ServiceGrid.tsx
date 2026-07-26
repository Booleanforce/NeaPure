"use client";

import React from "react";

/* ---------- Icon ---------- */

const CalendarIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="32" height="30" rx="3" stroke="#155DFC" strokeWidth="3" />
    <path d="M8 19h32" stroke="#155DFC" strokeWidth="3" strokeLinecap="round" />
    <path d="M17 6v8M31 6v8" stroke="#155DFC" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ---------- Data ---------- */

const CARD = {
  title: "100% Genuine Pats",
  line1: "Original Neapure Parts10",
  line2: "dfgsfdgsdfgsdfgdfgsdfgfg",
};

const row = Array.from({ length: 5 }, (_, i) => ({ ...CARD, id: i }));
const rows = [row, row];

/* ---------- Card ---------- */

const Card = ({ title, line1, line2 }) => (
  <div className="flex flex-1 items-center gap-7 p-4">
    <CalendarIcon />
    <div className="flex flex-col gap-0.5">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <p className="text-xs text-neutral-500">{line1}</p>
      <p className="text-xs text-neutral-400">{line2}</p>
    </div>
  </div>
);

/* ---------- Main component ---------- */

export default function GenuinePartsGrid() {
  return (
    <section className="w-full bg-white flex flex-col items-start gap-12 px-6 pt-4 pb-10 sm:px-12 md:px-20">
      {rows.map((r, rowIdx) => (
        <div
          key={rowIdx}
          className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-0"
        >
          {r.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      ))}
    </section>
  );
}