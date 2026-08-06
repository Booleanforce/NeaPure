import { Headphones, MessageSquare, Phone } from "lucide-react";
import Card from "../common/Card";

export default function NeedHelp() {
  return (
    <Card className="flex flex-1 flex-col gap-3">
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Headphones className="h-4 w-4 text-slate-400" /> Need Help?
      </p>
      <p className="text-[11px] text-slate-400">
        Our support team is here for you.
      </p>
      <div className="flex gap-2">
        <button className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-slate-100 py-3 text-xs font-medium text-slate-600">
          <MessageSquare className="h-4 w-4 text-blue-500" />
          Chat with Us
          <span className="text-[10px] font-normal text-slate-400">
            We reply in a few minutes
          </span>
        </button>
        <button className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-slate-100 py-3 text-xs font-medium text-slate-600">
          <Phone className="h-4 w-4 text-blue-500" />
          Call Us
          <span className="text-[10px] font-normal text-slate-400">
            09:00 AM - 09:00 PM
          </span>
        </button>
      </div>
    </Card>
  );
}
