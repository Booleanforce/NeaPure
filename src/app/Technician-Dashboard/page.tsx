"use client";

import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import StatCard from './components/cards/StatCard';
import ScheduleTable from './components/tables/ScheduleTable';
import CurrentJobCard from './components/cards/CurrentJobCard';
import JobStatisticsChart from './components/charts/JobStatisticsChart';
import QuickActions from './components/charts/QuickActions';
import TaskSummaryCard from './components/cards/TaskSummaryCard';
import ToolsCard from './components/cards/ToolsCard';
import SupportCard from './components/cards/SupportCard';
import UploadPhotos from './components/common/UploadPhotos';
import RecentJobsTable from './components/tables/RecentJobsTable';
import EarningsSummaryCard from './components/cards/EarningsSummaryCard';

export default function TechnicianDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header />
        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              label="Today's Schedule"
              value="5"
              sublabel="Appointments"
              icon="calendar"
              color="blue"
              linkText="View Schedule"
            />
            <StatCard
              label="Completed Today"
              value="3"
              sublabel="Jobs Completed"
              icon="check"
              color="green"
              linkText="View History"
            />
            <StatCard
              label="Pending Jobs"
              value="2"
              sublabel="Appointments"
              icon="clock"
              color="orange"
              linkText="View Pending"
            />
            <StatCard
              label="Total Earnings"
              value="৳1,850"
              sublabel="This Month"
              icon="wallet"
              color="purple"
              linkText="View Earnings"
            />
          </div>

          {/* Schedule & Current Job Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <ScheduleTable />
            </div>
            <div className="col-span-4">
              <CurrentJobCard />
            </div>
          </div>

          {/* Stats, Actions & Summary Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <JobStatisticsChart />
            </div>
            <div className="col-span-4">
              <QuickActions />
            </div>
            <div className="col-span-4">
              <TaskSummaryCard />
            </div>
          </div>

          {/* Tools, Support & Photos Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <ToolsCard />
            </div>
            <div className="col-span-4">
              <SupportCard />
            </div>
            <div className="col-span-4">
              <UploadPhotos />
            </div>
          </div>

          {/* Recent Jobs & Earnings Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <RecentJobsTable />
            </div>
            <div className="col-span-4">
              <EarningsSummaryCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}