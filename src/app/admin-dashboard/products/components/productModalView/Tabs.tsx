"use client";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  "Overview",
  "Gallery",
  "Specifications",
  "Documents",
  "Related",
  "SEO",
  "History",
];

export default function Tabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="border-b border-blue-100 bg-white px-3 sm:px-6">
      <div className="flex gap-5 overflow-x-auto scrollbar-hide sm:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 whitespace-nowrap border-b-2 py-3 text-sm font-semibold transition-all duration-200 sm:py-4 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-blue-400 hover:border-blue-200 hover:text-blue-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}