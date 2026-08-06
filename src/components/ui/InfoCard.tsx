import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({
  title,
  children,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      <div className="space-y-5 p-6">
        {children}
      </div>
    </div>
  );
}