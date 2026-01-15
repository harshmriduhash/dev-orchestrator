import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import IssuesList from '@/components/dashboard/IssuesList';
import ActivityChart from '@/components/dashboard/ActivityChart';
import { GitBranch, GitPullRequest, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { useRepos } from '@/hooks/useRepos';
import { useIssues, useIssueStats } from '@/hooks/useIssues';
import { usePRStats } from '@/hooks/usePullRequests';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const { data: repos, isLoading: reposLoading } = useRepos();
  const { data: issues, isLoading: issuesLoading } = useIssues();
  const { data: issueStats } = useIssueStats();
  const { data: prStats } = usePRStats();

  const formattedIssues = issues?.map(issue => ({
    id: issue.id,
    title: issue.issue_title,
    repo: issue.repo_name || 'Unknown',
    status: (issue.status as 'pending' | 'planning' | 'coding' | 'reviewing' | 'completed' | 'failed') || 'pending',
    riskLevel: (issue.risk_level as 'low' | 'medium' | 'high') || 'low',
    createdAt: formatDistanceToNow(new Date(issue.created_at), { addSuffix: true }),
  })) || [];

  const isLoading = reposLoading || issuesLoading;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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
            value={repos?.length || 0}
            change={repos?.length ? `${repos.filter(r => r.is_active).length} active` : 'None yet'}
            changeType="positive"
            icon={GitBranch}
            delay={0}
          />
          <StatsCard
            title="Issues Processed"
            value={issueStats?.total || 0}
            change={issueStats?.completed ? `${issueStats.completed} completed` : 'None yet'}
            changeType="positive"
            icon={GitPullRequest}
            delay={0.1}
          />
          <StatsCard
            title="PRs Created"
            value={prStats?.total || 0}
            change={prStats?.merged ? `${prStats.merged} merged` : 'None yet'}
            changeType="positive"
            icon={CheckCircle2}
            delay={0.2}
          />
          <StatsCard
            title="Pending Issues"
            value={issueStats?.pending || 0}
            change="Awaiting processing"
            changeType="neutral"
            icon={Clock}
            delay={0.3}
          />
        </div>

        {/* Charts and Issues */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ActivityChart />
          <IssuesList issues={formattedIssues} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;