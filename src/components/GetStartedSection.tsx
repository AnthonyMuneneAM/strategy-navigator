import { motion } from "framer-motion";
import { Brain, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const paths = [
  {
    icon: Brain,
    title: "Not sure where to start?",
    description: "Use our AI-powered Diagnose tool to identify the right services for your transformation needs.",
    cta: "Start with Diagnose AI",
    href: "#diagnose",
    primary: true,
  },
  {
    icon: Layers,
    title: "Know what you need?",
    description: "Browse our full range of transformation services across Design, Deploy, and Drive.",
    cta: "Explore Marketplaces",
    href: "/explore",
    primary: false,
  },
];

const GetStartedSection = () => {
  const handleDiagnoseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('openDiagnoseAI');
    window.dispatchEvent(event);
  };

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
            Get Started
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            Ready to <span className="text-gradient-brand italic">transform?</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Choose your path based on where you are in your transformation journey.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {paths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border p-8 transition-all hover:shadow-elevated ${
                path.primary
                  ? "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${
                path.primary ? "bg-gradient-brand" : "bg-primary/10"
              }`}>
                <path.icon size={24} className={path.primary ? "text-primary-foreground" : "text-primary"} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-foreground">{path.title}</h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">{path.description}</p>

              {path.primary ? (
                <button
                  onClick={handleDiagnoseClick}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-brand transition-opacity hover:opacity-90"
                >
                  {path.cta}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 rounded-full"
                >
                  <a href={path.href}>
                    {path.cta}
                    <ArrowRight size={16} />
                  </a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
