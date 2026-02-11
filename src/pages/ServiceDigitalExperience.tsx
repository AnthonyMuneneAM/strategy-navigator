import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  Compass,
  Layers,
  Megaphone,
  HeartHandshake,
  LineChart,
  FileText,
  Image,
  Settings,
  Box,
  Lightbulb,
  BookOpen,
  Target,
  Puzzle,
  Cpu,
  Globe,
  ShieldCheck,
  Database,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const kpis = [
  {
    icon: TrendingUp,
    metric: "Customer Acquisition & Conversion Rate",
    description:
      "Architecture-driven journey design eliminates friction, optimises funnels, and aligns channels to accelerate conversion across the full acquisition lifecycle.",
  },
  {
    icon: Users,
    metric: "Customer Lifetime Value & Retention",
    description:
      "Unified experience orchestration deepens engagement, reduces churn, and creates compounding value through coherent, personalised interactions at every touchpoint.",
  },
  {
    icon: BarChart3,
    metric: "Digital Engagement & Experience Performance",
    description:
      "Structured analytics and experimentation frameworks surface actionable insights, enabling continuous optimisation of channel performance and customer satisfaction.",
  },
];

const capabilities = [
  {
    icon: Compass,
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
    icon: HeartHandshake,
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

const deliverables = [
  {
    stage: "Envision",
    label: "Design Report",
    icon: FileText,
    description:
      "Structured documentation of the Digital Experience practice design and strategy, including architecture principles, capability maps, and transformation roadmap.",
  },
  {
    stage: "Model",
    label: "Design Infographic",
    icon: Image,
    description:
      "Executive-ready visual summary of the practice design, platform architecture, and expected outcomes.",
  },
  {
    stage: "Specify",
    label: "Design Specifications",
    icon: Settings,
    description:
      "Platform requirements and high-level solution designs, including integration architecture, orchestration models, and governance structures.",
  },
  {
    stage: "Prototype",
    label: "Design Prototypes",
    icon: Box,
    description:
      "Practical prototypes demonstrating solution behaviour across journeys and channels, validating orchestration logic and reducing implementation ambiguity.",
  },
];

const methodDimensions = [
  {
    icon: BookOpen,
    title: "Framework Reference",
    description:
      "Structured blueprints aligned with industry standards ensure architectural integrity and cohesion.",
  },
  {
    icon: Lightbulb,
    title: "Best Practices & Standards",
    description:
      "Incorporates proven global practices to ensure scalability and future readiness.",
  },
  {
    icon: Target,
    title: "Client Context",
    description:
      "Tailors the design to the organisation's strategic objectives, maturity, and operational realities.",
  },
  {
    icon: Puzzle,
    title: "Reference Case",
    description:
      "Leverages comparable implementations to validate decisions and optimise outcomes.",
  },
];

const dbpPillars = [
  { icon: Globe, label: "Digital Experience" },
  { icon: Users, label: "Digital Workspace" },
  { icon: Database, label: "Digital Intelligence & Analytics" },
  { icon: ShieldCheck, label: "Digital SecDevOps" },
];

const ServiceDigitalExperience = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── 1. Hero ─── */}
      <section className="pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Design Service · Digital Experience Platform
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Digital Experience{" "}
              <span className="text-gradient-brand italic">Strategy</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Define the end-to-end customer experience architecture that enables
              your organisation to deliver seamless, scalable, and insight-driven
              digital interactions across channels, journeys, and service
              touchpoints.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              This service establishes the structural foundations required to
              orchestrate marketing, sales, and service experiences across the
              full growth lifecycle — grounded in architecture-first thinking,
              built for scalability, and aligned to long-term value creation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="rounded-full bg-gradient-brand px-8 text-primary-foreground shadow-brand hover:opacity-90">
                Request a Briefing
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="rounded-full px-8">
                View Marketplace
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. Impact Metrics ─── */}
      <section className="border-y border-dashed border-border bg-accent/30 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Measurable Impact
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-5xl">
              KPIs this service{" "}
              <span className="text-gradient-brand italic">improves</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Architecture-driven design directly influences the metrics that
              matter most to your organisation's growth and customer outcomes.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.metric}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-8 shadow-card"
              >
                <div className="mb-5 inline-flex rounded-xl border border-border bg-accent p-3 text-primary">
                  <kpi.icon size={22} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {kpi.metric}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {kpi.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Capability Areas ─── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Architecture Coverage
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-5xl">
              Capability areas{" "}
              <span className="text-gradient-brand italic">covered</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Our Design Services provide end-to-end architecture definition
              across the following capability areas. By covering these areas, we
              prevent siloed implementations, ensure long-term scalability, and
              align strategy directly to execution.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:shadow-elevated"
              >
                <div className="mb-4 inline-flex rounded-xl border border-border bg-accent p-3 text-primary">
                  <cap.icon size={20} />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Deliverables ─── */}
      <section className="border-y border-dashed border-border bg-accent/30 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Design Deliverables
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-5xl">
              What you{" "}
              <span className="text-gradient-brand italic">receive</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Tangible, executive-ready, and implementation-oriented outputs
              structured across four stages of the Design service lifecycle.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((del, i) => (
              <motion.div
                key={del.stage}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-border bg-card p-7 shadow-card"
              >
                <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {del.stage}
                </span>
                <div className="mb-4 inline-flex rounded-xl border border-border bg-accent p-3 text-foreground">
                  <del.icon size={20} />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground">
                  {del.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {del.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Methodology ─── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* 5a — Design Method */}
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Methodology
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-5xl">
              The DQ Design{" "}
              <span className="text-gradient-brand italic">Method</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Best practices, yet targeted designs. Our approach integrates four
              essential dimensions to ensure every engagement is grounded,
              scalable, and contextually relevant.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {methodDimensions.map((dim, i) => (
              <motion.div
                key={dim.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-7 shadow-card"
              >
                <div className="mb-4 inline-flex rounded-xl border border-border bg-accent p-3 text-primary">
                  <dim.icon size={20} />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground">
                  {dim.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {dim.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 5b — DBP Foundation */}
          <motion.div
            {...fadeUp}
            className="mt-20 rounded-2xl border border-border bg-secondary p-10 text-secondary-foreground md:p-14"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-serif text-2xl font-bold md:text-3xl">
                The DQ Digital Business Platform Foundation
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/70 md:text-base">
                Digital Experience Strategy is anchored within the DQ Digital
                Business Platform, composed of four integrated pillars that
                operate as a unified architecture — enabling real-time insight,
                seamless workflows, and cross-functional orchestration.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {dbpPillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="flex flex-col items-center gap-3 rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-5 text-center"
                >
                  <pillar.icon size={24} className="text-brand" />
                  <span className="text-sm font-medium text-secondary-foreground">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5c — AI-Accelerated Blueprints */}
          <motion.div
            {...fadeUp}
            className="mt-12 rounded-2xl border border-dashed border-border bg-accent/40 p-10 md:p-14"
          >
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 inline-flex rounded-xl border border-border bg-card p-3 text-primary">
                <Cpu size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Framework & AI-Accelerated Blueprints
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                DQ's AI-Accelerated Blueprints convert framework-driven platform
                designs into executable outputs. By combining structured
                architecture with AI-assisted prototyping and build acceleration,
                this approach reduces time to market, lowers transformation cost,
                increases solution agility, and produces validated,
                implementation-ready outputs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  "Reduced Time to Market",
                  "Lower Transformation Cost",
                  "Increased Solution Agility",
                  "Implementation-Ready Outputs",
                ].map((benefit) => (
                  <span
                    key={benefit}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-dashed border-border bg-accent/30 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
              Ready to define your{" "}
              <span className="text-gradient-brand italic">experience architecture</span>?
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Start with a strategic briefing and discover how architecture-led
              design can transform your customer experience outcomes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="rounded-full bg-gradient-brand px-8 text-primary-foreground shadow-brand hover:opacity-90">
                Request a Briefing
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="rounded-full px-8">
                Explore All Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDigitalExperience;
