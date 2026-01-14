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
import { GitBranch, Plus, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Repo {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  issuesProcessed: number;
}

const demoRepos: Repo[] = [
  { id: '1', name: 'acme/web-app', url: 'https://github.com/acme/web-app', isActive: true, issuesProcessed: 45 },
  { id: '2', name: 'acme/api-gateway', url: 'https://github.com/acme/api-gateway', isActive: true, issuesProcessed: 32 },
  { id: '3', name: 'acme/docs', url: 'https://github.com/acme/docs', isActive: false, issuesProcessed: 18 },
  { id: '4', name: 'acme/backend', url: 'https://github.com/acme/backend', isActive: true, issuesProcessed: 52 },
];

const Repositories = () => {
  const [repos, setRepos] = useState<Repo[]>(demoRepos);
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddRepo = () => {
    if (!newRepoUrl.includes('github.com')) {
      toast.error('Please enter a valid GitHub repository URL');
      return;
    }

    const repoName = newRepoUrl.replace('https://github.com/', '');
    const newRepo: Repo = {
      id: Date.now().toString(),
      name: repoName,
      url: newRepoUrl,
      isActive: true,
      issuesProcessed: 0,
    };

    setRepos([...repos, newRepo]);
    setNewRepoUrl('');
    setDialogOpen(false);
    toast.success('Repository connected successfully!');
  };

  const toggleRepo = (id: string) => {
    setRepos(repos.map(repo => 
      repo.id === id ? { ...repo, isActive: !repo.isActive } : repo
    ));
  };

  const deleteRepo = (id: string) => {
    setRepos(repos.filter(repo => repo.id !== id));
    toast.success('Repository disconnected');
  };

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
                <Button variant="hero" onClick={handleAddRepo}>
                  Connect
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Repos List */}
        <div className="grid gap-4">
          {repos.map((repo, index) => (
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
                    <h3 className="font-semibold truncate">{repo.name}</h3>
                    <Badge variant={repo.isActive ? 'default' : 'secondary'}>
                      {repo.isActive ? 'Active' : 'Paused'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {repo.issuesProcessed} issues processed
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${repo.id}`} className="text-sm text-muted-foreground">
                      Active
                    </Label>
                    <Switch
                      id={`active-${repo.id}`}
                      checked={repo.isActive}
                      onCheckedChange={() => toggleRepo(repo.id)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(repo.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteRepo(repo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {repos.length === 0 && (
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
