import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [problem, setProblem] = useState("");

  return (
    <section className="relative bg-accent/40 pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl leading-[1.15] text-foreground md:text-6xl"
        >
          Digital transformation,
          <br />
          <span className="text-gradient-brand italic">delivered.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Turn your real business problems into architecture-backed,
          <br className="hidden md:block" />
          ready-to-launch transformation blueprints.
        </motion.p>

        {/* Problem Input — like the Shipper chat box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="rounded-2xl border border-border bg-card p-3 shadow-card transition-shadow focus-within:shadow-elevated">
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe your transformation challenge… e.g. 'Our customer onboarding takes 3 weeks and we're losing 40% of signups'"
              rows={3}
              className="w-full resize-none rounded-xl bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
            <div className="flex items-center justify-between px-1 pt-1">
              <span className="text-xs text-muted-foreground/50">AI-powered problem resolution</span>
              <Button
                size="sm"
                className="gap-1.5 rounded-full bg-gradient-brand px-5 text-primary-foreground shadow-brand hover:opacity-90"
              >
                Find Solutions
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {["IT governance gaps", "Disconnected tools", "Slow time-to-market", "Data silos"].map((tag) => (
            <button
              key={tag}
              onClick={() => setProblem(tag)}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
