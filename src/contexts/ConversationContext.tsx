import { createContext, useContext, useState, ReactNode } from "react";

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

interface ConversationContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  conversationStep: number;
  setConversationStep: (step: number) => void;
  selectedGoal: string;
  setSelectedGoal: (goal: string) => void;
  hasActiveConversation: boolean;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationStep, setConversationStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState("");

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
    setConversationStep(0);
    setSelectedGoal("");
  };

  const hasActiveConversation = messages.length > 0;

  return (
    <ConversationContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        conversationStep,
        setConversationStep,
        selectedGoal,
        setSelectedGoal,
        hasActiveConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
};
