import Image from "next/image";
import { Droplet, Users, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: Droplet,
    value: "80%",
    label: "High TDS Level",
    description: "Water in Bangladesh contains TDS above safe level",
    accent: "bg-sky-100 text-sky-600",
  },
  {
    icon: Users,
    value: "2.1M+",
    label: "Health Risk",
    description: "People suffer from water borne diseases every year",
    accent: "bg-blue-100 text-blue-600",
  },
  {
    icon: ShieldAlert,
    value: "85%",
    label: "Unprotected",
    description: "Homes use non-filtered or partially filtered water",
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: CheckCircle2,
    value: "100%",
    label: "NeaPure Standard",
    description: "NeaPure ensures 100% safe & pure drinking water",
    accent: "bg-cyan-100 text-cyan-600",
  },
];

export default function Problem() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#BCE3F7] to-white">
      {/* Outer frame matches Figma: 1920px, px-80, pb-100, column, gap-80 */}
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col items-start gap-[80px] px-6 pb-10 sm:px-10 lg:px-[80px] lg:pb-[100px]">

        {/* Inner row: 1745px wide, 60px gap, centered items — per Figma */}
<div className="flex w-full flex-col gap-10 lg:w-auto lg:flex-row lg:items-center lg:gap-[20px]">

          {/* Text column */}
          <div className="w-full shrink-0 lg:w-72 xl:w-80">
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-[42px]">
              The Water
              <br />
              We Drink
              <br />
              May Not <span className="text-blue-600">Be Safe</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base">
              Tap water may look clean, but it can contain harmful impurities,
              dissolved metals, and microscopic pathogens that affect your
              family&apos;s health and well-being.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Image — blends into background, no hard card edge */}
          <div className="relative h-72 w-full shrink-0 sm:h-80 lg:h-[480px] lg:w-[440px] xl:w-[380px]">
            <Image
              src="/images/baby1.png" // TODO: replace with your photo
              alt="Child drinking a glass of clean water"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover object-[center_25%]"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, black 80%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, black 80%, transparent)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </div>

          {/* Stats — inline row of narrow cards, wraps to 2-col only below lg */}
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:flex lg:w-auto lg:flex-1 lg:gap-4">
            {stats.map(({ icon: Icon, value, label, description, accent }) => (
              <div
                key={label}
                className="
                  rounded-2xl
                  bg-white
                  p-4
                  border border-slate-100
                  shadow-[0_8px_24px_rgba(56,189,248,0.08)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_12px_32px_rgba(56,189,248,0.15)]
                  lg:w-[170px]
                  lg:shrink-0
                "
              >
                <div
                  className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>

                <h3 className="text-3xl font-extrabold leading-none tracking-tight text-slate-900">
                  {value}
                </h3>

                <h4 className="mt-3 text-base font-bold leading-snug text-slate-900">
                  {label}
                </h4>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 