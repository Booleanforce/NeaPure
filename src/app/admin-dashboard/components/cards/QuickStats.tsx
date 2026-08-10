import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import Card from "../common/Card";

import { quickStats } from "../../data/quickStats";

const colors = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
  },
};

export default function QuickStats() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        Quick Stats
      </h3>

      <div className="grid grid-cols-6 gap-4">
        {quickStats.map((stat) => {
          const theme = colors[stat.color];

          return (
            <Card
              key={stat.title}
              className="flex items-center gap-3"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${theme.bg}`}
              >
                <stat.icon
                  className={`h-5 w-5 ${theme.text}`}
                />
              </div>

              <div>
                <p className="text-[10px] text-gray-500">
                  {stat.title}
                </p>

                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-gray-900">
                    {stat.value}
                  </span>

                  {stat.change === "Online" ? (
                    <span className="flex items-center text-[10px] font-semibold text-green-500">
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                      Online
                    </span>
                  ) : (
                    <span
                      className={`flex items-center text-[10px] font-semibold ${
                        stat.up
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat.up ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}

                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}