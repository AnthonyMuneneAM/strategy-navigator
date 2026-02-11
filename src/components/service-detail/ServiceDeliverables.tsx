import { motion } from "framer-motion";
import { FileText, Image, Settings, Box } from "lucide-react";

const stages = [
  {
    stage: "Envision",
    number: "01",
    icon: FileText,
    deliverable: "Design Report",
    description:
      "Structured documentation of the Digital Experience practice design and strategy, including architecture principles, capability maps, and transformation roadmap.",
  },
  {
    stage: "Model",
    number: "02",
    icon: Image,
    deliverable: "Design Infographic",
    description:
      "Executive-ready visual summary of the practice design, platform architecture, and expected outcomes.",
  },
  {
    stage: "Specify",
    number: "03",
    icon: Settings,
    deliverable: "Design Specifications",
    description:
      "Platform requirements and high-level solution designs, including integration architecture, orchestration models, and governance structures.",
  },
  {
    stage: "Prototype",
    number: "04",
    icon: Box,
    deliverable: "Design Prototypes",
    description:
      "Practical prototypes demonstrating solution behaviour across journeys and channels, validating orchestration logic and reducing implementation ambiguity.",
  },
];

const ServiceDeliverables = () => {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Deliverables
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            What You Receive
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Tangible, executive-ready outputs structured across four stages of the Design service — from strategic vision through to validated prototypes.
          </p>
        </motion.div>

        <div className="relative mt-12">
          {/* Vertical connector line */}
          <div className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px border-l-2 border-dashed border-border md:block" />

          <div className="space-y-6">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-6"
              >
                {/* Stage number bubble */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-sm font-bold text-primary-foreground shadow-brand">
                  {stage.number}
                </div>

                <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-start gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {stage.stage}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">
                        {stage.deliverable}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDeliverables;
