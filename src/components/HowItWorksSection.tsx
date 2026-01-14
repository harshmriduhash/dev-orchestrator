import { ArrowDown, FileCode2, GitBranch, CheckCircle2, AlertCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Issue Created",
    description: "A new GitHub issue is created in your repository",
    icon: FileCode2,
    code: `{
  "title": "Add user auth",
  "body": "Implement OAuth login..."
}`,
  },
  {
    step: "02",
    title: "Planner Analyzes",
    description: "Planner Agent breaks down the issue into a TaskSpec",
    icon: AlertCircle,
    code: `{
  "task_id": "issue-142",
  "risk_level": "medium",
  "affected_areas": ["auth/", "api/"],
  "acceptance_criteria": [...]
}`,
  },
  {
    step: "03",
    title: "Coder Implements",
    description: "Coder Agent generates minimal, safe code changes",
    icon: GitBranch,
    code: `+ import { OAuth } from '@auth/core'
+ 
+ export async function login(provider) {
+   return OAuth.signIn(provider)
+ }`,
  },
  {
    step: "04",
    title: "PR Ready",
    description: "Automated PR with all checks passing, ready for review",
    icon: CheckCircle2,
    code: `{
  "files_changed": 3,
  "lint_status": "pass",
  "typecheck_status": "pass",
  "pr_url": "github.com/.../287"
}`,
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From issue to pull request in four automated steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 md:left-1/2 md:block" />

          {steps.map((step, index) => (
            <div key={step.step} className="relative mb-16 last:mb-0">
              <div className={`flex flex-col gap-8 md:flex-row md:items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className={`inline-flex items-center gap-3 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <span className="font-mono text-sm text-primary">{step.step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Center Dot */}
                <div className="relative z-10 hidden h-4 w-4 shrink-0 rounded-full bg-primary shadow-lg shadow-primary/50 md:block" />

                {/* Code Block */}
                <div className="flex-1">
                  <div className="glass-card overflow-hidden rounded-lg">
                    <div className="border-b border-border bg-secondary/30 px-4 py-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {index === 2 ? "changes.diff" : "output.json"}
                      </span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
                      <code className={index === 2 ? "text-success" : "text-foreground/80"}>
                        {step.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="my-8 flex justify-center md:hidden">
                  <ArrowDown className="h-6 w-6 text-primary/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
