type Tone = "success" | "warning" | "neutral";

const toneClasses: Record<Tone, { pill: string; dot: string }> = {
  success: { pill: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  warning: { pill: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  neutral: { pill: "bg-slate-50 text-slate-600", dot: "bg-slate-400" },
};

/**
 * Covers every small status pill in the dashboard:
 *  - "VERIFIED" in Account Verification (tone success, no dot)
 *  - "Active" in the Product Panel (tone success, dot)
 *  - "Completed" / "Pending" in Recent Service Requests (tone success/warning, no dot)
 * `className` lets each caller reproduce its exact original size/padding
 * (they weren't all identical — 10px vs 11px text, 0.5 vs 1 padding, etc.)
 */
export default function StatusBadge({
  label,
  tone = "success",
  dot = false,
  className = "rounded-full px-2 py-0.5 text-[10px] font-semibold",
}: {
  label: string;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${toneClasses[tone].pill} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${toneClasses[tone].dot}`} />}
      {label}
    </span>
  );
}
