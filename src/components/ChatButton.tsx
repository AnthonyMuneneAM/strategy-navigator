import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles } from "lucide-react";
import DiagnoseDialog from "./DiagnoseDialog";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide tooltip after 5 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  });

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
                  <Sparkles size={14} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Need help finding the right service?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Chat with our AI to get personalized recommendations
                  </p>
                </div>
              </div>
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-border bg-card"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-brand transition-shadow hover:shadow-elevated"
        >
          <MessageCircle size={24} className="text-primary-foreground" />
          
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-gradient-brand opacity-75 animate-ping"></span>
        </motion.button>
      </div>

      {/* Dialog */}
      <DiagnoseDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatButton;
