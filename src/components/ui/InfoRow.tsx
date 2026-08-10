import React from "react";

interface Props {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

export default function InfoRow({
  label,
  value,
  icon,
}: Props) {
  return (
    <div className="flex items-start gap-3">

      {icon && (
        <div className="mt-1 text-blue-600">
          {icon}
        </div>
      )}

      <div className="flex-1">

        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-gray-900 break-all">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}