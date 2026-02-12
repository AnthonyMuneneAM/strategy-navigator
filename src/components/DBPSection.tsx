import { motion } from "framer-motion";
import { Globe, Users, Database, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    name: "Digital Experience",
    subtitle: "Customer journeys & channels",
    description: "Transform how customers interact with your organisation across every digital touchpoint.",
    examples: ["Customer onboarding", "Omnichannel", "Service portals", "Digital marketing"],
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    name: "Digital Workspace",
    subtitle: "Internal tools & productivity",
    description: "Modernise how your teams work with intelligent platforms, governance, and collaboration tools.",
    examples: ["Intranet & collaboration", "GPRC & compliance", "Core business systems", "Backoffice support"],
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Database,
    name: "Data & Intelligence",
    subtitle: "Analytics, AI & decisions",
    description: "Unlock the value of your data with modern analytics, AI capabilities, and decision intelligence.",
    examples: ["Data platforms", "Business intelligence", "AI/ML", "Data governance"],
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: ShieldCheck,
    name: "SecDevOps",
    subtitle: "Security & platform engineering",
    description: "Build secure, scalable, and automated foundations for continuous delivery and operations.",
    examples: ["Security posture", "DevOps maturity", "Platform engineering", "Automation"],
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
];

const DBPSection = () => {
  return (
    <section className="bg-gradient-to-b from-accent/30 to-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            The Foundation
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            The Digital Business{" "}
            <span className="text-gradient-brand italic">Platform</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A unifying architecture built as integrated service marketplaces that power the enterprise across
            external value, internal efficiency, and adaptive evolution.
          </p>
        </motion.div>

        {/* Canvas Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl border border-border bg-card p-20 shadow-card"
        >
          <img
            src="/dbp-canvas.png"
            alt="Digital Business Platform Canvas"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Four Execution Streams */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-foreground">Four execution streams</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Comprehensive coverage across every dimension of your organisation's digital landscape
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-7 shadow-card transition-shadow hover:shadow-elevated"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${pillar.bgColor}`}>
                    <pillar.icon size={20} className={pillar.color} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{pillar.name}</h3>
                    <p className="text-xs font-medium text-primary">{pillar.subtitle}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {pillar.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full border border-border bg-accent px-3 py-1 text-xs text-muted-foreground"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DBPSection;
