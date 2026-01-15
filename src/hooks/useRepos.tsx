import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Repo {
  id: string;
  repo_name: string;
  repo_url: string;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useRepos = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['repos', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('github_repos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Repo[];
    },
    enabled: !!user,
  });
};

export const useAddRepo = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ repoName, repoUrl }: { repoName: string; repoUrl: string }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('github_repos')
        .insert({
          user_id: user.id,
          repo_name: repoName,
          repo_url: repoUrl,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      toast.success('Repository connected successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to connect repository');
    },
  });
};

export const useToggleRepo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('github_repos')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repos'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update repository');
    },
  });
};

export const useDeleteRepo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('github_repos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      toast.success('Repository disconnected');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete repository');
    },
  });
};