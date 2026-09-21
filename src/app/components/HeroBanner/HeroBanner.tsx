"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

import { useGetHeroContentQuery } from "../../../store/heroApi";

// Fallback data shown instantly while the query loads (and if it errors),
// so the hero never renders empty. Keeps the same content as before.
const FALLBACK_HIGHLIGHTS = [
  "7+ Advanced Filtration Stages",
  "Removes 99.99% Harmful Contaminants",
  "Smart & Energy Efficient Technology",
];

const FALLBACK_STATS = [
  { value: "7+", label: "Filtration Stages" },
  { value: "100%", label: "Eco-Friendly" },
  { value: "0%", label: "Chemicals Used" },
];

function PurificationCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-sky-400/20 bg-gradient-to-br from-[#0f2847]/80 via-[#0b1d38]/50 to-[#0a1730]/10 p-4 shadow-xl backdrop-blur-xl ${className}`}
    >
      <p className="text-sm font-bold uppercase tracking-[0.1em] text-sky-300">
        Purification Rate
      </p>
      <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        99.99%
      </p>
      <p className="mt-3 text-base text-slate-200">
        Bacteria &amp; Viruses Removed
      </p>
      <svg
        viewBox="0 0 200 40"
        className="mt-5 h-7 w-full text-sky-400"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,32 20,20 35,28 55,10 70,22 90,6 110,18 130,8 150,24 170,4 200,14"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
function HeroWave() {
  // one path reused for fill and edge line so they always line up
  const crest =
    "M0,90 C150,50 300,30 480,45 C700,65 850,115 1050,112 C1250,108 1350,70 1440,62";

  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-12 sm:h-16 lg:h-24">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* lighter at the crest, deepening downward; base matches section below */}
          <linearGradient id="waveShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8f6ff" />
            <stop offset="35%" stopColor="#cceaf9" />
            <stop offset="100%" stopColor="#BCE3F7" />
          </linearGradient>
        </defs>

        {/* single fill */}
        <path d={`${crest} L1440,200 L0,200 Z`} fill="url(#waveShade)" />

        {/* thin soft edge on the crest */}
        <path
          d={crest}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
      </svg>
    </div>
  );
}

export default function HeroBanner() {
  // Data-fetching now goes through RTK Query instead of hardcoded
  // module-level constants. `data` is undefined until the fetch
  // resolves, so we fall back to static content in the meantime —
  // this keeps the hero from ever flashing empty on first paint.
  const { data, isError } = useGetHeroContentQuery();

  const highlights = data?.highlights ?? FALLBACK_HIGHLIGHTS;
  const stats = data?.stats ?? FALLBACK_STATS;

  if (isError) {
    // Non-fatal: we already fell back to static content above,
    // this is just a hook point if you want to log/report it.
    console.error("Failed to fetch hero content, using fallback data.");
  }

  return (
    <section className="relative flex min-h-[640px] flex-col overflow-hidden bg-[#050b18] sm:min-h-[760px] lg:min-h-[880px]">
      {/* Background photo */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/hero11.png"
          alt="NeaPure Aura water purifier dispensing water into a glass"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover object-center"
        />
      </div>

      {/* Left-side scrim — keeps the headline/body copy readable
    regardless of how bright or busy the photo is behind it */}
<div
  className="absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/40 to-black/0"
  aria-hidden="true"
/>

<div className="relative z-[2] mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
  <div className="grid flex-1 items-center gap-6 pb-10 pt-20 sm:pb-14 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:pb-20 lg:pt-28">
    {/* LEFT CONTENT */}
    <div className="order-2 max-w-[560px] lg:order-1">
      <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-sky-300">
        <span className="h-2 w-2 rounded-full bg-sky-400" />
        NEXT GENERATION PURIFICATION
      </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Pure Water.
              <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Pure Life.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white sm:text-lg">
              Protect your family with advanced water purification technology
              designed for modern homes in Bangladesh. NeaPure removes harmful
              contaminants while preserving essential minerals for healthier,
              fresher drinking water every day.
            </p>

            <ul className="mt-5 space-y-3 text-white">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <button className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:scale-105 sm:w-auto">
                Explore Products
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>

              <button className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto">
                How It Works
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40">
                  <Play className="h-4 w-4 fill-white" />
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-8 border-t border-white/10 pt-5">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <h3 className="text-3xl font-bold text-white">{value}</h3>
                  <p className="mt-2 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>

            {/* Card sits inline, right after stats, on smaller screens */}
            <PurificationCard className="mt-8 max-w-xs lg:hidden" />
          </div>

          {/* RIGHT COLUMN (reserves space for the product in the background photo) */}
          <div className="order-1 hidden lg:order-2 lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Floating card, desktop only — sits above the wave with clearance */}
      <PurificationCard className="absolute bottom-16 right-6 z-20 hidden w-70 lg:right-10 lg:bottom-24 lg:block xl:right-14" />

      <HeroWave />
    </section>
  );
}