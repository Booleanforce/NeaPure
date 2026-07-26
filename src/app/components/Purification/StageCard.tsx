"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface StageCardProps {
  stage: any;
  active?: boolean;
}

export default function StageCard({
  stage,
  active = false,
}: StageCardProps) {
  return (
    <motion.div
      animate={
        active
          ? {
              y: [0, -10, 0],
            }
          : {}
      }
      transition={
        active
          ? {
              repeat: Infinity,
              duration: 3,
            }
          : {}
      }
      className="relative flex flex-col items-center"
    >
      {/* Number Badge */}
      <div
        className={`
          mb-2 flex h-6 w-6 items-center justify-center
          rounded-full border text-xs font-bold shadow-lg transition-all
          ${
            active
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-white border-slate-200 text-slate-500"
          }
        `}
      >
        {String(stage.id).padStart(2, "0")}
      </div>

      {/* Stage Image */}
      <Image
        src={stage.image}
        alt={stage.title}
        width={110}
        height={165}
        unoptimized
        className={`object-contain transition-all duration-500 ${
          active
            ? "scale-105 drop-shadow-[0_0_25px_rgba(37,99,235,.45)]"
            : ""
        }`}
      />

      {/* Title */}
      <h3
        className={`mt-4 text-center text-sm font-semibold ${
          active ? "text-blue-600" : "text-slate-800"
        }`}
      >
        {stage.title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-[160px] text-center text-xs leading-6 text-slate-500">
        {stage.description}
      </p>
    </motion.div>
  );
}