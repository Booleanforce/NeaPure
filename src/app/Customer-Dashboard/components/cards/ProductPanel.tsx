import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";

/**
 * Renamed from the old `NeapureProductPanel`. Same markup/classes,
 * just built on top of the shared Card primitive (custom bg-blue-100,
 * default rounded-2xl/border/p-5 kept identical to before).
 */
export default function ProductPanel() {
  return (
    <Card bg="bg-blue-100" className="flex p-1 flex-1 h-100 w-142 items-center gap-6 self-stretch">
      <div className="relative h-68 w-37 shrink-0 overflow-hidden rounded-[30px] bg-blue-100">
        <Image
          src="/images/pic23.png"
          alt="NeaPure Pro Max"
          fill
          className="object-cover h-68 w-37"
        />
      </div>

      <div className="flex flex-1 flex-col items-start gap-4 self-stretch">
        <p className="text-lg font-bold text-[#1D293D]">NeaPure Pro Max</p>

        <div className="space-y-1 text-[11px] text-slate-400">
          <div className="flex gap-2">
            <span className="text-xs">Model:</span>
            <span className="font-semibold text-xs text-black">NP-Pro Max</span>
          </div>
          <div className="flex gap-2">
            <span className="text-xs">Serial No:</span>
            <span className="font-semibold text-xs text-black">MPX12457896</span>
          </div>
          <div className="flex gap-2">
            <span className="text-xs">Technology:</span>
            <span className="font-semibold text-xs text-black">
              RO + UV + Copper Active
            </span>
          </div>
        </div>

        <StatusBadge
          label="Active"
          tone="success"
          dot
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
        />

        <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline hover:cursor-pointer">
          View Product Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </Card>
  );
}
