import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Globe,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Briefcase,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding, Organisation } from "@/contexts/OnboardingContext";

const INDUSTRIES = [
  "Financial Services",
  "Insurance",
  "Healthcare",
  "Retail & E-Commerce",
  "Manufacturing",
  "Technology",
  "Telecommunications",
  "Energy & Utilities",
  "Government & Public Sector",
  "Education",
  "Other",
];

const ORG_SIZES = [
  "1–50 employees",
  "51–200 employees",
  "201–1,000 employees",
  "1,001–5,000 employees",
  "5,001–10,000 employees",
  "10,000+ employees",
];

const CHANNELS = [
  "Mobile App",
  "Web Portal",
  "Contact Centre",
  "Email",
  "WhatsApp / Messaging",
  "Branches / Offices",
  "Partner / Broker Network",
  "Social Media",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "South Africa",
  "Australia",
  "Germany",
  "Singapore",
  "India",
  "Canada",
  "Other",
];

const STEPS = ["Identity", "Context", "Strategy"];

const OrgOnboarding = () => {
  const { saveOrganisation } = useOnboarding();
  const [step, setStep] = useState(0);

  // Identity
  const [orgName, setOrgName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [locations, setLocations] = useState<string[]>([]);

  // Context
  const [products, setProducts] = useState("");
  const [channels, setChannels] = useState<string[]>([]);

  // Strategy
  const [orgStructureFile, setOrgStructureFile] = useState("");
  const [strategyFile, setStrategyFile] = useState("");

  const toggleLocation = (loc: string) =>
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );

  const toggleChannel = (ch: string) =>
    setChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );

  const canContinue = () => {
    if (step === 0) return orgName.trim() && industry && size && locations.length > 0;
    if (step === 1) return products.trim() && channels.length > 0;
    return true; // strategy is optional
  };

  const handleComplete = () => {
    const org: Organisation = {
      name: orgName.trim(),
      website: website.trim(),
      industry,
      size,
      locations,
      products: products.trim(),
      channels,
      orgStructureFile: orgStructureFile || undefined,
      strategyFile: strategyFile || undefined,
    };
    saveOrganisation(org);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Step Indicator */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className={`h-2 w-8 rounded-full ${step >= 0 ? "bg-primary" : "bg-border"}`} />
        </div>

        {/* Sub-step indicators */}
        <div className="mb-6 flex items-center justify-center gap-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  i <= step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Building2 size={22} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        Organisation Identity
                      </h2>
                      <p className="text-sm text-muted-foreground">Tell us about your organisation</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organisation Name *</Label>
                    <Input id="orgName" placeholder="e.g. STC Bank" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://example.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Industry *</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Organisation Size *</Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                        <SelectContent>
                          {ORG_SIZES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Countries of Operation *</Label>
                    <div className="flex flex-wrap gap-2">
                      {COUNTRIES.map((c) => (
                        <Badge
                          key={c}
                          variant={locations.includes(c) ? "default" : "outline"}
                          className="cursor-pointer select-none"
                          onClick={() => toggleLocation(c)}
                        >
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="context"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Briefcase size={22} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        Business Context
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        This improves architecture modelling and service recommendations
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="products">Products & Services *</Label>
                    <Textarea
                      id="products"
                      placeholder="Describe the products and services you provide to your customers…"
                      value={products}
                      onChange={(e) => setProducts(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Customer Interaction Channels *</Label>
                    <p className="text-xs text-muted-foreground">Select all that apply</p>
                    <div className="flex flex-wrap gap-2">
                      {CHANNELS.map((ch) => (
                        <Badge
                          key={ch}
                          variant={channels.includes(ch) ? "default" : "outline"}
                          className="cursor-pointer select-none"
                          onClick={() => toggleChannel(ch)}
                        >
                          {ch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="strategy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Users size={22} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        Strategic Context
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Optional but recommended — accelerates capability modelling
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-border bg-accent/30 p-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Organisation Structure</Label>
                        <p className="mb-3 text-xs text-muted-foreground">
                          Upload an org chart or structure document to accelerate blueprint tailoring.
                        </p>
                        <div
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card p-4 transition-colors hover:border-primary"
                          onClick={() => setOrgStructureFile("org-structure.pdf")}
                        >
                          <Upload size={18} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {orgStructureFile ? orgStructureFile : "Click to upload"}
                          </span>
                          {orgStructureFile && <CheckCircle2 size={16} className="text-primary" />}
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block">Organisation Strategy</Label>
                        <p className="mb-3 text-xs text-muted-foreground">
                          Upload a strategy document to inform transformation priorities.
                        </p>
                        <div
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card p-4 transition-colors hover:border-primary"
                          onClick={() => setStrategyFile("strategy-2026.pdf")}
                        >
                          <Upload size={18} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {strategyFile ? strategyFile : "Click to upload"}
                          </span>
                          {strategyFile && <CheckCircle2 size={16} className="text-primary" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex gap-3">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                  <ArrowLeft size={16} />
                  Back
                </Button>
              )}
              <Button
                className="ml-auto gap-2"
                onClick={() => (step < 2 ? setStep(step + 1) : handleComplete())}
                disabled={!canContinue()}
              >
                {step < 2 ? "Continue" : "Complete Setup"}
                <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrgOnboarding;
