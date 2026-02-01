import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useDailyMetrics } from '@/hooks/useAnalytics';

const chartConfig = {
  issues: {
    label: 'Issues',
    color: 'hsl(var(--primary))',
  },
  prs: {
    label: 'Pull Requests',
    color: 'hsl(220, 70%, 50%)',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(142, 70%, 45%)',
  },
};

const DailyActivityChart = () => {
  const { data, isLoading } = useDailyMetrics();

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
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card rounded-xl border border-border/50 p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Daily Activity (Last 2 Weeks)</h3>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={data || []}>
          <defs>
            <linearGradient id="issuesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="prsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
          <XAxis 
            dataKey="date" 
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
          <Area
            type="monotone"
            dataKey="issues"
            stroke="hsl(var(--primary))"
            fill="url(#issuesGradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="prs"
            stroke="hsl(220, 70%, 50%)"
            fill="url(#prsGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </motion.div>
  );
};

export default DailyActivityChart;
