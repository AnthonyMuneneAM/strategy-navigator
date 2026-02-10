import { motion } from "framer-motion";
import { Globe, Users, Database, ShieldCheck } from "lucide-react";

const towers = [
  {
    icon: Globe,
    title: "Digital Experience",
    subtitle: "Customer journeys & channels",
    description: "Transform how your customers interact with your organisation across every digital touchpoint.",
    examples: ["Customer onboarding", "Omnichannel orchestration", "Service portals", "Digital marketing"],
  },
  {
    icon: Users,
    title: "Digital Workspace",
    subtitle: "Internal tools & productivity",
    description: "Modernise the way your teams work with intelligent platforms, governance, and collaboration tools.",
    examples: ["Employee experience", "IT governance", "Productivity platforms", "Compliance & GRC"],
  },
  {
    icon: Database,
    title: "Data & Intelligence",
    subtitle: "Analytics, AI & decisions",
    description: "Unlock the value of your data with modern analytics, AI capabilities, and decision intelligence.",
    examples: ["Data platforms", "Business intelligence", "AI/ML adoption", "Data governance"],
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
    <section id="solutions" className="bg-background py-24 lg:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-border bg-accent px-4 py-1.5 font-body text-xs font-medium text-muted-foreground">
            Transformation Coverage
          </span>
          <h2 className="font-display text-3xl text-foreground md:text-5xl">
            Four pillars of <span className="text-gradient-brand italic">change</span>
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            Comprehensive coverage across every dimension of your organisation's digital landscape.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {towers.map((tower, i) => (
            <motion.div
              key={tower.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
                  <tower.icon size={22} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-foreground">{tower.title}</h3>
                  <p className="font-body text-xs font-medium text-primary">{tower.subtitle}</p>
                </div>
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">{tower.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tower.examples.map((ex) => (
                  <span key={ex} className="rounded-full border border-border bg-accent px-3 py-1 font-body text-xs text-muted-foreground">
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
