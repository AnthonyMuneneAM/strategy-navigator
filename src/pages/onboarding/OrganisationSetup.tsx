import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Globe,
  Users,
  MapPin,
  Package,
  MessageSquare,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const industries = [
  "Financial Services",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Technology",
  "Telecommunications",
  "Energy & Utilities",
  "Government",
  "Education",
  "Other",
];

const orgSizes = [
  "1-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1,000 employees",
  "1,001-5,000 employees",
  "5,000+ employees",
];

const channels = [
  "Website",
  "Mobile App",
  "Physical Branches",
  "Call Center",
  "Email",
  "Social Media",
  "Partner Channels",
  "Self-Service Portals",
];

const OrganisationSetup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Step 1: Organisation Identity
  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState("");

  // Step 2: Business Context
  const [products, setProducts] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  // Step 3: Strategic Context
  const [orgStructureFile, setOrgStructureFile] = useState<File | null>(null);
  const [strategyFile, setStrategyFile] = useState<File | null>(null);

  const totalSteps = 3;

  const addLocation = () => {
    if (locationInput.trim() && !locations.includes(locationInput.trim())) {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput("");
    }
  };

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location));
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Save organisation data
    console.log("Organisation setup complete:", {
      orgName,
      orgWebsite,
      industry,
      orgSize,
      locations,
      products,
      selectedChannels,
      orgStructureFile,
      strategyFile,
    });
    navigate("/onboarding/complete");
  };

  const isStep1Valid = orgName && orgWebsite && industry && orgSize && locations.length > 0;
  const isStep2Valid = products && selectedChannels.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`h-2 w-2 rounded-full ${
                    s <= step ? "bg-primary" : "bg-border"
                  }`}
                ></div>
                {s < 3 && (
                  <div
                    className={`h-1 w-12 ${
                      s < step ? "bg-primary" : "bg-border"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Organisation Identity */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Organisation Identity</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tell us about your organisation
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Organisation Name <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        type="text"
                        placeholder="e.g., STC Bank"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Organisation Website <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Globe
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        type="url"
                        placeholder="https://www.example.com"
                        value={orgWebsite}
                        onChange={(e) => setOrgWebsite(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Industry <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select industry</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Organisation Size <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={orgSize}
                      onChange={(e) => setOrgSize(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select size</option>
                      {orgSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Business Locations <span className="text-destructive">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <MapPin
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          type="text"
                          placeholder="e.g., United States"
                          value={locationInput}
                          onChange={(e) => setLocationInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
                          className="pl-10"
                        />
                      </div>
                      <Button type="button" onClick={addLocation} variant="outline">
                        Add
                      </Button>
                    </div>
                    {locations.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {locations.map((location) => (
                          <Badge
                            key={location}
                            variant="secondary"
                            className="cursor-pointer px-3 py-1.5"
                            onClick={() => removeLocation(location)}
                          >
                            {location} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Countries where your organisation operates
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Business Context */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Business Context</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Help us understand your business model and customer interactions
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Products & Services <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Package
                        size={18}
                        className="absolute left-3 top-3 text-muted-foreground"
                      />
                      <Textarea
                        placeholder="Describe the products and services you provide to customers..."
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                        className="min-h-32 pl-10"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      What do you sell or provide to your customers?
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Customer Interaction Channels <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {channels.map((channel) => (
                        <div
                          key={channel}
                          onClick={() => toggleChannel(channel)}
                          className={`cursor-pointer rounded-lg border-2 p-3 text-center text-sm transition-all ${
                            selectedChannels.includes(channel)
                              ? "border-primary bg-primary/10 font-medium text-primary"
                              : "border-border bg-accent/30 text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {channel}
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Select all channels where customers interact with your organisation
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Strategic Context */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Strategic Context</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Optional: Upload strategic documents to accelerate capability modelling
                  </p>
                </div>

                <div className="rounded-lg bg-purple-500/10 p-4">
                  <p className="text-sm text-foreground">
                    <strong>Why we ask:</strong> These documents help us understand your strategic direction
                    and accelerate the creation of tailored blueprints and architecture recommendations.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Organisation Structure
                    </label>
                    <div className="rounded-lg border-2 border-dashed border-border bg-accent/30 p-6 text-center">
                      <Upload size={32} className="mx-auto mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm font-medium text-foreground">
                        Upload organisation chart or structure document
                      </p>
                      <p className="mb-4 text-xs text-muted-foreground">
                        PDF, DOCX, or image files up to 10MB
                      </p>
                      <input
                        type="file"
                        id="org-structure"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={(e) => setOrgStructureFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="org-structure">
                        <Button type="button" variant="outline" size="sm" asChild>
                          <span>Choose File</span>
                        </Button>
                      </label>
                      {orgStructureFile && (
                        <p className="mt-3 text-xs text-green-600">
                          ✓ {orgStructureFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Organisation Strategy
                    </label>
                    <div className="rounded-lg border-2 border-dashed border-border bg-accent/30 p-6 text-center">
                      <Upload size={32} className="mx-auto mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm font-medium text-foreground">
                        Upload strategic plan or vision document
                      </p>
                      <p className="mb-4 text-xs text-muted-foreground">
                        PDF, DOCX, or PPT files up to 10MB
                      </p>
                      <input
                        type="file"
                        id="strategy"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => setStrategyFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="strategy">
                        <Button type="button" variant="outline" size="sm" asChild>
                          <span>Choose File</span>
                        </Button>
                      </label>
                      {strategyFile && (
                        <p className="mt-3 text-xs text-green-600">
                          ✓ {strategyFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-accent/50 p-4">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> All uploaded documents are encrypted and stored securely. You can
                      update or remove these documents anytime from your organisation settings.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={
                (step === 1 && !isStep1Valid) ||
                (step === 2 && !isStep2Valid)
              }
              className="gap-2 bg-gradient-brand shadow-brand"
            >
              {step === totalSteps ? "Complete Setup" : "Continue"}
              <ArrowRight size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganisationSetup;
