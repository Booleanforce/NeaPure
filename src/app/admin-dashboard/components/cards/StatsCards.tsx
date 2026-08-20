"use client";

import { statsCards } from "../../data/statsCards";
import StatCard from "./StatCard";

export default function StatsCards() {
  return (
    <div
      className="
        grid
        min-w-0
        grid-cols-2
        gap-3
        sm:grid-cols-2
        md:grid-cols-3
        xl:grid-cols-5
        xl:gap-4
      "
    >
      {statsCards.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  );
}