import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GitBranch, Plus, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { useRepos, useAddRepo, useToggleRepo, useDeleteRepo } from '@/hooks/useRepos';

const Repositories = () => {
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: repos, isLoading } = useRepos();
  const addRepo = useAddRepo();
  const toggleRepo = useToggleRepo();
  const deleteRepo = useDeleteRepo();

  const handleAddRepo = () => {
    if (!newRepoUrl.includes('github.com')) {
      return;
    }

    const repoName = newRepoUrl.replace('https://github.com/', '').replace('http://github.com/', '');
    addRepo.mutate(
      { repoName, repoUrl: newRepoUrl },
      {
        onSuccess: () => {
          setNewRepoUrl('');
          setDialogOpen(false);
        },
      }
    );
  };

  const handleToggle = (id: string, currentStatus: boolean | null) => {
    toggleRepo.mutate({ id, isActive: !currentStatus });
  };

  const handleDelete = (id: string) => {
    deleteRepo.mutate(id);
  };

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
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Repositories</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your connected GitHub repositories
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Connect Repository
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect a GitHub Repository</DialogTitle>
                <DialogDescription>
                  Enter the URL of the GitHub repository you want to connect.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="repoUrl">Repository URL</Label>
                  <Input
                    id="repoUrl"
                    placeholder="https://github.com/username/repo"
                    value={newRepoUrl}
                    onChange={(e) => setNewRepoUrl(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleAddRepo}
                  disabled={addRepo.isPending}
                >
                  {addRepo.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Connect'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Repos List */}
        <div className="grid gap-4">
          {repos?.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-card rounded-xl border border-border/50 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{repo.repo_name}</h3>
                    <Badge variant={repo.is_active ? 'default' : 'secondary'}>
                      {repo.is_active ? 'Active' : 'Paused'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connected {new Date(repo.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${repo.id}`} className="text-sm text-muted-foreground">
                      Active
                    </Label>
                    <Switch
                      id={`active-${repo.id}`}
                      checked={repo.is_active ?? false}
                      onCheckedChange={() => handleToggle(repo.id, repo.is_active)}
                      disabled={toggleRepo.isPending}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(repo.repo_url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(repo.id)}
                      disabled={deleteRepo.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {(!repos || repos.length === 0) && (
          <div className="glass-card rounded-xl border border-border/50 p-12 text-center">
            <GitBranch className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No repositories connected</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect your first GitHub repository to get started.
            </p>
            <Button variant="hero" className="mt-6" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Connect Repository
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Repositories;