import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  metadata?: {
    tower?: string;
    domain?: string;
    service?: string;
  };
}

const DiagnoseDialog = ({ isOpen, onClose, initialProblem = "" }: DiagnoseDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          "Hi! I'm your TMaaS AI assistant. I'll help identify the right transformation services for your needs. Could you describe the challenge you're facing?"
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

  const addAIMessage = (content: string, options?: string[], metadata?: Message["metadata"]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          content,
          options,
          metadata,
        },
      ]);
    }, 1000);
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

  const handleUserMessage = (message: string) => {
    addUserMessage(message);
    setInput("");
    
    // Conversation flow
    if (currentStep === 0) {
      // After initial problem description
      setCurrentStep(1);
      addAIMessage(
        "Thanks for sharing that. To better understand your situation, is this affecting a specific department or the entire organization?",
        ["Specific department", "Multiple departments", "Entire organization"]
      );
    } else if (currentStep === 1) {
      setCurrentStep(2);
      addAIMessage(
        "Got it. How urgent is this issue for your organization?",
        ["Critical - needs immediate attention", "Important - within 3 months", "Planning - 6+ months"]
      );
    } else if (currentStep === 2) {
      setCurrentStep(3);
      addAIMessage(
        "And what's the primary impact you're experiencing?",
        ["Compliance/Risk", "Productivity/Efficiency", "Cost/Budget", "Customer Experience"]
      );
    } else if (currentStep === 3) {
      // Final analysis
      setCurrentStep(4);
      addAIMessage("Let me analyze this using our DQ Canvas framework...");
      
      setTimeout(() => {
        addAIMessage(
          "Based on your responses, I've identified the following:\n\n**Transformation Tower:** Digital Workspace Solutions\n**Domain:** Digital GPRC (Governance, Privacy, Risk & Compliance)\n\nThis problem sits within **Digital Workspace Solutions**. I recommend starting with our **Digital Workspace Solutions Strategy** service, specifically focused on **IT Governance & Compliance**.\n\nThis service includes:\n• Architecture blueprint\n• Governance model & policies\n• Compliance roadmap\n• Duration: 4-6 weeks\n• Investment: From $25k",
          ["View Service Details", "Start Over", "Talk to Expert"],
          {
            tower: "Digital Workspace Solutions",
            domain: "Digital GPRC",
            service: "Digital Workspace Solutions Strategy",
          }
        );
      }, 2000);
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === "View Service Details") {
      window.location.href = "/marketplace?tower=dws&type=design";
    } else if (option === "Start Over") {
      setMessages([]);
      setCurrentStep(0);
      setInput("");
      setTimeout(() => {
        addAIMessage(
          "Hi! I'm your TMaaS AI assistant. I'll help identify the right transformation services for your needs. Could you describe the challenge you're facing?"
        );
      }, 500);
    } else if (option === "Talk to Expert") {
      addAIMessage("Great! I'll connect you with one of our transformation experts. They'll reach out within 24 hours to discuss your specific needs.");
    } else {
      handleUserMessage(option);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserMessage(input);
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
              <h2 className="text-sm font-semibold text-foreground">Diagnose AI</h2>
              <p className="text-xs text-muted-foreground">Powered by DQ Canvas</p>
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
                      : "border border-border bg-accent/50 text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                  
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

                  {message.metadata && (
                    <div className="mt-3 space-y-2 rounded-lg border border-border/50 bg-background/50 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Tower:</span>
                        <Badge className="bg-purple-500/10 text-purple-700 text-xs">
                          {message.metadata.tower}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Domain:</span>
                        <Badge variant="secondary" className="text-xs">{message.metadata.domain}</Badge>
                      </div>
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
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
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
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isTyping || currentStep >= 4}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping || currentStep >= 4}
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
