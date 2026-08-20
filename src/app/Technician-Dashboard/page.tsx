"use client";

import { useTechnician } from "./context/TechnicianContext";

import StatCard from "./components/cards/StatCard";
import ScheduleTable from "./components/tables/ScheduleTable";
import CurrentJobCard from "./components/cards/CurrentJobCard";
import JobStatisticsChart from "./components/charts/JobStatisticsChart";
import QuickActions from "./components/charts/QuickActions";
import TaskSummaryCard from "./components/cards/TaskSummaryCard";
import ToolsCard from "./components/cards/ToolsCard";
import SupportCard from "./components/cards/SupportCard";
import UploadPhotos from "./components/common/UploadPhotos";
import RecentJobsTable from "./components/tables/RecentJobsTable";
import EarningsSummaryCard from "./components/cards/EarningsSummaryCard";

export default function TechnicianDashboardPage() {
  const { language } =
    useTechnician();

  const isBangla =
    language === "Bangla";

  return (
    <div className="space-y-6">

      {/* =========================================================
          STATS
      ========================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          label={
            isBangla
              ? "আজকের সময়সূচি"
              : "Today's Schedule"
          }
          value="5"
          sublabel={
            isBangla
              ? "অ্যাপয়েন্টমেন্ট"
              : "Appointments"
          }
          icon="calendar"
          color="blue"
          linkText={
            isBangla
              ? "সময়সূচি দেখুন"
              : "View Schedule"
          }
        />

        <StatCard
          label={
            isBangla
              ? "আজ সম্পন্ন"
              : "Completed Today"
          }
          value="3"
          sublabel={
            isBangla
              ? "কাজ সম্পন্ন"
              : "Jobs Completed"
          }
          icon="check"
          color="green"
          linkText={
            isBangla
              ? "ইতিহাস দেখুন"
              : "View History"
          }
        />

        <StatCard
          label={
            isBangla
              ? "অপেক্ষমাণ কাজ"
              : "Pending Jobs"
          }
          value="2"
          sublabel={
            isBangla
              ? "অ্যাপয়েন্টমেন্ট"
              : "Appointments"
          }
          icon="clock"
          color="orange"
          linkText={
            isBangla
              ? "অপেক্ষমাণ দেখুন"
              : "View Pending"
          }
        />

        <StatCard
          label={
            isBangla
              ? "মোট আয়"
              : "Total Earnings"
          }
          value="৳1,850"
          sublabel={
            isBangla
              ? "এই মাস"
              : "This Month"
          }
          icon="wallet"
          color="purple"
          linkText={
            isBangla
              ? "আয় দেখুন"
              : "View Earnings"
          }
        />

      </div>

      {/* =========================================================
          SCHEDULE + CURRENT JOB
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

        <div className="min-w-0 xl:col-span-8">
          <ScheduleTable />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <CurrentJobCard />
        </div>

      </div>

      {/* =========================================================
          STATISTICS + QUICK ACTIONS + TASK SUMMARY
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

        <div className="min-w-0 xl:col-span-4">
          <JobStatisticsChart />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <QuickActions />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <TaskSummaryCard />
        </div>

      </div>

      {/* =========================================================
          TOOLS + SUPPORT + UPLOAD
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

        <div className="min-w-0 xl:col-span-4">
          <ToolsCard />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <SupportCard />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <UploadPhotos />
        </div>

      </div>

      {/* =========================================================
          RECENT JOBS + EARNINGS
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

        <div className="min-w-0 xl:col-span-8">
          <RecentJobsTable />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <EarningsSummaryCard />
        </div>

      </div>

    </div>
  );
}