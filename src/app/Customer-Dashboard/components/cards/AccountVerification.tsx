// AccountVerification.tsx
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";
import { VerifiedCheckIcon } from "../common/icons";

export default function AccountVerification() {
  return (
    <Card className="flex-1 h-80 items-start justify-between gap-4">
      <SectionHeader
        title="Account Verification"
        right={<StatusBadge label="VERIFIED" tone="success" />}
      />

      <div className="flex w-full items-center justify-center py-5.5">
        {/* green ring around the icon; icon already has its own
            white border + green fill baked into the SVG */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-emerald-100">
          <VerifiedCheckIcon />
        </div>
      </div>

      <div className="w-full text-center">
        <p className="text-xs font-bold text-[#00BC7D]">
          Your account is fully verified
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[#767676]">
          Enjoy all NeaPure Smart Water Care services seamlessly.
        </p>
      </div>

      <button className="w-full bg-[#EFF6FF] rounded-lg border border-slate-100 mt-5 py-2 text-xs font-bold text-[#155DFC]">
        View Profile <span className="ml-0.5">›</span>
      </button>
    </Card>
  );
}