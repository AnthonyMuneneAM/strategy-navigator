import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-navy" />
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-brand blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-brand-glow blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-navy-foreground md:text-5xl"
        >
          Ready to transform{" "}
          <span className="text-gradient-brand italic">differently?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-base text-navy-foreground/60 md:text-lg"
        >
          Replace expensive consulting engagements with architecture-led, AI-powered
          transformation. Start with your problem, not a contract.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button size="lg" className="rounded-full bg-gradient-brand px-8 text-base text-primary-foreground shadow-brand hover:opacity-90 gap-2">
            Start Free Assessment
            <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full border-navy-light px-8 text-base text-navy-foreground hover:bg-navy-light">
            Explore Marketplace
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
