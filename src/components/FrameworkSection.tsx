import { motion } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discern",
    description: "Identify context, assess capabilities, uncover gaps, and translate real problems into transformation signals.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Convert insights into structured digital strategies, architectures, and actionable blueprints.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Execute initiatives using predefined blueprints with built-in tracking, governance, and transparency.",
  },
  {
    icon: TrendingUp,
    title: "Drive",
    description: "Enable adoption, optimise outcomes, measure performance, and support continuous improvement.",
  },
];

const FrameworkSection = () => {
  return (
    <section id="framework" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
            The 4D Framework
          </span>
          <h2 className="mt-4 font-serif text-3xl text-foreground md:text-5xl">
            From problem to{" "}
            <span className="text-gradient-brand italic">performance</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            A structured, end-to-end transformation lifecycle that connects
            strategy directly to measurable outcomes.
          </p>
        </motion.div>

        {/* Horizontal 3-col + 1 step layout like reference */}
        <div className="mt-20 grid gap-12 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
                <step.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl text-foreground">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;
