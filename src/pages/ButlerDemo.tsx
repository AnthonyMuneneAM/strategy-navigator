import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Search, MessageCircle, CheckCircle, Clock, Target, Users } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DiagnoseDialog from "@/components/DiagnoseDialog";

const ButlerDemo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [demoStage, setDemoStage] = useState<"concierge" | "advisory">("concierge");

  const features = [
    {
      stage: "Stage 0: Concierge",
      icon: Brain,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Landing page assistance and platform orientation",
      capabilities: [
        "Platform explanation (TMaaS & 4D Framework)",
        "Visitor routing to appropriate sections",
        "FAQ resolution from knowledge base",
        "Intent classification with 90%+ accuracy"
      ]
    },
    {
      stage: "Stage 1: Advisory",
      icon: Search,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Marketplace guidance and service recommendations",
      capabilities: [
        "Conversational qualification (1-2 questions)",
        "Personalized service recommendations",
        "Marketplace navigation assistance",
        "Dynamic linking to service pages"
      ]
    }
  ];

  const performanceMetrics = [
    { metric: "Response Time", value: "<3 seconds", icon: Clock },
    { metric: "Intent Accuracy", value: "90%+", icon: Target },
    { metric: "User Engagement", value: "High", icon: Users },
    { metric: "Escalation Rate", value: "After 3 queries", icon: MessageCircle }
  ];

  const demoScenarios = [
    {
      title: "New Visitor - Platform Learning",
      stage: "concierge" as const,
      description: "User asks 'What is TMaaS?' and gets comprehensive platform explanation",
      example: "User: 'What is TMaaS?'\nTMaaS AI: Explains 4D Framework with routing options"
    },
    {
      title: "Service Discovery - Enterprise",
      stage: "advisory" as const,
      description: "Enterprise user gets qualified and receives personalized recommendations",
      example: "User: 'I need transformation help'\nTMaaS AI: Qualifies org type → Recommends services"
    },
    {
      title: "FAQ Resolution",
      stage: "concierge" as const,
      description: "Common questions answered from knowledge base",
      example: "User: 'How much does it cost?'\nTMaaS AI: Provides pricing breakdown with links"
    },
    {
      title: "Escalation Handling",
      stage: "advisory" as const,
      description: "After 3 unresolved queries, offers human expert connection",
      example: "After 3 unclear responses → Offers expert consultation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/60 to-accent/40 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              TMaaS AI <span className="text-gradient-brand italic">Prototype</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Conversational AI assistant for TMaaS platform with Stage 0 (Concierge) and Stage 1 (Advisory) functionality
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => {
                  setDemoStage("concierge");
                  setIsDialogOpen(true);
                }}
                className="gap-2 bg-gradient-brand text-primary-foreground shadow-brand hover:opacity-90"
              >
                <Brain size={20} />
                Try Stage 0 (Concierge)
              </Button>
              <Button
                onClick={() => {
                  setDemoStage("advisory");
                  setIsDialogOpen(true);
                }}
                variant="outline"
                className="gap-2"
              >
                <Search size={20} />
                Try Stage 1 (Advisory)
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">TMaaS AI Capabilities</h2>
            <p className="mt-4 text-muted-foreground">
              Two-stage conversational AI designed for different user journey phases
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.stage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor}`}>
                          <Icon size={24} className={feature.color} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.stage}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.capabilities.map((capability, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-500" />
                            <span className="text-muted-foreground">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="bg-accent/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Performance Standards</h2>
            <p className="mt-4 text-muted-foreground">
              Built to meet strict performance and accuracy requirements
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <Icon size={32} className="mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold text-foreground">{metric.metric}</h3>
                      <p className="mt-1 text-2xl font-bold text-primary">{metric.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Scenarios */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Demo Scenarios</h2>
            <p className="mt-4 text-muted-foreground">
              Try these conversation flows to see TMaaS AI in action
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {demoScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{scenario.title}</CardTitle>
                      <Badge variant={scenario.stage === "concierge" ? "default" : "secondary"}>
                        Stage {scenario.stage === "concierge" ? "0" : "1"}
                      </Badge>
                    </div>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-accent/50 p-4">
                      <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                        {scenario.example}
                      </pre>
                    </div>
                    <Button
                      onClick={() => {
                        setDemoStage(scenario.stage);
                        setIsDialogOpen(true);
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full"
                    >
                      Try This Scenario
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="bg-accent/30 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground">Technical Implementation</h2>
          <p className="mt-4 text-muted-foreground">
            Built on top of existing TMaaS platform with enhanced conversational capabilities
          </p>
          
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground">Enhanced Components</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  DiagnoseDialog & ChatButton with stage-aware behavior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground">Knowledge Base</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Structured FAQ responses and service recommendations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground">Intent Classification</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pattern-based routing with 90%+ accuracy simulation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Butler.AI Dialog */}
      <DiagnoseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ButlerDemo;