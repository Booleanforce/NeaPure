import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

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
      className={`rounded-2xl border border-sky-500/20 bg-[#0b1730]/30 p-5 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <p className="text-xs uppercase tracking-widest text-sky-300">
        Purification Rate
      </p>
      <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">99.99%</p>
      <p className="mt-2 text-sm text-slate-300">
        Bacteria &amp; Viruses Removed
      </p>
      <svg viewBox="0 0 100 24" className="mt-4 h-6 w-full text-sky-400">
        <polyline
          points="0,18 15,14 30,20 45,8 60,12 75,4 90,10 100,2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
    <div className="absolute inset-x-0 -bottom-px z-10 h-16 sm:h-24 lg:h-32">
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
export default function Hero() {
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

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid flex-1 items-center gap-6 pb-20 pt-20 sm:pb-28 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:pb-36 lg:pt-28">
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

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Protect your family with advanced water purification technology
              designed for modern homes in Bangladesh. NeaPure removes harmful
              contaminants while preserving essential minerals for healthier,
              fresher drinking water every day.
            </p>

            <ul className="mt-5 space-y-3 text-white">
              {HIGHLIGHTS.map((item) => (
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
              {STATS.map(({ value, label }) => (
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
      <PurificationCard className="absolute bottom-16 right-6 z-20 hidden w-72 lg:right-10 lg:bottom-24 lg:block xl:right-14" />

      <HeroWave />
    </section>
  );
}