"use client";

import {
  ClipboardList,
  Clock,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

export type InstallationFilter =
  | "ALL"
  | "PENDING"
  | "ACTIVE"
  | "COMPLETED";

interface InstallationStatsProps {
  total: number;
  pending: number;
  active: number;
  completed: number;

  selectedFilter: InstallationFilter;

  onFilterChange: (
    filter: InstallationFilter
  ) => void;
}

export default function InstallationStats({
  total,
  pending,
  active,
  completed,
  selectedFilter,
  onFilterChange,
}: InstallationStatsProps) {
  const stats = [
    {
      key: "ALL" as InstallationFilter,
      title: "Total Requests",
      value: total,
      icon: ClipboardList,

      wrapper: "border-blue-200",
      label: "text-blue-500",
      valueColor: "text-slate-900",

      iconWrapper:
        "bg-blue-100 text-blue-600",

      activeWrapper:
        "border-blue-500 bg-blue-50/70 ring-2 ring-blue-100",

      activeIcon:
        "bg-blue-600 text-white",

      activeValue:
        "text-blue-700",
    },

    {
      key: "PENDING" as InstallationFilter,
      title: "Pending Approval",
      value: pending,
      icon: Clock,

      wrapper: "border-amber-200",
      label: "text-amber-600",
      valueColor: "text-amber-700",

      iconWrapper:
        "bg-amber-100 text-amber-600",

      activeWrapper:
        "border-amber-500 bg-amber-50/70 ring-2 ring-amber-100",

      activeIcon:
        "bg-amber-500 text-white",

      activeValue:
        "text-amber-700",
    },

    {
      key: "ACTIVE" as InstallationFilter,
      title: "Active Installations",
      value: active,
      icon: CalendarDays,

      wrapper: "border-blue-200",
      label: "text-blue-600",
      valueColor: "text-blue-700",

      iconWrapper:
        "bg-blue-100 text-blue-600",

      activeWrapper:
        "border-blue-500 bg-blue-50/70 ring-2 ring-blue-100",

      activeIcon:
        "bg-blue-600 text-white",

      activeValue:
        "text-blue-700",
    },

    {
      key: "COMPLETED" as InstallationFilter,
      title: "Completed",
      value: completed,
      icon: CheckCircle,

      wrapper: "border-green-200",
      label: "text-green-600",
      valueColor: "text-green-700",

      iconWrapper:
        "bg-green-100 text-green-600",

      activeWrapper:
        "border-green-500 bg-green-50/70 ring-2 ring-green-100",

      activeIcon:
        "bg-green-600 text-white",

      activeValue:
        "text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        const isActive =
          selectedFilter === stat.key;

        return (
          <button
            key={stat.key}
            type="button"
            onClick={() =>
              onFilterChange(stat.key)
            }
            aria-pressed={isActive}
            className={`
              group
              w-full
              rounded-2xl
              border
              bg-white
              p-5
              text-left
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-300
              sm:p-6

              ${stat.wrapper}

              ${
                isActive
                  ? stat.activeWrapper
                  : ""
              }
            `}
          >
            <div className="flex items-center justify-between gap-4">
              {/* =================================================
                  TEXT
              ================================================= */}

              <div className="min-w-0">
                <p
                  className={`
                    truncate
                    text-sm
                    font-medium
                    ${stat.label}
                  `}
                >
                  {stat.title}
                </p>

                <h2
                  className={`
                    mt-2
                    text-3xl
                    font-bold
                    tracking-tight
                    transition-colors
                    sm:text-4xl

                    ${
                      isActive
                        ? stat.activeValue
                        : stat.valueColor
                    }
                  `}
                >
                  {stat.value}
                </h2>

                {/* =================================================
                    FILTER INDICATOR
                ================================================= */}

                <p
                  className={`
                    mt-1
                    text-xs
                    font-medium
                    transition-opacity
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0"
                    }
                  `}
                >
                  Showing this category
                </p>
              </div>

              {/* =================================================
                  ICON
              ================================================= */}

              <div
                className={`
                  shrink-0
                  rounded-xl
                  p-3
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? stat.activeIcon
                      : stat.iconWrapper
                  }

                  group-hover:scale-105
                `}
              >
                <Icon
                  size={24}
                  strokeWidth={2}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}