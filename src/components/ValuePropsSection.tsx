import { motion } from "framer-motion";
import { Zap, Shield, DollarSign, Layers, Brain, BarChart3 } from "lucide-react";

const props = [
  {
    icon: Brain,
    title: "Architecture-Led",
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
    description: "No six-figure consulting retainers. Enterprise transformation at a fraction of the cost.",
  },
  {
    icon: Layers,
    title: "Modular Delivery",
    description: "Pick what you need. Every service is scoped, measurable, and independently deployable.",
  },
  {
    icon: Shield,
    title: "Built-In Governance",
    description: "Delivery tracking, risk management, and compliance baked into every blueprint.",
  },
  {
    icon: BarChart3,
    title: "Strategy-to-Execution",
    description: "Direct traceability from strategic intent through architecture to live metrics.",
  },
];

const ValuePropsSection = () => {
  return (
    <section className="bg-accent/40 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-3xl text-foreground md:text-5xl">
            Why <span className="text-gradient-brand italic">TMaaS</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            A fundamentally different approach to digital transformation.
          </p>
        </motion.div>

        {/* Card with 3 cols separated by dashed lines — like reference screenshot 3 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-card md:p-12"
        >
          <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-dashed md:divide-border">
            {props.slice(0, 3).map((prop) => (
              <div key={prop.title} className="px-6 text-center first:pl-0 last:pr-0 md:px-8">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent">
                  <prop.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-serif text-lg italic text-foreground">{prop.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{prop.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl border border-border bg-card p-8 shadow-card md:p-12"
        >
          <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-dashed md:divide-border">
            {props.slice(3, 6).map((prop) => (
              <div key={prop.title} className="px-6 text-center first:pl-0 last:pr-0 md:px-8">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent">
                  <prop.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-serif text-lg italic text-foreground">{prop.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{prop.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
