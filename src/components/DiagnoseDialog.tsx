import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Send, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockedRecommendations, mockedFAQs, mockedEscalation, teamHandoff } from "@/data/butlerAI";
import { useNavigate } from "react-router-dom";
import { useConversation } from "@/contexts/ConversationContext";

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
  const conversation = useConversation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0); // 0: initial, 1: Q2 asked, 2: recommendation shown
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormStep, setContactFormStep] = useState(0); // 0: not started, 1: asking name, 2: asking email, 3: asking reason, 4: complete
  const [contactFormData, setContactFormData] = useState({ name: "", email: "", reason: "" });
  
  // Stephane's Flow: Knowledge Exchange → Lead Capture → Navigation
  const [collectingLead, setCollectingLead] = useState(false);
  const [leadStep, setLeadStep] = useState(0); // 0: not started, 1: email, 2: org, 3: complete
  const [leadData, setLeadData] = useState({ email: "", organization: "" });
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Sync with conversation context when dialog opens
  useEffect(() => {
    if (isOpen && conversation.hasActiveConversation && messages.length === 0) {
      // Only sync if local messages are empty to avoid duplicates
      setMessages(conversation.messages);
      setConversationStep(conversation.conversationStep);
      setSelectedGoal(conversation.selectedGoal);
    }
  }, [isOpen]);
  
  // Wrapper functions to update both local state and context
  const updateConversationStep = (step: number) => {
    setConversationStep(step);
    conversation.setConversationStep(step);
  };
  
  const updateSelectedGoal = (goal: string) => {
    setSelectedGoal(goal);
    conversation.setSelectedGoal(goal);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !conversation.hasActiveConversation) {
      // Initial greeting - only show if no active conversation
      setTimeout(() => {
        addAIMessage(
          "Hi, I'm Butler, your guide to achieving seamless digital transformation. Whether you're exploring, designing, or deploying your strategy, I'm here to make it easier. How can I help you today?"
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
      const newMessage = {
        id: Date.now().toString(),
        type: "ai" as const,
        content,
        options,
        links,
      };
      setMessages((prev) => {
        // Check if message already exists to prevent duplicates
        if (prev.some(m => m.content === content && m.type === "ai")) {
          return prev;
        }
        return [...prev, newMessage];
      });
      conversation.addMessage(newMessage);
    }, responseTime);
  };

  const addUserMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content,
    };
    setMessages((prev) => {
      // Check if message already exists to prevent duplicates
      if (prev.some(m => m.content === content && m.type === "user")) {
        return prev;
      }
      return [...prev, newMessage];
    });
    conversation.addMessage(newMessage);
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

  // Stephane's Flow: Trigger lead capture after knowledge exchange
  const triggerLeadCapture = () => {
    setTimeout(() => {
      setCollectingLead(true);
      setLeadStep(1);
      addAIMessage(
        "I can send you a detailed architecture diagram for this solution. What's your email address?"
      );
    }, 1500);
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
    
    // Stephane's Flow: Handle lead capture (Knowledge Exchange → Lock-In → Navigation)
    if (collectingLead) {
      if (leadStep === 1) {
        // Collecting email
        setLeadData(prev => ({ ...prev, email: message }));
        setLeadStep(2);
        addAIMessage("Great! Which organization are you with?");
        return;
      } else if (leadStep === 2) {
        // Collecting organization
        setLeadData(prev => ({ ...prev, organization: message }));
        setLeadStep(3);
        setCollectingLead(false);
        setLeadCaptured(true);
        
        // Log lead capture for production integration
        console.log("🎯 LEAD CAPTURED:", {
          timestamp: new Date().toISOString(),
          email: leadData.email,
          organization: message,
          transformationGoal: selectedGoal,
          conversationContext: messages
        });
        
        // NOW offer navigation (after lead is captured)
        addAIMessage(
          `Perfect, ${message}! I've noted your details. Should I also take you to the service page where you can explore the full offering?`,
          ["Yes, take me there", "Tell me more first", "Connect me with an architect"]
        );
        return;
      }
    }
    
    // Keyword matching for common phrases (static prototype intelligence)
    const lower = message.toLowerCase();
    
    // Data-related keywords
    if (lower.match(/data|analytics|insight|reporting|dashboard|bi|warehouse|lake/)) {
      addUserMessage(message);
      handleOptionClick("Unlock value from data");
      return;
    }
    
    // Customer experience keywords
    if (lower.match(/customer|experience|cx|onboarding|support|journey|touchpoint/)) {
      addUserMessage(message);
      handleOptionClick("Improve customer experience");
      return;
    }
    
    // Operations keywords
    if (lower.match(/operation|process|workflow|efficiency|automation|erp|supply chain/)) {
      addUserMessage(message);
      handleOptionClick("Improve internal operations");
      return;
    }
    
    // DevOps keywords
    if (lower.match(/devops|deployment|ci\/cd|pipeline|delivery|kubernetes|docker|security/)) {
      addUserMessage(message);
      handleOptionClick("Improve delivery speed / DevOps");
      return;
    }
    
    // Pricing keywords
    if (lower.match(/cost|price|pricing|how much|investment|budget/)) {
      addUserMessage(message);
      const faq = mockedFAQs["what-does-it-cost"];
      addAIMessage(faq.message, faq.options);
      setUnresolvedCount(0);
      return;
    }
    
    // Timeline keywords
    if (lower.match(/how long|timeline|duration|when|time frame/)) {
      addUserMessage(message);
      addAIMessage(
        "Most of our Design services run 4-6 weeks, while Deploy services are 8-14 weeks depending on complexity. The exact timeline depends on which transformation area you're focusing on. What's your primary goal?",
        ["Improve customer experience", "Improve internal operations", "Unlock value from data", "Improve delivery speed / DevOps"]
      );
      setUnresolvedCount(0);
      return;
    }
    
    // Contact request phrases
    if (lower.match(/talk to|contact|speak to|reach out|connect with|call|email/)) {
      addUserMessage(message);
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
        ["Connect me with the team", "Try asking something else"]
      );
      setUnresolvedCount(0);
    } else {
      // Better fallback - guide them to main topics
      addUserMessage(message);
      addAIMessage(
        "I can help you with digital transformation across four key areas. Which one resonates most with your current challenge?",
        ["Improve customer experience", "Improve internal operations", "Unlock value from data", "Improve delivery speed / DevOps"]
      );
    }
  };

  const handleOptionClick = (option: string) => {
    // STEP 1: Handle initial goal selection - EXACT STRING MATCHES FIRST
    if (option === "Improve customer experience") {
      addUserMessage(option);
      updateSelectedGoal(option);
      updateConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Customer experience transformation often stalls not because of poor design, but because of backend system disconnection. When your CRM, support platform, and transaction systems don't talk to each other, customers feel the friction at every touchpoint.\n\nThe issue isn't adding more channels — it's creating a unified experience layer that connects them all.\n\nTell me — which of these resonates most with your situation right now?",
        ["Disconnected customer touchpoints", "Slow response times", "Inconsistent experience across channels", "All of the above"]
      );
      return;
    }
    
    if (option === "Improve internal operations") {
      addUserMessage(option);
      updateSelectedGoal(option);
      updateConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Operational efficiency is where most digital transformation initiatives either accelerate or stall. The challenge isn't usually the individual systems — your ERP works, your HR platform works, your finance system works. The problem is they don't work together.\n\nWhen core business systems operate in silos, you get manual handoffs, data duplication, and reconciliation overhead. Every cross-functional process becomes a coordination nightmare.\n\nTell me — which of these resonates most with your situation right now?",
        ["Manual processes and handoffs", "System silos and data duplication", "Slow approval workflows", "All of the above"]
      );
      return;
    }
    
    if (option === "Unlock value from data") {
      addUserMessage(option);
      updateSelectedGoal(option);
      updateConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Data transformation is one of the highest-impact areas — but also where most organizations get stuck. The challenge isn't usually the analytics tools themselves. It's the underlying data architecture.\n\nMost legacy systems were built for transactions, not insights. That creates three core problems: siloed data across systems, inconsistent data quality, and no unified view of your business.\n\nTell me — which of these resonates most with your situation right now?",
        ["We have data silos across systems", "Our data quality is inconsistent", "We can't get a unified business view", "All of the above"]
      );
      return;
    }
    
    if (option === "Improve delivery speed / DevOps") {
      addUserMessage(option);
      updateSelectedGoal(option);
      updateConversationStep(1);
      setUnresolvedCount(0);
      
      addAIMessage(
        "Delivery speed isn't just about tools — it's about the entire software supply chain. Most organizations have CI/CD pipelines, but they're still slow because security, compliance, and testing are bolted on at the end rather than built into the flow.\n\nThe shift to SecDevOps means security and compliance become automated guardrails, not manual gates.\n\nTell me — which of these resonates most with your situation right now?",
        ["Security slows down delivery", "Manual compliance checks", "Inconsistent deployment processes", "All of the above"]
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
      
      // Determine service URL based on selected goal
      let serviceUrl = "/marketplace";
      if (selectedGoal === "Unlock value from data") {
        serviceUrl = "/service/3";
      } else if (selectedGoal === "Improve internal operations") {
        serviceUrl = "/service/2";
      } else if (selectedGoal === "Improve customer experience") {
        serviceUrl = "/service/1";
      } else if (selectedGoal === "Improve delivery speed / DevOps") {
        serviceUrl = "/service/4";
      }
      
      // Navigate directly to the service page
      addAIMessage("Taking you to the service page...");
      setTimeout(() => {
        onClose();
        navigate(serviceUrl);
      }, 1500);
      return;
    }
    
    // STEP 3: Handle technical questions
    if (conversationStep === 2 && (
        option === "How does CDC streaming work?" ||
        option === "What does the architecture include?" ||
        option === "How do you handle data governance?" ||
        option === "How does the framework work?" ||
        option === "What analytics capabilities are included?" ||
        option === "How does process automation work?" ||
        option === "How does master data management work?" ||
        option === "How does intelligent automation work?" ||
        option === "How does the unified view work?" ||
        option === "How does orchestration work?" ||
        option === "How does the CDP work?" ||
        option === "How does policy-as-code work?" ||
        option === "How does compliance-as-code work?" ||
        option === "How does GitOps work?")) {
      
      addUserMessage(option);
      updateConversationStep(3);
      
      addAIMessage(
        "That's a great technical question. To ensure you get the most detailed and accurate answer, would you like me to connect you with one of our TMaaS Solutions Architects? They can walk you through the specific implementation details.",
        ["Yes, connect me with an architect", "No, just show me the blueprint"]
      );
      return;
    }
    
    // STEP 3: Handle pricing questions (for both data and operations paths)
    if (conversationStep === 2 && (
        option === "What's the investment required?" ||
        option === "How much does it cost?" ||
        option === "What's the investment?" ||
        option === "What's the cost?")) {
      
      addUserMessage(option);
      setConversationStep(3);
      
      const serviceName = selectedGoal === "Unlock value from data" 
        ? "Digital Intelligence & Analytics Strategy" 
        : "Digital Workspace Strategy";
      const serviceUrl = selectedGoal === "Unlock value from data" ? "/service/3" : "/service/2";
      
      addAIMessage(
        `The ${serviceName} service is typically scoped at $25-30k for a 4-6 week engagement. This includes the complete blueprint, architecture documentation, and implementation roadmap.\n\nShould I take you to the service page to see the full details?`,
        ["Yes, take me there", "What's included in the engagement?", "Connect me with the team"]
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
        "The Design phase (blueprint creation) typically takes 4-6 weeks. Implementation timelines vary based on your current infrastructure, but most organizations see initial value within 8-12 weeks.\n\nShould I take you to the service page?",
        ["Yes, take me there", "What happens after the blueprint?", "Connect me with the team"]
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
        "Great question! The engagement includes:\n\n• Discovery & assessment workshops\n• Current state architecture analysis\n• Future state blueprint design\n• Implementation roadmap\n• Technical documentation\n• Knowledge transfer sessions\n\nAfter the blueprint, you can either implement internally or engage our Deploy services (coming soon).\n\nShould I take you to the service page?",
        ["Yes, take me there", "Connect me with the team"]
      );
      return;
    }
    
    // Handle "Explore the service" or "Yes, show me the service" or "Yes, take me there"
    if (option === "Explore the service" || option === "Yes, show me the service" || option === "Yes, take me there") {
      addUserMessage(option);
      
      // Agent behavior: Tell user what you're doing
      let serviceUrl = "/marketplace"; // Default fallback
      
      if (selectedGoal === "Unlock value from data") {
        serviceUrl = "/service/3"; // DI&A Strategy
      } else if (selectedGoal === "Improve internal operations") {
        serviceUrl = "/service/2"; // DWS Strategy
      } else if (selectedGoal === "Improve customer experience") {
        serviceUrl = "/service/1"; // Digital Experience Strategy
      } else if (selectedGoal === "Improve delivery speed / DevOps") {
        serviceUrl = "/service/4"; // SecDevOps Strategy
      }
      
      addAIMessage("Taking you to the service page...");
      
      // Auto-navigate after brief delay
      setTimeout(() => {
        onClose();
        navigate(serviceUrl);
      }, 2000);
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
          [`Take me to ${recommendation.serviceName}`, "Show me all services"],
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
          "Data silos happen because each system was optimized for its own function — CRM for sales, ERP for operations, marketing automation for campaigns. They weren't designed to talk to each other.\n\nThe traditional approach is to build point-to-point integrations. But that creates a maintenance nightmare. Every new system means N new integrations.\n\nThe modern approach? A unified data fabric using Change Data Capture (CDC) streaming. Instead of querying systems directly, you stream changes to a central data platform in real-time. This gives you a single source of truth without disrupting your operational systems.\n\nOur Digital Intelligence & Analytics Blueprint maps out this exact architecture — from data ingestion to governance to analytics. It's not theory. It's a battle-tested implementation guide that cuts deployment time by 35%."
        );
        // Stephane's Flow: Trigger lead capture BEFORE offering navigation
        triggerLeadCapture();
      } else if (option === "Our data quality is inconsistent") {
        addAIMessage(
          "Inconsistent data quality is a symptom of decentralized data ownership. When every team manages their own data definitions, you end up with 'customer' meaning different things in different systems.\n\nThe fix isn't just data cleansing tools. You need data governance at the architecture level — standardized schemas, master data management, and automated quality checks built into your data pipelines.\n\nOur Digital Intelligence & Analytics Blueprint includes a complete data governance framework. It defines how to establish data ownership, create canonical data models, and implement quality gates that prevent bad data from entering your analytics layer.\n\nThis isn't a policy document. It's an implementation architecture with code patterns and infrastructure templates."
        );
        // Stephane's Flow: Trigger lead capture BEFORE offering navigation
        triggerLeadCapture();
      } else if (option === "We can't get a unified business view") {
        addAIMessage(
          "A unified business view requires more than dashboards. It requires a semantic layer that translates technical data into business concepts.\n\nMost organizations try to solve this at the BI tool level. But that creates 'dashboard sprawl' — hundreds of reports with conflicting metrics because everyone defines 'revenue' differently.\n\nThe solution is a metrics layer that sits between your data platform and your analytics tools. It defines business metrics once, centrally, so every dashboard, report, and API uses the same calculation.\n\nOur Digital Intelligence & Analytics Blueprint shows you how to build this semantic layer using modern data stack patterns. You get consistent metrics across your entire organization, not just better dashboards."
        );
        // Stephane's Flow: Trigger lead capture BEFORE offering navigation
        triggerLeadCapture();
      } else {
        addAIMessage(
          "If you're facing all three challenges, you're not alone. Most organizations are. The root cause is the same: legacy architectures that weren't designed for analytics.\n\nThe good news? You don't need to rebuild everything. You need a modern data platform that sits alongside your existing systems and creates a unified analytics layer.\n\nHere's the architecture: CDC streaming pulls data from your operational systems in real-time → a data lake stores raw data → transformation pipelines create clean, governed datasets → a semantic layer defines business metrics → analytics tools consume standardized data.\n\nOur Digital Intelligence & Analytics Blueprint gives you the complete implementation guide for this architecture. It's not a consulting engagement where we tell you what to do. It's a blueprint you can execute with your own team or ours."
        );
        // Stephane's Flow: Trigger lead capture BEFORE offering navigation
        triggerLeadCapture();
      }
      return;
    }
    
    // STEP 2: Handle internal operations-specific challenges (for "Improve internal operations" path)
    if (conversationStep === 1 && selectedGoal === "Improve internal operations" && (
        option === "Manual processes and handoffs" ||
        option === "System silos and data duplication" ||
        option === "Slow approval workflows" ||
        option === "All of the above")) {
      
      addUserMessage(option);
      setConversationStep(2);
      
      // Knowledge-rich response - educate first, then recommend
      if (option === "Manual processes and handoffs") {
        addAIMessage(
          "Manual handoffs happen because your systems don't share a common process orchestration layer. When an invoice needs approval, someone exports from the ERP, emails finance, they update their spreadsheet, then manually enter it back into the system.\n\nThe traditional fix is to train people on 'the process.' But that doesn't scale. Every exception becomes a special case. Every new hire needs weeks of training.\n\nThe modern approach? Process automation with a digital core platform. Instead of people moving data between systems, you define workflows once and let the platform orchestrate across your ERP, HR, finance, and supply chain systems automatically.\n\nOur Digital Workspace Strategy Blueprint maps out this exact architecture — from process discovery to automation to continuous optimization. It's not about replacing your systems. It's about connecting them intelligently."
        );
        // Stephane's Flow: Trigger lead capture BEFORE offering navigation
        triggerLeadCapture();
      } else if (option === "System silos and data duplication") {
        addAIMessage(
          "System silos exist because each platform was bought to solve a specific problem. Your ERP handles operations, your CRM handles sales, your HR system handles people. But now you have the same customer data in three places, and they're never in sync.\n\nThe traditional approach is to build integrations. But that creates a web of dependencies. Every system update risks breaking something downstream.\n\nThe solution is an integration platform with master data management. Instead of point-to-point connections, you create a single source of truth for core business entities — customers, products, employees. Each system reads and writes to this central hub.\n\nOur Digital Workspace Strategy Blueprint includes the complete integration architecture. You get API patterns, data synchronization strategies, and conflict resolution logic. This isn't theory — it's production-ready patterns from organizations that have solved this problem."
        );
        // Stephane's Flow: Trigger lead capture BEFORE offering navigation
        triggerLeadCapture();
      } else if (option === "Slow approval workflows") {
        addAIMessage(
          "Slow approvals aren't usually about people being slow. They're about visibility and context. When an approval request lands in someone's inbox, they don't have the full picture. They need to check three systems, ask two people, then make a decision.\n\nMost organizations try to fix this with escalation policies. But that just creates more noise. The real problem is that approval workflows are disconnected from the systems that have the context.\n\nThe modern approach is intelligent workflow automation. The system gathers all the context — budget status, compliance checks, historical data — and presents it alongside the approval request. For routine cases, it can even auto-approve based on predefined rules.\n\nOur Digital Workspace Strategy Blueprint shows you how to build these intelligent workflows. You get decision automation patterns, escalation logic, and audit trails that satisfy compliance requirements.",
          ["View the blueprint", "How does intelligent automation work?", "What's the timeline?"]
        );
      } else {
        addAIMessage(
          "If you're facing all three challenges, you're dealing with what we call 'operational debt' — the accumulated cost of systems that were never designed to work together.\n\nThe good news? You don't need to rip and replace everything. You need a digital core platform that sits between your existing systems and orchestrates them intelligently.\n\nHere's the architecture: API gateway connects all your systems → master data management ensures consistency → workflow engine orchestrates cross-system processes → business rules engine handles approvals and exceptions → analytics layer tracks performance.\n\nOur Digital Workspace Strategy Blueprint gives you the complete implementation guide. It's not a consulting engagement where we tell you what to do. It's a blueprint you can execute with your own team or ours.",
          ["Show me the blueprint", "What's included?", "What's the investment?"]
        );
      }
      return;
    }
    
    // STEP 2: Handle customer experience-specific challenges (for "Improve customer experience" path)
    if (conversationStep === 1 && selectedGoal === "Improve customer experience" && (
        option === "Disconnected customer touchpoints" ||
        option === "Slow response times" ||
        option === "Inconsistent experience across channels" ||
        option === "All of the above")) {
      
      addUserMessage(option);
      setConversationStep(2);
      
      // Knowledge-rich response - educate first, then recommend
      if (option === "Disconnected customer touchpoints") {
        addAIMessage(
          "Disconnected touchpoints happen because each channel was built independently. Your website uses one platform, mobile app another, customer service a third, and in-store systems are completely separate. Each works fine in isolation, but they don't share context.\n\nThe traditional approach is to integrate them after the fact. But that creates a fragile web of connections that breaks whenever one system changes.\n\nThe modern approach? A unified customer data platform (CDP) with an experience orchestration layer. Every touchpoint reads from and writes to the same customer profile in real-time. When a customer starts a transaction on mobile, your service team sees it instantly.\n\nOur Digital Experience Strategy Blueprint maps out this exact architecture — from CDP implementation to omnichannel orchestration to personalization engines. It's not theory. It's a battle-tested pattern that reduces integration complexity by 60%.",
          ["Show me the blueprint", "How does the CDP work?", "What's the investment?"]
        );
      } else if (option === "Slow response times") {
        addAIMessage(
          "Slow response times aren't usually about server speed. They're about data retrieval. When a customer service agent needs to help someone, they're switching between 5 different systems to piece together the customer's history.\n\nThe traditional fix is to train agents on 'where to find things.' But that doesn't solve the underlying problem — the data is scattered.\n\nThe solution is a unified customer view that aggregates data from all your systems in real-time. Instead of agents hunting for information, everything they need appears in one interface. For common queries, AI can even suggest responses based on the full context.\n\nOur Digital Experience Strategy Blueprint includes the complete architecture for building this unified view. You get integration patterns, caching strategies, and AI-assisted response systems.",
          ["Explore the blueprint", "How does the unified view work?", "What's the cost?"]
        );
      } else if (option === "Inconsistent experience across channels") {
        addAIMessage(
          "Inconsistent experiences happen because each channel has its own business logic. Your website offers promotions that your mobile app doesn't know about. Your in-store system has different pricing than online. Customer service can't see what marketing promised.\n\nMost organizations try to fix this with better communication between teams. But that's treating the symptom, not the cause. The real problem is decentralized business rules.\n\nThe modern approach is a centralized experience orchestration layer. Business rules, promotions, pricing, and personalization logic live in one place. Every channel consumes the same rules, so customers get consistent experiences everywhere.\n\nOur Digital Experience Strategy Blueprint shows you how to build this orchestration layer. You get rule engine patterns, API gateway designs, and channel integration strategies.",
          ["View the blueprint", "How does orchestration work?", "What's the timeline?"]
        );
      } else {
        addAIMessage(
          "If you're facing all three challenges, you're dealing with what we call 'experience debt' — the accumulated cost of building channels independently without a unified foundation.\n\nThe good news? You don't need to rebuild everything. You need a digital experience platform that sits between your channels and your backend systems, creating a consistent orchestration layer.\n\nHere's the architecture: Customer data platform unifies profiles → experience orchestration layer manages business rules → API gateway connects all channels → personalization engine delivers context → analytics tracks the complete journey.\n\nOur Digital Experience Strategy Blueprint gives you the complete implementation guide. It's not a consulting engagement where we tell you what to do. It's a blueprint you can execute with your own team or ours.",
          ["Show me the blueprint", "What's included?", "What's the investment?"]
        );
      }
      return;
    }
    
    // STEP 2: Handle DevOps-specific challenges (for "Improve delivery speed / DevOps" path)
    if (conversationStep === 1 && selectedGoal === "Improve delivery speed / DevOps" && (
        option === "Security slows down delivery" ||
        option === "Manual compliance checks" ||
        option === "Inconsistent deployment processes" ||
        option === "All of the above")) {
      
      addUserMessage(option);
      setConversationStep(2);
      
      // Knowledge-rich response - educate first, then recommend
      if (option === "Security slows down delivery") {
        addAIMessage(
          "Security slows down delivery when it's treated as a gate at the end of the pipeline. Developers build features, then security reviews them, finds issues, and sends them back. This creates a bottleneck and adversarial relationship.\n\nThe traditional approach is to hire more security people or add more review stages. But that just makes the bottleneck worse.\n\nThe modern approach? Shift security left with automated guardrails. Security policies become code that runs in your CI/CD pipeline. Vulnerabilities are caught during development, not after. Developers get immediate feedback, and security teams focus on policy, not manual reviews.\n\nOur SecDevOps Strategy Blueprint maps out this exact architecture — from policy-as-code to automated scanning to security observability. It's not theory. It's a proven pattern that reduces security review time by 70%.",
          ["Show me the blueprint", "How does policy-as-code work?", "What's the investment?"]
        );
      } else if (option === "Manual compliance checks") {
        addAIMessage(
          "Manual compliance checks happen because compliance requirements are documented in PDFs and spreadsheets, not in code. Before each release, someone manually verifies that all the checkboxes are ticked.\n\nThe traditional fix is to create more detailed checklists. But that doesn't solve the underlying problem — compliance is disconnected from the delivery pipeline.\n\nThe solution is compliance-as-code. Regulatory requirements become automated tests that run on every commit. Your pipeline won't let non-compliant code deploy. Audit trails are generated automatically. Compliance becomes continuous, not periodic.\n\nOur SecDevOps Strategy Blueprint includes the complete framework for implementing compliance-as-code. You get policy templates, audit automation patterns, and evidence collection strategies.",
          ["Explore the blueprint", "How does compliance-as-code work?", "What's the cost?"]
        );
      } else if (option === "Inconsistent deployment processes") {
        addAIMessage(
          "Inconsistent deployments happen because each team has their own scripts, tools, and processes. What works in dev doesn't work in staging. Production deployments require manual steps that only two people know how to do.\n\nMost organizations try to fix this with better documentation. But documentation gets outdated the moment it's written. The real problem is lack of standardization and automation.\n\nThe modern approach is infrastructure-as-code with GitOps. Your entire deployment process is defined in version-controlled code. Every environment is provisioned the same way. Deployments are triggered by Git commits, not manual commands. Rollbacks are just Git reverts.\n\nOur SecDevOps Strategy Blueprint shows you how to build this standardized pipeline. You get IaC patterns, GitOps workflows, and progressive delivery strategies.",
          ["View the blueprint", "How does GitOps work?", "What's the timeline?"]
        );
      } else {
        addAIMessage(
          "If you're facing all three challenges, you're dealing with what we call 'delivery debt' — the accumulated cost of building pipelines without security, compliance, and standardization built in from the start.\n\nThe good news? You don't need to rebuild everything. You need a SecDevOps platform that wraps your existing tools with automated guardrails and standardized workflows.\n\nHere's the architecture: Policy-as-code defines security and compliance rules → automated scanning runs on every commit → infrastructure-as-code ensures consistent environments → GitOps manages deployments → observability tracks everything.\n\nOur SecDevOps Strategy Blueprint gives you the complete implementation guide. It's not a consulting engagement where we tell you what to do. It's a blueprint you can execute with your own team or ours.",
          ["Show me the blueprint", "What's included?", "What's the investment?"]
        );
      }
      return;
    }
    
    // Handle "Explore [service name]" or "Take me to [service name]" options
    if (option.startsWith("Explore ") || option.startsWith("Take me to ")) {
      addUserMessage(option);
      
      const serviceName = option.replace("Explore ", "").replace("Take me to ", "");
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
      
      // Agent behavior: Tell user what you're doing
      addAIMessage("Taking you to the service page...");
      
      // Auto-navigate after brief delay
      setTimeout(() => {
        onClose();
        navigate(serviceUrl);
      }, 2000);
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
    
    // Handle "Connect me with the team" or "Connect me with an architect"
    if (option === "Connect me with the team" || option === "Connect me with an architect" || 
        option === "Yes, connect me with an architect" || option === "Talk to the team") {
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
              placeholder="How can I help you today?"
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
