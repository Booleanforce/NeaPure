// PromoCard.tsx
import { Copy, ShoppingBag } from "lucide-react";
import Card from "../common/Card";

/**
 * Mobile: this was the one genuinely broken layout — fixed p-6 pr-[45px]
 * padding plus a side-by-side flex meant the decorative illustration
 * either got crushed against the text or forced horizontal overflow on
 * narrow screens (the absolute "15% OFF" badge made it worse, since it
 * sits outside the illustration's own box).
 *
 * Fix: stack content above the illustration below `sm` (flex-col,
 * items-start, illustration self-centered), and drop the padding down on
 * mobile since 45px of right padding alone eats a big share of a 320px
 * card. From `sm` up this is back to the original side-by-side layout
 * and original padding, so desktop is unchanged.
 */
export default function PromoCard() {
  return (
    <Card
      bg="bg-[#EFF6FE]"
      border="border border-[#DBEAFE]"
      padding="p-4 sm:p-6 sm:pr-[45px]"
      className="relative flex flex-1 flex-col items-start justify-between gap-5 self-stretch overflow-visible sm:flex-row sm:items-center sm:gap-4"
    >
      <div className="flex flex-col items-start gap-3">
        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
          SPECIAL OFFER
        </span>

        <p className="text-base font-bold leading-snug text-slate-800">
          Get 15% OFF on all <br />Genuine NeaPure Kits
        </p>

        <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold tracking-wide text-[#155DFC] hover:cursor-pointer hover:underline">
          NEAPURE15 <div className="bg-[#EFF6FF] h-6 w-6 rounded-full flex items-center justify-center"><Copy className="h-3 w-3 " /></div>
        </span>

        <button className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:cursor-pointer">
          <ShoppingBag className="h-3.5 w-3.5" /> Shop Now
        </button>
      </div>

      <div className="relative flex shrink-0 items-end gap-1.5 self-center sm:self-auto">
        <div className="flex h-20 w-4 flex-col items-center justify-end gap-1 rounded-full border border-slate-200 bg-white pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        </div>
        <div className="relative flex h-28 w-5 flex-col items-center justify-center overflow-hidden rounded-full border border-blue-200 bg-blue-50">
          <span className="rounded bg-blue-500 px-1 py-0.5 text-[7px] font-bold leading-none text-white">
            Auto
          </span>
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <div className="flex h-20 w-4 flex-col items-center justify-end gap-1 rounded-full border border-slate-200 bg-white pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        </div>

        <span className="absolute -right-3 -top-4 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-blue-600 text-center text-[8px] font-bold leading-tight text-white shadow-md">
          15%
          <span>OFF</span>
        </span>
      </div>
    </Card>
  );
}