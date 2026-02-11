import { motion } from "framer-motion";
import { Brain, BookOpen, Rocket, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const exploreCards = [
  {
    category: "Discern",
    icon: Brain,
    title: "Diagnose & Learn",
    description: "Use AI to identify transformation opportunities or explore our knowledge centre for best practices and guides.",
    links: [
      { label: "Diagnose AI", href: "/diagnose" },
      { label: "Knowledge Centre", href: "/knowledge" },
    ],
  },
  {
    category: "Design + Deploy",
    icon: Rocket,
    title: "Services Marketplace",
    description: "Browse architecture-backed transformation services across all four towers. From strategy to execution.",
    links: [
      { label: "Design Services", href: "/marketplace?type=design" },
      { label: "Deploy Services", href: "/marketplace?type=deploy" },
    ],
  },
  {
    category: "Drive",
    icon: HeartHandshake,
    title: "Support Services",
    description: "Ensure adoption, optimize outcomes, and drive continuous improvement with expert support.",
    links: [
      { label: "View Support Services", href: "/support" },
    ],
  },
];

const ExploreSection = () => {
  return (
    <section id="explore" className="bg-gradient-to-b from-accent/30 to-background py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Explore TMaaS
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">
            Explore TMaaS{" "}
            <span className="text-gradient-brand italic">marketplaces</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Whether you're diagnosing problems, browsing services, or seeking ongoing support—we've got you covered.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {exploreCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-xs font-medium text-primary">
                <card.icon size={14} />
                {card.category}
              </div>
              
              <h3 className="mt-4 text-xl font-semibold text-foreground">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>

              <div className="mt-6 flex flex-col gap-2">
                {card.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group/link flex items-center justify-between rounded-lg border border-border bg-accent/50 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} className="text-muted-foreground transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
