import Image from "next/image";
import {
  Droplet,
  Users,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  droplet: Droplet,
  users: Users,
  shield: ShieldAlert,
  check: CheckCircle2,
};

// Static content (no API call)
const stats = [
  {
    icon: "droplet",
    value: "80%",
    label: "High TDS Level",
    description: "Water in Bangladesh contains TDS above safe level",
    accent: "bg-sky-100 text-sky-600",
  },
  {
    icon: "users",
    value: "2.1M+",
    label: "Health Risk",
    description: "People suffer from waterborne diseases every year",
    accent: "bg-blue-100 text-blue-600",
  },
  {
    icon: "shield",
    value: "85%",
    label: "Unprotected",
    description: "Homes use non-filtered or partially filtered water",
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: "check",
    value: "100%",
    label: "NeaPure Standard",
    description: "NeaPure ensures 100% safe & pure drinking water",
    accent: "bg-cyan-100 text-cyan-600",
  },
];

/**
 * Responsive layout
 * - < 1280px (mobile / tablet / small laptop): stacked
 *     text  ->  stat cards (2 cols, 4 cols from md)  ->  child image
 *     (the child sits at the bottom and overlaps the next section's wave)
 * - >= 1280px (xl / 2xl): 3-column row
 *     text | child image | stat cards
 */
export default function ProblemSection() {
  return (
    <section className="relative z-10 flow-root overflow-x-clip overflow-y-visible bg-gradient-to-b from-[#BCE3F7] to-[#F4FBFF]">
      <div
        className="
          relative mx-auto w-full max-w-[1920px]
          px-5 pt-8 pb-4
          sm:px-8 md:px-10 lg:px-12
          xl:px-20 xl:pt-0 xl:pb-2 xl:-mt-[110px]
          2xl:-mt-[120px]
        "
      >
        <div
          className="
            flex w-full flex-col gap-8
            xl:-mt-4 xl:flex-row xl:items-end xl:justify-between xl:gap-0
          "
        >
          {/* LEFT CONTENT (z-40 so it stays above the child image) */}
          <div className="relative z-40 order-1 w-full shrink-0 xl:w-[263px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 xl:text-[10px]">
              The Problem
            </span>
            <h2 className="mt-[7px] text-[28px] font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-[32px] md:text-[36px] xl:text-[30px] 2xl:text-[34px]">
              The Water
              <br />
              We Drink
              <br />
              May Not <span className="text-blue-600">Be Safe</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-[1.6] text-slate-600 md:max-w-lg md:text-base xl:mt-2 xl:max-w-[320px] xl:text-xs">
              Tap water may look clean, but it can contain harmful
              impurities, dissolved metals, and microscopic pathogens
              that affect your family's health and well-being.
            </p>
            <button
              className="
                mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600
                px-6 py-3 text-xs font-semibold text-white shadow-lg
                shadow-blue-200/70 transition hover:bg-blue-700
                xl:mt-2 xl:px-5 xl:py-2.5 xl:text-[11px]
              "
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* CHILD IMAGE
              < xl : centered at the bottom (order-3), overlaps the next wave
              >= xl: sits between text and cards, pulled left to close the gap */}
          <div
            className="
              relative z-30 order-3 h-[260px] w-[236px] shrink-0 self-center translate-y-6
              sm:h-[300px] sm:w-[272px]
              md:h-[360px] md:w-[326px]
              xl:order-2 xl:h-[360px] xl:w-[326px] xl:-ml-10 xl:self-end xl:translate-y-12
              2xl:h-[420px] 2xl:w-[380px] 2xl:-ml-12 2xl:translate-y-14
              [-webkit-mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]
              [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]
            "
          >
            <Image
              src="/images/baby.png"
              alt="Child drinking clean water"
              fill
              priority
              sizes="(min-width: 1536px) 380px, (min-width: 1280px) 326px, (min-width: 768px) 326px, (min-width: 640px) 272px, 236px"
              className="object-contain object-bottom"
            />
          </div>

          {/* STAT CARDS */}
          <div
            className="
              order-2 grid w-full grid-cols-2 gap-3
              sm:gap-4 md:grid-cols-4
              xl:order-3 xl:mt-32 xl:min-w-0 xl:flex-1 xl:self-start
              2xl:mt-36
            "
          >
            {stats.map(({ icon, value, label, description, accent }) => {
              const Icon = iconMap[icon as keyof typeof iconMap] || Droplet;
              return (
                <div
                  key={label}
                  className="
                    flex min-h-[170px] min-w-0 flex-col rounded-xl border
                    border-white/80 bg-white/80 p-4
                    shadow-[0_8px_25px_rgba(14,165,233,0.08)] backdrop-blur-sm
                    transition-all duration-300 hover:-translate-y-1
                    hover:bg-white hover:shadow-[0_12px_30px_rgba(14,165,233,0.15)]
                    xl:h-[185px] xl:min-h-0
                    2xl:h-[190px] 2xl:p-5
                  "
                >
                  <div
                    className={`mb-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="whitespace-nowrap text-[25px] font-extrabold leading-none tracking-tight text-slate-950 sm:text-[28px] xl:text-[26px] 2xl:text-[30px]">
                    {value}
                  </h3>
                  <h4 className="mt-2 text-xs font-bold leading-tight text-slate-900 sm:text-sm xl:text-xs 2xl:text-sm">
                    {label}
                  </h4>
                  <p className="mt-1.5 text-[11px] leading-[1.5] text-slate-500 sm:text-xs xl:text-[10px] 2xl:text-[11px]">
                    {description}
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