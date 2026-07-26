"use client";

import { motion } from "framer-motion";

import BackgroundGlow from "./BackgroundGlow";
import StageCard from "../Purification/StageCard";
import { stages } from "../Purification/stageData";

export default function PurificationJourney() {
  return (
    <section className="relative overflow-hidden bg-[#eaf6ff] min-h-[1300px] md:min-h-[500px] xl:min-h-[500px] -mt-30">

      {/* Background Image */}
      <BackgroundGlow />

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full z-20">

        {/* ================= Heading ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute left-1/2 top-[120px] md:top-[165px] xl:top-[170px] w-full max-w-4xl -translate-x-1/2 px-6 text-center"
        >
        <span className="text-xs xl:text-sm font-semibold uppercase text-blue-600">
          7 ADVANCED STAGES
        </span>

        <h2 className="text-lg xl:text-xl font-black text-slate-900">
          The Purification Journey
        </h2>

        <p className="mx-auto mt-2 max-w-6xl text-xs xl:text-xs leading-7 text-slate-600">
          Every drop of water passes through seven carefully engineered filtration
          stages to ensure maximum purity and exceptional taste.
        </p>
        </motion.div>

        {/* ================= Timeline ================= */}
        <div className="mt-[280px] xl:mt-[310px]">

          <div className="mx-auto max-w-[1700px] px-6">



            {/* Cards */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-y-10 xl:grid-cols-7 xl:gap-x-6">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.45,
                  }}
                >
                  <StageCard
                    stage={stage}
                    active={index === 3}
                  />
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}