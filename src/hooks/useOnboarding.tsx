import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const ONBOARDING_KEY = 'agentflow_onboarding_completed';

export const useOnboarding = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Check localStorage first for quick response
      const localCompleted = localStorage.getItem(`${ONBOARDING_KEY}_${user.id}`);
      if (localCompleted === 'true') {
        setShowOnboarding(false);
        setIsLoading(false);
        return;
      }

      // Check if user has any repos (existing user)
      try {
        const { data: repos, error } = await supabase
          .from('github_repos')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);

        if (error) {
          console.error('Error checking repos:', error);
          setShowOnboarding(true);
        } else if (repos && repos.length > 0) {
          // Existing user with repos, skip onboarding
          localStorage.setItem(`${ONBOARDING_KEY}_${user.id}`, 'true');
          setShowOnboarding(false);
        } else {
          // New user, show onboarding
          setShowOnboarding(true);
        }
      } catch (err) {
        console.error('Error in onboarding check:', err);
        setShowOnboarding(true);
      }

      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, [user]);

  const completeOnboarding = () => {
    if (user) {
      localStorage.setItem(`${ONBOARDING_KEY}_${user.id}`, 'true');
    }
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    if (user) {
      localStorage.removeItem(`${ONBOARDING_KEY}_${user.id}`);
    }
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
};
