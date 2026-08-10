import { ChevronDown } from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import { revenue } from "../../data/revenue";

export default function RevenueBreakdown() {
  return (
    <Card className="col-span-3">
      <SectionHeader
        title="Revenue Breakdown"
        action={
          <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50">
            <span>This Month</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        }
      />

      {/* Donut Chart */}

      <div className="mb-4 flex justify-center">
        <div className="relative h-32 w-32">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="14"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="14"
              strokeDasharray="158 251"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="14"
              strokeDasharray="57 251"
              strokeDashoffset="-158"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f97316"
              strokeWidth="14"
              strokeDasharray="31 251"
              strokeDashoffset="-215"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="14"
              strokeDasharray="5 251"
              strokeDashoffset="-246"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-sm font-bold text-gray-900">
              ৳24,85,600
            </h2>

            <p className="text-[9px] text-gray-500">
              TOTAL REVENUE
            </p>
          </div>
        </div>
      </div>

      {/* Revenue List */}

      <div className="space-y-2">
        {revenue.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${item.color}`}
              />

              <span className="text-gray-600">
                {item.label}
              </span>
            </div>

            <div className="text-right">
              <span className="font-semibold text-gray-900">
                {item.value}
              </span>

              <span className="ml-1 text-gray-400">
                {item.pct}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}