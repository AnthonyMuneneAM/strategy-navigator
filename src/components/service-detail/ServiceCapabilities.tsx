import { motion } from "framer-motion";
import { MapPin, Layers, Megaphone, Handshake, LineChart } from "lucide-react";

const capabilities = [
  {
    icon: MapPin,
    title: "Customer Journey & Experience Strategy",
    description:
      "Define persona models, lifecycle journeys, service design principles, and governance frameworks across growth stages.",
  },
  {
    icon: Layers,
    title: "Omnichannel Platform Architecture",
    description:
      "Design the digital channel ecosystem — web, mobile, portals, branch, and partner channels — with unified orchestration and delivery models.",
  },
  {
    icon: Megaphone,
    title: "MarTech & Personalisation Architecture",
    description:
      "Define campaign orchestration, marketing technology stack alignment, content governance, and personalisation strategy.",
  },
  {
    icon: Handshake,
    title: "CRM & Service Architecture",
    description:
      "Design lead-to-revenue lifecycle models, CRM operating structures, and customer interaction frameworks.",
  },
  {
    icon: LineChart,
    title: "CX Analytics & Optimisation",
    description:
      "Establish experimentation models, performance analytics frameworks, and feedback loops for continuous optimisation.",
  },
];

const ServiceCapabilities = () => {
  return (
    <section className="bg-accent/40 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Capability Areas
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            End-to-End Architecture Coverage
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Our Design Services provide end-to-end architecture definition across the following capability areas. By covering these areas, we prevent siloed implementations, ensure long-term scalability, and align strategy directly to execution.
          </p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="shrink-0 rounded-xl border border-border bg-accent p-3 text-primary">
                <cap.icon size={20} />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCapabilities;
