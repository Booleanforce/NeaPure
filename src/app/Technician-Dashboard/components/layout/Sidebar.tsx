"use client";

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  Wrench,
  FileText,
  QrCode,
  Users,
  Package,
  BarChart3,
  Wallet,
  HelpCircle,
  Bell,
  User,
  Settings,
  Droplets,
  Power,
  ArrowRight
} from 'lucide-react';

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: "Today's Jobs", icon: Calendar },
    { name: 'My Schedule', icon: CalendarDays },
    { name: 'Installations', icon: Wrench },
    { name: 'Service Requests', icon: FileText },
    { name: 'QR Code Scan', icon: QrCode },
    { name: 'Customers', icon: Users },
    { name: 'Products', icon: Package },
    { name: 'Reports', icon: BarChart3 },
    { name: 'Earnings', icon: Wallet },
    { name: 'Support', icon: HelpCircle },
    { name: 'Notifications', icon: Bell, badge: 3 },
    { name: 'Profile', icon: User },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-40">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="font-bold text-lg text-gray-900 leading-none">NeaPure</div>
          <div className="text-[10px] text-gray-500 font-medium">Smart Water Care</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveNav(item.name)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeNav === item.name
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 space-y-3 border-t border-gray-100">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
          <Power className="w-4 h-4" />
          <span>Go Offline</span>
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
          <h4 className="font-bold text-sm mb-1">Need Spare Parts?</h4>
          <p className="text-xs text-blue-100 mb-3">Order genuine parts & get it delivered to you.</p>
          <div className="flex space-x-1 mb-3">
            <div className="w-8 h-10 bg-blue-500 rounded"></div>
            <div className="w-8 h-10 bg-blue-400 rounded"></div>
            <div className="w-8 h-10 bg-blue-300 rounded"></div>
          </div>
          <button className="w-full bg-white text-blue-600 text-xs font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-1">
            <span>Order Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}