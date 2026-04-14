import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, FileText, Shield, HelpCircle, Scale, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Legal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const legalCategories = [
    {
      icon: FileText,
      title: "Terms of Service",
      description: "Describes the rules you agree to when using our services",
      path: "/legal/terms",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "Explains what information we collect and why, how we use it, and how to review and update it",
      path: "/legal/privacy",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: HelpCircle,
      title: "Frequently Asked Questions",
      description: "Common questions about our legal terms and policies",
      path: "/legal/faq",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const filteredCategories = legalCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Scale size={32} className="text-primary" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-foreground">Legal Information</h1>
              <p className="text-lg text-muted-foreground">
                Simplified contractual terms and resources for customers, partners, and developers
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8"
            >
              <div className="relative mx-auto max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search legal documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-12 pr-4 text-base"
                />
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {filteredCategories.length} result{filteredCategories.length !== 1 ? "s" : ""} found
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Legal Categories */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className="group h-full cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                      onClick={() => navigate(category.path)}
                    >
                      <CardHeader>
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}>
                          <Icon size={24} />
                        </div>
                        <CardTitle className="flex items-center justify-between">
                          {category.title}
                          <ChevronRight
                            size={20}
                            className="text-muted-foreground transition-transform group-hover:translate-x-1"
                          />
                        </CardTitle>
                        <CardDescription className="mt-2">{category.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <Card className="bg-muted/50">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold text-foreground">Have a question?</h3>
                      <p className="text-sm text-muted-foreground">
                        Please review the{" "}
                        <Link to="/legal/faq" className="text-primary hover:underline">
                          Frequently Asked Questions
                        </Link>{" "}
                        or contact our support team for assistance.
                      </p>
                    </div>
                    <Link to="/dashboard/support">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        Contact Support
                      </motion.button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Last Updated */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Last updated: January 1, 2026
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
