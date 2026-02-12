import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is TMaaS?",
    answer: "TMaaS (Transformation Management as a Service) is a low-cost, architecture-led digital transformation marketplace and execution platform. It enables organisations to identify, design, deploy, and continuously drive digital transformation initiatives using AI-powered, ready-to-launch blueprints grounded in enterprise architecture.",
  },
  {
    question: "How is TMaaS different from traditional consulting?",
    answer: "Unlike traditional consulting that delivers static reports, TMaaS provides executable blueprints, AI-augmented builds, and continuous synchronization between design and delivery. This approach reduces costs by up to 40%, accelerates delivery by 50%, and ensures your transformation stays aligned with your evolving business needs.",
  },
  {
    question: "What is the Digital Business Platform (DBP)?",
    answer: "The DBP is a unifying architecture built as integrated service marketplaces across four pillars: Digital Experience (external value), Digital Workspace (internal efficiency), Digital Intelligence & Analytics (AI-driven insights), and SecDevOps (platform foundation). It provides a structured approach to enterprise-wide digital transformation.",
  },
  {
    question: "How does the 4D Framework work?",
    answer: "The 4D Framework guides transformation through four phases: Discern (identify problems and opportunities), Design (create architecture and blueprints), Deploy (execute with proven platforms), and Drive (optimize and continuously improve). Each phase is supported by specific services and tools.",
  },
  {
    question: "What types of services are available?",
    answer: "We offer Design Services (strategic architecture and blueprints), Deploy Services for both SaaS and On-Premise implementations, and Drive Services including managed platforms, BPaaS, and AI agents. Services span all four transformation towers: Digital Experience, Digital Workspace, Data & Intelligence, and SecDevOps.",
  },
  {
    question: "How do I get started?",
    answer: "Start with our AI-powered Diagnose tool to identify the right services for your needs, or browse our marketplaces directly if you know what you're looking for. Each service includes clear deliverables, timelines, and pricing to help you make informed decisions.",
  },
  {
    question: "What is the typical timeline for transformation?",
    answer: "Design Services typically take 4-6 weeks, while Deploy Services range from 6-12 weeks depending on complexity. Our blueprint-driven approach and AI-augmented builds reduce traditional timelines by up to 50%, getting you to value faster.",
  },
  {
    question: "Can TMaaS work for my industry?",
    answer: "Yes. TMaaS is built on industry-standard frameworks and best practices that apply across sectors. Our blueprints are contextually adapted to your organization's specific needs, maturity level, and industry requirements while maintaining architectural integrity.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-accent/30 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked <span className="text-gradient-brand italic">Questions</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Everything you need to know about TMaaS and digital transformation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-card px-6 shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
