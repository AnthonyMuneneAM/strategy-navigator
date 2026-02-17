import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Store, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/contexts/OnboardingContext";

const OnboardingComplete = () => {
  const { profile, orgName, role } = useOnboarding();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Step Indicator — all complete */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            >
              <CheckCircle2 size={40} className="text-primary" />
            </motion.div>

            <h1
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              You're all set!
            </h1>

            <p className="mt-3 text-muted-foreground">
              Welcome to DQ TMaaS, <span className="font-medium text-foreground">{profile?.firstName}</span>.
            </p>

            <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2">
              {orgName && (
                <Badge variant="secondary" className="text-sm">
                  {orgName}
                </Badge>
              )}
              <Badge variant="outline" className="text-sm capitalize">
                {role === "customer_admin" ? "Organisation Admin" : "Member"}
              </Badge>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={() => navigate("/dashboard/overview")}
              >
                <Sparkles size={18} />
                Start with AI
                <ArrowRight size={16} />
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2"
                size="lg"
                onClick={() => navigate("/marketplace")}
              >
                <Store size={18} />
                Explore Marketplace
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Your organisation profile has been saved and can be updated from your dashboard settings.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingComplete;
