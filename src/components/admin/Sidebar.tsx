"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Home, Settings, Package, LayoutDashboard, Briefcase, Wrench, Bell } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Customer Management', href: '/admin/customers', icon: Users },
  { name: 'Dealer Management', href: '/admin/dealers', icon: Briefcase },
  { name: 'Technician Management', href: '/admin/technicians', icon: Wrench },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Installations', href: '/admin/installations', icon: Wrench },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200 dark:bg-[#0a0a0a] dark:border-gray-800">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          NeaPure Admin
        </span>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col space-y-1 pb-4">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Test Portals (Dev)
          </div>
          <Link
            href="/dealer/installations"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Briefcase className="h-5 w-5 shrink-0" />
            Dealer Portal
          </Link>
          <Link
            href="/technician/installations"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Wrench className="h-5 w-5 shrink-0" />
            Technician App
          </Link>
        </div>

        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Settings className="h-5 w-5 shrink-0" />
          Settings
        </Link>
      </div>
    </div>
  );
}
