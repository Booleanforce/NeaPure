"use client";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  "Overview",
  "Customers",
  "Products",
  "Installations",
  "History",
];

export default function DealerTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="flex w-full overflow-x-auto">

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition sm:px-5 sm:py-4 ${
            activeTab === tab
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-blue-400 hover:text-blue-700"
          }`}
        >
          {tab}
        </button>
      ))}

    </div>
  );
}