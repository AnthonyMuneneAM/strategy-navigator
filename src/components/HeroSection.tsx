import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [problem, setProblem] = useState("");

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/95" />
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-medium text-brand-glow">
            <Sparkles size={14} />
            AI-Powered Transformation Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl font-display text-4xl leading-tight text-navy-foreground md:text-6xl lg:text-7xl"
        >
          Digital transformation,{" "}
          <span className="text-gradient-brand italic">delivered.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-navy-foreground/70 md:text-xl"
        >
          Stop paying for slides. Start deploying change. TMaaS turns your real business 
          problems into architecture-backed, ready-to-launch transformation blueprints.
        </motion.p>

        {/* Problem Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 w-full max-w-2xl"
        >
          <div className="rounded-2xl border border-navy-light bg-navy-light/50 p-2 backdrop-blur-sm transition-all focus-within:border-brand/50 focus-within:shadow-brand/20 focus-within:shadow-lg">
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe your transformation challenge... e.g. 'Our customer onboarding takes 3 weeks and we're losing 40% of signups'"
              className="min-h-[100px] w-full resize-none rounded-xl bg-transparent px-4 py-3 font-body text-sm text-navy-foreground placeholder:text-navy-foreground/40 focus:outline-none"
            />
            <div className="flex items-center justify-between px-2 pb-1">
              <span className="text-xs text-navy-foreground/30">AI-powered problem resolution</span>
              <Button
                size="sm"
                className="bg-gradient-brand shadow-brand text-primary-foreground gap-2 hover:opacity-90"
              >
                Find Solutions
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {["IT governance gaps", "Disconnected tools", "Slow time-to-market", "Data silos"].map((tag) => (
            <button
              key={tag}
              onClick={() => setProblem(tag)}
              className="rounded-full border border-navy-light bg-navy-light/30 px-4 py-1.5 font-body text-xs text-navy-foreground/60 transition-all hover:border-brand/40 hover:text-brand-glow"
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
