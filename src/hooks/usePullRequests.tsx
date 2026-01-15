import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface PullRequest {
  id: string;
  issue_id: string;
  pr_number: number | null;
  pr_url: string | null;
  status: string;
  files_changed: number | null;
  created_at: string;
  updated_at: string;
}

export const usePullRequests = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['pull-requests', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Get PRs for user's issues
      const { data, error } = await supabase
        .from('pull_requests')
        .select(`
          *,
          issues!inner (
            user_id
          )
        `)
        .eq('issues.user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as (PullRequest & { issues: { user_id: string } })[];
    },
    enabled: !!user,
  });
};

export const usePRStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['pr-stats', user?.id],
    queryFn: async () => {
      if (!user) return { total: 0, merged: 0, pending: 0 };
      
      const { data, error } = await supabase
        .from('pull_requests')
        .select(`
          status,
          issues!inner (
            user_id
          )
        `)
        .eq('issues.user_id', user.id);

      if (error) throw error;
      
      const total = data.length;
      const merged = data.filter(pr => pr.status === 'merged').length;
      const pending = data.filter(pr => pr.status === 'draft' || pr.status === 'open').length;
      
      return { total, merged, pending };
    },
    enabled: !!user,
  });
};