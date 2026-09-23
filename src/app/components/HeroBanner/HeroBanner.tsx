import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

// Static content (no API call)
const HIGHLIGHTS = [
  "7+ Advanced Filtration Stages",
  "Removes 99.99% Harmful Contaminants",
  "Smart & Energy Efficient Technology",
];

const STATS = [
  { value: "7+", label: "Filtration Stages" },
  { value: "100%", label: "Eco-Friendly" },
  { value: "0%", label: "Chemicals Used" },
];

function PurificationCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-sky-400/20 bg-gradient-to-br from-[#0f2847]/50 via-[#0b1d38]/20 to-[#0a1730]/10 p-3.5 shadow-2xl backdrop-blur-xl sm:p-4 ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-sky-300 sm:text-sm">
        Purification Rate
      </p>
      <p className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
        99.99%
      </p>
      <p className="mt-3 text-sm text-slate-200 sm:text-base">
        Bacteria &amp; Viruses Removed
      </p>
      <svg
        viewBox="0 0 200 40"
        className="mt-5 h-6 w-full text-sky-400 sm:h-7"
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

// Wave now lives in Hero, pinned to its true bottom edge —
// height, curve, and glow are all independent of content height.
function HeroWave() {
  return (
    <div className="absolute inset-x-0 -bottom-px z-10 h-12 xs:h-16 sm:h-24 lg:h-32">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.55" />
          </linearGradient>

          {/* Shade for the fill — lighter near the crest, deepening downward */}
          <linearGradient id="waveShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8f6ff" />
            <stop offset="35%" stopColor="#cceaf9" />
            <stop offset="100%" stopColor="#BCE3F7" />
          </linearGradient>

          <filter id="waveBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Soft glow sitting just above the fill */}
        <path
          d="M0,70 C240,130 480,10 720,45 C960,80 1200,20 1440,60 L1440,90 L0,90 Z"
          fill="url(#waveGlow)"
          filter="url(#waveBlur)"
        />

        {/* Shaded fill instead of flat color — matches section below at the base */}
        <path
          fill="url(#waveShade)"
          d="M0,80 C240,140 480,20 720,55 C960,90 1200,30 1440,70 L1440,160 L0,160 Z"
        />

        <path
          d="M0,80 C240,140 480,20 720,55 C960,90 1200,30 1440,70"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
}

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-[100svh] max-h-none flex-col overflow-hidden bg-[#050b18] sm:min-h-[720px] lg:min-h-[880px]">
      {/* Background photo */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/hero11.png"
          alt="NeaPure Aura water purifier dispensing water into a glass"
          fill
          priority
          sizes="100vw"
          quality={90}
          // Narrower phones need a more aggressive rightward/lower crop so the
          // product isn't chopped off; the crop point relaxes back toward
          // center as the viewport widens and there's more room either side.
          className="object-cover object-[78%_center] xs:object-[72%_center] sm:object-[65%_center] md:object-[60%_center] lg:object-center"
        />
      </div>

      {/* Scrim — full, flat overlay on mobile since the text spans the
          whole width there; becomes a left-to-right gradient once the
          two-column layout kicks in at lg, so the right side (product
          area) stays clear */}
      <div
        className="absolute inset-0 z-[1] bg-black/60 lg:bg-gradient-to-r lg:from-black/35 lg:via-black/10 lg:to-black/0"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid flex-1 items-center gap-6 pb-8 pt-16 xs:pt-20 sm:pb-14 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:pb-20 lg:pt-28">
          {/* LEFT CONTENT */}
          <div className="order-2 min-w-0 max-w-full lg:order-1 lg:max-w-[560px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-sky-300 sm:px-4 sm:py-2 sm:text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400" />
              NEXT GENERATION PURIFICATION
            </span>

            <h1 className="mt-4 text-[28px] font-bold leading-tight text-white xs:text-3xl sm:text-4xl lg:text-5xl">
              Pure Water.
              <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Pure Life.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white sm:text-base lg:text-lg">
              Protect your family with advanced water purification technology
              designed for modern homes in Bangladesh. NeaPure removes harmful
              contaminants while preserving essential minerals for healthier,
              fresher drinking water every day.
            </p>

            <ul className="mt-5 space-y-2.5 text-white sm:space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                  <span className="text-[13px] xs:text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base">
                Explore Products
                <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
              </button>

              <button className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base">
                How It Works
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40">
                  <Play className="h-4 w-4 fill-white" />
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-5 xs:gap-4 sm:mt-7 sm:gap-8">
              {STATS.map(({ value, label }) => (
                <div key={label} className="min-w-0">
                  <h3 className="text-xl font-bold text-white xs:text-2xl sm:text-3xl">
                    {value}
                  </h3>
                  <p className="mt-1.5 text-[11px] text-slate-400 xs:text-xs sm:mt-2 sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Card sits inline, right after stats, on smaller screens */}
            <PurificationCard className="mx-auto mt-7 w-full max-w-[280px] xs:max-w-xs sm:mt-8 lg:hidden" />
          </div>

          {/* RIGHT COLUMN (reserves space for the product in the background photo) */}
          <div className="order-1 hidden lg:order-2 lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Floating card, desktop only — sits above the wave with clearance */}
      <PurificationCard className="absolute bottom-16 right-6 z-20 hidden w-72 lg:right-10 lg:bottom-24 lg:block xl:right-14" />

      <HeroWave />
    </section>
  );
}