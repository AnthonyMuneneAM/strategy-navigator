import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServiceCTA = () => {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Ready to define your Digital Experience architecture?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Speak with our transformation team to scope your engagement and get started with an architecture-led approach.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="gap-2 rounded-full bg-gradient-brand px-8 text-primary-foreground shadow-brand hover:opacity-90">
              Request This Service
              <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Explore More Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA;
