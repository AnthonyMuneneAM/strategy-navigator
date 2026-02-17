import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Plus, ArrowRight, KeyRound, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";

const OrgAccess = () => {
  const { joinOrg, createOrg } = useOnboarding();
  const [mode, setMode] = useState<"choose" | "join" | "create">("choose");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = () => {
    if (!inviteCode.trim()) return;
    setLoading(true);
    setError("");
    setTimeout(() => {
      const success = joinOrg(inviteCode.trim());
      if (!success) {
        setError("Invalid invite code. Please check and try again.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Step Indicator */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-border" />
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Organisation Access
                </h1>
                <p className="text-sm text-muted-foreground">Step 2 of 3</p>
              </div>
            </div>

            {mode === "choose" && (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Join an existing organisation or create a new one to get started.
                </p>

                <button
                  onClick={() => setMode("join")}
                  className="flex w-full items-center gap-4 rounded-lg border border-border p-5 text-left transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <div className="rounded-lg bg-accent p-3">
                    <KeyRound size={22} className="text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Join an Existing Organisation</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Enter your organisation's invite code
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-muted-foreground" />
                </button>

                <button
                  onClick={() => {
                    setMode("create");
                    createOrg();
                  }}
                  className="flex w-full items-center gap-4 rounded-lg border border-border p-5 text-left transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <div className="rounded-lg bg-accent p-3">
                    <Plus size={22} className="text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Create a New Organisation</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Set up your organisation and become an admin
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-muted-foreground" />
                </button>
              </div>
            )}

            {mode === "join" && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteCode">Organisation Invite Code</Label>
                  <Input
                    id="inviteCode"
                    placeholder="e.g. ADMIN-2026"
                    value={inviteCode}
                    onChange={(e) => { setInviteCode(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                  />
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle size={14} />
                      {error}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Ask your organisation admin for an invite code. Try: ADMIN-2026, MEMBER-2026
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setMode("choose")} className="flex-1">
                    Back
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handleJoin}
                    disabled={!inviteCode.trim() || loading}
                  >
                    {loading ? "Validating…" : "Join Organisation"}
                    {!loading && <ArrowRight size={16} />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrgAccess;
