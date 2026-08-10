"use client";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  "Overview",
  "Products",
  "Services",
  "Warranty",
];

export default function CustomerTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="border-b bg-white px-6">
      <div className="flex gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 py-4 text-sm font-semibold transition ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}