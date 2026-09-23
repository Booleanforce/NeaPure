"use client";

import React from 'react';
import { Calendar, CheckCircle, Clock, Wallet, ChevronRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  sublabel: string;
  icon: 'calendar' | 'check' | 'clock' | 'wallet';
  color: 'blue' | 'green' | 'orange' | 'purple';
  linkText: string;
}

const iconMap = {
  calendar: Calendar,
  check: CheckCircle,
  clock: Clock,
  wallet: Wallet
};

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', value: 'text-blue-600' },
  green: { bg: 'bg-green-50', text: 'text-green-600', value: 'text-green-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', value: 'text-orange-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', value: 'text-purple-600' }
};

export default function StatCard({ label, value, sublabel, icon, color, linkText }: StatCardProps) {
  const Icon = iconMap[icon];
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-500 font-medium">{label}</div>
          <div className={`text-3xl font-bold mt-1 ${colors.value}`}>{value}</div>
          <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
        </div>
        <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${colors.text}`} />
        </div>
      </div>
      <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center">
        {linkText} <ChevronRight className="w-3 h-3 ml-1" />
      </button>
    </div>
  );
}