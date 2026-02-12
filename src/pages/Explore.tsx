import { motion } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp, Brain, BookOpen, HelpCircle, Layers, Cloud, Server, Cog, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const marketplaces = [
  {
    phase: "Discern",
    icon: Search,
    description: "Identify context, assess capabilities, and translate problems into transformation signals.",
    color: "bg-blue-500/10",
    iconColor: "text-blue-600",
    hoverColor: "group-hover:bg-blue-500/5",
    items: [
      {
        icon: Brain,
        name: "Diagnose AI",
        description: "AI-powered problem resolution and service recommendations",
        href: "#diagnose",
        badge: "AI-Powered",
        comingSoon: false,
      },
      {
        icon: BookOpen,
        name: "TMaaS Knowledge Centre",
        description: "Best practices, guides, and transformation resources",
        href: "/knowledge",
        badge: "Resources",
        comingSoon: false,
      },
      {
        icon: HelpCircle,
        name: "TMaaS FAQs",
        description: "Common questions and answers about transformation services",
        href: "/faqs",
        badge: "Support",
        comingSoon: false,
      },
    ],
  },
  {
    phase: "Design",
    icon: PenTool,
    description: "Convert insights into structured strategies, architectures, and actionable blueprints.",
    color: "bg-purple-500/10",
    iconColor: "text-purple-600",
    hoverColor: "group-hover:bg-purple-500/5",
    items: [
      {
        icon: Layers,
        name: "Design Services",
        description: "Strategic architecture and transformation blueprints",
        href: "/marketplace?tab=design",
        badge: "Architecture",
        comingSoon: false,
      },
    ],
  },
  {
    phase: "Deploy",
    icon: Rocket,
    description: "Execute initiatives using predefined blueprints with built-in tracking and governance.",
    color: "bg-primary/10",
    iconColor: "text-primary",
    hoverColor: "group-hover:bg-primary/5",
    items: [
      {
        icon: Cloud,
        name: "SaaS Deploy Services",
        description: "Cloud-based implementation services",
        href: "/marketplace?tab=deploy-saas",
        badge: "Cloud",
        comingSoon: false,
      },
      {
        icon: Server,
        name: "On-Prem Deploy Services",
        description: "On-premise deployment and implementation",
        href: "/marketplace?tab=deploy-onprem",
        badge: "On-Premise",
        comingSoon: true,
      },
    ],
  },
  {
    phase: "Drive",
    icon: TrendingUp,
    description: "Enable adoption, optimize outcomes, and support continuous improvement.",
    color: "bg-green-500/10",
    iconColor: "text-green-600",
    hoverColor: "group-hover:bg-green-500/5",
    items: [
      {
        icon: Cog,
        name: "Managed Platform Services",
        description: "Ongoing platform management and optimization",
        href: "/drive/managed-services",
        badge: "Managed",
        comingSoon: true,
      },
      {
        icon: Briefcase,
        name: "BPaaS Services",
        description: "Business Process as a Service solutions",
        href: "/drive/bpaas",
        badge: "BPaaS",
        comingSoon: true,
      },
      {
        icon: Sparkles,
        name: "AI Agents",
        description: "Intelligent automation and AI-powered agents",
        href: "/drive/ai-agents",
        badge: "AI",
        comingSoon: true,
      },
    ],
  },
];

const Explore = () => {
  const handleDiagnoseClick = () => {
    // Trigger the chat button
    const event = new CustomEvent('openDiagnoseAI');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/60 to-accent/40 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Explore TMaaS <span className="text-gradient-brand italic">Marketplaces</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Access our full range of transformation services, resources, and AI-powered tools organized across
              the 4D Framework. From problem diagnosis to continuous optimization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marketplaces Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-16">
            {marketplaces.map((phase, phaseIndex) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: phaseIndex * 0.1 }}
              >
                {/* Phase Header */}
                <div className="mb-8 flex items-start gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${phase.color}`}>
                    <phase.icon size={24} className={phase.iconColor} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                      {phaseIndex + 1}. {phase.phase}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Marketplace Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {phase.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: phaseIndex * 0.1 + itemIndex * 0.05 }}
                      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card ${
                        item.comingSoon ? "opacity-75" : "transition-all hover:shadow-elevated"
                      }`}
                    >
                      {item.comingSoon ? (
                        <>
                          {/* Badge */}
                          <div className="mb-4 flex items-center justify-between">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${phase.color}`}>
                              <item.icon size={20} className={phase.iconColor} />
                            </div>
                            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-muted-foreground">
                              {item.badge}
                            </span>
                          </div>

                          {/* Content */}
                          <h3 className="mb-2 text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>

                          {/* Coming Soon Badge */}
                          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
                            Coming Soon
                          </div>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            if (item.name === "Diagnose AI") {
                              e.preventDefault();
                              handleDiagnoseClick();
                            }
                          }}
                          className="block"
                        >
                          {/* Badge */}
                          <div className="mb-4 flex items-center justify-between">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${phase.color}`}>
                              <item.icon size={20} className={phase.iconColor} />
                            </div>
                            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-muted-foreground">
                              {item.badge}
                            </span>
                          </div>

                          {/* Content */}
                          <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>

                          {/* Arrow */}
                          <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <span>Explore</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </div>

                          {/* Hover Effect */}
                          <div className={`absolute inset-0 -z-10 rounded-2xl transition-all ${phase.hoverColor}`}></div>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-accent/60 to-accent/40 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Use our AI-powered Diagnose tool to identify the right services for your transformation needs.
          </p>
          <button
            onClick={handleDiagnoseClick}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3 text-base font-medium text-primary-foreground shadow-brand transition-opacity hover:opacity-90"
          >
            <Brain size={20} />
            Start with Diagnose AI
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;
