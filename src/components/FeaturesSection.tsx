import { Bot, Code2, GitPullRequest, Shield, Zap, Workflow } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Planner Agent",
    description: "Converts GitHub issues into structured execution plans with risk assessment and acceptance criteria.",
  },
  {
    icon: Code2,
    title: "Coder Agent",
    description: "Generates minimal, safe code changes that follow your repo conventions and pass all checks.",
  },
  {
    icon: GitPullRequest,
    title: "Auto PR Creation",
    description: "Automatically creates branches, commits changes, and opens pull requests ready for review.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Built-in validation with ESLint, TypeScript checks, and automatic rejection of unsafe changes.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "From issue to PR in minutes, not hours. Accelerate your development workflow dramatically.",
  },
  {
    icon: Workflow,
    title: "Sequential Execution",
    description: "Planner → Coder pipeline with automatic abort on errors. No broken code reaches your repo.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Two Agents. <span className="gradient-text">Infinite Power.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our autonomous system handles the heavy lifting while you maintain full control.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card group rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
