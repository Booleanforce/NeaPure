"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets } from "lucide-react";

import { navItems } from "../../data/navItems";
import SupportCard from "./SupportCard";
import UserProfile from "./UserProfile";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

      {/* Logo */}

      <div className="flex items-center gap-3 border-b border-gray-100 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <Droplets className="h-6 w-6 text-white" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            NeaPure
          </h2>

          <p className="text-[10px] text-gray-400">
            SMART WATER CARE
          </p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all

                ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <item.icon className="h-5 w-5" />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <SupportCard />

      <UserProfile />
    </aside>
  );
}