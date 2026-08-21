"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface ServiceRequestSearchProps {
  value: string;
  status: string;
  serviceType: string;
  onChange: (value: string, status: string, serviceType: string) => void;
}

export default function ServiceRequestSearch({
  value,
  status,
  serviceType,
  onChange,
}: ServiceRequestSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue, status, serviceType);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, status, serviceType, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Search by ID, Customer Name, Phone..."
          className="block w-full rounded-xl border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 border"
        />
      </div>

      {/* Status Filter */}
      <div className="sm:w-48">
        <select
          value={status}
          onChange={(e) => onChange(localValue, e.target.value, serviceType)}
          className="block w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 border px-3 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONTACTED">Contacted</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Service Type Filter */}
      <div className="sm:w-48">
        <select
          value={serviceType}
          onChange={(e) => onChange(localValue, status, e.target.value)}
          className="block w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 border px-3 bg-white"
        >
          <option value="">All Service Types</option>
          <option value="INSTALLATION">Installation</option>
          <option value="REPAIR">Repair</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="FILTER_REPLACEMENT">Filter Replacement</option>
          <option value="WATER_QUALITY_CHECK">Water Quality Check</option>
          <option value="GENERAL_SERVICE">General Service</option>
        </select>
      </div>
    </div>
  );
}
