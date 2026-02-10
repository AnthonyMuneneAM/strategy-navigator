import { motion } from "framer-motion";
import { Zap, Shield, DollarSign, Layers, Brain, BarChart3 } from "lucide-react";

const props = [
  {
    icon: Brain,
    title: "Architecture-Led, Not Slideware",
    description: "Every recommendation is grounded in enterprise architecture, not PowerPoint decks.",
  },
  {
    icon: Zap,
    title: "Faster Time-to-Impact",
    description: "Pre-built blueprints and AI guidance compress months of planning into days.",
  },
  {
    icon: DollarSign,
    title: "Lower Barrier to Entry",
    description: "No six-figure consulting retainers. Access enterprise transformation at a fraction of the cost.",
  },
  {
    icon: Layers,
    title: "Modular & Outcome-Driven",
    description: "Pick what you need. Every service is scoped, measurable, and independently deployable.",
  },
  {
    icon: Shield,
    title: "Built-In Governance",
    description: "Delivery tracking, risk management, and compliance baked into every blueprint.",
  },
  {
    icon: BarChart3,
    title: "Strategy-to-Execution Link",
    description: "Direct traceability from strategic intent through architecture to live performance metrics.",
  },
];

const ValuePropsSection = () => {
  return (
    <section className="bg-accent/50 py-24 lg:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl text-foreground md:text-5xl">
            Why <span className="text-gradient-brand italic">TMaaS</span>
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            A fundamentally different approach to digital transformation.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {props.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <prop.icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground">{prop.title}</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{prop.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
