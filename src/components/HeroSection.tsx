import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-20" />
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 bg-primary/10 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[400px] w-[400px] bg-accent/10 blur-[100px]" />

      <div className="container relative mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Now in Beta — Join the waitlist</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Ship Code with{" "}
            <span className="gradient-text">Autonomous</span>
            <br />
            AI Agents
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Transform GitHub issues into production-ready pull requests. 
            Our multi-agent system plans, codes, and validates — so you can focus on what matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto">
              <Github className="h-5 w-5" />
              View on GitHub
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Trusted by engineering teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["Vercel", "Stripe", "Linear", "Figma", "Notion"].map((company) => (
                <span key={company} className="font-mono text-sm font-medium tracking-wider">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="gradient-border rounded-2xl p-1">
            <div className="relative overflow-hidden rounded-xl bg-card">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-warning/60" />
                  <div className="h-3 w-3 rounded-full bg-success/60" />
                </div>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  agentflow — processing issue #142
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Planner Agent analyzing issue...</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>TaskSpec generated <span className="text-muted-foreground">— risk_level: low</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Coder Agent implementing changes...</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>3 files modified <span className="text-muted-foreground">— lint: pass, types: pass</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span className="text-primary">PR #287 opened</span>
                    <span className="text-muted-foreground">— Ready for review</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                    <span className="inline-block h-3 w-0.5 animate-pulse bg-primary" />
                    <span>Awaiting next issue...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -bottom-20 left-1/2 h-40 w-3/4 -translate-x-1/2 bg-primary/20 blur-[80px]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
