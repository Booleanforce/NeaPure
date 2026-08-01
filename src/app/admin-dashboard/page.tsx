"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.service";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Wrench,
  FileText,
  UserCog,
  MapPin,
  Box,
  Shield,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  UserCircle,
  Search,
  Calendar,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Headphones,
  MessageCircle,
  Droplets,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Customers', icon: Users },
    { name: 'Products', icon: Package },
    { name: 'Sales & Orders', icon: ShoppingCart },
    { name: 'Installations', icon: Wrench },
    { name: 'Service Requests', icon: FileText },
    { name: 'Technicians', icon: UserCog },
    { name: 'Service Tracking', icon: MapPin },
    { name: 'Replacement Kits', icon: Box },
    { name: 'Warranty', icon: Shield },
    { name: 'Payments', icon: CreditCard },
    { name: 'Reports & Analytics', icon: BarChart3 },
    { name: 'Notifications', icon: Bell },
    { name: 'Settings', icon: Settings },
    { name: 'User Management', icon: UserCircle }
  ];

  const statsCards = [
    { title: 'Total Customers', value: '12,458', change: '+12.5%', up: true, color: 'blue', icon: Users },
    { title: 'Total Purifiers', value: '15,786', change: '+10.2%', up: true, color: 'cyan', icon: Droplets },
    { title: 'Active Warranties', value: '13,250', change: '+14.3%', up: true, color: 'green', icon: Shield },
    { title: 'Total Services', value: '8,964', change: '+18.7%', up: true, color: 'purple', icon: Wrench },
    { title: 'Total Revenue', value: '৳24,85,600', change: '+16.8%', up: true, color: 'orange', icon: CreditCard }
  ];

  const serviceRequests = [
    { id: 'SR-2466-09125', customer: 'Rashidul Islam', initials: 'RI', type: 'Filter Change', status: 'In Progress', date: '24 Jun 2024', color: 'bg-blue-100 text-blue-600' },
    { id: 'SR-2466-09125', customer: 'Farhana Aktor', initials: 'FA', type: 'Filter Change', status: 'Completed', date: '24 Jun 2024', color: 'bg-green-100 text-green-600' },
    { id: 'SR-2466-09125', customer: 'Rashidul Islam', initials: 'RI', type: 'Filter Change', status: 'In Progress', date: '24 Jun 2024', color: 'bg-blue-100 text-blue-600' },
    { id: 'SR-2466-09125', customer: 'Rashidul Islam', initials: 'RI', type: 'Filter Change', status: 'In Progress', date: '24 Jun 2024', color: 'bg-blue-100 text-blue-600' },
    { id: 'SR-2466-09125', customer: 'Rashidul Islam', initials: 'RI', type: 'Filter Change', status: 'In Progress', date: '24 Jun 2024', color: 'bg-blue-100 text-blue-600' }
  ];

  const technicians = [
    { name: 'Jahid Hasan', completed: 186, rating: 4.9, avatar: 'JH' },
    { name: 'Rasel Ahmed', completed: 142, rating: 4.8, avatar: 'RA' },
    { name: 'Ariful Islam', completed: 128, rating: 4.7, avatar: 'AI' },
    { name: 'Monir Hossain', completed: 112, rating: 4.6, avatar: 'MH' },
    { name: 'Shamin Ahmed', completed: 98, rating: 4.6, avatar: 'SA' }
  ];

  const quickStats = [
    { title: 'New Customers', value: '324', change: '+11.6%', up: true, icon: Users, color: 'blue' },
    { title: 'New Purifiers Sold', value: '452', change: '+13.2%', up: true, icon: Droplets, color: 'cyan' },
    { title: 'Kits Sold', value: '1,285', change: '+15.3%', up: true, icon: Box, color: 'pink' },
    { title: "Today's Services", value: '186', change: '+5.6%', up: true, icon: Wrench, color: 'purple' },
    { title: 'Pending Requests', value: '264', change: '+5.3%', up: false, icon: Clock, color: 'orange' },
    { title: 'Active Technicians', value: '48', change: 'Online', up: true, icon: UserCog, color: 'green' }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'In Progress') return 'bg-blue-50 text-blue-600 border border-blue-200';
    if (status === 'Completed') return 'bg-green-50 text-green-600 border border-green-200';
    if (status === 'Pending') return 'bg-orange-50 text-orange-600 border border-orange-200';
    return 'bg-red-50 text-red-600 border border-red-200';
  };

  const handleLogout = async () => {
    await logout();

    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900 leading-none">NeaPure</div>
            <div className="text-[10px] text-gray-400 font-medium">SMART WATER CARE</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeNav === item.name
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Support Card */}
        <div className="p-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Headphones className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm text-center">Need Support?</h4>
            <p className="text-xs text-gray-500 text-center mt-1 mb-3">Our support team is here to help you.</p>
            <button className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="w-3 h-3" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              MR
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">Mahfuzur Rahman</div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span>24 May 2024 - 24 Jun 2024</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <MapPin className="w-4 h-4" />
              <span>All Branches</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">15</span>
            </button>
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  NeaPure Admin
                </div>

                <div className="text-xs text-gray-500">
                  Super Admin
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                A
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4">
            {statsCards.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      stat.color === 'blue' ? 'bg-blue-50' :
                      stat.color === 'cyan' ? 'bg-cyan-50' :
                      stat.color === 'green' ? 'bg-green-50' :
                      stat.color === 'purple' ? 'bg-purple-50' : 'bg-orange-50'
                    }`}>
                      <stat.icon className={`w-4 h-4 ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'cyan' ? 'text-cyan-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{stat.title}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="flex items-center space-x-1">
                  {stat.up ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-semibold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                  <span className="text-xs text-gray-400">vs last 30 days</span>
                </div>
                {/* Mini sparkline */}
                <div className="mt-2 h-8">
                  <svg viewBox="0 0 100 30" className="w-full h-full">
                    <path
                      d={stat.color === 'blue' ? 'M0,25 Q10,20 20,22 T40,15 T60,18 T80,10 T100,5' :
                         stat.color === 'cyan' ? 'M0,28 Q15,22 30,20 T50,15 T70,12 T100,8' :
                         stat.color === 'green' ? 'M0,25 Q20,20 40,22 T60,15 T80,12 T100,8' :
                         stat.color === 'purple' ? 'M0,20 Q10,25 20,18 T40,22 T60,15 T80,18 T100,10' :
                         'M0,28 Q15,20 30,22 T50,15 T70,10 T100,5'}
                      fill="none"
                      stroke={stat.color === 'blue' ? '#3b82f6' : stat.color === 'cyan' ? '#06b6d4' : stat.color === 'green' ? '#10b981' : stat.color === 'purple' ? '#8b5cf6' : '#f97316'}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-12 gap-4">
            {/* Sales Overview */}
            <div className="col-span-6 bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">Sales Overview</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Purifiers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Kits</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Services</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
                  <span>This Month</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="h-64">
                <svg viewBox="0 0 500 200" className="w-full h-full">
                  {/* Grid lines */}
                  {[0, 40, 80, 120, 160, 200].map((y, i) => (
                    <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="#f3f4f6" strokeWidth="1" />
                  ))}
                  {/* Y-axis labels */}
                  {['50K', '40K', '30K', '20K', '10K', '0'].map((label, i) => (
                    <text key={i} x="-5" y={i * 40 + 5} fontSize="10" fill="#9ca3af" textAnchor="end">{label}</text>
                  ))}
                  {/* X-axis labels */}
                  {['17 May', '24 May', '31 May', '07 Jun', '14 Jun', '21 Jun', '28 Jun', '05 Jul', '12 Jul'].map((label, i) => (
                    <text key={i} x={i * 62 + 10} y="215" fontSize="9" fill="#9ca3af">{label}</text>
                  ))}
                  {/* Lines */}
                  <path d="M10,120 Q60,100 120,110 T240,90 T360,70 T480,50" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  <path d="M10,160 Q60,150 120,145 T240,130 T360,120 T480,110" fill="none" stroke="#10b981" strokeWidth="2.5" />
                  <path d="M10,180 Q60,175 120,170 T240,165 T360,155 T480,145" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Service Request Overview */}
            <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Service Request Overview</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12"
                      strokeDasharray="188 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12"
                      strokeDasharray="54 251" strokeDashoffset="-188" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="12"
                      strokeDasharray="26 251" strokeDashoffset="-242" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12"
                      strokeDasharray="12 251" strokeDashoffset="-268" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-gray-900">2,486</div>
                    <div className="text-[10px] text-gray-500">TOTAL REQUESTS</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Completed', value: '1,560', pct: '(62.8%)', color: 'bg-green-500' },
                  { label: 'In Progress', value: '540', pct: '(21.7%)', color: 'bg-blue-500' },
                  { label: 'Pending', value: '264', pct: '(10.6%)', color: 'bg-orange-500' },
                  { label: 'Cancelled', value: '122', pct: '(4.9%)', color: 'bg-red-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">{item.value}</span>
                      <span className="text-gray-400 ml-1">{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation Overview */}
            <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Installation Overview</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-40 h-24">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray="100 126" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                    <div className="text-2xl font-bold text-gray-900">1,248</div>
                    <div className="text-[10px] text-gray-500">INSTALLATIONS</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-1 mb-4">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs font-semibold text-green-500">15.6%</span>
                <span className="text-xs text-gray-400">vs last 30 days</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'Completed', value: '980', color: 'text-green-600' },
                  { label: 'In Progress', value: '168', color: 'text-blue-600' },
                  { label: 'Scheduled', value: '70', color: 'text-orange-600' },
                  { label: 'Cancelled', value: '30', color: 'text-red-600' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] text-gray-500">{item.label}</div>
                    <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-12 gap-4">
            {/* Recent Service Requests */}
            <div className="col-span-5 bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Recent Service Requests</h3>
                <button className="text-xs text-blue-600 font-semibold hover:underline">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase pb-2">Request ID</th>
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase pb-2">Customer</th>
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase pb-2">Type</th>
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase pb-2">Status</th>
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRequests.map((req, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-3 text-xs text-gray-600 font-medium">{req.id}</td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${req.color}`}>
                            {req.initials}
                          </div>
                          <span className="text-xs text-gray-700">{req.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-gray-600">{req.type}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-semibold ${getStatusBadge(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-gray-500">{req.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Technicians */}
            <div className="col-span-4 bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Top Technicians</h3>
                <button className="text-xs text-blue-600 font-semibold hover:underline">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase pb-2">Technician</th>
                    <th className="text-right text-[10px] font-semibold text-gray-400 uppercase pb-2">Completed</th>
                    <th className="text-right text-[10px] font-semibold text-gray-400 uppercase pb-2">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {technicians.map((tech, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                            {tech.avatar}
                          </div>
                          <span className="text-xs text-gray-700 font-medium">{tech.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-xs text-gray-700 font-semibold">{tech.completed}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-700 font-semibold">{tech.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Revenue Breakdown */}
            <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Revenue Breakdown</h3>
                <button className="flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-lg text-xs text-gray-600">
                  <span>This Month</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="14" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="14"
                      strokeDasharray="158 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="14"
                      strokeDasharray="57 251" strokeDashoffset="-158" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="14"
                      strokeDasharray="31 251" strokeDashoffset="-215" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="14"
                      strokeDasharray="5 251" strokeDashoffset="-246" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-sm font-bold text-gray-900">৳24,85,600</div>
                    <div className="text-[9px] text-gray-500">TOTAL REVENUE</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Purifiers', value: '৳15,45,000', pct: '(62.2%)', color: 'bg-blue-500' },
                  { label: 'Replacement Kits', value: '5,65,000', pct: '(22.7%)', color: 'bg-cyan-500' },
                  { label: 'Services', value: '৳3,20,000', pct: '(12.9%)', color: 'bg-orange-500' },
                  { label: 'Others', value: '৳55,600', pct: '(2.2%)', color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">{item.value}</span>
                      <span className="text-gray-400 ml-1">{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-6 gap-4">
              {quickStats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-50' :
                    stat.color === 'cyan' ? 'bg-cyan-50' :
                    stat.color === 'pink' ? 'bg-pink-50' :
                    stat.color === 'purple' ? 'bg-purple-50' :
                    stat.color === 'orange' ? 'bg-orange-50' : 'bg-green-50'
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'cyan' ? 'text-cyan-600' :
                      stat.color === 'pink' ? 'text-pink-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      stat.color === 'orange' ? 'text-orange-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">{stat.title}</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                      {stat.change !== 'Online' && (
                        <span className={`text-[10px] font-semibold ${stat.up ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                          {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.change}
                        </span>
                      )}
                      {stat.change === 'Online' && (
                        <span className="text-[10px] font-semibold text-green-500 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}