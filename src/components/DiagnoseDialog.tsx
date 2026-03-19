import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Send, ExternalLink, Brain, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import { 
  knowledgeBase, 
  serviceRecommendations, 
  intentPatterns, 
  conversationTemplates,
  type ServiceRecommendation 
} from "@/data/butlerAI";

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
  organizationType?: "enterprise" | "smb" | "startup";
  transformationStage?: "starting" | "underway" | "optimizing";
  industry?: string;
  challenges?: string[];
}

const DiagnoseDialog = ({ isOpen, onClose, initialProblem = "" }: DiagnoseDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStage, setCurrentStage] = useState<"concierge" | "advisory">("concierge");
  const [conversationStep, setConversationStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [unresolved, setUnresolved] = useState(0);
  const [conversationStartTime] = useState(Date.now());
  const [responseCount, setResponseCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Simulate conversation analytics
  const logConversationMetrics = (intent: string, responseTime: number) => {
    setResponseCount(prev => prev + 1);
    
    // Simulate analytics (in real implementation, this would send to analytics service)
    console.log("Butler.AI Analytics:", {
      stage: currentStage,
      intent,
      responseTime,
      conversationLength: responseCount,
      sessionDuration: Date.now() - conversationStartTime,
      userProfile,
      timestamp: new Date().toISOString()
    });
  };

  // Enhanced Intent Classification using knowledge base
  const classifyIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check FAQ patterns
    for (const category of intentPatterns.faq) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    // Check routing patterns
    for (const category of intentPatterns.routing) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    // Check advisory patterns
    for (const category of intentPatterns.advisory) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    // Problem description (longer messages)
    if (lowerMessage.length > 20) return "problem_description";
    
    return "general_inquiry";
  };

  // Enhanced Service Recommendations
  const getServiceRecommendations = (profile: UserProfile): {
    primary: ServiceRecommendation;
    secondary: ServiceRecommendation[];
  } => {
    const { organizationType, transformationStage } = profile;
    
    // Filter recommendations based on profile
    let filteredRecommendations = serviceRecommendations.filter(service => {
      if (transformationStage === "starting") {
        return service.type === "design" || service.id === "diagnose-ai";
      }
      if (organizationType === "enterprise") {
        return service.confidence >= 85;
      }
      if (organizationType === "startup") {
        return parseInt(service.price.replace(/[^\d]/g, '')) <= 50000 || service.price === "Free";
      }
      return true;
    });

    // Sort by confidence
    filteredRecommendations.sort((a, b) => b.confidence - a.confidence);
    
    const primary = filteredRecommendations[0] || serviceRecommendations[0];
    const secondary = filteredRecommendations.slice(1, 4);
    
    return { primary, secondary };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Determine stage based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/index") {
      setCurrentStage("concierge");
    } else if (path.includes("/marketplace") || path.includes("/explore")) {
      setCurrentStage("advisory");
    }
  }, [location]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting based on stage
      setTimeout(() => {
        if (currentStage === "concierge") {
          addAIMessage(
            conversationTemplates.greeting.concierge,
            ["What is TMaaS?", "How does it work?", "Explore Services", "Talk to Team"],
            undefined,
            { stage: "concierge", intent: "greeting" }
          );
        } else {
          addAIMessage(
            conversationTemplates.greeting.advisory,
            ["Get Recommendations", "Browse by Category", "I have a specific problem"],
            undefined,
            { stage: "advisory", intent: "greeting" }
          );
        }
      }, 500);
    }
  }, [isOpen, currentStage]);

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
    const startTime = Date.now();
    setIsTyping(true);
    
    // Simulate realistic response time (500ms - 2000ms based on complexity)
    const responseTime = Math.random() * 1500 + 500;
    
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
      
      // Log analytics
      if (metadata?.intent) {
        logConversationMetrics(metadata.intent, Date.now() - startTime);
      }
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
    const faqId = intent.replace("faq_", "").replace("_", "-");
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
          { text: "Contact Team", url: "/explore", icon: MessageCircle }
        ],
        { stage: currentStage, intent }
      );
    }
  };

  const handleRoutingIntent = (intent: string) => {
    switch (intent) {
      case "route_explore":
        addAIMessage(
          "🚀 Perfect! Our Services Marketplace has everything you need:\n\nDesign Services - Strategic blueprints and architectures\nDeploy Services - Ready-to-implement solutions\nKnowledge Centre - Best practices and guides\nDiagnose AI - Personalized recommendations\n\nWhere would you like to start?",
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
          "📚 Great! Here's what you should know about TMaaS:\n\n4D Framework - Our proven transformation methodology\nService Catalog - 20+ ready-to-deploy services\nExpert Network - Certified transformation specialists\nSuccess Stories - Real client transformations\n\nWhat interests you most?",
          ["4D Framework Details", "View Success Stories", "Meet the Team"],
          [
             { text: "Learn About 4D Framework", url: "/explore", icon: BookOpen },
             { text: "View Case Studies", url: "/explore", icon: ExternalLink }
          ],
          { stage: "concierge", intent }
        );
        break;
      case "route_contact":
        addAIMessage(
          "🤝 I'd love to connect you with our team!\n\nImmediate Help - Chat with me for instant answers\nExpert Consultation - Schedule a call with our specialists\nSupport Team - Get technical assistance\n\nHow would you prefer to connect?",
          ["Schedule Consultation", "Continue Chatting", "Email Support"],
          [
             { text: "Book a Call", url: "/explore", icon: MessageCircle },
             { text: "Email Us", url: "mailto:hello@tmaas.com", icon: ExternalLink }
          ],
          { stage: "concierge", intent }
        );
        break;
    }
  };

  const handleAdvisoryFlow = (message: string, intent: string) => {
    if (conversationStep === 0) {
      // First qualification question
      setConversationStep(1);
      addAIMessage(
        "To give you the best recommendations, I'd like to understand your context better.\n\nWhat type of organization are you?",
        ["Enterprise (1000+ employees)", "SMB (50-1000 employees)", "Startup (< 50 employees)", "Government/Non-profit"],
        undefined,
        { stage: "advisory", intent: "qualification_org_type" }
      );
    } else if (conversationStep === 1) {
      // Store org type and ask second question
      const orgType = message.toLowerCase().includes("enterprise") ? "enterprise" : 
                     message.toLowerCase().includes("smb") ? "smb" : "startup";
      setUserProfile(prev => ({ ...prev, organizationType: orgType }));
      setConversationStep(2);
      
      addAIMessage(
        "Thanks! Now, where are you in your transformation journey?",
        ["Just starting - need strategy", "Underway - have some initiatives", "Optimizing - improving existing systems"],
        undefined,
        { stage: "advisory", intent: "qualification_transformation_stage" }
      );
    } else if (conversationStep === 2) {
      // Store transformation stage and provide recommendations
      const stage: "starting" | "underway" | "optimizing" = message.toLowerCase().includes("starting") ? "starting" : 
                   message.toLowerCase().includes("underway") ? "underway" : "optimizing";
      const updatedProfile = { ...userProfile, transformationStage: stage };
      setUserProfile(updatedProfile);
      setConversationStep(3);
      
      const recommendations = getServiceRecommendations(updatedProfile);
      
      addAIMessage(
        `Perfect! Based on your profile as a ${updatedProfile.organizationType} organization that's ${updatedProfile.transformationStage}, here's what I recommend:\n\n🎯 Primary Recommendation: ${recommendations.primary.name}\n${recommendations.primary.description}\n\nWhy this fits: ${recommendations.primary.reason}\n\nOther services to consider:\n${recommendations.secondary.map(s => `• ${s.name} - ${s.description}`).join('\n')}\n\nConfidence Score: ${recommendations.primary.confidence}% match`,
        ["View Service Details", "Get Different Recommendations", "Talk to Expert", "Start Over"],
        [
          { text: recommendations.primary.name, url: recommendations.primary.url, icon: ArrowRight },
          ...recommendations.secondary.slice(0, 2).map(s => ({ text: s.name, url: s.url, icon: ExternalLink }))
        ],
        { 
          stage: "advisory", 
          intent: "service_recommendation",
          service: recommendations.primary.name,
          tower: recommendations.primary.tower
        }
      );
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
        "I understand you're facing some challenges. Let me help you find the right transformation services to address them.\n\nTo provide the most relevant recommendations, I'll ask you a couple of quick questions.",
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
          { text: "Schedule Expert Call", url: "/explore", icon: MessageCircle },
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
            { text: "View Case Studies", url: "/case-studies", icon: BookOpen },
            { text: "Contact Support", url: "/contact", icon: MessageCircle }
          ]
        : [
            { text: "Browse All Services", url: "/marketplace", icon: ExternalLink },
            { text: "Start Diagnosis", url: "#diagnose", icon: Brain },
            { text: "Contact Expert", url: "/contact", icon: MessageCircle }
          ];
      
      addAIMessage(
        `I'd be happy to help you with that! Here are some ways I can assist you:\n\n${currentStage === "concierge" ? "🏠 Platform Information" : "🎯 Service Discovery"}\n• Get detailed explanations\n• Find the right solutions\n• Connect with experts\n\nWhat interests you most?`,
        fallbackOptions,
        fallbackLinks,
        { stage: currentStage, intent: "fallback" }
      );
    }
  };

  const handleOptionClick = (option: string) => {
    // Handle navigation options
    if (option === "View Service Details" || option === "Browse All Services") {
      window.location.href = "/marketplace";
    } else if (option === "Explore Services") {
      window.location.href = "/explore";
    } else if (option === "Talk to Team" || option === "Talk to Expert" || option === "Schedule Consultation") {
      window.location.href = "/contact";
    } else if (option === "Start with Diagnose AI" || option === "Get AI Recommendations") {
      // Restart conversation in advisory mode
      setCurrentStage("advisory");
      setConversationStep(0);
      setMessages([]);
      setTimeout(() => {
        addAIMessage(
          "🎯 Great choice! I'll help you find the perfect services for your transformation needs.\n\nLet's start with understanding your organization better.",
          ["Let's begin", "I want to describe my problem first"],
          undefined,
          { stage: "advisory", intent: "diagnose_start" }
        );
      }, 500);
    } else if (option === "Start Over") {
      setMessages([]);
      setConversationStep(0);
      setUserProfile({});
      setUnresolved(0);
      setTimeout(() => {
        if (currentStage === "concierge") {
          addAIMessage(
            "👋 Welcome back! I'm here to help you understand TMaaS and find the right services. What would you like to know?",
            ["What is TMaaS?", "How does it work?", "Explore Services", "Talk to Team"],
            undefined,
            { stage: "concierge", intent: "greeting" }
          );
        } else {
          addAIMessage(
            "🎯 Let's start fresh! I can help you find the perfect transformation services. What brings you here today?",
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
          ? ["What is TMaaS?", "How does it work?", "What does it cost?", "Explore Services"]
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
    } else {
      // External navigation
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
                          {link.icon && <link.icon size={14} className="text-primary" />}
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
                  <span className="text-xs text-muted-foreground">
                    TMaaS AI is thinking... (&lt;3s)
                  </span>
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
