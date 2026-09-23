"use client";

import React from 'react';

export default function JobStatisticsChart() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">
        Job Statistics <span className="text-gray-400 font-normal text-sm">(This Month)</span>
      </h3>
      <div className="flex items-center space-x-6">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12"
              strokeDasharray="178 251" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12"
              strokeDasharray="135 251" strokeDashoffset="-178" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="12"
              strokeDasharray="90 251" strokeDashoffset="-313" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="12"
              strokeDasharray="45 251" strokeDashoffset="-403" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900">28</div>
            <div className="text-[10px] text-gray-500">Total Jobs</div>
          </div>
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Completed</span>
            <span className="font-semibold text-gray-900 ml-auto">20 (71%)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Installations</span>
            <span className="font-semibold text-gray-900 ml-auto">15 (54%)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600">Services</span>
            <span className="font-semibold text-gray-900 ml-auto">10 (36%)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600">Pending</span>
            <span className="font-semibold text-gray-900 ml-auto">5 (18%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}