import { ReactNode } from "react";

/**
 * Shared card shell. Every card in the dashboard was some combination of:
 *   rounded-2xl (or rounded-xl) + border border-slate-100 (or a custom color)
 *   + bg-white (or a custom bg) + some padding + its own layout classes.
 * This component keeps all of that configurable via props so every existing
 * card can be reproduced with the exact same classes it had before —
 * nothing here changes any visual output, it just avoids repeating the
 * border/radius/bg boilerplate in every file.
 */
export default function Card({
  children,
  className = "",
  padding = "p-5",
  rounded = "rounded-2xl",
  bg = "bg-white",
  border = "border border-slate-100",
}: {
  children: ReactNode;
  className?: string;
  padding?: string;
  rounded?: string;
  bg?: string;
  border?: string;
}) {
  return (
    <div
      className={`w-full ${bg} ${rounded} ${border} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}