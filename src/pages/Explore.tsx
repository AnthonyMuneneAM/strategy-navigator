import { useState, useEffect } from "react";
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
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [gradientIndex, setGradientIndex] = useState(0);

  // Subtle gradient variations using DQ brand colors
  const gradients = [
    'linear-gradient(135deg, hsl(11 96% 60% / 0.15), hsl(25 100% 62% / 0.12), hsl(200 80% 60% / 0.10))',
    'linear-gradient(135deg, hsl(25 100% 62% / 0.15), hsl(200 80% 60% / 0.12), hsl(220 70% 55% / 0.10))',
    'linear-gradient(135deg, hsl(200 80% 60% / 0.15), hsl(220 70% 55% / 0.12), hsl(11 96% 60% / 0.10))',
    'linear-gradient(135deg, hsl(220 70% 55% / 0.15), hsl(11 96% 60% / 0.12), hsl(25 100% 62% / 0.10))',
  ];

  // Rotate gradients every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll to fade gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 500;
      
      if (scrollPosition <= fadeStart) {
        setScrollOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        const opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setScrollOpacity(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDiagnoseClick = () => {
    // Trigger the chat button
    const event = new CustomEvent('openDiagnoseAI');
    window.dispatchEvent(event);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Animated Gradient Background */}
      <div 
        className="fixed inset-0 transition-all duration-[3000ms] ease-in-out pointer-events-none"
        style={{
          background: gradients[gradientIndex],
          opacity: scrollOpacity,
        }}
      />
      
      {/* Gradient to White Fade Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.7) 80%, rgb(255, 255, 255) 100%)',
          opacity: scrollOpacity > 0.3 ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

      {/* Hero Section */}
      <section className="bg-transparent pb-16 pt-32">
        <div className="mx-auto max-w-[1400px] px-8">
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
        <div className="mx-auto max-w-[1400px] px-8">
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
                      className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card ${
                        item.comingSoon ? "opacity-75" : "transition-all hover:shadow-elevated hover:border-primary/20"
                      }`}
                    >
                      {item.comingSoon ? (
                        <div className="p-6">
                          {/* Gradient accent bar */}
                          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-muted to-muted/50" />
                          
                          {/* Badge */}
                          <div className="mb-5 flex items-center justify-between">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${phase.color} shadow-sm`}>
                              <item.icon size={20} className={phase.iconColor} />
                            </div>
                            <span className="rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium text-muted-foreground">
                              {item.badge}
                            </span>
                          </div>

                          {/* Content */}
                          <h3 className="mb-3 text-lg font-bold text-foreground">
                            {item.name}
                          </h3>
                          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>

                          {/* Coming Soon Badge */}
                          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">
                            Coming Soon
                          </div>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            if (item.name === "Diagnose AI") {
                              e.preventDefault();
                              handleDiagnoseClick();
                            }
                          }}
                          className="block p-6"
                        >
                          {/* Gradient accent on hover */}
                          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100" />
                          
                          {/* Badge */}
                          <div className="mb-5 flex items-center justify-between">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${phase.color} shadow-sm transition-transform group-hover:scale-105`}>
                              <item.icon size={20} className={phase.iconColor} />
                            </div>
                            <span className="rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                              {item.badge}
                            </span>
                          </div>

                          {/* Content */}
                          <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                            {item.name}
                          </h3>
                          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>

                          {/* Arrow */}
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
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
      <section className="bg-transparent py-16">
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
    </div>
  );
};

export default Explore;
