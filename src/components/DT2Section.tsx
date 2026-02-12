import { motion } from "framer-motion";
import { Zap, Layers, Sparkles, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Blueprint-Driven Design",
    description: "Proven frameworks and ready blueprints replace consultant reports with executable specifications.",
    benefits: ["Industry-standard specs", "Pre-defined templates", "Digital repository"],
  },
  {
    icon: Sparkles,
    title: "AI-Augmented Build",
    description: "Digital Twin outputs drive AI-accelerated builds based on proven marketplace platforms.",
    benefits: ["Proven platforms", "Accelerated delivery", "Reduced rework"],
  },
  {
    icon: RefreshCw,
    title: "Continuous Sync",
    description: "Design and build stay synchronized through continuous sense → design → transform cycles.",
    benefits: ["Live specifications", "Adaptive architecture", "Reduced ambiguity"],
  },
];

const DT2Section = () => {
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
            DT 2.0
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            Transformation{" "}
            <span className="text-gradient-brand italic">re-invented</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We've re-invented the technology acquisition lifecycle for the Digital and AI era. No more slideware—just
            executable, architecture-backed transformation.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Visual */}
              <div className="flex-1">
                <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                  <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                    <feature.icon size={64} className="text-primary" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                  <feature.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-foreground">{feature.title}</h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">{feature.description}</p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DT2Section;
