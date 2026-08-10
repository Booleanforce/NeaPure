import { ChevronDown } from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

export default function SalesChart() {
  return (
    <Card className="col-span-6">
      <SectionHeader
        title="Sales Overview"
        action={
          <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
            <span>This Month</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        }
      />

      {/* Legend */}
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-xs text-gray-500">Purifiers</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs text-gray-500">Kits</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-purple-500" />
          <span className="text-xs text-gray-500">Services</span>
        </div>
      </div>

      <div className="h-64">
        <svg viewBox="0 0 500 200" className="h-full w-full">
          {/* Grid */}

          {[0, 40, 80, 120, 160, 200].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y}
              x2="500"
              y2={y}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Y Axis */}

          {["50K", "40K", "30K", "20K", "10K", "0"].map(
            (label, i) => (
              <text
                key={i}
                x="-5"
                y={i * 40 + 5}
                fontSize="10"
                fill="#9ca3af"
                textAnchor="end"
              >
                {label}
              </text>
            )
          )}

          {/* X Axis */}

          {[
            "17 May",
            "24 May",
            "31 May",
            "07 Jun",
            "14 Jun",
            "21 Jun",
            "28 Jun",
            "05 Jul",
            "12 Jul",
          ].map((label, i) => (
            <text
              key={i}
              x={i * 62 + 10}
              y="215"
              fontSize="9"
              fill="#9ca3af"
            >
              {label}
            </text>
          ))}

          {/* Blue */}

          <path
            d="M10,120 Q60,100 120,110 T240,90 T360,70 T480,50"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
          />

          {/* Green */}

          <path
            d="M10,160 Q60,150 120,145 T240,130 T360,120 T480,110"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Purple */}

          <path
            d="M10,180 Q60,175 120,170 T240,165 T360,155 T480,145"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </Card>
  );
}