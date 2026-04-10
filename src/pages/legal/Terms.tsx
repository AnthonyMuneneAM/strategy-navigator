import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "description", title: "2. Description of Service" },
    { id: "account", title: "3. Account Registration" },
    { id: "usage", title: "4. Acceptable Use" },
    { id: "payment", title: "5. Payment Terms" },
    { id: "intellectual", title: "6. Intellectual Property" },
    { id: "confidentiality", title: "7. Confidentiality" },
    { id: "warranties", title: "8. Warranties and Disclaimers" },
    { id: "limitation", title: "9. Limitation of Liability" },
    { id: "termination", title: "10. Termination" },
    { id: "additional", title: "11. Additional Terms" },
    { id: "governing", title: "12. Governing Law" },
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
                  <div className="rounded-lg bg-blue-100 p-2">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
                </div>
                <p className="text-muted-foreground">
                  Please read these terms carefully before using TMaaS
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
                    <section id="acceptance" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                      <p className="text-muted-foreground">
                        By accessing and using TMaaS (Transformation Management as a Service), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                      <p className="mt-4 text-muted-foreground">
                        These Terms of Service ("Terms") govern your access to and use of TMaaS, including any content, functionality, and services offered on or through the platform.
                      </p>
                    </section>

                    <section id="description" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">2. Description of Service</h2>
                      <p className="text-muted-foreground">
                        TMaaS is a transformation management platform that provides:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• AI-powered transformation diagnostics and recommendations</li>
                        <li>• Access to transformation services and methodologies</li>
                        <li>• Project and engagement management tools</li>
                        <li>• Collaboration features for transformation initiatives</li>
                        <li>• Analytics and reporting capabilities</li>
                      </ul>
                    </section>

                    <section id="account" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">3. Account Registration</h2>
                      <p className="text-muted-foreground">
                        To access certain features of TMaaS, you must register for an account. When you register, you agree to:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Provide accurate, current, and complete information</li>
                        <li>• Maintain and promptly update your account information</li>
                        <li>• Maintain the security of your password and account</li>
                        <li>• Accept responsibility for all activities under your account</li>
                        <li>• Notify us immediately of any unauthorized use</li>
                      </ul>
                    </section>

                    <section id="usage" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">4. Acceptable Use</h2>
                      <p className="text-muted-foreground">
                        You agree not to use TMaaS to:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Violate any applicable laws or regulations</li>
                        <li>• Infringe upon the rights of others</li>
                        <li>• Transmit any harmful or malicious code</li>
                        <li>• Attempt to gain unauthorized access to the platform</li>
                        <li>• Interfere with or disrupt the service</li>
                        <li>• Use the service for any illegal or unauthorized purpose</li>
                      </ul>
                    </section>

                    <section id="payment" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">5. Payment Terms</h2>
                      <p className="text-muted-foreground">
                        Certain features of TMaaS require payment. By purchasing services, you agree to:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Pay all fees associated with your selected services</li>
                        <li>• Provide accurate billing information</li>
                        <li>• Authorize us to charge your payment method</li>
                        <li>• Pay applicable taxes</li>
                      </ul>
                      <p className="mt-4 text-muted-foreground">
                        All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing with 30 days' notice.
                      </p>
                    </section>

                    <section id="intellectual" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">6. Intellectual Property</h2>
                      <p className="text-muted-foreground">
                        The TMaaS platform, including all content, features, and functionality, is owned by DigitalQatalyst and is protected by international copyright, trademark, and other intellectual property laws.
                      </p>
                      <p className="mt-4 text-muted-foreground">
                        You retain ownership of any content you submit to TMaaS. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content solely for the purpose of providing the service.
                      </p>
                    </section>

                    <section id="confidentiality" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">7. Confidentiality</h2>
                      <p className="text-muted-foreground">
                        We understand that you may share confidential information through TMaaS. We commit to:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• Maintain the confidentiality of your information</li>
                        <li>• Use industry-standard security measures</li>
                        <li>• Not disclose your information to third parties without consent</li>
                        <li>• Use your information only to provide the service</li>
                      </ul>
                    </section>

                    <section id="warranties" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">8. Warranties and Disclaimers</h2>
                      <p className="text-muted-foreground">
                        TMaaS is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:
                      </p>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                        <li>• The service will be uninterrupted or error-free</li>
                        <li>• Defects will be corrected</li>
                        <li>• The service is free of viruses or harmful components</li>
                        <li>• Results obtained from the service will be accurate or reliable</li>
                      </ul>
                    </section>

                    <section id="limitation" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">9. Limitation of Liability</h2>
                      <p className="text-muted-foreground">
                        To the maximum extent permitted by law, DigitalQatalyst shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                      </p>
                    </section>

                    <section id="termination" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">10. Termination</h2>
                      <p className="text-muted-foreground">
                        We may terminate or suspend your account and access to TMaaS immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease.
                      </p>
                      <p className="mt-4 text-muted-foreground">
                        You may terminate your account at any time by contacting us. All provisions of these Terms which by their nature should survive termination shall survive.
                      </p>
                    </section>

                    <section id="additional" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">11. Additional Terms</h2>
                      <p className="text-muted-foreground">
                        Certain services may be subject to additional terms and conditions. These additional terms will be made available to you and will become part of your agreement with us if you use those services.
                      </p>
                    </section>

                    <section id="governing" className="mb-12">
                      <h2 className="mb-4 text-2xl font-bold text-foreground">12. Governing Law</h2>
                      <p className="text-muted-foreground">
                        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which DigitalQatalyst operates, without regard to its conflict of law provisions.
                      </p>
                    </section>

                    {/* Contact Section */}
                    <div className="mt-12 rounded-lg border border-border bg-muted/50 p-6">
                      <h3 className="mb-2 text-lg font-semibold text-foreground">Questions about these terms?</h3>
                      <p className="text-sm text-muted-foreground">
                        If you have any questions about these Terms of Service, please{" "}
                        <Link to="/dashboard/support" className="text-primary hover:underline">
                          contact our support team
                        </Link>
                        .
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

export default Terms;
