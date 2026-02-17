import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleMicrosoftSSO = () => {
    // Mock Microsoft SSO - in production this would redirect to Azure AD
    console.log("Initiating Microsoft SSO...");
    // Simulate successful authentication
    setTimeout(() => {
      navigate("/onboarding/profile");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-accent/30 to-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-brand">
            <Building2 size={32} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to <span className="text-gradient-brand">TMaaS</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Digital Transformation, simplified
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          {/* Microsoft SSO Button */}
          <Button
            onClick={handleMicrosoftSSO}
            className="w-full gap-3 bg-[#2F2F2F] text-white hover:bg-[#1F1F1F]"
            size="lg"
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
              <rect width="10" height="10" fill="#F25022" />
              <rect x="11" width="10" height="10" fill="#7FBA00" />
              <rect y="11" width="10" height="10" fill="#00A4EF" />
              <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
            </svg>
            Sign in with Microsoft
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
