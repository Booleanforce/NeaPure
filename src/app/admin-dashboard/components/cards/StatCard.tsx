import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import Card from "../common/Card";
import { StatsCard } from "../../types/dashboard";

const colors = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    stroke: "#3b82f6",
  },

  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    stroke: "#06b6d4",
  },

  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    stroke: "#10b981",
  },

  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    stroke: "#8b5cf6",
  },

  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    stroke: "#f97316",
  },
};

export default function StatCard({
  title,
  value,
  change,
  up,
  color,
  icon: Icon,
}: StatsCard) {
  const theme = colors[color];

  return (
    <Card className="hover:shadow-md transition-shadow">

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">

          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme.bg}`}
          >
            <Icon className={`w-4 h-4 ${theme.text}`} />
          </div>

          <span className="text-xs text-gray-500 font-medium">
            {title}
          </span>

        </div>

      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        {value}
      </h2>

      <div className="mt-1 flex items-center gap-1">

        {up ? (
          <TrendingUp className="w-3 h-3 text-green-500" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-500" />
        )}

        <span
          className={`text-xs font-semibold ${
            up ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>

        <span className="text-xs text-gray-400">
          vs last 30 days
        </span>

      </div>

      <div className="mt-3 h-8">

        <svg
          viewBox="0 0 100 30"
          className="w-full h-full"
        >
          <path
            d="M0,25 Q10,20 20,22 T40,15 T60,18 T80,10 T100,5"
            fill="none"
            stroke={theme.stroke}
            strokeWidth="2"
          />
        </svg>

      </div>

    </Card>
  );
}