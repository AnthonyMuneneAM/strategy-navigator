import { motion } from "framer-motion";
import { AlertCircle, Clock, DollarSign } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Slow, consultant-heavy delivery",
    description: "Traditional consulting reports take months to produce and rarely translate to executable outcomes.",
  },
  {
    icon: DollarSign,
    title: "High cost, unclear value",
    description: "Six-figure retainers with limited visibility into progress, deliverables, or business impact.",
  },
  {
    icon: AlertCircle,
    title: "Disconnected design and build",
    description: "Strategy documents become outdated the moment development begins, creating costly rework.",
  },
];

const ProblemSection = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            The Challenge
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            Traditional transformation is{" "}
            <span className="text-gradient-brand italic">broken</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <problem.icon size={20} className="text-red-600" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{problem.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
