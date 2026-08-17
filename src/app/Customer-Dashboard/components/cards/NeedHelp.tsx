// NeedHelp.tsx
import { Headphones, HeartHandshake, MessageSquare, Phone } from "lucide-react";
import Card from "../common/Card";

/**
 * Mobile: each action item is itself a horizontal row (icon | text | link),
 * so the two items stack vertically below `sm` rather than side-by-side —
 * two full rows stay readable at narrow widths, whereas squeezing both
 * rows into half-width columns would clip the subtext or the link.
 */
export default function NeedHelp() {
  return (
    <Card className="flex flex-1 flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <HeartHandshake className="h-4 w-4 text-blue-500" /> Need Help?
        </p>
        <p className="text-[11px] text-slate-400">
          Our support team is here for you.
        </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
          <Headphones className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-blue-200 px-3 py-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <MessageSquare className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-700">Chat with Us</p>
            <p className="truncate text-[8px] text-slate-400">
              We reply in a few minutes
            </p>
          </div>
          <button className="shrink-0 text-xs font-semibold text-blue-600">
            Chat
          </button>
        </div>

        <div className="flex flex-1 items-center gap-2 rounded-xl border border-blue-200 px-3 py-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <Phone className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-700">Call Us</p>
            <p className="truncate text-[8px] text-slate-400">
              09:00 AM - 09:00 PM
            </p>
          </div>
          <button className="shrink-0 text-xs font-semibold text-blue-600">
            Call
          </button>
        </div>
      </div>
    </Card>
  );
}
