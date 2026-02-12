import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Award } from "lucide-react";

const outcomes = [
  {
    icon: Zap,
    metric: "50%",
    label: "Faster development time",
    description: "Blueprint-driven architecture accelerates delivery cycles",
  },
  {
    icon: DollarSign,
    metric: "40%",
    label: "Technology cost savings",
    description: "Reusable solutions and synchronized execution reduce waste",
  },
  {
    icon: Award,
    metric: "Higher",
    label: "Quality of implementation",
    description: "Reference architectures ensure best-practice compliance",
  },
  {
    icon: TrendingUp,
    metric: "Continuous",
    label: "Adaptive evolution",
    description: "Live specifications enable ongoing optimization",
  },
];

const OutcomesSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-light py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-brand blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-brand-glow blur-[100px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-navy-light px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-navy-foreground/60">
            Accelerated Outcomes
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy-foreground md:text-4xl">
            Measurable{" "}
            <span className="text-gradient-brand italic">impact</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-foreground/70">
            Through TMaaS, enterprises achieve measurable acceleration across every dimension of transformation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-navy-light bg-navy-light/30 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                <outcome.icon size={20} className="text-primary-foreground" />
              </div>
              <div className="mb-2 text-3xl font-bold text-navy-foreground">{outcome.metric}</div>
              <div className="mb-2 text-sm font-semibold text-navy-foreground">{outcome.label}</div>
              <p className="text-xs leading-relaxed text-navy-foreground/60">{outcome.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl border border-navy-light bg-navy-light/20 p-8 text-center backdrop-blur-sm"
        >
          <p className="text-lg italic leading-relaxed text-navy-foreground">
            "In the digital era, marketplaces are not platforms you launch—they are ecosystems you continuously
            design, govern, and evolve."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OutcomesSection;
