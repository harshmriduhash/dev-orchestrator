import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { GitPullRequest, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  repo: string;
  status: 'pending' | 'planning' | 'coding' | 'reviewing' | 'completed' | 'failed';
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface IssuesListProps {
  issues: Issue[];
}

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-500/10 text-yellow-500' },
  planning: { label: 'Planning', icon: Loader2, color: 'bg-blue-500/10 text-blue-500' },
  coding: { label: 'Coding', icon: Loader2, color: 'bg-purple-500/10 text-purple-500' },
  reviewing: { label: 'Reviewing', icon: Loader2, color: 'bg-orange-500/10 text-orange-500' },
  completed: { label: 'Completed', icon: CheckCircle2, color: 'bg-green-500/10 text-green-500' },
  failed: { label: 'Failed', icon: XCircle, color: 'bg-red-500/10 text-red-500' },
};

const riskConfig = {
  low: 'bg-green-500/10 text-green-500 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  high: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const IssuesList = ({ issues }: IssuesListProps) => {
  if (issues.length === 0) {
    return (
      <div className="glass-card rounded-xl border border-border/50 p-8 text-center">
        <GitPullRequest className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No issues yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect a repository to start processing GitHub issues automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl border border-border/50 overflow-hidden">
      <div className="border-b border-border/50 px-6 py-4">
        <h3 className="font-semibold">Recent Issues</h3>
      </div>
      <div className="divide-y divide-border/50">
        {issues.map((issue, index) => {
          const StatusIcon = statusConfig[issue.status].icon;
          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${statusConfig[issue.status].color}`}>
                <StatusIcon className={`h-4 w-4 ${issue.status === 'planning' || issue.status === 'coding' || issue.status === 'reviewing' ? 'animate-spin' : ''}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{issue.title}</p>
                <p className="text-sm text-muted-foreground">{issue.repo}</p>
              </div>
              <Badge variant="outline" className={riskConfig[issue.riskLevel]}>
                {issue.riskLevel}
              </Badge>
              <span className="text-sm text-muted-foreground hidden sm:block">
                {issue.createdAt}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default IssuesList;
