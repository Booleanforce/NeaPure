import { TrendingUp } from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

const installationData = [
  {
    label: "Completed",
    value: "980",
    color: "text-green-600",
  },
  {
    label: "In Progress",
    value: "168",
    color: "text-blue-600",
  },
  {
    label: "Scheduled",
    value: "70",
    color: "text-orange-600",
  },
  {
    label: "Cancelled",
    value: "30",
    color: "text-red-600",
  },
];

export default function InstallationOverview() {
  return (
    <Card className="col-span-3">
      <SectionHeader title="Installation Overview" />

      {/* Gauge Chart */}

      <div className="mb-4 flex justify-center">
        <div className="relative h-24 w-40">
          <svg viewBox="0 0 100 50" className="h-full w-full">
            {/* Background Arc */}
            <path
              d="M10 50 A40 40 0 0 1 90 50"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Progress Arc */}
            <path
              d="M10 50 A40 40 0 0 1 90 50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="100 126"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              1,248
            </h2>

            <p className="text-[10px] text-gray-500">
              INSTALLATIONS
            </p>
          </div>
        </div>
      </div>

      {/* Growth */}

      <div className="mb-4 flex items-center justify-center gap-1">
        <TrendingUp className="h-3 w-3 text-green-500" />

        <span className="text-xs font-semibold text-green-500">
          15.6%
        </span>

        <span className="text-xs text-gray-400">
          vs last 30 days
        </span>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-2 text-center">
        {installationData.map((item) => (
          <div key={item.label}>
            <p className="text-[10px] text-gray-500">
              {item.label}
            </p>

            <p
              className={`text-sm font-bold ${item.color}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}