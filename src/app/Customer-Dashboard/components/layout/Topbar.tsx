"use client";

import { Bell, MessageSquare, Search } from "lucide-react";
import UserProfile from "./UserProfile";
import { useUser } from "../../context/UserContext";

interface TopbarProps {
  /** Opens the mobile sidebar drawer. Button only shows below lg. */
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  // Same shared context ProfilePage writes to — so a changed avatar
  // or name shows up here immediately, with no prop drilling and no
  // hardcoded fallback values.
  const { profile } = useUser();

  const handleLogout = () => {
    // TODO: clear session/cookies/auth state here before redirecting
    router.push("/login");
  };

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-800 sm:text-base">
            Welcome back, <span className="text-slate-900">{profile.fullName}</span> 👋
          </p>
          <p className="hidden truncate text-xs text-slate-400 sm:block">
            Here&apos;s what&apos;s happening with your water care today.
          </p>
        </div>
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

        <UserProfile name={profile.fullName} avatarSrc={profile.avatarUrl} />

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center rounded-lg bg-rose-500 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600 sm:px-3.5"
        >
          <span className="hidden sm:inline">Logout</span>
          <LogOut className="h-4 w-4 sm:hidden" />
        </button>
      </div>
    </div>
  );
}
