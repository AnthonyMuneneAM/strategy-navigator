import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Your Information" },
    { id: "sharing", title: "4. Information Sharing" },
    { id: "security", title: "5. Data Security" },
    { id: "retention", title: "6. Data Retention" },
    { id: "rights", title: "7. Your Rights" },
    { id: "cookies", title: "8. Cookies and Tracking" },
    { id: "children", title: "9. Children's Privacy" },
    { id: "changes", title: "10. Changes to This Policy" },
    { id: "contact", title: "11. Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <Link to="/legal">
              <Button variant="ghost" className="mb-6 gap-2">
                <ArrowLeft size={16} />
                Back to Legal
              </Button>
            </Link>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Shield size={24} className="text-green-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
                </div>
                <p className="text-muted-foreground">
                  Explains what information we collect and why, how we use it, and how to review and update it
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Effective: January 1, 2026</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Download PDF
              </Button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex gap-12">
              {/* Table of Contents - Sticky Sidebar */}
              <aside className="hidden w-64 shrink-0 lg:block">
                <div className="sticky top-24">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Table of Contents</h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          activeSection === section.id
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="prose prose-slate max-w-none"
                >
                  <div className="rounded-lg border border-border bg-card p-8">
                    <section id="introduction" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">1. Introduction</h2>
                      <p className="text-muted-foreground">
                        At DigitalQatalyst, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use TMaaS (Transformation Management as a Service).
                      </p>
                      <p className="mt-4 text-muted-foreground">
                        Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
                      </p>
                    </section>

                    <section id="collection" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">2. Information We Collect</h2>
                      <p className="text-muted-foreground">
                        We collect information that you provide directly to us, including:
                      </p>
                      
                      <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">Personal Information</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Name and contact information (email, phone number)</li>
                        <li>• Company name and job title</li>
                        <li>• Account credentials</li>
                        <li>• Payment information</li>
                        <li>• Profile information</li>
                      </ul>

                      <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">Usage Information</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Log data (IP address, browser type, pages visited)</li>
                        <li>• Device information</li>
                        <li>• Usage patterns and preferences</li>
                        <li>• Interaction with our services</li>
                      </ul>

                      <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">Business Information</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Transformation project data</li>
                        <li>• Diagnostic responses and results</li>
                        <li>• Documents and files you upload</li>
                        <li>• Communications and collaboration data</li>
                      </ul>
                    </section>

                    <section id="usage" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
                      <p className="text-muted-foreground">
                        We use the information we collect to:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Provide, maintain, and improve our services</li>
                        <li>• Process transactions and send related information</li>
                        <li>• Send technical notices and support messages</li>
                        <li>• Respond to your comments and questions</li>
                        <li>• Provide AI-powered recommendations and insights</li>
                        <li>• Monitor and analyze trends and usage</li>
                        <li>• Detect and prevent fraud and abuse</li>
                        <li>• Comply with legal obligations</li>
                      </ul>
                    </section>

                    <section id="sharing" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">4. Information Sharing</h2>
                      <p className="text-muted-foreground">
                        We may share your information in the following circumstances:
                      </p>
                      
                      <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">With Your Consent</h3>
                      <p className="text-muted-foreground">
                        We share information with your explicit consent or at your direction.
                      </p>

                      <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">Service Providers</h3>
                      <p className="text-muted-foreground">
                        We work with third-party service providers who perform services on our behalf, such as:
                      </p>
                      <ul className="mt-2 space-y-2 text-muted-foreground">
                        <li>• Cloud hosting providers</li>
                        <li>• Payment processors</li>
                        <li>• Analytics providers</li>
                        <li>• Customer support tools</li>
                      </ul>

                      <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">Legal Requirements</h3>
                      <p className="text-muted-foreground">
                        We may disclose information if required by law or in response to valid requests by public authorities.
                      </p>
                    </section>

                    <section id="security" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">5. Data Security</h2>
                      <p className="text-muted-foreground">
                        We implement appropriate technical and organizational measures to protect your information, including:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Encryption of data in transit and at rest</li>
                        <li>• Regular security assessments</li>
                        <li>• Access controls and authentication</li>
                        <li>• Employee training on data protection</li>
                        <li>• Incident response procedures</li>
                      </ul>
                      <p className="mt-4 text-muted-foreground">
                        However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                      </p>
                    </section>

                    <section id="retention" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">6. Data Retention</h2>
                      <p className="text-muted-foreground">
                        We retain your information for as long as necessary to:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Provide our services</li>
                        <li>• Comply with legal obligations</li>
                        <li>• Resolve disputes</li>
                        <li>• Enforce our agreements</li>
                      </ul>
                      <p className="mt-4 text-muted-foreground">
                        When we no longer need your information, we will securely delete or anonymize it.
                      </p>
                    </section>

                    <section id="rights" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">7. Your Rights</h2>
                      <p className="text-muted-foreground">
                        Depending on your location, you may have the following rights:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• <strong>Access:</strong> Request access to your personal information</li>
                        <li>• <strong>Correction:</strong> Request correction of inaccurate information</li>
                        <li>• <strong>Deletion:</strong> Request deletion of your information</li>
                        <li>• <strong>Portability:</strong> Request a copy of your information</li>
                        <li>• <strong>Objection:</strong> Object to processing of your information</li>
                        <li>• <strong>Restriction:</strong> Request restriction of processing</li>
                      </ul>
                      <p className="mt-4 text-muted-foreground">
                        To exercise these rights, please contact us using the information provided below.
                      </p>
                    </section>

                    <section id="cookies" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">8. Cookies and Tracking</h2>
                      <p className="text-muted-foreground">
                        We use cookies and similar tracking technologies to:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Remember your preferences</li>
                        <li>• Understand how you use our services</li>
                        <li>• Improve your experience</li>
                        <li>• Provide personalized content</li>
                      </ul>
                      <p className="mt-4 text-muted-foreground">
                        You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features.
                      </p>
                    </section>

                    <section id="children" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">9. Children's Privacy</h2>
                      <p className="text-muted-foreground">
                        TMaaS is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                      </p>
                    </section>

                    <section id="changes" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">10. Changes to This Policy</h2>
                      <p className="text-muted-foreground">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Posting the new policy on this page</li>
                        <li>• Updating the "Effective Date" at the top</li>
                        <li>• Sending you an email notification (for material changes)</li>
                      </ul>
                      <p className="mt-4 text-muted-foreground">
                        Your continued use of TMaaS after changes become effective constitutes acceptance of the updated policy.
                      </p>
                    </section>

                    <section id="contact" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">11. Contact Us</h2>
                      <p className="text-muted-foreground">
                        If you have questions or concerns about this Privacy Policy, please contact us:
                      </p>
                      <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Email:</strong> privacy@digitalqatalyst.com
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          <strong className="text-foreground">Support:</strong>{" "}
                          <Link to="/dashboard/support" className="text-primary hover:underline">
                            Contact Support Team
                          </Link>
                        </p>
                      </div>
                    </section>

                    {/* Additional Notice */}
                    <div className="mt-12 rounded-lg border border-border bg-muted/50 p-6">
                      <h3 className="mb-2 text-lg font-semibold text-foreground">Your Privacy Matters</h3>
                      <p className="text-sm text-muted-foreground">
                        We are committed to protecting your privacy and being transparent about our data practices. If you have any questions or concerns, please don't hesitate to reach out.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
