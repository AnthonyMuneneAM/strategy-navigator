import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, CheckCircle2, TrendingUp, Users, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServiceDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/60 to-accent/40 pb-12 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <a
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Marketplace
          </a>

          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
                  <Globe size={24} className="text-primary-foreground" />
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-blue-500/10 text-blue-700">Digital Experience</Badge>
                  <Badge variant="secondary">Design Service</Badge>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Digital Experience Strategy
              </h1>
              
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Define the end-to-end customer experience architecture that enables organisations to deliver
                seamless, scalable, and insight-driven digital interactions across channels, journeys, and service
                touchpoints.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Architecture-First", "Scalable", "Governance", "Execution-Ready"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Investment</span>
                <span className="text-2xl font-bold text-foreground">From $25k</span>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">4-6 weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Type</span>
                  <span className="font-medium text-foreground">Design</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tower</span>
                  <span className="font-medium text-foreground">Digital Experience</span>
                </div>
              </div>

              <Button className="mt-6 w-full rounded-full bg-gradient-brand text-primary-foreground shadow-brand hover:opacity-90">
                Request Service
              </Button>
              
              <Button variant="outline" className="mt-3 w-full rounded-full">
                Download Overview
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-2xl grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              {/* Strategic Positioning */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Strategic Positioning</h2>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <p className="leading-relaxed text-foreground">
                    This service establishes the structural foundations required to orchestrate marketing, sales, and
                    service experiences across the full growth lifecycle. Our approach emphasizes architecture-first
                    thinking, ensuring scalability and governance while creating long-term value through direct
                    alignment between experience strategy and execution.
                  </p>
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Measurable Business Impact</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      icon: TrendingUp,
                      title: "Customer Acquisition & Conversion",
                      description:
                        "Architecture-driven design optimizes journey orchestration, reducing friction and improving conversion rates across all touchpoints.",
                    },
                    {
                      icon: Users,
                      title: "Customer Lifetime Value & Retention",
                      description:
                        "Unified experience architecture enables personalized engagement strategies that increase retention and maximize CLV.",
                    },
                    {
                      icon: Target,
                      title: "Digital Engagement Performance",
                      description:
                        "Integrated analytics and optimization frameworks drive continuous improvement in experience quality and business outcomes.",
                    },
                  ].map((metric) => (
                    <div
                      key={metric.title}
                      className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-elevated"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand/10">
                        <metric.icon size={24} className="text-primary" />
                      </div>
                      <h3 className="mb-2 font-semibold text-foreground">{metric.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capability Areas */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Capability Areas Covered</h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Our Design Services provide end-to-end architecture definition across the following capability areas.
                  By covering these capability areas, we prevent siloed implementations, ensure long-term scalability,
                  and align strategy directly to execution.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Customer Journey & Experience Strategy",
                      description:
                        "Define persona models, lifecycle journeys, service design principles, and governance frameworks across growth stages.",
                    },
                    {
                      title: "Omnichannel Platform Architecture",
                      description:
                        "Design the digital channel ecosystem (web, mobile, portals, branch, partner channels) with unified orchestration and delivery models.",
                    },
                    {
                      title: "MarTech & Personalisation Architecture",
                      description:
                        "Define campaign orchestration, marketing technology stack alignment, content governance, and personalisation strategy.",
                    },
                    {
                      title: "CRM & Service Architecture",
                      description:
                        "Design lead-to-revenue lifecycle models, CRM operating structures, and customer interaction frameworks.",
                    },
                    {
                      title: "CX Analytics & Optimisation",
                      description:
                        "Establish experimentation models, performance analytics frameworks, and feedback loops for continuous optimisation.",
                    },
                  ].map((capability, i) => (
                    <div
                      key={capability.title}
                      className="flex gap-4 rounded-xl border border-border bg-card p-6"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-sm font-semibold text-primary-foreground">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">{capability.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Deliverables Tab */}
            <TabsContent value="deliverables" className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Service Deliverables</h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  The deliverables focus on designing and implementing a robust Digital Experience practice. They are
                  structured across four stages of the Design service, ensuring tangible, executive-ready, and
                  implementation-oriented outputs.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      stage: "Envision Stage",
                      deliverable: "Design Report",
                      description:
                        "Structured documentation of the Digital Experience practice design and strategy, including architecture principles, capability maps, and transformation roadmap.",
                      items: [
                        "Architecture principles & patterns",
                        "Capability maturity assessment",
                        "Transformation roadmap",
                        "Governance framework",
                      ],
                    },
                    {
                      stage: "Model Stage",
                      deliverable: "Design Infographic",
                      description:
                        "Executive-ready visual summary of the practice design, platform architecture, and expected outcomes.",
                      items: [
                        "Platform architecture diagram",
                        "Journey orchestration model",
                        "Technology stack overview",
                        "Expected business outcomes",
                      ],
                    },
                    {
                      stage: "Specify Stage",
                      deliverable: "Design Specifications",
                      description:
                        "Platform requirements and high-level solution designs, including integration architecture, orchestration models, and governance structures.",
                      items: [
                        "Functional requirements",
                        "Integration architecture",
                        "Data & analytics specifications",
                        "Security & compliance requirements",
                      ],
                    },
                    {
                      stage: "Prototype Stage",
                      deliverable: "Design Prototypes",
                      description:
                        "Practical prototypes demonstrating solution behaviour across journeys and channels, validating orchestration logic and reducing implementation ambiguity.",
                      items: [
                        "Journey prototypes",
                        "Channel experience mockups",
                        "Orchestration flow validation",
                        "User testing insights",
                      ],
                    },
                  ].map((stage) => (
                    <div key={stage.stage} className="rounded-2xl border border-border bg-card p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {stage.stage}
                          </Badge>
                          <h3 className="text-xl font-semibold text-foreground">{stage.deliverable}</h3>
                        </div>
                        <CheckCircle2 size={24} className="text-primary" />
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {stage.items.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Methodology Tab */}
            <TabsContent value="methodology" className="space-y-12">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">The DQ Methodology</h2>
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                  An architecture-first approach that combines structured frameworks, proven practices, and AI-accelerated
                  delivery to ensure scalable, executable transformation outcomes.
                </p>

                {/* Design Method */}
                <div className="mb-12 rounded-2xl border border-border bg-card p-8">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    The DQ Design Method — Best Practices, Yet Targeted Designs
                  </h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    The design approach integrates four essential dimensions to deliver architecture that is both
                    industry-aligned and contextually relevant:
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "Framework Reference",
                        description:
                          "Structured blueprints aligned with industry standards ensure architectural integrity and cohesion.",
                      },
                      {
                        title: "Best Practices & Standards",
                        description:
                          "Incorporates proven global practices to ensure scalability and future readiness.",
                      },
                      {
                        title: "Client Context",
                        description:
                          "Tailors the design to the organisation's strategic objectives, maturity, and operational realities.",
                      },
                      {
                        title: "Reference Case",
                        description:
                          "Leverages comparable implementations to validate decisions and optimise outcomes.",
                      },
                    ].map((dimension) => (
                      <div key={dimension.title} className="rounded-xl border border-border bg-accent/30 p-5">
                        <h4 className="mb-2 font-semibold text-foreground">{dimension.title}</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">{dimension.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DBP Foundation */}
                <div className="mb-12">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    The DQ Digital Business Platform (DBP) Foundation
                  </h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Digital Experience Strategy is anchored within the DQ Digital Business Platform (DBP), composed of
                    four integrated pillars that operate as an integrated architecture rather than standalone initiatives:
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { name: "Digital Experience", color: "bg-blue-500" },
                      { name: "Digital Workspace", color: "bg-purple-500" },
                      { name: "Digital Intelligence & Analytics", color: "bg-green-500" },
                      { name: "Digital SecDevOps", color: "bg-orange-500" },
                    ].map((pillar) => (
                      <div
                        key={pillar.name}
                        className="rounded-xl border border-border bg-card p-5 text-center transition-shadow hover:shadow-elevated"
                      >
                        <div className={`mx-auto mb-3 h-2 w-12 rounded-full ${pillar.color}`}></div>
                        <p className="text-sm font-medium text-foreground">{pillar.name}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    These pillars enable real-time insight, seamless workflows, and cross-functional orchestration across
                    the enterprise.
                  </p>
                </div>

                {/* AI-Accelerated Blueprints */}
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    Framework & AI-Accelerated Blueprints
                  </h3>
                  <p className="mb-6 leading-relaxed text-foreground">
                    DQ's AI-Accelerated Blueprints convert framework-driven platform designs into executable outputs. By
                    combining structured architecture with AI-assisted prototyping and build acceleration, this approach:
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Reduces time to market",
                      "Lowers transformation cost",
                      "Increases solution agility",
                      "Produces validated, implementation-ready outputs",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="shrink-0 text-primary" />
                        <span className="text-sm font-medium text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact" className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Business Impact & ROI</h2>
                
                <div className="mb-8 rounded-2xl border border-border bg-card p-8">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Expected Outcomes</h3>
                  <div className="space-y-4">
                    {[
                      {
                        metric: "15-30%",
                        description: "Improvement in customer acquisition and conversion rates",
                      },
                      {
                        metric: "20-40%",
                        description: "Increase in customer lifetime value through optimized engagement",
                      },
                      {
                        metric: "25-50%",
                        description: "Reduction in time-to-market for new digital experiences",
                      },
                      {
                        metric: "30-60%",
                        description: "Decrease in integration and orchestration complexity",
                      },
                    ].map((outcome) => (
                      <div key={outcome.description} className="flex items-start gap-4">
                        <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-brand/10">
                          <span className="text-xl font-bold text-primary">{outcome.metric}</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-sm leading-relaxed text-foreground">{outcome.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-8">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Who This Service Is For</h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    This service is designed for senior executives and transformation leaders who need to establish or
                    modernize their digital experience capabilities:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["CIOs", "CDOs", "Heads of Digital", "Marketing Directors", "Transformation Leads"].map(
                      (role) => (
                        <Badge key={role} variant="secondary" className="px-4 py-2">
                          {role}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
