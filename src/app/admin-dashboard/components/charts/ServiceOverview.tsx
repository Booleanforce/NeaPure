import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

const serviceData = [
  {
    label: "Completed",
    value: "1,560",
    pct: "(62.8%)",
    color: "bg-green-500",
  },
  {
    label: "In Progress",
    value: "540",
    pct: "(21.7%)",
    color: "bg-blue-500",
  },
  {
    label: "Pending",
    value: "264",
    pct: "(10.6%)",
    color: "bg-orange-500",
  },
  {
    label: "Cancelled",
    value: "122",
    pct: "(4.9%)",
    color: "bg-red-500",
  },
];

export default function ServiceOverview() {
  return (
    <Card className="col-span-3">
      <SectionHeader title="Service Request Overview" />

      <div className="mb-4 flex justify-center">
        <div className="relative h-40 w-40">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full -rotate-90"
          >
            {/* Background */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="12"
            />

            {/* Completed */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray="188 251"
              strokeDashoffset="0"
            />

            {/* In Progress */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="12"
              strokeDasharray="54 251"
              strokeDashoffset="-188"
            />

            {/* Pending */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f97316"
              strokeWidth="12"
              strokeDasharray="26 251"
              strokeDashoffset="-242"
            />

            {/* Cancelled */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              strokeDasharray="12 251"
              strokeDashoffset="-268"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-900">
              2,486
            </h2>

            <p className="text-[10px] text-gray-500">
              TOTAL REQUESTS
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {serviceData.map((item) => (
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