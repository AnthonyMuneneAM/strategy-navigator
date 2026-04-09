import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Send, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockedRecommendations, mockedFAQs, mockedEscalation, teamHandoff } from "@/data/butlerAI";

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
  const [isHandedOff, setIsHandedOff] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          "Hi, I'm Butler — your TMaaS guide. What are you trying to achieve with your transformation?"
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

  const getAgentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detect intent and return appropriate response
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing") || lowerMessage.includes("budget")) {
      const responses = teamHandoff.responses.pricing;
      let response = responses[Math.floor(Math.random() * responses.length)];
      
      // Add context if user had selected a goal
      if (selectedGoal && Math.random() > 0.5) {
        const goalService = selectedGoal === "Improve customer experience" 
          ? "Digital Experience Strategy"
          : selectedGoal === "Improve internal operations"
          ? "DWS Strategy"
          : selectedGoal === "Unlock value from data"
          ? "Data & Intelligence Strategy"
          : "SecDevOps Strategy";
        response = `For ${goalService}, which aligns with your interest in ${selectedGoal.toLowerCase()}, we typically start at $25-30k for a 4-6 week engagement. ${response}`;
      }
      
      return response;
    }
    
    if (lowerMessage.includes("timeline") || lowerMessage.includes("how long") || lowerMessage.includes("duration") || lowerMessage.includes("time")) {
      return teamHandoff.responses.timeline[Math.floor(Math.random() * teamHandoff.responses.timeline.length)];
    }
    
    if (lowerMessage.includes("service") || lowerMessage.includes("what do you offer") || lowerMessage.includes("solutions")) {
      const responses = teamHandoff.responses.services;
      let response = responses[Math.floor(Math.random() * responses.length)];
      
      // Reference their selected goal if available
      if (selectedGoal && Math.random() > 0.5) {
        response = `Based on your interest in ${selectedGoal.toLowerCase()}, ${response}`;
      }
      
      return response;
    }
    
    if (lowerMessage.includes("consultation") || lowerMessage.includes("schedule") || lowerMessage.includes("meeting") || lowerMessage.includes("call") || lowerMessage.includes("demo")) {
      return teamHandoff.responses.consultation[Math.floor(Math.random() * teamHandoff.responses.consultation.length)];
    }
    
    if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey") || lowerMessage.length < 20) {
      return teamHandoff.responses.greeting[Math.floor(Math.random() * teamHandoff.responses.greeting.length)];
    }
    
    // Default to general response
    return teamHandoff.responses.general[Math.floor(Math.random() * teamHandoff.responses.general.length)];
  };

  const simulateTeamHandoff = () => {
    setIsTyping(true);
    
    // Step 1: Connecting message
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          content: teamHandoff.connecting,
          isHandoff: true,
        },
      ]);
      setIsTyping(true);
    }, 500);
    
    // Step 2: Checking availability
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          content: teamHandoff.checking,
          isHandoff: true,
        },
      ]);
      setIsTyping(true);
    }, 1500);
    
    // Step 3: Team member available
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          content: teamHandoff.available,
          isHandoff: true,
        },
      ]);
      setIsTyping(true);
    }, 2500);
    
    // Step 4: Team member introduction with context awareness
    setTimeout(() => {
      setIsTyping(false);
      setIsHandedOff(true);
      
      // Build context-aware introduction
      let introduction = "Hi there! I'm Anthony, a Transformation Specialist at TMaaS. ";
      
      if (selectedGoal) {
        // Reference the specific goal they selected
        const goalContext = selectedGoal === "Improve customer experience" 
          ? "I see you're interested in improving customer experience"
          : selectedGoal === "Improve internal operations"
          ? "I see you're interested in improving internal operations"
          : selectedGoal === "Unlock value from data"
          ? "I see you're interested in unlocking value from data"
          : "I see you're interested in improving delivery speed and DevOps";
        
        introduction += `${goalContext} — that's a great area to focus on. `;
      } else {
        introduction += "Butler filled me in on your interest. ";
      }
      
      introduction += "How can I help you today?";
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "team",
          content: introduction,
          teamMember: {
            name: mockedEscalation.contact.name,
            title: mockedEscalation.contact.title
          }
        },
      ]);
      
      // Log for production integration
      console.log("🔔 LIVE AGENT NOTIFICATION: User requesting team connection", {
        timestamp: new Date().toISOString(),
        conversationHistory: messages,
        userInterest: selectedGoal || "General inquiry",
        conversationSummary: selectedGoal 
          ? `User selected: ${selectedGoal}` 
          : "User requested to talk to team"
      });
    }, 4000);
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
    // Don't add user message here - it's added in handleOptionClick or handleSubmit
    setInput("");
    
    // If handed off to live team, simulate agent response
    if (isHandedOff) {
      // Get appropriate agent response based on user message
      const agentResponse = getAgentResponse(message);
      addTeamMessage(agentResponse);
      
      // TODO: In production, send message to live agent via WebSocket/API
      console.log("📨 MESSAGE TO LIVE AGENT:", message);
      return;
    }
    
    // Check if it's an FAQ
    if (handleFAQ(message)) {
      setUnresolvedCount(0);
      return;
    }
    
    // Increment unresolved count
    setUnresolvedCount(prev => prev + 1);
    
    // After 3 unresolved queries, show escalation
    if (unresolvedCount >= 2) {
      addAIMessage(
        mockedEscalation.message,
        undefined,
        [
          { text: `Contact ${mockedEscalation.contact.name}`, url: `mailto:${mockedEscalation.contact.email}`, icon: ExternalLink }
        ]
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
        "Data and analytics — a high-impact focus. Where are you in that journey right now?",
        ["Exploring / defining the problem", "Designing a solution", "Ready to implement", "Already running, need optimisation"]
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
    
    // Handle "Explore [service name]" options
    if (option.startsWith("Explore ")) {
      // Just close the dialog, don't navigate
      onClose();
      return;
    }
    
    // Handle "Show me all services"
    if (option === "Show me all services" || option === "Show me the services" || option === "Explore the services") {
      // Just close the dialog, don't navigate
      onClose();
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
    
    // Handle "Talk to the team"
    if (option === "Talk to the team") {
      addUserMessage(option);
      simulateTeamHandoff();
      return;
    }
    
    // Handle "Get Started" - only this one navigates
    if (option === "Get Started") {
      onClose();
      window.location.href = "/sign-in";
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
      // Don't navigate, just close dialog
      onClose();
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
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              isHandedOff ? "bg-green-500" : "bg-gradient-brand"
            }`}>
              {isHandedOff ? <User size={16} className="text-white" /> : <Sparkles size={16} className="text-primary-foreground" />}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {isHandedOff ? mockedEscalation.contact.name : "TMaaS AI Butler"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isHandedOff ? mockedEscalation.contact.title : "Your Transformation Guide"}
              </p>
            </div>
            {isHandedOff && (
              <Badge variant="outline" className="ml-2 text-xs bg-green-500/10 text-green-700 border-green-500/30">
                Live
              </Badge>
            )}
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
                  
                  {/* Quick Reply Options - Hidden when handed off to live team */}
                  {message.options && !isHandedOff && (
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
              placeholder={
                isHandedOff 
                  ? "Type your message to Anthony..." 
                  : "Ask about TMaaS, services, or pricing..."
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
