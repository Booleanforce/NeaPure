"use client";

import React from 'react';
import { QrCode, Wrench, ClipboardList, FileCheck, Camera } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: QrCode, label: 'Scan QR Code', color: 'bg-gray-100 text-gray-700' },
    { icon: Wrench, label: 'New Installation', color: 'bg-green-100 text-green-700' },
    { icon: ClipboardList, label: 'Service Request', color: 'bg-orange-100 text-orange-700' },
    { icon: FileCheck, label: 'Update Status', color: 'bg-purple-100 text-purple-700' },
    { icon: Camera, label: 'Upload Photos', color: 'bg-blue-100 text-blue-700' }
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-5 gap-3">
        {actions.map((action, idx) => (
          <button key={idx} className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-gray-600 text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}