"use client";

import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

export default function ScheduleTable() {
  const schedule = [
    { time: '09:30 AM', status: 'On the way', statusColor: 'bg-green-100 text-green-700', name: 'Rakib Hasan', initials: 'RH', phone: '01712-345678', address: 'Mirpur DOHS, Dhaka', product: 'NeaPure Pro Max', sn: 'NPX12457896' },
    { time: '11:30 AM', status: 'Upcoming', statusColor: 'bg-blue-100 text-blue-700', name: 'Shamima Akter', initials: 'SA', phone: '01823-456789', address: 'Uttara Sector 7, Dhaka', product: 'NeaPure Plus', sn: 'NPP98765432' },
    { time: '02:30 PM', status: 'Upcoming', statusColor: 'bg-blue-100 text-blue-700', name: 'Ariful Islam', initials: 'AI', phone: '01678-910111', address: 'Bashundhara R/A, Dhaka', product: 'NeaPure Max', sn: 'NPM11223344' },
    { time: '04:30 PM', status: 'Upcoming', statusColor: 'bg-blue-100 text-blue-700', name: 'Farjana Islam', initials: 'FI', phone: '01798-765432', address: 'Dhanmondi 27, Dhaka', product: 'NeaPure Pro', sn: 'NPP55667788' },
    { time: '06:30 PM', status: 'Upcoming', statusColor: 'bg-blue-100 text-blue-700', name: 'Monir Hossain', initials: 'MH', phone: '01324-567890', address: 'Mohammadpur, Dhaka', product: 'NeaPure Lite', sn: 'NPL33445566' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Today's Schedule</h3>
        <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center">
          View All <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>
      <div className="divide-y divide-gray-50">
        {schedule.map((item, idx) => (
          <div key={idx} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm font-bold text-blue-600">{item.time}</div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full mt-1 ${item.statusColor}`}>
                  {item.status}
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
                {item.initials}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                <div className="text-xs text-gray-500">{item.phone}</div>
                <div className="text-xs text-gray-400">{item.address}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-8 bg-blue-200 rounded"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.product}</div>
                <div className="text-xs text-gray-500">SN: {item.sn}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-gray-100">
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>View Full Schedule</span>
        </button>
      </div>
    </div>
  );
}