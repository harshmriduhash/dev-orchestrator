import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AnalyticsOverview from '@/components/dashboard/AnalyticsOverview';
import DailyActivityChart from '@/components/dashboard/DailyActivityChart';
import StatusPieChart from '@/components/dashboard/StatusPieChart';
import WeeklyTrendsChart from '@/components/dashboard/WeeklyTrendsChart';

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Track your automation performance and trends
          </p>
        </motion.div>

        {/* Overview Stats */}
        <AnalyticsOverview />

        {/* Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <DailyActivityChart />
          <StatusPieChart />
        </div>

        {/* Weekly Trends */}
        <WeeklyTrendsChart />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
