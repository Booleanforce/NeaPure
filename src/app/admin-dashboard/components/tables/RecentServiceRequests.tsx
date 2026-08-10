import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";

import { serviceRequests } from "../../data/serviceRequests";

export default function RecentServiceRequests() {
  return (
    <Card className="col-span-5">

      <SectionHeader
        title="Recent Service Requests"
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
              Request ID
            </th>

            <th className="pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
              Customer
            </th>

            <th className="pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
              Type
            </th>

            <th className="pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
              Status
            </th>

            <th className="pb-2 text-left text-[10px] font-semibold uppercase text-gray-400">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {serviceRequests.map((req) => (

            <tr
              key={req.id}
              className="border-b border-gray-50"
            >

              <td className="py-3 text-xs font-medium text-gray-600">
                {req.id}
              </td>

              <td className="py-3">

                <div className="flex items-center gap-2">

                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${req.color}`}
                  >
                    {req.initials}
                  </div>

                  <span className="text-xs text-gray-700">
                    {req.customer}
                  </span>

                </div>

              </td>

              <td className="py-3 text-xs text-gray-600">
                {req.type}
              </td>

              <td className="py-3">
                <StatusBadge status={req.status} />
              </td>

              <td className="py-3 text-xs text-gray-500">
                {req.date}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </Card>
  );
}