import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>

          {/* Headline */}
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to <span className="gradient-text">Automate</span> Your
            <br />Development Workflow?
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            Join thousands of developers shipping faster with AI-powered automation. 
            Start your free trial today.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="xl">
              Schedule a Demo
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
