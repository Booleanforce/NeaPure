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
    <Card bg="bg-blue-100" className="flex flex-1 items-center gap-6 self-stretch">
      <div className="relative h-[273px] w-[151px] shrink-0 overflow-hidden rounded-[30px] bg-blue-100">
        <Image
          src="/images/pic23.png"
          alt="NeaPure Pro Max"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col items-start gap-4 self-stretch">
        <p className="text-sm font-bold text-slate-800">NeaPure Pro Max</p>

        <div className="space-y-1 text-[11px] text-slate-400">
          <div className="flex gap-2">
            <span>Model:</span>
            <span className="font-medium text-slate-600">NP-Pro Max</span>
          </div>
          <div className="flex gap-2">
            <span>Serial No:</span>
            <span className="font-medium text-slate-600">MPX12457896</span>
          </div>
          <div className="flex gap-2">
            <span>Technology:</span>
            <span className="font-medium text-slate-600">
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

        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
          View Product Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </Card>
  );
}
