import { motion } from "framer-motion";
import { Globe, Users, Database, ShieldCheck } from "lucide-react";

const towers = [
  {
    icon: Globe,
    title: "Digital Experience",
    subtitle: "Customer journeys & channels",
    description: "Transform how customers interact with your organisation across every digital touchpoint.",
    examples: ["Customer onboarding", "Omnichannel", "Service portals", "Digital marketing"],
  },
  {
    icon: Users,
    title: "Digital Workspace",
    subtitle: "Internal tools & productivity",
    description: "Modernise how your teams work with intelligent platforms, governance, and collaboration tools.",
    examples: ["Intranet & collaboration", "GPRC & compliance", "Core business systems", "Backoffice support"],
  },
  {
    icon: Database,
    title: "Data & Intelligence",
    subtitle: "Analytics, AI & decisions",
    description: "Unlock the value of your data with modern analytics, AI capabilities, and decision intelligence.",
    examples: ["Data platforms", "Business intelligence", "AI/ML", "Data governance"],
  },
  {
    icon: ShieldCheck,
    title: "SecDevOps",
    subtitle: "Security & platform engineering",
    description: "Build secure, scalable, and automated foundations for continuous delivery and operations.",
    examples: ["Security posture", "DevOps maturity", "Platform engineering", "Automation"],
  },
];

const TowersSection = () => {
  return (
    <section id="solutions" className="bg-gradient-to-b from-background to-accent/30 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Transformation Coverage
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">
            Four execution <span className="text-gradient-brand italic">streams</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Comprehensive coverage across every dimension of your organisation's digital landscape.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {towers.map((tower, i) => (
            <motion.div
              key={tower.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
                  <tower.icon size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{tower.title}</h3>
                  <p className="text-xs font-medium text-primary">{tower.subtitle}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tower.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tower.examples.map((ex) => (
                  <span key={ex} className="rounded-full border border-border bg-accent px-3 py-1 text-xs text-muted-foreground">
                    {ex}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TowersSection;
