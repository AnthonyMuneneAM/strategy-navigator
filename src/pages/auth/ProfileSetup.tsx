import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";

const ProfileSetup = () => {
  const { profile, saveProfile } = useOnboarding();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const canContinue = firstName.trim() && lastName.trim() && phone.trim();

  const handleSubmit = () => {
    if (!canContinue) return;
    saveProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: profile?.email || "",
    });
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
          <div className="h-2 w-8 rounded-full bg-border" />
          <div className="h-2 w-8 rounded-full bg-border" />
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <UserCircle size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Complete your profile
                </h1>
                <p className="text-sm text-muted-foreground">
                  Step 1 of 3
                </p>
              </div>
            </div>

            <p className="mb-6 text-sm text-muted-foreground">
              Your details enable collaboration with delivery teams and keep you informed throughout the transformation lifecycle.
            </p>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Sarah"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Mitchell"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Used for delivery communication and urgent notifications only.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={profile?.email || ""} disabled className="bg-muted" />
              </div>

              <Button
                className="mt-2 w-full gap-2"
                onClick={handleSubmit}
                disabled={!canContinue}
              >
                Continue
                <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
