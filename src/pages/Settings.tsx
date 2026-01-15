import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { User, Bell, Shield, Key, Loader2 } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { data: profileData, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    company: '',
  });

  const [notifications, setNotifications] = useState({
    emailOnComplete: true,
    emailOnFail: true,
    slackIntegration: false,
    weeklyDigest: true,
  });

  useEffect(() => {
    if (profileData) {
      setProfile({
        fullName: profileData.full_name || '',
        email: user?.email || '',
        company: profileData.company || '',
      });
    } else if (user) {
      setProfile({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        company: '',
      });
    }
  }, [profileData, user]);

  const handleProfileUpdate = async () => {
    updateProfile.mutate({
      full_name: profile.fullName,
      company: profile.company,
    });
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
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="glass-card border border-border/50">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Key className="h-4 w-4" />
              API
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl border border-border/50 p-6 space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your personal details
                </p>
              </div>
              
              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  variant="hero" 
                  onClick={handleProfileUpdate} 
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl border border-border/50 p-6 space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how you receive updates
                </p>
              </div>
              
              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email on Completion</p>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when a PR is created successfully
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailOnComplete}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, emailOnComplete: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email on Failure</p>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when an issue fails to process
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailOnFail}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, emailOnFail: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">
                      Get a weekly summary of your pipeline activity
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weeklyDigest: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Slack Integration</p>
                    <p className="text-sm text-muted-foreground">
                      Connect Slack for real-time notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.slackIntegration}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, slackIntegration: checked })
                    }
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl border border-border/50 p-6 space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold">Security Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account security
                </p>
              </div>
              
              <Separator />

              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-2" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="hero">Update Password</Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl border border-border/50 p-6 space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold">API Keys</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your API keys for programmatic access
                </p>
              </div>
              
              <Separator />

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium font-mono text-sm">sk-agent-****-****-****-1234</p>
                      <p className="text-xs text-muted-foreground mt-1">Created: Jan 10, 2026</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="hero">
                  <Key className="mr-2 h-4 w-4" />
                  Generate New Key
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;