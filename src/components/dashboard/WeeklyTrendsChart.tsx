import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useWeeklyTrends } from '@/hooks/useAnalytics';

const chartConfig = {
  issues: {
    label: 'Issues',
    color: 'hsl(var(--primary))',
  },
  prs: {
    label: 'Pull Requests',
    color: 'hsl(142, 70%, 45%)',
  },
};

const WeeklyTrendsChart = () => {
  const { data, isLoading } = useWeeklyTrends();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl border border-border/50 p-6"
      >
        <div className="h-[300px] animate-pulse bg-muted/20 rounded-lg" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="glass-card rounded-xl border border-border/50 p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Weekly Trends (Last 8 Weeks)</h3>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={data || []}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
          <XAxis 
            dataKey="week" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar 
            dataKey="issues" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="prs" 
            fill="hsl(142, 70%, 45%)" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </motion.div>
  );
};

export default WeeklyTrendsChart;
