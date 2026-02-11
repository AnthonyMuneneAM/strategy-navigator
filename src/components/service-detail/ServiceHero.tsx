import { motion } from "framer-motion";
import { ArrowLeft, Layers, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ServiceHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pb-20 pt-28">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/60 to-background" />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/marketplace")}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to Marketplace
          </button>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs font-medium">
              <Layers size={12} />
              Design Service
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-medium">
              <Compass size={12} />
              Digital Experience
            </Badge>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Digital Experience{" "}
            <span className="text-gradient-brand italic">Strategy</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Define the end-to-end customer experience architecture that enables your organisation to deliver seamless, scalable, and insight-driven digital interactions across channels, journeys, and service touchpoints.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            This service establishes the structural foundations required to orchestrate marketing, sales, and service experiences across the full growth lifecycle — grounded in architecture-first thinking, built for scalability and governance, and aligned between experience strategy and execution.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full bg-gradient-brand px-8 text-primary-foreground shadow-brand hover:opacity-90">
              Request This Service
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Download Overview
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
