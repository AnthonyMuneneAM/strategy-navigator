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
      { label: "Diagnose AI", href: "/explore#diagnose" },
      { label: "Knowledge Centre", href: "/explore#knowledge" },
    ],
  },
  {
    category: "Design + Deploy",
    icon: Rocket,
    title: "Services Marketplace",
    description: "Browse architecture-backed transformation services across all four towers. From strategy to execution.",
    links: [
      { label: "Design Services", href: "/explore#design" },
      { label: "Deploy Services", href: "/explore#deploy" },
    ],
  },
  {
    category: "Drive",
    icon: HeartHandshake,
    title: "Support Services",
    description: "Ensure adoption, optimize outcomes, and drive continuous improvement with expert support.",
    links: [
      { label: "View Support Services", href: "/explore#drive" },
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
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-elevated hover:border-primary/20"
            >
              {/* Gradient accent on hover */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100" />
              
              {/* Icon badge */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm transition-transform group-hover:scale-105">
                  <card.icon size={24} className="text-primary" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  {card.category}
                </div>
              </div>
              
              <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                {card.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>

              <div className="flex flex-col gap-2.5">
                {card.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group/link flex items-center justify-between rounded-xl border border-border bg-accent/30 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-accent hover:shadow-sm"
                  >
                    <span className="transition-colors group-hover/link:text-primary">{link.label}</span>
                    <ArrowRight size={16} className="text-muted-foreground transition-all group-hover/link:translate-x-1 group-hover/link:text-primary" />
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
