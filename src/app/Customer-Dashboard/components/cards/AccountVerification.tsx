import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import StatusBadge from "../common/StatusBadge";
import { VerifiedCheckIcon } from "../common/icons";

export default function AccountVerification() {
  return (
    <Card className="flex w-full flex-1 flex-col items-start justify-between self-stretch">
      <SectionHeader
        title="Account Verification"
        className="w-full"
        right={<StatusBadge label="VERIFIED" tone="success" />}
      />

      <div className="flex w-full items-center justify-center">
        <VerifiedCheckIcon />
      </div>

      <div className="w-full text-center">
        <p className="text-xs font-semibold text-emerald-600">
          Your account is fully verified
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Enjoy all NeaPure Smart Water Care services seamlessly.
        </p>
      </div>

      <button className="w-full rounded-lg border border-slate-100 py-2 text-xs font-medium text-blue-600">
        View Profile <span className="ml-0.5">›</span>
      </button>
    </Card>
  );
}
