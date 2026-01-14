import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import IssuesList from '@/components/dashboard/IssuesList';
import ActivityChart from '@/components/dashboard/ActivityChart';
import { GitBranch, GitPullRequest, CheckCircle2, Clock } from 'lucide-react';

// Demo data for the dashboard
const demoIssues = [
  {
    id: '1',
    title: 'Add user authentication flow',
    repo: 'acme/web-app',
    status: 'completed' as const,
    riskLevel: 'medium' as const,
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Fix API rate limiting bug',
    repo: 'acme/api-gateway',
    status: 'coding' as const,
    riskLevel: 'high' as const,
    createdAt: '3 hours ago',
  },
  {
    id: '3',
    title: 'Update README documentation',
    repo: 'acme/docs',
    status: 'reviewing' as const,
    riskLevel: 'low' as const,
    createdAt: '5 hours ago',
  },
  {
    id: '4',
    title: 'Implement dark mode toggle',
    repo: 'acme/web-app',
    status: 'planning' as const,
    riskLevel: 'low' as const,
    createdAt: '6 hours ago',
  },
  {
    id: '5',
    title: 'Refactor database queries',
    repo: 'acme/backend',
    status: 'pending' as const,
    riskLevel: 'medium' as const,
    createdAt: '8 hours ago',
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor your automated DevOps pipeline
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Connected Repos"
            value={12}
            change="+2 this week"
            changeType="positive"
            icon={GitBranch}
            delay={0}
          />
          <StatsCard
            title="Issues Processed"
            value={147}
            change="+23% vs last week"
            changeType="positive"
            icon={GitPullRequest}
            delay={0.1}
          />
          <StatsCard
            title="PRs Created"
            value={132}
            change="89% success rate"
            changeType="positive"
            icon={CheckCircle2}
            delay={0.2}
          />
          <StatsCard
            title="Avg. Processing Time"
            value="4.2m"
            change="-12% improvement"
            changeType="positive"
            icon={Clock}
            delay={0.3}
          />
        </div>

        {/* Charts and Issues */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ActivityChart />
          <IssuesList issues={demoIssues} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
