"use client";

interface TabsProps {
  activeTab: "overview" | "jobs" | "performance";
  onChange: (tab: "overview" | "jobs" | "performance") => void;
}

export default function Tabs({
  activeTab,
  onChange,
}: TabsProps) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "jobs", label: "Jobs" },
    { key: "performance", label: "Performance" },
  ] as const;

  return (
    <div className="border-b border-gray-200 px-6">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`relative py-4 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}

            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-700" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}