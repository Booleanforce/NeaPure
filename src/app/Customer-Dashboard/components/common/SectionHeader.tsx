import { ReactNode } from "react";

/**
 * The "title on the left, optional link/badge on the right" row that
 * repeats across Filter Life Status, Recent Service Requests, Account
 * Verification, Quick Actions, and Installation Overview. `right` covers
 * the VERIFIED badge case; `actionLabel`/`onAction` covers the
 * "View All ›" link case. `className` lets each caller keep its own
 * original margin (e.g. mb-3, mb-1) so spacing is unchanged.
 */
export default function SectionHeader({
  title,
  actionLabel,
  onAction,
  right,
  className = "",
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-xs font-semibold text-slate-500">{title}</p>
      {right}
      {actionLabel && (
        <button
          onClick={onAction}
          className="text-[11px] font-medium text-blue-600"
        >
          {actionLabel} <span className="ml-0.5">›</span>
        </button>
      )}
    </div>
  );
}
