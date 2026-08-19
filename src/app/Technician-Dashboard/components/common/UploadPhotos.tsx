"use client";

import React from 'react';
import { Camera } from 'lucide-react';

export default function UploadPhotos() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-1">Upload Job Photos</h3>
      <div className="text-xs text-gray-500 mb-4">Mandatory for every job</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Camera className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-xs text-gray-600 font-medium mb-1">Before Installation</div>
          <button className="text-xs text-blue-600 font-semibold hover:underline">Upload</button>
        </div>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Camera className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-xs text-gray-600 font-medium mb-1">After Installation</div>
          <button className="text-xs text-blue-600 font-semibold hover:underline">Upload</button>
        </div>
      </div>
      <div className="text-center mt-3">
        <span className="text-[10px] text-gray-400">Photos will be saved to customer history</span>
      </div>
    </div>
  );
}