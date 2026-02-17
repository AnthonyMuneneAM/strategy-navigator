import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-accent/30 to-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
        >
          <CheckCircle2 size={48} className="text-green-600" />
        </motion.div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to <span className="text-gradient-brand">TMaaS</span>!
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Your organisation has been successfully set up
          </p>

          <div className="my-8 rounded-xl bg-accent/50 p-6">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-foreground">Organisation Profile Created</span>
            </div>
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-foreground">Customer Admin Role Assigned</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-foreground">Dashboard Access Enabled</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">What's Next?</h2>
            <p className="text-sm text-muted-foreground">
              Choose how you'd like to begin your transformation journey
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                // Open diagnose dialog
                window.dispatchEvent(new CustomEvent("openDiagnoseAI"));
                navigate("/dashboard/overview");
              }}
              className="cursor-pointer rounded-xl border-2 border-border bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 text-left transition-all hover:border-primary hover:shadow-elevated"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                <Sparkles size={24} className="text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Start with AI</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Describe your transformation challenge and get personalized service recommendations
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                Launch Diagnose AI
                <ArrowRight size={16} />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/marketplace")}
              className="cursor-pointer rounded-xl border-2 border-border bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 text-left transition-all hover:border-primary hover:shadow-elevated"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                <Package size={24} className="text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Explore Marketplace</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Browse our catalog of design and deployment services across all four towers
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                View Services
                <ArrowRight size={16} />
              </div>
            </motion.div>
          </div>

          <Button
            onClick={() => navigate("/dashboard/overview")}
            variant="outline"
            className="mt-6"
          >
            Go to Dashboard
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          You can update your organisation profile anytime from Settings
        </p>
      </motion.div>
    </div>
  );
};

export default Complete;
