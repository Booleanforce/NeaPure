"use client";

import { Search } from "lucide-react";

interface InstallationSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function InstallationSearch({
  value,
  onChange,
}: InstallationSearchProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search customer, dealer or installation..."
          className="
            w-full
            rounded-xl
            border border-blue-100
            bg-white
            py-3
            pl-10
            pr-4
            text-sm
            text-slate-700
            outline-none
            transition
            placeholder:text-blue-300
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </div>
    </div>
  );
}