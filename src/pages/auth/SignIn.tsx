import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";

const SignIn = () => {
  const { signIn } = useOnboarding();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      signIn(email);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>
              DQ
            </span>
            <span className="text-sm font-semibold tracking-wide text-muted-foreground">TMaaS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Transformation Management as a Service
          </p>
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Sign in to your account
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enterprise Single Sign-On powered by Azure AD
              </p>
            </div>

            {/* SSO Button */}
            <Button
              variant="outline"
              className="mb-6 flex w-full items-center justify-center gap-3 border-border py-6 text-sm font-medium"
              onClick={() => {
                setEmail("sarah.mitchell@stcbank.com");
                setTimeout(() => signIn("sarah.mitchell@stcbank.com"), 800);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
                <path d="M11 0H0V11H11V0Z" fill="#F25022" />
                <path d="M23 0H12V11H23V0Z" fill="#7FBA00" />
                <path d="M11 12H0V23H11V12Z" fill="#00A4EF" />
                <path d="M23 12H12V23H23V12Z" fill="#FFB900" />
              </svg>
              Sign in with Microsoft
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                />
              </div>
              <Button
                className="w-full gap-2"
                onClick={handleSignIn}
                disabled={!email || loading}
              >
                {loading ? "Authenticating…" : "Continue"}
                {!loading && <ArrowRight size={16} />}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield size={14} />
                <span>SSO Enabled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 size={14} />
                <span>Enterprise Grade</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to DQ TMaaS Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
