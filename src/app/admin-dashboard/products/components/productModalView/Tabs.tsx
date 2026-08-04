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
    <div className="border-b bg-white">

      <div className="flex overflow-x-auto">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium transition ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

    </div>
  );
}