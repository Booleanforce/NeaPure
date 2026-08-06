"use client";

import { Bell, MessageSquare, Search } from "lucide-react";
import UserProfile from "./UserProfile";

/**
 * Renamed from the old inline `TopHeader` function to match the requested
 * layout/Topbar.tsx naming. Content and classes are unchanged.
 */
export default function Topbar() {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <p className="text-lg font-bold text-slate-800">
          Welcome back, <span className="text-slate-900">Mahfuzur Rahman</span> 👋
        </p>
        <p className="text-xs text-slate-400">
          Here&apos;s what&apos;s happening with your water care today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden items-center rounded-lg bg-slate-50 px-3 py-2 sm:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            placeholder="Search anything..."
            className="ml-2 w-48 bg-transparent text-xs text-slate-500 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500">
          <MessageSquare className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <UserProfile
          name="Mahfuzur Rahman"
          avatarSrc="https://i.pravatar.cc/72?img=12"
        />
      </div>
    </div>
  );
}
