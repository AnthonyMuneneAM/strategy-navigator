import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HelpCircle, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "account", name: "Account & Billing" },
    { id: "privacy", name: "Privacy & Security" },
    { id: "services", name: "Services & Features" },
    { id: "legal", name: "Legal & Compliance" },
  ];

  const faqs = [
    {
      category: "account",
      question: "How do I create an account?",
      answer:
        "To create an account, click the 'Get Started' button on our homepage. You'll need to provide your email address, create a password, and complete your organization profile. Once registered, you'll receive a confirmation email to verify your account.",
    },
    {
      category: "account",
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express), bank transfers, and purchase orders for enterprise customers. All payments are processed securely through our payment partners.",
    },
    {
      category: "account",
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. No refunds are provided for partial months.",
    },
    {
      category: "privacy",
      question: "How is my data protected?",
      answer:
        "We use industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on secure cloud platforms with regular security audits. We also implement strict access controls and employee training on data protection.",
    },
    {
      category: "privacy",
      question: "Do you share my data with third parties?",
      answer:
        "We do not sell your data to third parties. We only share data with service providers who help us operate our platform (e.g., cloud hosting, payment processing) and who are bound by strict confidentiality agreements. See our Privacy Policy for full details.",
    },
    {
      category: "privacy",
      question: "Can I export my data?",
      answer:
        "Yes, you can export your data at any time from your account settings. We provide exports in standard formats (CSV, JSON, PDF) to ensure portability. This includes all your project data, documents, and reports.",
    },
    {
      category: "services",
      question: "What is included in the AI diagnostic?",
      answer:
        "Our AI diagnostic analyzes your organization's transformation readiness across multiple dimensions including strategy, capabilities, technology, and culture. You'll receive a comprehensive report with personalized recommendations and a transformation roadmap.",
    },
    {
      category: "services",
      question: "How long does service delivery take?",
      answer:
        "Service delivery timelines vary based on the specific service. Most design services take 6-12 weeks, while deployment services can range from 8-16 weeks. Your delivery lead will provide a detailed timeline during the kickoff session.",
    },
    {
      category: "services",
      question: "Can I request custom services?",
      answer:
        "Yes, we offer custom transformation services tailored to your specific needs. Contact our sales team to discuss your requirements, and we'll create a customized proposal with pricing and timeline.",
    },
    {
      category: "services",
      question: "What happens if I need revisions?",
      answer:
        "Each service includes a review period where you can request clarifications or revisions. Minor revisions are included in the service price. Major scope changes may require additional fees, which will be discussed with you before proceeding.",
    },
    {
      category: "legal",
      question: "What are your terms of service?",
      answer:
        "Our Terms of Service outline the rules and regulations for using TMaaS. Key points include acceptable use, payment terms, intellectual property rights, and limitation of liability. Please review the full Terms of Service document for complete details.",
    },
    {
      category: "legal",
      question: "Are you GDPR compliant?",
      answer:
        "Yes, we are fully GDPR compliant. We provide data processing agreements (DPAs) for all customers, implement privacy by design principles, and respect all data subject rights including access, rectification, and deletion.",
    },
    {
      category: "legal",
      question: "Do you have SOC 2 certification?",
      answer:
        "Yes, we maintain SOC 2 Type II certification, which demonstrates our commitment to security, availability, and confidentiality. Certification reports are available to enterprise customers upon request.",
    },
    {
      category: "legal",
      question: "What is your SLA?",
      answer:
        "We offer a 99.9% uptime SLA for our platform. This includes 24/7 monitoring, redundant infrastructure, and automated failover. Detailed SLA terms are available in your service agreement.",
    },
    {
      category: "legal",
      question: "How do you handle intellectual property?",
      answer:
        "You retain ownership of all content and data you provide. Deliverables created specifically for you become your property upon payment. We retain ownership of our methodologies, frameworks, and platform technology. See our Terms of Service for full IP terms.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-4xl px-6">
            <Link to="/legal">
              <Button variant="ghost" className="mb-6 gap-2">
                <ArrowLeft size={16} />
                Back to Legal
              </Button>
            </Link>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-purple-100 p-3">
                  <HelpCircle size={32} className="text-purple-600" />
                </div>
              </div>
              <h1 className="mb-4 text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
              <p className="text-muted-foreground">
                Find answers to common questions about our legal terms and policies
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-12 pr-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6">
            {/* Category Filters */}
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            {(searchQuery || activeCategory !== "all") && (
              <p className="mb-6 text-sm text-muted-foreground">
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? "s" : ""} found
              </p>
            )}

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="rounded-lg border border-border bg-card px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium text-foreground">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <HelpCircle size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">No questions found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or category filter
                  </p>
                </div>
              )}
            </motion.div>

            {/* Still Have Questions */}
            <div className="mt-12 rounded-lg border border-border bg-muted/50 p-8 text-center">
              <h3 className="mb-2 text-lg font-semibold text-foreground">Still have questions?</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/dashboard/support">
                  <Button>Contact Support</Button>
                </Link>
                <Link to="/legal">
                  <Button variant="outline">View All Legal Documents</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
