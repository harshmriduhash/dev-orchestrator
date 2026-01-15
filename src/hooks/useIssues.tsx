import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Issue {
  id: string;
  issue_title: string;
  issue_body: string | null;
  issue_number: number;
  status: string;
  risk_level: string | null;
  created_at: string;
  updated_at: string;
  repo_id: string;
  user_id: string;
  repo_name?: string;
}

export const useIssues = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['issues', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('issues')
        .select(`
          *,
          github_repos (
            repo_name
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      return data.map(issue => ({
        ...issue,
        repo_name: issue.github_repos?.repo_name || 'Unknown',
      })) as (Issue & { github_repos?: { repo_name: string } })[];
    },
    enabled: !!user,
  });
};

export const useIssueStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['issue-stats', user?.id],
    queryFn: async () => {
      if (!user) return { total: 0, completed: 0, pending: 0 };
      
      const { data, error } = await supabase
        .from('issues')
        .select('status')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const total = data.length;
      const completed = data.filter(i => i.status === 'completed').length;
      const pending = data.filter(i => i.status === 'pending').length;
      
      return { total, completed, pending };
    },
    enabled: !!user,
  });
};