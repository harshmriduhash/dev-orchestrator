import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  GitBranch, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';

interface OnboardingModalProps {
  open: boolean;
  onComplete: () => void;
}

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to AgentFlow',
    description: 'Your AI-powered development assistant that automatically fixes GitHub issues and creates pull requests.',
    icon: Bot,
    features: [
      { icon: Zap, text: 'Autonomous issue resolution' },
      { icon: Shield, text: 'Human-in-the-loop review' },
      { icon: Clock, text: 'Save 40+ hours per week' },
    ],
  },
  {
    id: 'connect',
    title: 'Connect Your Repositories',
    description: 'Link your GitHub repositories to enable AI-powered automation. AgentFlow monitors issues and PRs in real-time.',
    icon: GitBranch,
    features: [
      { icon: CheckCircle2, text: 'One-click repository connection' },
      { icon: CheckCircle2, text: 'Automatic webhook setup' },
      { icon: CheckCircle2, text: 'Secure OAuth authentication' },
    ],
  },
  {
    id: 'workflow',
    title: 'How It Works',
    description: 'AgentFlow uses three specialized AI agents working together to deliver production-ready code.',
    icon: Sparkles,
    features: [
      { icon: Bot, text: 'Planner Agent analyzes issues' },
      { icon: Bot, text: 'Coder Agent writes solutions' },
      { icon: Bot, text: 'Reviewer Agent ensures quality' },
    ],
  },
  {
    id: 'ready',
    title: "You're All Set!",
    description: 'Start by connecting your first repository. AgentFlow will begin monitoring for issues automatically.',
    icon: CheckCircle2,
    features: [
      { icon: ArrowRight, text: 'Go to Repositories to connect' },
      { icon: ArrowRight, text: 'Label issues with "agentflow"' },
      { icon: ArrowRight, text: 'Watch PRs appear automatically' },
    ],
  },
];

const OnboardingModal = ({ open, onComplete }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-border/50 bg-background">
        <div className="p-6">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <button 
                onClick={handleSkip}
                className="hover:text-foreground transition-colors"
              >
                Skip tour
              </button>
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <StepIcon className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{step.title}</h2>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 pt-2">
                {step.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'w-6 bg-primary' 
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
