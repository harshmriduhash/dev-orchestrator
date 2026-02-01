import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useStatusBreakdown } from '@/hooks/useAnalytics';

const StatusPieChart = () => {
  const { data, isLoading } = useStatusBreakdown();

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

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card rounded-xl border border-border/50 p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Issue Status Breakdown</h3>
        <div className="h-[250px] flex items-center justify-center text-muted-foreground">
          No issues yet. Connect a repo to get started!
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card rounded-xl border border-border/50 p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Issue Status Breakdown</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="count"
              nameKey="status"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
                      <p className="font-medium">{data.status}</p>
                      <p className="text-sm text-muted-foreground">{data.count} issues</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StatusPieChart;
