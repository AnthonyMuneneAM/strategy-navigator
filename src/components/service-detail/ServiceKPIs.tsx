import { motion } from "framer-motion";
import { TrendingUp, Users, BarChart3 } from "lucide-react";

const kpis = [
  {
    icon: TrendingUp,
    title: "Customer Acquisition & Conversion Rate",
    description:
      "Architecture-driven experience design removes friction from acquisition funnels, optimises channel orchestration, and creates measurable conversion improvements through structured journey design.",
  },
  {
    icon: Users,
    title: "Customer Lifetime Value & Retention",
    description:
      "A unified experience architecture ensures consistent, personalised interactions across touchpoints — driving deeper engagement, reducing churn, and increasing long-term customer value.",
  },
  {
    icon: BarChart3,
    title: "Digital Engagement & Experience Performance",
    description:
      "Structured analytics frameworks and experimentation models enable continuous measurement and optimisation of experience quality, content effectiveness, and channel performance.",
  },
];

const ServiceKPIs = () => {
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
            Measurable Impact
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Key Outcomes Improved
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Architecture-driven design directly influences the metrics that matter most to digital leaders.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="mb-4 inline-flex rounded-xl border border-border bg-accent p-3 text-primary">
                <kpi.icon size={22} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {kpi.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {kpi.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceKPIs;
