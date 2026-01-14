import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle2, Loader2, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollAnimation from './ScrollAnimation';

const steps = [
  {
    id: 1,
    title: 'Issue Created',
    description: 'New GitHub issue detected',
    code: `{
  "issue": {
    "title": "Add dark mode toggle",
    "body": "Users want dark mode",
    "labels": ["feature"]
  }
}`,
  },
  {
    id: 2,
    title: 'Planner Agent',
    description: 'Analyzing requirements...',
    code: `{
  "task_id": "issue-123",
  "risk_level": "low",
  "affected_areas": ["ui/theme"],
  "acceptance_criteria": [
    "Toggle button in header",
    "Persist preference"
  ]
}`,
  },
  {
    id: 3,
    title: 'Coder Agent',
    description: 'Generating code changes...',
    code: `diff --git a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -1,4 +1,5 @@
+import { ThemeToggle } from './ThemeToggle'
 
 export const Header = () => (
   <header>
+    <ThemeToggle />
   </header>
 )`,
  },
  {
    id: 4,
    title: 'PR Created',
    description: 'Pull request opened',
    code: `{
  "pr_number": 42,
  "title": "feat: Add dark mode toggle",
  "files_changed": 3,
  "additions": 45,
  "deletions": 2,
  "status": "ready_for_review"
}`,
  },
];

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= steps.length) {
      setIsPlaying(false);
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    if (isComplete) {
      setCurrentStep(0);
      setIsComplete(false);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setIsComplete(false);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Interactive Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See it in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Watch how AgentFlow processes a GitHub issue and creates a pull request automatically.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="max-w-5xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${index < currentStep 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : index === currentStep && isPlaying
                        ? 'border-primary text-primary animate-pulse'
                        : 'border-border text-muted-foreground'
                    }
                  `}>
                    {index < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : index === currentStep && isPlaying ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 sm:w-24 lg:w-32 h-0.5 mx-2 transition-all duration-500
                      ${index < currentStep ? 'bg-primary' : 'bg-border'}
                    `} />
                  )}
                </div>
              ))}
            </div>

            {/* Demo Panel */}
            <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
              {/* Controls */}
              <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground ml-4">AgentFlow Demo</span>
                </div>
                <div className="flex items-center gap-2">
                  {isPlaying ? (
                    <Button variant="outline" size="sm" onClick={handlePause}>
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="hero" size="sm" onClick={handlePlay}>
                      <Play className="h-4 w-4 mr-1" />
                      {isComplete ? 'Replay' : 'Start Demo'}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                {/* Steps Panel */}
                <div className="p-6 space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Pipeline Status
                  </h3>
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={false}
                      animate={{
                        opacity: index <= currentStep ? 1 : 0.4,
                        scale: index === currentStep - 1 || (index === currentStep && isPlaying) ? 1.02 : 1,
                      }}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg transition-colors
                        ${index === currentStep - 1 || (index === currentStep && isPlaying)
                          ? 'bg-primary/10 border border-primary/20'
                          : ''
                        }
                      `}
                    >
                      <div className={`
                        mt-0.5 flex h-6 w-6 items-center justify-center rounded-full
                        ${index < currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : index === currentStep && isPlaying
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        {index < currentStep ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : index === currentStep && isPlaying ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <GitPullRequest className="h-3 w-3" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Code Panel */}
                <div className="p-6 bg-muted/30">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    Agent Output
                  </h3>
                  <div className="h-[320px] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      {currentStep > 0 && currentStep <= steps.length && (
                        <motion.pre
                          key={currentStep}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="font-mono text-xs text-muted-foreground whitespace-pre-wrap"
                        >
                          <code>{steps[currentStep - 1]?.code}</code>
                        </motion.pre>
                      )}
                      {currentStep === 0 && !isPlaying && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center h-full text-muted-foreground"
                        >
                          <Play className="h-12 w-12 mb-4 opacity-50" />
                          <p>Click "Start Demo" to begin</p>
                        </motion.div>
                      )}
                      {isComplete && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center justify-center h-full text-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                          </div>
                          <p className="font-semibold text-lg">PR Created Successfully!</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            The entire process took 4.2 seconds
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default InteractiveDemo;
