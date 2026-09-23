"use client";

import React from 'react';
import { Wrench, ChevronRight } from 'lucide-react';

export default function RecentJobsTable() {
  const recentJobs = [
    { initials: 'SI', name: 'Saiful Islam', type: 'Service', product: 'NeaPure Pro Max', sn: 'NPX11223344', status: 'Completed', statusColor: 'bg-green-100 text-green-700', time: 'Yesterday, 11:30 AM' },
    { initials: 'NJ', name: 'Nusrat Jahan', type: 'Installation', product: 'NeaPure Plus', sn: 'NPP44332211', status: 'Completed', statusColor: 'bg-green-100 text-green-700', time: 'Yesterday, 03:15 PM' },
    { initials: 'MH', name: 'Mahbub Hasan', type: 'Filter Change', product: 'NeaPure Max', sn: 'NPM99887766', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700', time: 'Yesterday, 06:00 PM' },
    { initials: 'TA', name: 'Tania Akter', type: 'Service', product: 'NeaPure Lite', sn: 'NPL77556633', status: 'Completed', statusColor: 'bg-green-100 text-green-700', time: '2 Days Ago, 10:00 AM' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Recent Jobs</h3>
        <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center">
          View All <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left text-[10px] font-semibold text-gray-400 uppercase px-5 py-3">Customer Name</th>
            <th className="text-left text-[10px] font-semibold text-gray-400 uppercase px-5 py-3">Job Type</th>
            <th className="text-left text-[10px] font-semibold text-gray-400 uppercase px-5 py-3">Product</th>
            <th className="text-left text-[10px] font-semibold text-gray-400 uppercase px-5 py-3">Status</th>
            <th className="text-left text-[10px] font-semibold text-gray-400 uppercase px-5 py-3">Time</th>
            <th className="text-left text-[10px] font-semibold text-gray-400 uppercase px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {recentJobs.map((job, idx) => (
            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
                    {job.initials}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{job.name}</span>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center space-x-1">
                  <Wrench className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-blue-600 font-medium">{job.type}</span>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="text-sm font-medium text-gray-900">{job.product}</div>
                <div className="text-xs text-gray-500">SN: {job.sn}</div>
              </td>
              <td className="px-5 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${job.statusColor}`}>
                  {job.status}
                </span>
              </td>
              <td className="px-5 py-4 text-sm text-gray-500">{job.time}</td>
              <td className="px-5 py-4">
                <button className="px-3 py-1 border border-blue-200 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}