import { Copy, ShoppingBag } from "lucide-react";
import Card from "../common/Card";

export default function PromoCard() {
  return (
    <Card
      bg="bg-[#EFF6FE]"
      border="border border-[#DBEAFE]"
      padding="p-6 pr-[45px]"
      className="relative flex flex-1 items-center justify-between gap-4 self-stretch overflow-visible"
    >
      <div className="flex flex-col items-start gap-3">
        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
          SPECIAL OFFER
        </span>

        <p className="text-base font-bold leading-snug text-slate-800">
          Get 15% OFF on all Genuine NeaPure Kits
        </p>

        <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold tracking-wide text-slate-700">
          NEAPURE15 <Copy className="h-3 w-3" />
        </span>

        <button className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
          <ShoppingBag className="h-3.5 w-3.5" /> Shop Now
        </button>
      </div>

      <div className="relative flex shrink-0 items-end gap-1.5">
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
