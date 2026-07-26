import Image from "next/image";
import {
  Droplet,
  Users,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    icon: Droplet,
    value: "80%",
    label: "High TDS Level",
    description:
      "Water in Bangladesh contains TDS above safe level",
    accent: "bg-sky-100 text-sky-600",
  },
  {
    icon: Users,
    value: "2.1M+",
    label: "Health Risk",
    description:
      "People suffer from waterborne diseases every year",
    accent: "bg-blue-100 text-blue-600",
  },
  {
    icon: ShieldAlert,
    value: "85%",
    label: "Unprotected",
    description:
      "Homes use non-filtered or partially filtered water",
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: CheckCircle2,
    value: "100%",
    label: "NeaPure Standard",
    description:
      "NeaPure ensures 100% safe & pure drinking water",
    accent: "bg-cyan-100 text-cyan-600",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#BCE3F7] to-[#F4FBFF]">

      {/* Main container */}
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1600px]
          px-5
          py-12
          sm:px-8
          lg:px-10
          xl:px-14
          2xl:px-16
          lg:-mt-30
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            gap-10
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-4
            xl:gap-6
          "
        >
          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div
            className="
              w-full
              shrink-0
              lg:w-[220px]
              xl:w-[250px]
              2xl:w-[270px]
              -mt-6
            "
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              The Problem
            </span>

            <h2
              className="
                text-[28px]
                font-extrabold
                leading-[1.08]
                tracking-tight
                text-slate-950
                lg:text-[26px]
                xl:text-[30px]
                2xl:text-[34px]
              "
            >
              The Water
              <br />
              We Drink
              <br />
              May Not{" "}
              <span className="text-blue-600">
                Be Safe
              </span>
            </h2>

            <p
              className="
                mt-2
                max-w-[320px]
                text-xs
                leading-[1.6]
                text-slate-600

                xl:text-xs
              "
            >
              Tap water may look clean, but it can contain harmful
              impurities, dissolved metals, and microscopic pathogens
              that affect your family's health and well-being.
            </p>

            <button
              className="
                mt-2
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-600
                px-5
                py-2.5
                text-[11px]
                font-semibold
                text-white
                shadow-lg
                shadow-blue-200/70
                transition
                hover:bg-blue-700
                
              "
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        {/* =========================
            CHILD IMAGE
        ========================== */}
        <div
          className="
            relative
            z-10
            h-[380px]
            w-[320px]
            shrink-0

            sm:h-[360px]
            sm:w-[320px]

            lg:h-[440px]
            lg:w-[320px]

            xl:h-[480px]
            xl:w-[380px]

            2xl:h-[420px]
            2xl:w-[350px]
          "
        >
          <Image
            src="/images/baby.png"
            alt="Child drinking clean water"
            fill
            priority
            sizes="(min-width: 1536px) 350px, (min-width: 1280px) 320px, 280px"
            className="object-contain object-bottom"
          />
        </div>

          {/* =========================
              STAT CARDS
          ========================== */}
          <div
            className="
              grid
              w-full
              grid-cols-2
              gap-4

              sm:grid-cols-4

              lg:min-w-0
              lg:flex-1
              lg:grid-cols-4
              lg:gap-3

              xl:gap-4
            "
          >
            {stats.map(
              ({
                icon: Icon,
                value,
                label,
                description,
                accent,
              }) => (
                <div
                  key={label}
                  className="
                    flex
                    h-[210px]
                    min-w-0
                    flex-col

                    rounded-xl
                    border
                    border-white/80
                    bg-white/80

                    p-4

                    shadow-[0_8px_25px_rgba(14,165,233,0.08)]
                    backdrop-blur-sm

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-white
                    hover:shadow-[0_12px_30px_rgba(14,165,233,0.15)]

                    lg:h-[200px]
                    lg:p-3

                    xl:h-[215px]
                    xl:p-4

                    2xl:h-[225px]
                    2xl:p-5
                  "
                >
                  {/* Icon */}
                  <div
                    className={`
                      mb-4
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${accent}
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Percentage */}
                  <h3
                    className="
                      whitespace-nowrap
                      text-[25px]
                      font-extrabold
                      leading-none
                      tracking-tight
                      text-slate-950

                      lg:text-[22px]
                      xl:text-[26px]
                      2xl:text-[30px]
                    "
                  >
                    {value}
                  </h3>

                  {/* Label */}
                  <h4
                    className="
                      mt-2
                      text-[11px]
                      font-bold
                      leading-tight
                      text-slate-900

                      xl:text-xs
                      2xl:text-sm
                    "
                  >
                    {label}
                  </h4>

                  {/* Description */}
                  <p
                    className="
                      mt-2
                      text-[9px]
                      leading-[1.5]
                      text-slate-500

                      xl:text-[10px]
                      2xl:text-[11px]
                    "
                  >
                    {description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}