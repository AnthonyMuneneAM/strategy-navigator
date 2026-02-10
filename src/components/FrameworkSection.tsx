import { motion } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discern",
    description: "Identify organisational context, assess capabilities, uncover gaps and risks, and translate real problems into transformation signals.",
    color: "from-brand to-brand-glow",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Convert insights into structured digital strategies, architectures, and actionable blueprints ready for execution.",
    color: "from-brand to-brand-glow",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Execute transformation initiatives using predefined blueprints with built-in delivery tracking, governance, and transparency.",
    color: "from-brand to-brand-glow",
  },
  {
    icon: TrendingUp,
    title: "Drive",
    description: "Enable adoption, optimise outcomes, measure performance, and support continuous improvement cycles.",
    color: "from-brand to-brand-glow",
  },
];

const FrameworkSection = () => {
  return (
    <section id="framework" className="bg-background py-24 lg:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-border bg-accent px-4 py-1.5 font-body text-xs font-medium text-muted-foreground">
            The 4D Framework
          </span>
          <h2 className="font-display text-3xl text-foreground md:text-5xl">
            From problem to <span className="text-gradient-brand italic">performance</span>
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            A structured, end-to-end transformation lifecycle that connects strategy directly to measurable outcomes.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="mb-1 font-body text-xs font-bold tracking-widest text-muted-foreground/50">
                0{i + 1}
              </div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
                <step.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-display text-2xl text-foreground">{step.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.description}</p>

              {i < 3 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-border lg:block">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;
