import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles, Brain, Search, ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";
import DiagnoseDialog from "./DiagnoseDialog";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [currentStage, setCurrentStage] = useState<"concierge" | "advisory">("concierge");
  const location = useLocation();

  // Determine stage based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/index") {
      setCurrentStage("concierge");
    } else if (path.includes("/marketplace") || path.includes("/explore")) {
      setCurrentStage("advisory");
    } else {
      setCurrentStage("concierge");
    }
  }, [location]);

  // Stage-specific tooltip content
  const getTooltipContent = () => {
    if (currentStage === "concierge") {
      return {
        icon: Brain,
        title: "New to TMaaS?",
        description: "Chat with our AI to learn about our platform and find the right services",
        cta: "Get Started"
      };
    } else {
      return {
        icon: Search,
        title: "Need service recommendations?",
        description: "Let our AI help you find the perfect transformation services for your needs",
        cta: "Get Recommendations"
      };
    }
  };

  const tooltipContent = getTooltipContent();

  // Hide tooltip after 8 seconds or when user interacts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for custom event to open dialog
  useEffect(() => {
    const handleOpenDiagnose = () => {
      setIsOpen(true);
      setShowTooltip(false);
    };
    
    window.addEventListener('openDiagnoseAI', handleOpenDiagnose);
    return () => window.removeEventListener('openDiagnoseAI', handleOpenDiagnose);
  }, []);

  // Show tooltip again when stage changes (but only briefly)
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentStage]);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="relative mr-2 max-w-xs rounded-2xl border border-border bg-card p-4 shadow-elevated"
            >
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute right-2 top-2 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X size={14} />
              </button>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand">
                  <tooltipContent.icon size={14} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tooltipContent.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tooltipContent.description}
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setShowTooltip(false);
                    }}
                    className="mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    {tooltipContent.cta} →
                  </button>
                </div>
              </div>
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-border bg-card"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Button */}
        <motion.button
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-brand transition-shadow hover:shadow-elevated"
          title={`TMaaS AI ${currentStage === "concierge" ? "Concierge" : "Advisor"}`}
        >
          {currentStage === "concierge" ? (
            <Brain size={24} className="text-primary-foreground" />
          ) : (
            <Search size={24} className="text-primary-foreground" />
          )}
          
          {/* Pulse animation - more subtle for advisory stage */}
          <span className={`absolute inset-0 rounded-full bg-gradient-brand opacity-75 ${
            currentStage === "concierge" ? "animate-ping" : "animate-pulse"
          }`}></span>
          
          {/* Stage indicator */}
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
            {currentStage === "concierge" ? "0" : "1"}
          </div>
        </motion.button>
      </div>

      {/* Dialog */}
      <DiagnoseDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatButton;
