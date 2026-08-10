import { statsCards } from "../../data/statsCards";
import StatCard from "./StatCard";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {statsCards.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  );
}