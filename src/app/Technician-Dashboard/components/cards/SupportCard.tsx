"use client";

import React from 'react';
import { Phone, MessageCircle, FileCheck, ChevronRight } from 'lucide-react';

export default function SupportCard() {
  const supportItems = [
    { icon: Phone, label: 'Call Support', desc: 'Talk to support team', color: 'bg-blue-50 text-blue-600' },
    { icon: MessageCircle, label: 'WhatsApp Support', desc: 'Chat on WhatsApp', color: 'bg-green-50 text-green-600' },
    { icon: FileCheck, label: 'Service Guidelines', desc: 'View installation & service guide', color: 'bg-purple-50 text-purple-600' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Support</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {supportItems.map((item, idx) => (
          <div key={idx} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}