"use client";

import React from 'react';
import { Phone, Clock, MapPin, Play } from 'lucide-react';

export default function CurrentJobCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Current Job</h3>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">On the way</span>
      </div>
      <div className="p-5">
        {/* Map Placeholder */}
        <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute top-4 left-0 w-16 h-0.5 bg-blue-600"></div>
              <div className="absolute top-4 left-16 w-0.5 h-12 bg-blue-600"></div>
              <div className="absolute top-16 left-16 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-4 grid-rows-3 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              RH
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Rakib Hasan</div>
              <div className="text-xs text-gray-500">01712-345678</div>
              <div className="text-xs text-gray-400">Mirpur DOHS, Dhaka</div>
            </div>
          </div>
          <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
        </div>

        {/* Product Info */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-10 bg-blue-200 rounded"></div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">NeaPure Pro Max</div>
              <div className="text-xs text-gray-500">SN: NPX12457896</div>
              <button className="text-xs text-blue-600 font-semibold hover:underline mt-1">View Details</button>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-xs">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-gray-500">Appointment Time</span>
            <span className="font-semibold text-gray-900 ml-auto">09:30 AM – 10:30 AM</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <MapPin className="w-3 h-3 text-red-400" />
            <span className="text-gray-500">Service Type</span>
            <span className="font-semibold text-blue-600 ml-auto">Installation</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <Play className="w-4 h-4" fill="currentColor" />
          <span>Start Job</span>
        </button>
      </div>
    </div>
  );
}