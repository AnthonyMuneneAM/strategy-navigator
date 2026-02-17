import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [firstName, setFirstName] = useState("Sarah"); // Mock pre-filled from SSO
  const [lastName, setLastName] = useState("Mitchell"); // Mock pre-filled from SSO
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/organisation-access");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-accent/30 to-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-1 w-12 bg-border"></div>
            <div className="h-2 w-2 rounded-full bg-border"></div>
            <div className="h-1 w-12 bg-border"></div>
            <div className="h-2 w-2 rounded-full bg-border"></div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">Step 1 of 3</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Complete Your Profile</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We've pre-filled some information from your Microsoft account. Please review and complete your
              profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                First Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Last Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 bg-gradient-brand shadow-brand" size="lg">
              Continue
              <ArrowRight size={18} />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
