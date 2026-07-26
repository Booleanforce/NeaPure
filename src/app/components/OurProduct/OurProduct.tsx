"use client";

import React from "react";
import Image from "next/image";

/* ---------- Small building blocks ---------- */

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="10" fill="#2f6fed" />
      <path
        d="M6 10.2l2.4 2.4L14 7"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Stylised dispenser illustration — used only as a fallback if p.image is missing.
function Dispenser({ tone = "dark" }) {
  const isDark = tone === "dark";
  const body = isDark ? "#171c25" : "#f6f8f9";
  const bodyEdge = isDark ? "#2a3140" : "#e4e8eb";
  const panel = isDark ? "#20262f" : "#eceff1";
  const accent = "#3b82f6";
  const glow = isDark ? "#3b82f680" : "#3b82f640";

  return (
    <svg viewBox="0 0 260 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <g opacity="0.55">
        <ellipse cx="130" cy="282" rx="95" ry="10" stroke={isDark ? "#7fb3ff" : "#3b82f6"} strokeWidth="1.5" fill="none" opacity="0.5" />
        <ellipse cx="130" cy="282" rx="65" ry="7" stroke={isDark ? "#7fb3ff" : "#3b82f6"} strokeWidth="1.5" fill="none" opacity="0.7" />
      </g>
      <rect x="55" y="20" width="150" height="230" rx="28" fill={body} stroke={bodyEdge} strokeWidth="2" />
      <rect x="150" y="35" width="8" height="60" rx="3" fill={bodyEdge} />
      <rect x="163" y="35" width="8" height="60" rx="3" fill={bodyEdge} />
      <rect x="176" y="35" width="8" height="60" rx="3" fill={bodyEdge} />
      <circle cx="110" cy="75" r="34" fill={panel} />
      <circle cx="110" cy="75" r="34" fill="none" stroke={glow} strokeWidth="2" />
      <circle cx="110" cy="75" r="4" fill={accent} />
      <rect x="82" y="120" width="60" height="30" rx="8" fill={panel} />
      <text x="112" y="140" textAnchor="middle" fontSize="10" fill={isDark ? "#7c8797" : "#9aa2ab"} fontFamily="sans-serif">NeaPure</text>
      <rect x="95" y="165" width="45" height="14" rx="7" fill={panel} />
      <rect x="112" y="179" width="10" height="55" rx="5" fill={accent} opacity="0.55" />
      <rect x="65" y="232" width="130" height="16" rx="8" fill={isDark ? "#0a0d12" : "#d8dee2"} />
    </svg>
  );
}

/* ---------- Data ---------- */

const products = [
  {
    key: "pro",
    name: "NeaPure Pro",
    subtitle: "7-stage filtration",
    features: ["Compact design", "Removes 99.99%", "Energy-efficient", "Easy installation"],
    price: "$299",
    tone: "dark",
    image: "/images/image13.png",
    overlayClass: "bg-gradient-to-r from-[#0b1220]/85 via-[#0b1220]/35 to-transparent",
    textClass: "text-white",
    subtitleClass: "text-blue-100/80",
    buttonVariant: "outline",
  },
  {
    key: "plus",
    name: "NeaPure Plus",
    subtitle: "Mineral filtration",
    features: ["For medium-large homes", "Removes heavy metals", "Eco-friendly design", "Modern sleek look"],
    price: "$399",
    tone: "light",
    image: "/images/image12.png",
    overlayClass: "bg-gradient-to-r from-white/90 via-white/55 to-transparent",
    textClass: "text-slate-900",
    subtitleClass: "text-slate-500",
    buttonVariant: "filled",
  },
  {
    key: "max",
    name: "NeaPure Max",
    subtitle: "UV filtration",
    features: ["For large families", "Removes 99.99%", "Smart touch controls", "Durable premium build"],
    price: "$499",
    tone: "dark",
    image: "/images/image7.png",
    overlayClass: "bg-gradient-to-r from-[#05070a]/85 via-[#05070a]/35 to-transparent",
    textClass: "text-white",
    subtitleClass: "text-slate-300",
    buttonVariant: "outline",
  },
];

function DetailsButton({ variant = "filled" }) {
  if (variant === "outline") {
    return (
      <button
        type="button"
        className="rounded-full border border-white/70 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        View Details
      </button>
    );
  }
  return (
    <button
      type="button"
      className="rounded-full bg-[#2f6fed] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#255ed1]"
    >
      View Details
    </button>
  );
}

/* ---------- Main section ---------- */

export default function OurProduct() {
  return (
    <div className="w-full bg-white px-4 py-12 md:px-10 md:py-16">
      <section
        className="mx-auto flex w-full max-w-8xl flex-col items-start gap-8 self-stretch rounded-[32px] p-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(188, 223, 243, 0.76) 69.56%, rgba(213, 240, 255, 0.76) 100%)",
        }}
      >
        {/* Heading */}
        <div className="w-full text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2f6fed]">
            Our Product
          </p>
          <h2 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Choose Your Perfect NeaPure
          </h2>
        </div>

        {/* Cards */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.key}
              className="relative overflow-hidden rounded-[20px]"
              style={{ minHeight: 420 }}
            >
              {/* background photo — fills the whole card */}
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0">
                  <Dispenser tone={p.tone} />
                </div>
              )}

              {/* readability scrim so text sits legibly over the photo */}
              <div className={`pointer-events-none absolute inset-0 ${p.overlayClass}`} />

              {/* text overlay */}
              <div
                className={`relative z-10 flex h-full min-h-[420px] flex-col justify-between p-6 ${p.textClass}`}
              >
                <div className="flex flex-col items-start gap-3">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">{p.name}</h3>
                    <p className={`mt-1 text-sm ${p.subtitleClass}`}>{p.subtitle}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-start gap-3">
                  <p className="text-3xl font-bold">{p.price}</p>
                  <DetailsButton variant={p.buttonVariant} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}