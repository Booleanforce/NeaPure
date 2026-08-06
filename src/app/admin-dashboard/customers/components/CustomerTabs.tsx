"use client";

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  "Overview",
  "Products",
  "Installations",
  "Services",
  "Warranty",
];

export default function CustomerTabs({
  active,
  onChange,
}: Props) {
  return (
    <div className="border-b">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`border-b-2 py-3 text-sm font-medium transition ${
              active === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}