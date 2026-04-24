import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Send, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockedRecommendations, mockedFAQs, mockedEscalation, teamHandoff } from "@/data/butlerAI";
import { useNavigate } from "react-router-dom";

interface DiagnoseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialProblem?: string;
}

interface Message {
  id: string;
  type: "user" | "ai" | "team";
  content: string;
  options?: string[];
  links?: Array<{
    text: string;
    url: string;
    icon?: React.ComponentType<any>;
  }>;
  isHandoff?: boolean;
  teamMember?: {
    name: string;
    title: string;
  };
}

const DiagnoseDialog = ({ isOpen, onClose, initialProblem = "" }: DiagnoseDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0); // 0: initial, 1: Q2 asked, 2: recommendation shown
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormStep, setContactFormStep] = useState(0); // 0: not started, 1: asking name, 2: asking email, 3: asking reason, 4: complete
  const [contactFormData, setContactFormData] = useState({ name: "", email: "", reason: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting - no chips inside dialog
      setTimeout(() => {
        addAIMessage(
          "Hi, I'm Butler, your guide to achieving seamless digital transformation. Whether you're exploring, designing, or deploying your strategy, I'm here to make it easier. How can I assist you today?"
        );
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialProblem && messages.length === 1) {
      // Auto-submit initial problem - treat it as a chip click
      setTimeout(() => {
        handleOptionClick(initialProblem);
      }, 800);
    }
  }, [isOpen, initialProblem, messages.length]);

  const addAIMessage = (content: string, options?: string[], links?: Message["links"]) => {
    setIsTyping(true);
    
    // Simulate realistic response time (500ms - 1500ms)
    const responseTime = Math.random() * 1000 + 500;
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          content,
          options,
          links,
        },
      ]);
    }, responseTime);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content,
      },
    ]);
  };

  const addTeamMessage = (content: string, options?: string[]) => {
    setIsTyping(true);
    
    // Simulate realistic human response time (1-3 seconds)
    const responseTime = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "team",
          content,
          options,
          teamMember: {
            name: mockedEscalation.contact.name,
            title: mockedEscalation.contact.title
          }
        },
      ]);
    }, responseTime);
  };

  const getGoalKey = (goal: string): string => {
    if (goal === "Improve customer experience") return "customer-experience";
    if (goal === "Improve internal operations") return "internal-operations";
    if (goal === "Unlock value from data") return "data-value";
    if (goal === "Improve delivery speed / DevOps") return "devops";
    return "";
  };

  const getStageKey = (stage: string): string => {
    if (stage.includes("Exploring") || stage.includes("defining")) return "exploring";
    if (stage.includes("Designing")) return "designing";
    if (stage.includes("implement")) return "implementing";
    if (stage.includes("optimisation") || stage.includes("running")) return "optimizing";
    return "";
  };

  const handleFAQ = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("what is tmaas") || lowerMessage.includes("learn about tmaas")) {
      const faq = mockedFAQs["what-is-tmaas"];
      addAIMessage(faq.message, faq.options);
      return true;
    }
    
    if (lowerMessage.includes("how does it work") || lowerMessage.includes("how it works")) {
      const faq = mockedFAQs["how-does-it-work"];
      addAIMessage(faq.message, faq.options);
      return true;
    }
    
    if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("pricing")) {
      const faq = mockedFAQs["what-does-it-cost"];
      addAIMessage(faq.message, faq.options);
      return true;
    }
    
    if (lowerMessage.includes("started") || lowerMessage.includes("how do i start")) {
      const faq = mockedFAQs["how-to-get-started"];
      addAIMessage(faq.message, faq.options);
      return true;
    }
    
    return false;
  };

  const handleUserMessage = (message: string) => {
    setInput("");
    
    // Handle contact form flow
    if (showContactForm) {
      if (contactFormStep === 1) {
        // Collecting name
        setContactFormData(prev => ({ ...prev, name: message }));
        setContactFormStep(2);
        addAIMessage("Great! What's your email address?");
        return;
      } else if (contactFormStep === 2) {
        // Collecting email
        setContactFormData(prev => ({ ...prev, email: message }));
        setContactFormStep(3);
        addAIMessage("Perfect! What would you like to discuss with our team?");
        return;
      } else if (contactFormStep === 3) {
        // Collecting reason
        setContactFormData(prev => ({ ...prev, reason: message }));
        setContactFormStep(4);
        setShowContactForm(false);
        
        // Log contact request for production integration
        console.log("📧 CONTACT REQUEST:", {
          timestamp: new Date().toISOString(),
          name: contactFormData.name,
          email: contactFormData.email,
          reason: message,
          conversationContext: selectedGoal || "General inquiry",
          conversationHistory: messages
        });
        
        addAIMessage(
          `Thank you, ${contactFormData.name}! Our team will review your request and get back to you at ${contactFormData.email} within 24 hours.`
        );
        return;
      }
    }
    
    // Check for contact request phrases (typed as free text)
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("talk to the team") || 
        lowerMessage.includes("contact the team") || 
        lowerMessage.includes("speak to someone") ||
        lowerMessage.includes("talk to someone") ||
        lowerMessage.includes("contact support") ||
        lowerMessage.includes("reach out to team")) {
      setShowContactForm(true);
      setContactFormStep(1);
      addAIMessage("I'd be happy to connect you with our team. What's your name?");
      return;
    }
    
    // Check if it's an FAQ
    if (handleFAQ(message)) {
      setUnresolvedCount(0);
      return;
    }
    
    // Increment unresolved count
    setUnresolvedCount(prev => prev + 1);
    
    // After 3 unresolved queries, show escalation with contact form
    if (unresolvedCount >= 2) {
      addAIMessage(
        "I wasn't able to find a clear answer for that. Would you like me to connect you with the TMaaS team?",
        ["Contact the team", "Try asking something else"]
      );
      setUnresolvedCount(0);
    } else {
      // Show fallback with FAQ options
      addAIMessage(
        "I'm not sure I understood that. Here are some things I can help with:",
        ["What is TMaaS?", "How does it work?", "What does it cost?", "How do I get started?"]
      );
    }
  };

  const handleOptionClick = (option: string) => {
    // STEP 1: Handle initial goal selection - EXACT STRING MATCHES FIRST
    if (option === "Improve customer experience") {
      addUserMessage(option);
      setSelectedGoal(option);
      setConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Customer experience — great focus. Where are you in that journey right now?",
        ["Exploring / defining the problem", "Designing a solution", "Ready to implement", "Already running, need optimisation"]
      );
      return;
    }
    
    if (option === "Improve internal operations") {
      addUserMessage(option);
      setSelectedGoal(option);
      setConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Internal operations — understood. Where are you in that journey right now?",
        ["Exploring / defining the problem", "Designing a solution", "Ready to implement", "Already running, need optimisation"]
      );
      return;
    }
    
    if (option === "Unlock value from data") {
      addUserMessage(option);
      setSelectedGoal(option);
      setConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Data transformation is one of the highest-impact areas — but also where most organizations get stuck. The challenge isn't usually the analytics tools themselves. It's the underlying data architecture.\n\nMost legacy systems were built for transactions, not insights. That creates three core problems: siloed data across systems, inconsistent data quality, and no unified view of your business.\n\nTell me — which of these resonates most with your situation right now?",
        ["We have data silos across systems", "Our data quality is inconsistent", "We can't get a unified business view", "All of the above"]
      );
      return;
    }
    
    if (option === "Improve delivery speed / DevOps") {
      addUserMessage(option);
      setSelectedGoal(option);
      setConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Delivery speed and DevOps — critical area. Where are you in that journey right now?",
        ["Exploring / defining the problem", "Designing a solution", "Ready to implement", "Already running, need optimisation"]
      );
      return;
    }
    
    // STEP 3: Handle follow-up questions about the blueprint
    if (conversationStep === 2 && (
        option === "Tell me more about the blueprint" ||
        option === "Show me the blueprint" ||
        option === "Explore the blueprint" ||
        option === "View the blueprint")) {
      
      addUserMessage(option);
      setConversationStep(3);
      
      addAIMessage(
        "The Digital Intelligence & Analytics Blueprint is a comprehensive, architecture-backed transformation package. It includes:\n\n• Unified data platform architecture\n• CDC streaming implementation guide\n• Analytics & BI integration patterns\n• Data governance framework\n• Security & compliance guidelines\n\nReady to take a look?",
        ["Yes, show me the service", "What's the investment?", "How do I get started?"],
        [
          { text: "DI&A Strategy Service", url: "/service/3", icon: ArrowRight },
          { text: "Browse All Services", url: "/marketplace", icon: ExternalLink }
        ]
      );
      return;
    }
    
    // STEP 3: Handle technical questions
    if (conversationStep === 2 && (
        option === "How does CDC streaming work?" ||
        option === "What does the architecture include?" ||
        option === "How do you handle data governance?" ||
        option === "What analytics capabilities are included?")) {
      
      addUserMessage(option);
      setConversationStep(3);
      
      addAIMessage(
        "That's a great technical question. To ensure you get the most detailed and accurate answer, would you like me to connect you with one of our TMaaS Solutions Architects? They can walk you through the specific implementation details.",
        ["Yes, connect me with an architect", "No, just show me the blueprint", "Contact the team"]
      );
      return;
    }
    
    // STEP 3: Handle pricing questions
    if (conversationStep === 2 && (
        option === "What's the investment required?" ||
        option === "How much does it cost?" ||
        option === "What's the investment?")) {
      
      addUserMessage(option);
      setConversationStep(3);
      
      addAIMessage(
        "The Digital Intelligence & Analytics Strategy service is typically scoped at $25-30k for a 4-6 week engagement. This includes the complete blueprint, architecture documentation, and implementation roadmap.\n\nWould you like to explore the service details or speak with our team about your specific requirements?",
        ["Explore the service", "Contact the team", "What's included in the engagement?"]
      );
      return;
    }
    
    // STEP 3: Handle timeline questions
    if (conversationStep === 2 && (
        option === "How long does implementation take?" ||
        option === "What's the typical timeline?" ||
        option === "How do I get started?")) {
      
      addUserMessage(option);
      setConversationStep(3);
      
      addAIMessage(
        "The Design phase (blueprint creation) typically takes 4-6 weeks. Implementation timelines vary based on your current infrastructure, but most organizations see initial value within 8-12 weeks.\n\nWant to see the detailed service breakdown?",
        ["Yes, show me the service", "Contact the team", "What happens after the blueprint?"]
      );
      return;
    }
    
    // STEP 4: Handle architect connection
    if (option === "Yes, connect me with an architect" || option === "No, just show me the blueprint") {
      addUserMessage(option);
      
      if (option === "Yes, connect me with an architect") {
        setShowContactForm(true);
        setContactFormStep(1);
        addAIMessage("Perfect! I'll connect you with our Solutions Architecture team. What's your name?");
      } else {
        onClose();
        setTimeout(() => {
          navigate("/service/3");
        }, 100);
      }
      return;
    }
    
    // STEP 4: Handle engagement details
    if (option === "What's included in the engagement?" || option === "What happens after the blueprint?") {
      addUserMessage(option);
      
      addAIMessage(
        "Great question! The engagement includes:\n\n• Discovery & assessment workshops\n• Current state architecture analysis\n• Future state blueprint design\n• Implementation roadmap\n• Technical documentation\n• Knowledge transfer sessions\n\nAfter the blueprint, you can either implement internally or engage our Deploy services (coming soon).",
        ["Explore the service", "Contact the team"]
      );
      return;
    }
    
    // Handle "Explore the service" or "Yes, show me the service"
    if (option === "Explore the service" || option === "Yes, show me the service") {
      onClose();
      setTimeout(() => {
        navigate("/service/3");
      }, 100);
      return;
    }
    
    // STEP 2: Handle journey stage selection (Q2 answer)
    if (conversationStep === 1 && (
        option === "Exploring / defining the problem" ||
        option === "Designing a solution" ||
        option === "Ready to implement" ||
        option === "Already running, need optimisation")) {
      
      addUserMessage(option);
      setConversationStep(2);
      
      // Get the mocked recommendation
      const goalKey = getGoalKey(selectedGoal);
      const stageKey = getStageKey(option);
      const recommendationKey = `${goalKey}-${stageKey}` as keyof typeof mockedRecommendations;
      const recommendation = mockedRecommendations[recommendationKey];
      
      if (recommendation) {
        addAIMessage(
          recommendation.message,
          [`Explore ${recommendation.serviceName}`, "Show me all services"],
          [
            { text: recommendation.serviceName, url: recommendation.serviceUrl, icon: ArrowRight },
            { text: "Browse Marketplace", url: "/marketplace", icon: ExternalLink }
          ]
        );
      }
      return;
    }
    
    // STEP 2: Handle data-specific challenges (for "Unlock value from data" path)
    if (conversationStep === 1 && selectedGoal === "Unlock value from data" && (
        option === "We have data silos across systems" ||
        option === "Our data quality is inconsistent" ||
        option === "We can't get a unified business view" ||
        option === "All of the above")) {
      
      addUserMessage(option);
      setConversationStep(2);
      
      // Knowledge-rich response - educate first, then recommend
      if (option === "We have data silos across systems") {
        addAIMessage(
          "Data silos happen because each system was optimized for its own function — CRM for sales, ERP for operations, marketing automation for campaigns. They weren't designed to talk to each other.\n\nThe traditional approach is to build point-to-point integrations. But that creates a maintenance nightmare. Every new system means N new integrations.\n\nThe modern approach? A unified data fabric using Change Data Capture (CDC) streaming. Instead of querying systems directly, you stream changes to a central data platform in real-time. This gives you a single source of truth without disrupting your operational systems.\n\nOur Digital Intelligence & Analytics Blueprint maps out this exact architecture — from data ingestion to governance to analytics. It's not theory. It's a battle-tested implementation guide that cuts deployment time by 35%.",
          ["Show me the blueprint", "How does CDC streaming work?", "What's the investment?"]
        );
      } else if (option === "Our data quality is inconsistent") {
        addAIMessage(
          "Inconsistent data quality is a symptom of decentralized data ownership. When every team manages their own data definitions, you end up with 'customer' meaning different things in different systems.\n\nThe fix isn't just data cleansing tools. You need data governance at the architecture level — standardized schemas, master data management, and automated quality checks built into your data pipelines.\n\nOur Digital Intelligence & Analytics Blueprint includes a complete data governance framework. It defines how to establish data ownership, create canonical data models, and implement quality gates that prevent bad data from entering your analytics layer.\n\nThis isn't a policy document. It's an implementation architecture with code patterns and infrastructure templates.",
          ["Explore the blueprint", "Tell me about data governance", "What's the cost?"]
        );
      } else if (option === "We can't get a unified business view") {
        addAIMessage(
          "A unified business view requires more than dashboards. It requires a semantic layer that translates technical data into business concepts.\n\nMost organizations try to solve this at the BI tool level. But that creates 'dashboard sprawl' — hundreds of reports with conflicting metrics because everyone defines 'revenue' differently.\n\nThe solution is a metrics layer that sits between your data platform and your analytics tools. It defines business metrics once, centrally, so every dashboard, report, and API uses the same calculation.\n\nOur Digital Intelligence & Analytics Blueprint shows you how to build this semantic layer using modern data stack patterns. You get consistent metrics across your entire organization, not just better dashboards.",
          ["View the blueprint", "How does the metrics layer work?", "What's the timeline?"]
        );
      } else {
        addAIMessage(
          "If you're facing all three challenges, you're not alone. Most organizations are. The root cause is the same: legacy architectures that weren't designed for analytics.\n\nThe good news? You don't need to rebuild everything. You need a modern data platform that sits alongside your existing systems and creates a unified analytics layer.\n\nHere's the architecture: CDC streaming pulls data from your operational systems in real-time → a data lake stores raw data → transformation pipelines create clean, governed datasets → a semantic layer defines business metrics → analytics tools consume standardized data.\n\nOur Digital Intelligence & Analytics Blueprint gives you the complete implementation guide for this architecture. It's not a consulting engagement where we tell you what to do. It's a blueprint you can execute with your own team or ours.",
          ["Show me the blueprint", "What's included?", "How much does it cost?"]
        );
      }
      return;
    }
    
    // Handle "Explore [service name]" options
    if (option.startsWith("Explore ")) {
      onClose();
      // Navigate to service detail page after closing
      setTimeout(() => {
        const serviceName = option.replace("Explore ", "");
        let serviceUrl = "/marketplace";
        
        if (serviceName.includes("Digital Experience")) {
          serviceUrl = "/service/1";
        } else if (serviceName.includes("DWS")) {
          serviceUrl = "/service/2";
        } else if (serviceName.includes("DI&A") || serviceName.includes("Intelligence")) {
          serviceUrl = "/service/3";
        } else if (serviceName.includes("SecDevOps")) {
          serviceUrl = "/service/4";
        }
        
        navigate(serviceUrl);
      }, 100);
      return;
    }
    
    // Handle "Show me all services"
    if (option === "Show me all services" || option === "Show me the services" || option === "Explore the services") {
      onClose();
      setTimeout(() => {
        navigate("/marketplace");
      }, 100);
      return;
    }
    
    // Handle FAQ options
    if (option === "What is TMaaS?" || option === "Learn About TMaaS") {
      addUserMessage(option);
      const faq = mockedFAQs["what-is-tmaas"];
      addAIMessage(faq.message, faq.options);
      setUnresolvedCount(0);
      return;
    }
    
    if (option === "How does it work?") {
      addUserMessage(option);
      const faq = mockedFAQs["how-does-it-work"];
      addAIMessage(faq.message, faq.options);
      setUnresolvedCount(0);
      return;
    }
    
    if (option === "What does it cost?") {
      addUserMessage(option);
      const faq = mockedFAQs["what-does-it-cost"];
      addAIMessage(faq.message, faq.options);
      setUnresolvedCount(0);
      return;
    }
    
    if (option === "How do I get started?" || option === "Get started" || option === "Get Started") {
      if (option !== "Get Started") {
        addUserMessage(option);
      }
      if (option === "Get Started") {
        onClose();
        window.location.href = "/sign-in";
      } else {
        const faq = mockedFAQs["how-to-get-started"];
        addAIMessage(faq.message, faq.options);
        setUnresolvedCount(0);
      }
      return;
    }
    
    // Handle "Contact the team"
    if (option === "Contact the team" || option === "Talk to the team") {
      addUserMessage(option);
      setShowContactForm(true);
      setContactFormStep(1);
      addAIMessage("I'd be happy to connect you with our team. What's your name?");
      return;
    }
    
    // Handle "Get Started" - only this one navigates
    if (option === "Get Started") {
      onClose();
      setTimeout(() => {
        navigate("/sign-in");
      }, 100);
      return;
    }
    
    // If we get here, it's an unrecognized option - treat as typed message
    addUserMessage(option);
    handleUserMessage(option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const message = input;
      addUserMessage(message);
      handleUserMessage(message);
    }
  };

  const handleLinkClick = (url: string) => {
    if (url.startsWith("/")) {
      // Close dialog and navigate using React Router
      onClose();
      setTimeout(() => {
        navigate(url);
      }, 100);
    } else if (url.startsWith("mailto:")) {
      // Open email in new window/tab
      window.open(url, '_blank');
    } else {
      // External links open in new tab
      window.open(url, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative flex h-[600px] w-full max-w-2xl flex-col rounded-2xl border border-border bg-card shadow-elevated"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
              <Sparkles size={16} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">TMaaS AI Butler</h2>
              <p className="text-xs text-muted-foreground">Your Transformation Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-gradient-brand text-primary-foreground"
                      : message.type === "team"
                      ? "border-2 border-green-500/30 bg-green-50 text-foreground"
                      : "border border-border bg-accent/50 text-foreground"
                  }`}
                >
                  {/* Team member header */}
                  {message.type === "team" && message.teamMember && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-green-500/20">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{message.teamMember.name}</p>
                        <p className="text-[10px] text-muted-foreground">{message.teamMember.title}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto text-[10px] bg-green-500/10 text-green-700 border-green-500/30">
                        Live
                      </Badge>
                    </div>
                  )}
                  
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Quick Reply Options */}
                  {message.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                            message.type === "user"
                              ? "bg-white/20 hover:bg-white/30 text-primary-foreground"
                              : "border border-border bg-background hover:border-primary/40 hover:bg-accent text-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Dynamic Links */}
                  {message.links && (
                    <div className="mt-3 space-y-2">
                      {message.links.map((link, index) => (
                        <button
                          key={index}
                          onClick={() => handleLinkClick(link.url)}
                          className="flex w-full items-center gap-2 rounded-lg border border-border bg-background/50 p-2 text-left text-xs transition-colors hover:border-primary/40 hover:bg-accent"
                        >
                          {link.icon && <link.icon size={14} />}
                          <span className="text-foreground">{link.text}</span>
                          <ExternalLink size={12} className="ml-auto text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="rounded-2xl border border-border bg-accent/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Butler is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="shrink-0 border-t border-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I assist you today?"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              size="sm"
              className="h-10 w-10 shrink-0 rounded-full bg-gradient-brand p-0 text-primary-foreground shadow-brand hover:opacity-90 disabled:opacity-50"
            >
              <Send size={16} />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DiagnoseDialog;
