import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Send, ExternalLink, Brain, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import { mockedRecommendations, mockedFAQs, mockedEscalation } from "@/data/butlerAI";

interface DiagnoseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialProblem?: string;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  options?: string[];
  links?: Array<{
    text: string;
    url: string;
    icon?: React.ComponentType<any>;
  }>;
  metadata?: {
    tower?: string;
    domain?: string;
    service?: string;
    stage?: "concierge" | "advisory";
    intent?: string;
  };
}

interface UserProfile {
  transformationGoal?: string; // "customer-experience" | "internal-operations" | "data-value" | "devops"
  journeyStage?: string; // "exploring" | "designing" | "implementing" | "optimizing"
}

const DiagnoseDialog = ({ isOpen, onClose, initialProblem = "" }: DiagnoseDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0); // 0: initial, 1: goal confirmed, 2: journey stage asked
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addAIMessage(
          "Hi, I'm Butler — your TMaaS guide. What are you trying to achieve with your transformation?",
          ["Improve customer experience", "Improve internal operations", "Unlock value from data", "Improve delivery speed / DevOps"],
          undefined,
          { stage: "concierge", intent: "greeting" }
        );
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialProblem && messages.length === 1) {
      // Auto-submit initial problem
      setTimeout(() => {
        handleUserMessage(initialProblem);
      }, 800);
    }
  }, [isOpen, initialProblem, messages.length]);

  const addAIMessage = (
    content: string, 
    options?: string[], 
    links?: Message["links"], 
    metadata?: Message["metadata"]
  ) => {
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
          metadata,
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

  const handleFAQResponse = (intent: string) => {
    // Convert "faq_what_is_tmaas" -> "what-is-tmaas" to match knowledgeBase ids.
    const faqId = intent.replace(/^faq_/, "").replace(/_/g, "-");
    const response = knowledgeBase.find(entry => entry.id === faqId);
    
    if (response) {
      const links = response.links?.map(link => ({
        text: link.text,
        url: link.url,
        icon: ExternalLink
      }));
      
      addAIMessage(
        response.answer,
        ["Ask another question", "Explore Services", "Talk to Expert"],
        links,
        { stage: currentStage, intent }
      );
    } else {
      // Fallback for unmatched FAQ
      addAIMessage(
        "I'd be happy to help you with that! Let me connect you with the right information.",
        ["Browse Services", "Contact Support", "Ask something else"],
        [
          { text: "Explore TMaaS", url: "/explore", icon: ExternalLink },
          { text: "Contact Team", url: "/contact", icon: MessageCircle }
        ],
        { stage: currentStage, intent }
      );
    }
  };

  const handleRoutingIntent = (intent: string) => {
    switch (intent) {
      case "route_explore":
        addAIMessage(
          "Our Services Marketplace includes:\n\n• Design Services - Strategic blueprints and architectures\n• Deploy Services - Ready-to-implement solutions\n• Knowledge Centre - Best practices and guides\n• Diagnose AI - Personalized recommendations\n\nWhere would you like to start?",
          ["Browse All Services", "Get AI Recommendations", "View by Category"],
          [
            { text: "Explore Marketplace", url: "/marketplace", icon: ExternalLink },
            { text: "Start with Diagnose AI", url: "#diagnose", icon: Brain }
          ],
          { stage: "concierge", intent }
        );
        break;
      case "route_learn":
        addAIMessage(
          "Here's what you should know about TMaaS:\n\n• 4D Framework - Our proven transformation methodology\n• Service Catalog - 20+ ready-to-deploy services\n• Expert Network - Certified transformation specialists\n• Success Stories - Real client transformations\n\nWhat interests you most?",
          ["4D Framework Details", "View Success Stories", "Meet the Team"],
          [
            { text: "Learn About 4D Framework", url: "/explore", icon: BookOpen },
            { text: "View Case Studies", url: "/marketplace", icon: ExternalLink }
          ],
          { stage: "concierge", intent }
        );
        break;
      case "route_contact":
        addAIMessage(
          "I can help you connect with our team:\n\n• Continue chatting with me for instant answers\n• Schedule a consultation with our specialists\n• Contact our support team for technical assistance\n\nHow would you prefer to connect?",
          ["Schedule Consultation", "Continue Chatting", "Email Support"],
          [
            { text: "Get Started", url: "/sign-in", icon: MessageCircle },
            { text: "Email Us", url: "mailto:hello@tmaas.com", icon: ExternalLink }
          ],
          { stage: "concierge", intent }
        );
        break;
    }
  };

  const handleProblemIntent = (intent: string, message: string) => {
    switch (intent) {
      case "problem_governance":
        addAIMessage(
          "IT governance gaps are a common challenge. I can help you address this with:\n\n🎯 Recommended Solutions:\n\n1. Digital Workspace Solutions Strategy ($25k, 4-6 weeks)\n   • Governance framework design\n   • Compliance automation\n   • Policy management\n\n2. SecDevOps Strategy ($25k, 4-6 weeks)\n   • Security governance\n   • Risk management\n   • Compliance monitoring\n\nWould you like to explore these options or tell me more about your specific governance challenges?",
          ["View Workspace Solutions", "View SecDevOps Services", "Tell me more about my situation", "Get custom recommendations"],
          [
            { text: "Digital Workspace Strategy", url: "/marketplace?tower=dws&type=design", icon: ExternalLink },
            { text: "SecDevOps Strategy", url: "/marketplace?tower=sdo&type=design", icon: ExternalLink }
          ],
          { stage: "concierge", intent, domain: "governance" }
        );
        break;
        
      case "problem_integration":
        addAIMessage(
          "Disconnected tools create inefficiency and data silos. Here's how we can help:\n\n🎯 Recommended Solutions:\n\n1. Digital Experience Platform Strategy ($25k, 4-6 weeks)\n   • System integration architecture\n   • API strategy and design\n   • Unified customer data platform\n\n2. Data & Intelligence Strategy ($30k, 5-7 weeks)\n   • Data integration pipelines\n   • Master data management\n   • Real-time data synchronization\n\nShall I provide more details on either approach?",
          ["View Integration Solutions", "Explore Data Platform", "I need both", "Get custom recommendations"],
          [
            { text: "Digital Experience Strategy", url: "/marketplace?tower=dxp&type=design", icon: ExternalLink },
            { text: "Data & Intelligence Strategy", url: "/marketplace?tower=dia&type=design", icon: ExternalLink }
          ],
          { stage: "concierge", intent, domain: "integration" }
        );
        break;
        
      case "problem_speed":
        addAIMessage(
          "Slow time-to-market is often caused by process bottlenecks and tooling gaps. We can accelerate your delivery:\n\n🎯 Recommended Solutions:\n\n1. SecDevOps Strategy ($25k, 4-6 weeks)\n   • CI/CD pipeline design\n   • Automation strategy\n   • DevOps maturity roadmap\n\n2. DevSecOps & CI/CD Platform ($50k, 8-10 weeks)\n   • Ready-to-deploy automation\n   • Integrated security scanning\n   • Release management\n\nWhich approach interests you more?",
          ["View DevOps Strategy", "View CI/CD Platform", "Compare both options", "Get custom recommendations"],
          [
            { text: "SecDevOps Strategy", url: "/marketplace?tower=sdo&type=design", icon: ExternalLink },
            { text: "CI/CD Platform", url: "/marketplace?tower=sdo&type=deploy-saas", icon: ExternalLink }
          ],
          { stage: "concierge", intent, domain: "speed" }
        );
        break;
        
      case "problem_data":
        addAIMessage(
          "Data silos prevent you from getting a complete view of your business. Let's fix that:\n\n🎯 Recommended Solutions:\n\n1. Data & Intelligence Strategy ($30k, 5-7 weeks)\n   • Data platform architecture\n   • Integration strategy\n   • Analytics roadmap\n\n2. Modern Data Platform ($70k, 12-14 weeks)\n   • Cloud data lake & warehouse\n   • ETL/ELT pipelines\n   • Data governance\n\nWould you like to start with strategy or jump to implementation?",
          ["Start with Strategy", "View Data Platform", "I need both", "Get custom recommendations"],
          [
            { text: "Data Strategy", url: "/marketplace?tower=dia&type=design", icon: ExternalLink },
            { text: "Modern Data Platform", url: "/marketplace?tower=dia&type=deploy-saas", icon: ExternalLink }
          ],
          { stage: "concierge", intent, domain: "data" }
        );
        break;
    }
  };

  const handleAdvisoryFlow = (message: string, intent: string) => {
    // Step 1: Goal confirmed, ask Q2 about journey stage
    if (conversationStep === 1) {
      // Update the goal if they changed it
      const goal = message;
      setUserProfile(prev => ({ ...prev, transformationGoal: goal }));
      setConversationStep(2);
      
      addAIMessage(
        "And where are you in that journey — still defining the problem, designing a solution, ready to implement, or already running and looking to optimise?",
        ["Exploring / defining the problem", "Designing a solution", "Ready to implement", "Already running, need optimisation"],
        undefined,
        { stage: "advisory", intent: "qualification_journey_stage" }
      );
    }
    // Step 2: Journey stage captured, provide recommendation
    else if (conversationStep === 2) {
      const stage: "exploring" | "designing" | "implementing" | "optimizing" = 
        message.toLowerCase().includes("exploring") || message.toLowerCase().includes("defining") ? "exploring" :
        message.toLowerCase().includes("designing") ? "designing" :
        message.toLowerCase().includes("implement") ? "implementing" : "optimizing";
      
      const updatedProfile = { ...userProfile, journeyStage: stage };
      setUserProfile(updatedProfile);
      setConversationStep(3);
      
      // Map transformation goal to service
      const goal = updatedProfile.transformationGoal || "";
      let serviceName = "";
      let serviceUrl = "";
      let serviceBenefit = "";
      
      if (goal === "Improve customer experience") {
        serviceName = "Digital Experience Strategy";
        serviceUrl = "/marketplace?tower=dxp&type=design";
        serviceBenefit = "You'll get a clear roadmap for improving customer touchpoints, journey orchestration, and experience measurement.";
      } else if (goal === "Improve internal operations") {
        serviceName = "Digital Workspace Solutions Strategy";
        serviceUrl = "/marketplace?tower=dws&type=design";
        serviceBenefit = "You'll get a blueprint for modernising collaboration, governance, and productivity across your teams.";
      } else if (goal === "Unlock value from data") {
        serviceName = "Data & Intelligence Strategy";
        serviceUrl = "/marketplace?tower=dia&type=design";
        serviceBenefit = "You'll get an architecture for integrating data sources, enabling analytics, and building intelligence capabilities.";
      } else if (goal === "Improve delivery speed / DevOps") {
        serviceName = "SecDevOps Strategy";
        serviceUrl = "/marketplace?tower=sdo&type=design";
        serviceBenefit = "You'll get a roadmap for CI/CD automation, security integration, and platform engineering maturity.";
      }
      
      // Check if they need implementation or optimization (not yet available)
      if (stage === "implementing" || stage === "optimizing") {
        addAIMessage(
          `Right now all our available services are at the Design stage — which is actually the right foundation before implementation. Deploy and Drive services are coming soon. I'd still recommend starting with ${serviceName} to get your blueprint in place.\n\nFor ${goal.toLowerCase()}, ${serviceName} gives you the strategic foundation. TMaaS packages this as a structured blueprint — rather than starting from scratch, you get a proven architecture you can adapt and deploy. ${serviceBenefit}`,
          [`Explore ${serviceName}`, "Show me all services"],
          [
            { text: serviceName, url: serviceUrl, icon: ArrowRight },
            { text: "Browse Marketplace", url: "/marketplace", icon: ExternalLink }
          ],
          { 
            stage: "advisory", 
            intent: "service_recommendation",
            service: serviceName
          }
        );
      } else {
        // Standard recommendation for exploring or designing stages
        addAIMessage(
          `For ${goal.toLowerCase()}, I'd recommend ${serviceName}. TMaaS packages this as a structured blueprint — rather than starting from scratch, you get a proven architecture you can adapt and deploy. ${serviceBenefit}`,
          [`Explore ${serviceName}`, "Show me all services"],
          [
            { text: serviceName, url: serviceUrl, icon: ArrowRight },
            { text: "Browse Marketplace", url: "/marketplace", icon: ExternalLink }
          ],
          { 
            stage: "advisory", 
            intent: "service_recommendation",
            service: serviceName
          }
        );
      }
    }
  };

  const handleUserMessage = (message: string) => {
    addUserMessage(message);
    setInput("");
    
    const intent = classifyIntent(message);
    
    // Handle FAQ responses (Stage 0)
    if (intent.startsWith("faq_")) {
      handleFAQResponse(intent);
      return;
    }
    
    // Handle routing intents (Stage 0)
    if (intent.startsWith("route_")) {
      handleRoutingIntent(intent);
      return;
    }
    
    // Handle specific problem intents (quick actions)
    if (intent.startsWith("problem_")) {
      handleProblemIntent(intent, message);
      return;
    }
    
    // Handle advisory flow (Stage 1)
    if (currentStage === "advisory" || intent.startsWith("advisory_")) {
      handleAdvisoryFlow(message, intent);
      return;
    }
    
    // Handle problem descriptions
    if (intent === "problem_description") {
      setCurrentStage("advisory");
      setConversationStep(0);
      addAIMessage(
        "I can help you find the right transformation services to address your challenges.\n\nTo provide relevant recommendations, I'll ask you a couple of quick questions.",
        ["Let's get started", "I want to browse services instead"],
        undefined,
        { stage: "advisory", intent: "problem_intake" }
      );
      return;
    }
    
    // Handle unresolved queries
    setUnresolved(prev => prev + 1);
    
    if (unresolved >= 2) {
      // Escalation after 3 unresolved queries
      addAIMessage(
        conversationTemplates.escalation,
        ["Yes, connect me with an expert", "No, I'll keep exploring", "Start over with different questions"],
        [
          { text: "Schedule Expert Call", url: "/sign-in", icon: MessageCircle },
          { text: "Browse Services", url: "/marketplace", icon: ExternalLink },
          { text: "View Knowledge Base", url: "/explore", icon: BookOpen }
        ],
        { stage: currentStage, intent: "escalation" }
      );
      setUnresolved(0);
    } else {
      // Enhanced fallback response with more options
      const fallbackOptions = currentStage === "concierge" 
        ? ["Explain TMaaS platform", "Show me the 4D Framework", "What services do you offer?", "Get pricing information"]
        : ["Get service recommendations", "Browse by transformation tower", "I need help with a specific problem", "Talk to an expert"];
        
      const fallbackLinks = currentStage === "concierge"
        ? [
            { text: "Explore Platform", url: "/explore", icon: ExternalLink },
            { text: "View Case Studies", url: "/marketplace", icon: BookOpen },
            { text: "Contact Support", url: "/sign-in", icon: MessageCircle }
          ]
        : [
            { text: "Browse All Services", url: "/marketplace", icon: ExternalLink },
            { text: "Start Diagnosis", url: "#diagnose", icon: Brain },
            { text: "Contact Expert", url: "/sign-in", icon: MessageCircle }
          ];
      
      addAIMessage(
        `Here are some ways I can assist you:\n\n${currentStage === "concierge" ? "Platform Information" : "Service Discovery"}\n• Get detailed explanations\n• Find the right solutions\n• Connect with experts\n\nWhat interests you most?`,
        fallbackOptions,
        fallbackLinks,
        { stage: currentStage, intent: "fallback" }
      );
    }
  };

  const handleOptionClick = (option: string) => {
    // Handle the four transformation goal breadcrumbs from hero section
    if (option === "Improve customer experience" || 
        option === "Improve internal operations" || 
        option === "Unlock value from data" || 
        option === "Improve delivery speed / DevOps") {
      addUserMessage(option);
      
      // Store the selected goal
      setUserProfile({ transformationGoal: option });
      
      // Acknowledge their choice and confirm with Q1
      const goalLabel = option === "Improve customer experience" ? "Customer experience" :
                       option === "Improve internal operations" ? "Internal operations" :
                       option === "Unlock value from data" ? "Data value" :
                       "Delivery speed and DevOps";
      
      setCurrentStage("advisory");
      setConversationStep(1);
      addAIMessage(
        `${goalLabel} — good focus. Just to confirm, is that the main area you're looking to improve right now?`,
        ["Improve customer experience", "Improve internal operations", "Unlock value from data", "Improve delivery speed / DevOps"],
        undefined,
        { stage: "advisory", intent: "confirm_goal" }
      );
      return;
    }
    
    // Handle the three main Butler paths from greeting (legacy support)
    if (option === "I need clarity on where to start") {
      addUserMessage(option);
      handleFAQResponse("faq_what_is_tmaas");
      return;
    }
    
    if (option === "I'm trying to solve a transformation challenge") {
      addUserMessage(option);
      setCurrentStage("advisory");
      setConversationStep(0);
      handleAdvisoryFlow(option, "start_qualification");
      return;
    }
    
    if (option === "I need expert help") {
      addUserMessage(option);
      addAIMessage(
        "I'd be happy to connect you with our transformation experts.\n\nThe TMaaS team can provide:\n• Personalized consultation\n• Platform walkthrough\n• Custom solution design\n• Implementation support\n\nWould you like to schedule a consultation or continue exploring with me?",
        ["Schedule consultation", "Continue with Butler", "Tell me about TMaaS first"],
        [
          { text: "Get Started", url: "/sign-in", icon: MessageCircle },
          { text: "Contact Team", url: "mailto:hello@tmaas.com", icon: ExternalLink }
        ],
        { stage: "concierge", intent: "expert_help" }
      );
      return;
    }
    
    // Legacy options for backward compatibility
    if (option === "Understand the platform") {
      addUserMessage(option);
      handleFAQResponse("faq_what_is_tmaas");
      return;
    }
    
    if (option === "Find the right service") {
      addUserMessage(option);
      setCurrentStage("advisory");
      setConversationStep(0);
      handleAdvisoryFlow(option, "start_qualification");
      return;
    }
    
    if (option === "Common questions") {
      addUserMessage(option);
      handleFAQResponse("faq_common_questions");
      return;
    }
    
    // Handle "Explore [service name]" options
    if (option.startsWith("Explore ")) {
      const serviceName = option.replace("Explore ", "");
      let serviceUrl = "/marketplace";
      
      if (serviceName.includes("Digital Experience")) {
        serviceUrl = "/marketplace?tower=dxp&type=design";
      } else if (serviceName.includes("Workspace")) {
        serviceUrl = "/marketplace?tower=dws&type=design";
      } else if (serviceName.includes("Data") || serviceName.includes("Intelligence")) {
        serviceUrl = "/marketplace?tower=dia&type=design";
      } else if (serviceName.includes("SecDevOps")) {
        serviceUrl = "/marketplace?tower=sdo&type=design";
      }
      
      onClose();
      window.location.href = serviceUrl;
      return;
    }
    
    // Handle "Show me all services"
    if (option === "Show me all services") {
      onClose();
      window.location.href = "/marketplace";
      return;
    }
    
    // Handle navigation options
    if (option === "View Service Details" || option === "Browse All Services") {
      window.location.href = "/marketplace";
    } else if (option === "Explore Services") {
      window.location.href = "/explore";
    } else if (option === "Talk to Team" || option === "Talk to Expert" || option === "Schedule Consultation") {
      window.location.href = "/sign-in";
    } else if (option === "Start with Diagnose AI" || option === "Get AI Recommendations") {
      setCurrentStage("advisory");
      setConversationStep(0);
      setMessages([]);
      setTimeout(() => {
        addAIMessage(
          "I can help you find the right services for your transformation needs.\n\nLet's start with understanding your organization better.",
          ["Let's begin", "I want to describe my problem first"],
          undefined,
          { stage: "advisory", intent: "diagnose_start" }
        );
      }, 500);
    } else if (option === "Yes, let's start" || option === "Let's begin" || option === "Let's get started") {
      addUserMessage(option);
      setCurrentStage("advisory");
      setConversationStep(0);
      handleAdvisoryFlow(option, "start_qualification");
    } else if (option === "Just browsing") {
      addUserMessage(option);
      addAIMessage(
        "No problem! Feel free to explore at your own pace.\n\nHere's what we offer:\n\n• 4D Framework - Our transformation methodology\n• Design Services - Strategic blueprints\n• Deploy Services - Ready-to-implement solutions\n• Expert Support - Certified specialists\n\nWhat would you like to know more about?",
        ["Tell me about 4D Framework", "Show me services", "What does it cost?", "How does it work?"],
        [
          { text: "Explore Platform", url: "/explore", icon: ExternalLink },
          { text: "Browse Services", url: "/marketplace", icon: ExternalLink }
        ],
        { stage: "concierge", intent: "browsing" }
      );
    } else if (option === "Tell me about TMaaS first") {
      addUserMessage(option);
      handleFAQResponse("faq_what_is_tmaas");
    } else if (option === "Start Over") {
      setMessages([]);
      setConversationStep(0);
      setUserProfile({});
      setUnresolved(0);
      setTimeout(() => {
        if (currentStage === "concierge") {
          addAIMessage(
            "Hi, I'm Butler — your TMaaS guide. What are you trying to achieve with your transformation?",
            ["Improve customer experience", "Improve internal operations", "Unlock value from data", "Improve delivery speed / DevOps"],
            undefined,
            { stage: "concierge", intent: "greeting" }
          );
        } else {
          addAIMessage(
            "Let's start fresh. I can help you find the right transformation services.\n\nWhat brings you here today?",
            ["Get Recommendations", "Browse by Category", "I have a specific problem"],
            undefined,
            { stage: "advisory", intent: "greeting" }
          );
        }
      }, 500);
    } else if (option === "Continue Chatting" || option === "Ask another question") {
      addAIMessage(
        "Perfect! I'm here to help. What else would you like to know?",
        currentStage === "concierge" 
          ? ["Improve customer experience", "Improve internal operations", "Unlock value from data", "Improve delivery speed / DevOps"]
          : ["Get service recommendations", "Browse by category", "Pricing information", "Talk to expert"],
        undefined,
        { stage: currentStage, intent: "continue_conversation" }
      );
    } else {
      // Handle as regular user message
      handleUserMessage(option);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserMessage(input);
    }
  };

  const handleLinkClick = (url: string) => {
    if (url.startsWith("#")) {
      // Handle internal actions
      if (url === "#diagnose") {
        setCurrentStage("advisory");
        setConversationStep(0);
        handleUserMessage("I want to get AI recommendations");
      }
    } else if (url.startsWith("/")) {
      // Internal navigation - close dialog and navigate
      onClose();
      window.location.href = url;
    } else if (url.startsWith("mailto:")) {
      // Email links
      window.location.href = url;
    } else {
      // External links
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
              <h2 className="text-sm font-semibold text-foreground">
                TMaaS AI {currentStage === "concierge" ? "Concierge" : "Advisor"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {currentStage === "concierge" ? "Platform Guide" : "Service Recommendation Engine"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Stage {currentStage === "concierge" ? "0" : "1"}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {responseCount} responses
            </Badge>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>
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
                      : "border border-border bg-accent/50 text-foreground"
                  }`}
                >
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

                  {/* Metadata Display */}
                  {message.metadata && (message.metadata.tower || message.metadata.service) && (
                    <div className="mt-3 space-y-2 rounded-lg border border-border/50 bg-background/50 p-3">
                      {message.metadata.tower && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Tower:</span>
                          <Badge className="bg-purple-500/10 text-purple-700 text-xs">
                            {message.metadata.tower}
                          </Badge>
                        </div>
                      )}
                      {message.metadata.service && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Recommended:</span>
                          <Badge variant="secondary" className="text-xs">{message.metadata.service}</Badge>
                        </div>
                      )}
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
                  <span className="text-xs text-muted-foreground">TMaaS AI is thinking...</span>
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
              placeholder={
                currentStage === "concierge" 
                  ? "Ask about TMaaS, services, or pricing..." 
                  : "Describe your transformation challenge..."
              }
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
