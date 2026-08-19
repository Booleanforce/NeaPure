"use client";

import React from 'react';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function TaskSummaryCard() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-1">Today's Task Summary</h3>
      <div className="text-xs text-gray-500 mb-4">Updated just now</div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Total Jobs</span>
          </div>
          <span className="font-bold text-blue-600">5</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <span className="font-bold text-green-600">3</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <span className="font-bold text-orange-600">2</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">Cancelled</span>
          </div>
          <span className="font-bold text-red-600">0</span>
        </div>
      </div>
    </div>
  );
}