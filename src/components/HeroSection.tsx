import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiagnoseDialog from "./DiagnoseDialog";
import { useConversation } from "@/contexts/ConversationContext";

const HeroSection = () => {
  const [problem, setProblem] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { hasActiveConversation } = useConversation();

  const handleSubmit = () => {
    if (problem.trim()) {
      setIsDialogOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-accent/60 to-accent/40 pb-20 pt-32 md:pb-28 md:pt-40 overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand/30 via-brand-glow/20 to-transparent blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-orange-400/25 via-brand/15 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-gradient-to-t from-brand-glow/20 to-transparent blur-[90px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold leading-[1.15] text-foreground md:text-6xl"
        >
          Digital Transformation,
          <br />
          <span className="text-gradient-brand italic">simplified.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Turn your real business problems into architecture-backed,
          <br className="hidden md:block" />
          ready-to-launch transformation blueprints.
        </motion.p>

        {/* Butler Embedded Chat Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
            {/* Butler Greeting */}
            <div className="flex items-start gap-3 border-b border-border/50 px-5 py-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white text-sm font-medium mt-0.5">
                B
              </div>
              <div className="text-sm text-foreground leading-relaxed text-left">
                Hi, I'm Butler, your guide to achieving seamless digital transformation. Whether you're exploring, designing, or deploying your strategy, I'm here to make it easier.
              </div>
            </div>

            {/* Input Row */}
            <div className="flex items-center gap-2 px-4 py-3">
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can I help you today?"
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <Button
                onClick={handleSubmit}
                disabled={!problem.trim()}
                size="sm"
                className="h-8 w-8 shrink-0 rounded-full bg-gradient-brand p-0 text-white shadow-brand hover:opacity-90 disabled:opacity-50"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Breadcrumbs - Butler's 4 transformation goals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            { text: "Improve customer experience", action: "Improve customer experience" },
            { text: "Improve internal operations", action: "Improve internal operations" },
            { text: "Unlock value from data", action: "Unlock value from data" },
            { text: "Improve delivery speed / DevOps", action: "Improve delivery speed / DevOps" }
          ].map((item) => (
            <button
              key={item.text}
              onClick={() => {
                setProblem(item.action);
                setIsDialogOpen(true);
              }}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
            >
              {item.text}
            </button>
          ))}
        </motion.div>
      </div>

      <DiagnoseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialProblem={problem}
      />
    </section>
  );
};

export default HeroSection;
