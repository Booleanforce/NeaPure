import { Star } from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";

import { technicians } from "../../data/technicians";

export default function TopTechnicians() {
  return (
    <Card className="col-span-4">
      <SectionHeader
        title="Top Technicians"
        action={
          <button className="text-xs font-semibold text-blue-600 hover:underline">
            View All
          </button>
        }
      />

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
              Technician
            </th>

            <th className="pb-2 text-right text-[10px] font-semibold uppercase text-gray-400">
              Completed
            </th>

            <th className="pb-2 text-right text-[10px] font-semibold uppercase text-gray-400">
              Rating
            </th>
          </tr>
        </thead>

        <tbody>
          {technicians.map((tech) => (
            <tr
              key={tech.name}
              className="border-b border-gray-50"
            >
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-[10px] font-bold text-gray-600">
                    {tech.avatar}
                  </div>

                  <span className="text-xs font-medium text-gray-700">
                    {tech.name}
                  </span>
                </div>
              </td>

              <td className="py-3 text-right text-xs font-semibold text-gray-700">
                {tech.completed}
              </td>

              <td className="py-3">
                <div className="flex items-center justify-end gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />

                  <span className="text-xs font-semibold text-gray-700">
                    {tech.rating}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}