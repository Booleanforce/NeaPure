"use client";

import React from 'react';
import { TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';

export default function EarningsSummaryCard() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Earnings Summary</h3>
        <button className="flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-lg text-xs text-gray-600">
          <span>This Month</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-3xl font-bold text-gray-900">৳1,850</div>
          <div className="text-xs text-gray-500">Total Earnings</div>
        </div>
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm font-bold text-gray-900">৳1,200</div>
          <div className="text-[10px] text-gray-500">Service Income</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm font-bold text-gray-900">৳450</div>
          <div className="text-[10px] text-gray-500">Installation Income</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm font-bold text-gray-900">৳200</div>
          <div className="text-[10px] text-gray-500">Bonus</div>
        </div>
      </div>
      <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
        <span>View Earnings Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}