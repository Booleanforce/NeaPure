// SectionHeader.tsx
import { ReactNode } from "react";

/**
 * The "title on the left, optional link/badge on the right" row that
 * repeats across Filter Life Status, Recent Service Requests, Account
 * Verification, Quick Actions, and Installation Overview.
 *
 * Mobile: title gets `truncate` + `min-w-0` so a long title never pushes
 * the right-side badge/link off the card or off-screen — the flex row
 * needs `min-w-0` on the shrinking child for truncate to actually kick in
 * inside a flex container. `gap-2` keeps title and right content from
 * touching when space is tight. Nothing here changes desktop rendering
 * since these titles were already short.
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
    <div className={`flex min-w-0 items-center justify-between gap-2 ${className}`}>
      <p className="min-w-0 truncate text-xs font-semibold text-slate-500">
        {title}
      </p>
      {right}
      {actionLabel && (
        <button
          onClick={onAction}
          className="shrink-0 text-[11px] font-medium text-blue-600"
        >
          {actionLabel} <span className="ml-0.5">›</span>
        </button>
      )}
    </div>
  );
}