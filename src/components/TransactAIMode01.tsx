import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Send, Brain, Calendar, Package, FileText, 
  MessageSquare, AlertCircle, ArrowRight, User, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  mockUserProfile, 
  mode01Templates, 
  mode01IntentPatterns,
  mode01QuickActions,
  type UserProfile,
  type UserEngagement
} from "@/data/transactAI";

interface TransactAIMode01Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  options?: string[];
  metadata?: {
    engagementId?: string;
    sessionId?: string;
    intent?: string;
    contextData?: any;
  };
}

const TransactAIMode01 = ({ isOpen, onClose }: TransactAIMode01Props) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize session - Load user profile from "Supabase" (mock data)
  useEffect(() => {
    if (isOpen && !sessionInitialized) {
      // Simulate loading user profile from Supabase
      setTimeout(() => {
        setUserProfile(mockUserProfile);
        setSessionInitialized(true);
        
        // Send personalized greeting
        const activeEngagements = mockUserProfile.engagements.filter(e => e.status !== "Completed");
        const pendingActions = mockUserProfile.engagements
          .flatMap(e => e.pendingActions || []);
        
        const greeting = mode01Templates.greeting.returning
          .replace("{name}", mockUserProfile.name.split(" ")[0])
          .replace("{activeCount}", activeEngagements.length.toString())
          .replace("{pendingCount}", pendingActions.length.toString());
        
        addAIMessage(
          greeting,
          [
            "Show my pending actions",
            "What's my next session?",
            "Summarize my engagements",
            "Get recommendations"
          ],
          { intent: "greeting" }
        );
      }, 800);
    }
  }, [isOpen, sessionInitialized]);

  const addAIMessage = (
    content: string,
    options?: string[],
    metadata?: Message["metadata"]
  ) => {
    setIsTyping(true);
    
    // Simulate realistic response time
    const responseTime = Math.random() * 1000 + 600;
    
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

  // Intent Classification
  const classifyIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check engagement queries
    for (const category of mode01IntentPatterns.engagementQuery) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    // Check session queries
    for (const category of mode01IntentPatterns.sessionQuery) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    // Check document queries
    for (const category of mode01IntentPatterns.documentQuery) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    // Check advisory queries
    for (const category of mode01IntentPatterns.advisory) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    // Check navigation queries
    for (const category of mode01IntentPatterns.navigation) {
      if (category.pattern.test(lowerMessage)) {
        return category.intent;
      }
    }
    
    return "general_inquiry";
  };

  // Handle Engagement Status Query
  const handleEngagementStatus = () => {
    if (!userProfile) return;
    
    const activeEngagements = userProfile.engagements.filter(e => e.status !== "Completed");
    
    let response = `Here's your current engagement status:\n\n`;
    
    activeEngagements.forEach((eng, index) => {
      response += `${index + 1}. ${eng.name}\n`;
      response += `   • Status: ${eng.status}\n`;
      response += `   • Progress: ${eng.progress}%\n`;
      response += `   • Next Milestone: ${eng.nextMilestone}\n`;
      if (eng.pendingActions && eng.pendingActions.length > 0) {
        response += `   • Pending: ${eng.pendingActions.length} action(s)\n`;
      }
      response += `\n`;
    });
    
    addAIMessage(
      response,
      ["Show pending actions", "View next sessions", "Get detailed status", "Ask something else"],
      { intent: "engagement_status" }
    );
  };

  // Handle Next Actions Query
  const handleNextActions = () => {
    if (!userProfile) return;
    
    const allPendingActions: Array<{ engagement: string; action: string }> = [];
    
    userProfile.engagements.forEach(eng => {
      if (eng.pendingActions) {
        eng.pendingActions.forEach(action => {
          allPendingActions.push({ engagement: eng.name, action });
        });
      }
    });
    
    if (allPendingActions.length === 0) {
      addAIMessage(
        "Great news! You don't have any pending actions at the moment. All your engagements are on track.",
        ["View engagement status", "Check upcoming sessions", "Ask something else"],
        { intent: "next_actions" }
      );
      return;
    }
    
    let response = `You have ${allPendingActions.length} pending action(s):\n\n`;
    
    allPendingActions.forEach((item, index) => {
      response += `${index + 1}. ${item.action}\n`;
      response += `   (${item.engagement})\n\n`;
    });
    
    response += `Would you like help with any of these?`;
    
    addAIMessage(
      response,
      ["Help with first action", "View all engagements", "Contact delivery lead", "Ask something else"],
      { intent: "next_actions" }
    );
  };

  // Handle Upcoming Sessions Query
  const handleUpcomingSessions = () => {
    if (!userProfile) return;
    
    const upcomingSessions = userProfile.upcomingSessions
      .filter(s => s.status === "Scheduled")
      .slice(0, 3);
    
    if (upcomingSessions.length === 0) {
      addAIMessage(
        "You don't have any upcoming sessions scheduled at the moment.",
        ["View engagement status", "Check pending actions", "Ask something else"],
        { intent: "upcoming_sessions" }
      );
      return;
    }
    
    let response = `Your upcoming sessions:\n\n`;
    
    upcomingSessions.forEach((session, index) => {
      const engagement = userProfile.engagements.find(e => e.id === session.engagementId);
      response += `${index + 1}. ${session.title}\n`;
      response += `   • Date: ${session.date} at ${session.time}\n`;
      response += `   • Type: ${session.type}\n`;
      response += `   • Engagement: ${engagement?.name || "Unknown"}\n\n`;
    });
    
    addAIMessage(
      response,
      ["Prepare for next session", "View all sessions", "Reschedule a session", "Ask something else"],
      { intent: "upcoming_sessions" }
    );
  };

  // Handle Engagement Summary
  const handleEngagementSummary = () => {
    if (!userProfile) return;
    
    const activeEngagements = userProfile.engagements.filter(e => e.status !== "Completed");
    const totalProgress = activeEngagements.reduce((sum, e) => sum + e.progress, 0) / activeEngagements.length;
    const pendingActionsCount = userProfile.engagements
      .flatMap(e => e.pendingActions || []).length;
    
    let response = `Here's your transformation journey summary:\n\n`;
    response += `📊 Overall Progress: ${Math.round(totalProgress)}%\n`;
    response += `📦 Active Engagements: ${activeEngagements.length}\n`;
    response += `⚠️ Pending Actions: ${pendingActionsCount}\n`;
    response += `📅 Upcoming Sessions: ${userProfile.upcomingSessions.filter(s => s.status === "Scheduled").length}\n\n`;
    
    response += `Your engagements span across:\n`;
    const towers = [...new Set(activeEngagements.map(e => e.tower))];
    towers.forEach(tower => {
      response += `• ${tower}\n`;
    });
    
    addAIMessage(
      response,
      ["View detailed status", "Show pending actions", "Get recommendations", "Ask something else"],
      { intent: "engagement_summary" }
    );
  };

  // Handle Recommendations
  const handleRecommendations = () => {
    if (!userProfile) return;
    
    const recommendations: string[] = [];
    
    // Check for pending actions
    const pendingActionsCount = userProfile.engagements
      .flatMap(e => e.pendingActions || []).length;
    if (pendingActionsCount > 0) {
      recommendations.push(`Complete your ${pendingActionsCount} pending action(s) to keep engagements on track`);
    }
    
    // Check for low progress engagements
    const lowProgressEngagements = userProfile.engagements.filter(e => e.progress < 40 && e.status !== "Completed");
    if (lowProgressEngagements.length > 0) {
      recommendations.push(`Focus on accelerating progress in ${lowProgressEngagements[0].name} (${lowProgressEngagements[0].progress}% complete)`);
    }
    
    // Check for upcoming sessions
    const nextSession = userProfile.upcomingSessions.find(s => s.status === "Scheduled");
    if (nextSession) {
      recommendations.push(`Prepare for your upcoming ${nextSession.title} on ${nextSession.date}`);
    }
    
    // Check for documents pending review
    const pendingDocs = userProfile.documents.filter(d => d.status === "Pending Review");
    if (pendingDocs.length > 0) {
      recommendations.push(`Follow up on ${pendingDocs.length} document(s) pending review`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push("You're doing great! All engagements are on track.");
    }
    
    let response = `Based on your current status, here are my recommendations:\n\n`;
    recommendations.forEach((rec, index) => {
      response += `${index + 1}. ${rec}\n\n`;
    });
    
    addAIMessage(
      response,
      ["Show pending actions", "View next session", "Contact delivery lead", "Ask something else"],
      { intent: "advisory_recommendation" }
    );
  };

  // Handle Contact Delivery Lead
  const handleContactLead = () => {
    if (!userProfile) return;
    
    const activeEngagements = userProfile.engagements.filter(e => e.status !== "Completed");
    const leads = [...new Set(activeEngagements.map(e => e.deliveryLead))];
    
    let response = `Your delivery lead(s):\n\n`;
    leads.forEach(lead => {
      const engagements = activeEngagements.filter(e => e.deliveryLead === lead);
      response += `${lead}\n`;
      response += `Managing: ${engagements.map(e => e.name).join(", ")}\n\n`;
    });
    
    response += `I can help you draft a message or you can navigate to your inbox to contact them directly.`;
    
    addAIMessage(
      response,
      ["Go to Inbox", "Draft a message", "View engagement details", "Ask something else"],
      { intent: "team_contact" }
    );
  };

  const handleUserMessage = (message: string) => {
    addUserMessage(message);
    setInput("");
    
    if (!userProfile) {
      addAIMessage(
        "I'm still loading your profile data. Please wait a moment...",
        [],
        { intent: "loading" }
      );
      return;
    }
    
    const intent = classifyIntent(message);
    
    switch (intent) {
      case "engagement_status":
        handleEngagementStatus();
        break;
      case "next_actions":
        handleNextActions();
        break;
      case "upcoming_sessions":
        handleUpcomingSessions();
        break;
      case "engagement_summary":
        handleEngagementSummary();
        break;
      case "advisory_recommendation":
        handleRecommendations();
        break;
      case "team_contact":
        handleContactLead();
        break;
      case "timeline_query":
        handleEngagementStatus();
        break;
      case "document_status":
        addAIMessage(
          `You have ${userProfile.documents.length} documents:\n\n` +
          userProfile.documents.map(d => `• ${d.name} - ${d.status}`).join("\n"),
          ["View all documents", "Upload new document", "Ask something else"],
          { intent: "document_status" }
        );
        break;
      case "platform_navigation":
        addAIMessage(
          "I can help you navigate the platform. What would you like to access?",
          ["Active Engagements", "Calendar", "Documents", "Organisation Profile"],
          { intent: "platform_navigation" }
        );
        break;
      default:
        addAIMessage(
          "I can help you with:\n\n• Engagement status and progress\n• Pending actions and next steps\n• Upcoming sessions\n• Document status\n• Recommendations\n• Contacting your delivery team\n\nWhat would you like to know?",
          ["Show my pending actions", "What's my next session?", "Summarize my engagements", "Get recommendations"],
          { intent: "fallback" }
        );
    }
  };

  const handleOptionClick = (option: string) => {
    // Map options to intents
    const optionMap: Record<string, () => void> = {
      "Show my pending actions": handleNextActions,
      "Show pending actions": handleNextActions,
      "What's my next session?": handleUpcomingSessions,
      "View next sessions": handleUpcomingSessions,
      "Check upcoming sessions": handleUpcomingSessions,
      "Summarize my engagements": handleEngagementSummary,
      "View engagement status": handleEngagementStatus,
      "View all engagements": handleEngagementStatus,
      "Get recommendations": handleRecommendations,
      "Get detailed status": handleEngagementStatus,
      "Contact delivery lead": handleContactLead,
      "View all sessions": handleUpcomingSessions,
      "Prepare for next session": handleUpcomingSessions,
    };
    
    // Navigation options
    if (option === "Go to Inbox") {
      window.location.href = "/dashboard/inbox";
      return;
    }
    if (option === "Active Engagements") {
      window.location.href = "/dashboard/services";
      return;
    }
    if (option === "Calendar") {
      window.location.href = "/dashboard/calendar";
      return;
    }
    if (option === "Documents") {
      window.location.href = "/dashboard/documents";
      return;
    }
    if (option === "Organisation Profile") {
      window.location.href = "/dashboard/profile";
      return;
    }
    
    const handler = optionMap[option];
    if (handler) {
      addUserMessage(option);
      handler();
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
              <Brain size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Transact.AI Mode 01
              </h2>
              <p className="text-xs text-muted-foreground">
                Personal Transformation Advisor
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              Post-Login
            </Badge>
            {userProfile && (
              <Badge variant="secondary" className="text-xs">
                {userProfile.engagements.filter(e => e.status !== "Completed").length} Active
              </Badge>
            )}
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
                      ? "bg-gradient-brand text-white"
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
                              ? "bg-white/20 hover:bg-white/30 text-white"
                              : "border border-border bg-background hover:border-primary/40 hover:bg-accent text-foreground"
                          }`}
                        >
                          {option}
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
                  <span className="text-xs text-muted-foreground">Analyzing your data...</span>
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
              placeholder="Ask about your engagements, sessions, or next steps..."
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isTyping || !sessionInitialized}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping || !sessionInitialized}
              size="sm"
              className="h-10 w-10 shrink-0 rounded-full bg-gradient-brand p-0 text-white shadow-brand hover:opacity-90 disabled:opacity-50"
            >
              <Send size={16} />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TransactAIMode01;
