import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-navy" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-brand blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-brand-glow blur-[80px]" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl text-navy-foreground md:text-5xl">
            Ready to transform <span className="text-gradient-brand italic">differently?</span>
          </h2>
          <p className="mt-6 font-body text-lg text-navy-foreground/70">
            Join organisations that have replaced expensive consulting engagements with 
            architecture-led, AI-powered transformation. Start with your problem, not a contract.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-gradient-brand shadow-brand text-primary-foreground gap-2 text-base hover:opacity-90">
              Start Free Assessment
              <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="border-navy-light text-navy-foreground hover:bg-navy-light gap-2 text-base">
              Explore Marketplace
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
