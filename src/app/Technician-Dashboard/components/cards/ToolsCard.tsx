"use client";

import React from 'react';
import { ShoppingBag, Wrench, Droplets, ChevronRight } from 'lucide-react';

export default function ToolsCard() {
  const tools = [
    { icon: ShoppingBag, name: 'Spare Parts', count: '12 Items Available', color: 'bg-blue-50 text-blue-600' },
    { icon: Wrench, name: 'Filter Kits', count: '8 Items Available', color: 'bg-green-50 text-green-600' },
    { icon: Droplets, name: 'Consumables', count: '15 Items Available', color: 'bg-cyan-50 text-cyan-600' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">My Tools</h3>
        <button className="text-xs text-blue-600 font-semibold hover:underline">Manage</button>
      </div>
      <div className="divide-y divide-gray-50">
        {tools.map((tool, idx) => (
          <div key={idx} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center`}>
                <tool.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.count}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}