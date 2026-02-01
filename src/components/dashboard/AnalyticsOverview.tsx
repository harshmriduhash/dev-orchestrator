import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, GitPullRequest, Clock, Percent, GitBranch } from 'lucide-react';
import { useAnalyticsOverview } from '@/hooks/useAnalytics';

const AnalyticsOverview = () => {
  const { data, isLoading } = useAnalyticsOverview();

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 rounded-xl border border-border/50 bg-muted/20 animate-pulse" />
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Issues Processed',
      value: data.totalIssues,
      subtext: `${data.completedIssues} completed`,
      icon: TrendingUp,
      color: 'text-primary',
    },
    {
      label: 'Pull Requests Created',
      value: data.totalPRs,
      subtext: `${data.mergedPRs} merged`,
      icon: GitPullRequest,
      color: 'text-blue-500',
    },
    {
      label: 'Active Repositories',
      value: data.activeRepos,
      subtext: `${data.totalRepos} total`,
      icon: GitBranch,
      color: 'text-purple-500',
    },
    {
      label: 'Success Rate',
      value: `${data.successRate}%`,
      subtext: 'Issues resolved successfully',
      icon: Percent,
      color: 'text-green-500',
    },
    {
      label: 'Avg Processing Time',
      value: data.avgProcessingTime,
      subtext: 'Per issue',
      icon: Clock,
      color: 'text-orange-500',
    },
    {
      label: 'Completion Rate',
      value: data.completedIssues,
      subtext: `of ${data.totalIssues} issues`,
      icon: CheckCircle2,
      color: 'text-emerald-500',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass-card rounded-xl border border-border/50 p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.subtext}</p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;
