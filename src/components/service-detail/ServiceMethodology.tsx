import { motion } from "framer-motion";
import { BookOpen, Award, Building2, FolderSearch, Cpu, Globe, BarChart3, ShieldCheck } from "lucide-react";

const dimensions = [
  {
    icon: BookOpen,
    title: "Framework Reference",
    description: "Structured blueprints aligned with industry standards ensure architectural integrity and cohesion.",
  },
  {
    icon: Award,
    title: "Best Practices & Standards",
    description: "Incorporates proven global practices to ensure scalability and future readiness.",
  },
  {
    icon: Building2,
    title: "Client Context",
    description: "Tailors the design to the organisation's strategic objectives, maturity, and operational realities.",
  },
  {
    icon: FolderSearch,
    title: "Reference Case",
    description: "Leverages comparable implementations to validate decisions and optimise outcomes.",
  },
];

const pillars = [
  { icon: Globe, name: "Digital Experience" },
  { icon: Building2, name: "Digital Workspace" },
  { icon: BarChart3, name: "Digital Intelligence & Analytics" },
  { icon: ShieldCheck, name: "Digital SecDevOps" },
];

const ServiceMethodology = () => {
  return (
    <section className="bg-secondary py-20 text-secondary-foreground">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Methodology
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
            The Architecture-First Approach
          </h2>
        </motion.div>

        {/* DQ Design Method */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <h3 className="font-serif text-xl font-semibold">
            The DQ Design Method
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-foreground">
            Best practices, yet targeted designs. Our approach integrates four essential dimensions:
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {dimensions.map((dim, i) => (
              <motion.div
                key={dim.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-2xl border border-navy-light bg-navy-light/40 p-5"
              >
                <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                  <dim.icon size={18} />
                </div>
                <h4 className="text-sm font-semibold">{dim.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-foreground">
                  {dim.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DBP Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="font-serif text-xl font-semibold">
            Digital Business Platform Foundation
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-foreground">
            Digital Experience Strategy is anchored within the DQ Digital Business Platform (DBP), composed of four integrated pillars that operate as a unified architecture — enabling real-time insight, seamless workflows, and cross-functional orchestration.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.name}
                className="flex items-center gap-2 rounded-full border border-navy-light bg-navy-light/40 px-4 py-2 text-sm"
              >
                <pillar.icon size={14} className="text-primary" />
                {pillar.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI-Accelerated Blueprints */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-navy-light bg-navy-light/40 p-8"
        >
          <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
            <Cpu size={22} />
          </div>
          <h3 className="font-serif text-xl font-semibold">
            AI-Accelerated Blueprints
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-navy-foreground">
            DQ's AI-Accelerated Blueprints convert framework-driven platform designs into executable outputs. By combining structured architecture with AI-assisted prototyping and build acceleration, this approach:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Reduces time to market
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Lowers transformation cost
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Increases solution agility
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Produces validated, implementation-ready outputs
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceMethodology;
