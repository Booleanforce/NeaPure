"use client";

import React from 'react';
import { MapPin, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Good Morning, Jahid Hasan 👋</h1>
          <p className="text-sm text-gray-500">Here's your work overview for today.</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>Dhaka, Bangladesh</span>
        </div>
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            JH
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Jahid Hasan</div>
            <div className="text-xs text-gray-500">Technician ID: TECH-2458</div>
          </div>
        </div>
      </div>
    </header>
  );
}