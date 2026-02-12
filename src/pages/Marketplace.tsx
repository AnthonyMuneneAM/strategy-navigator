import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Users, Database, ShieldCheck, Filter, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const towers = [
  { id: "dxp", name: "Digital Experience", icon: Globe, color: "text-blue-500" },
  { id: "dws", name: "Digital Workspace", icon: Users, color: "text-purple-500" },
  { id: "dia", name: "Data & Intelligence", icon: Database, color: "text-green-500" },
  { id: "sdo", name: "SecDevOps", icon: ShieldCheck, color: "text-orange-500" },
];

const priceRanges = [
  { id: "under-30", label: "Under $30k", min: 0, max: 30000 },
  { id: "30-50", label: "$30k - $50k", min: 30000, max: 50000 },
  { id: "50-75", label: "$50k - $75k", min: 50000, max: 75000 },
  { id: "75-plus", label: "$75k+", min: 75000, max: Infinity },
];

const durations = [
  { id: "4-6", label: "4-6 weeks" },
  { id: "6-8", label: "6-8 weeks" },
  { id: "8-10", label: "8-10 weeks" },
  { id: "10-12", label: "10-12 weeks" },
  { id: "12-plus", label: "12+ weeks" },
];

const capabilityAreas = {
  dxp: ["Customer Journey", "Omnichannel", "MarTech", "CRM", "Analytics"],
  dws: ["Collaboration", "GRC", "Automation", "Core Systems", "Adoption"],
  dia: ["Data Governance", "Data Platform", "Analytics", "AI/ML", "Data Products"],
  sdo: ["Security", "DevOps", "ITSM", "Observability", "Integration"],
};

// Sample services data
const services = [
  // DESIGN SERVICES
  {
    id: 0,
    tower: "dxp", // Primary tower, but covers all
    type: "design",
    name: "Digital Organisation Strategy",
    description: "Comprehensive digital transformation strategy covering all four execution streams: Digital Experience, Digital Workspace, Data & Intelligence, and SecDevOps.",
    duration: "8-12 weeks",
    deliverables: ["Enterprise architecture blueprint", "4-stream roadmap", "Business case", "Governance model"],
    price: "From $75k",
    tags: ["Enterprise Strategy", "4D Framework", "Digital Transformation", "All Towers"],
  },
  {
    id: 1,
    tower: "dxp",
    type: "design",
    name: "Digital Experience Platform Strategy",
    description: "Define your end-to-end customer experience architecture and transformation roadmap.",
    duration: "4-6 weeks",
    deliverables: ["Architecture blueprint", "Roadmap", "Business case"],
    price: "From $25k",
    tags: ["Customer Journey", "Omnichannel", "CX Strategy"],
  },
  {
    id: 2,
    tower: "dws",
    type: "design",
    name: "Digital Workspace Solutions Strategy",
    description: "Modernize internal collaboration, productivity, and governance platforms.",
    duration: "4-6 weeks",
    deliverables: ["Architecture blueprint", "Governance model", "Roadmap"],
    price: "From $25k",
    tags: ["Collaboration", "Governance", "Productivity"],
  },
  {
    id: 3,
    tower: "dia",
    type: "design",
    name: "Data & Intelligence Strategy",
    description: "Build your data platform architecture, analytics capabilities, and AI roadmap.",
    duration: "5-7 weeks",
    deliverables: ["Data architecture", "Analytics strategy", "AI roadmap"],
    price: "From $30k",
    tags: ["Data Platform", "AI/ML", "Analytics"],
  },
  {
    id: 4,
    tower: "sdo",
    type: "design",
    name: "SecDevOps Strategy",
    description: "Define security posture, DevOps maturity, and platform engineering roadmap.",
    duration: "4-6 weeks",
    deliverables: ["Security architecture", "DevOps roadmap", "Platform strategy"],
    price: "From $25k",
    tags: ["Security", "DevOps", "Platform Engineering"],
  },

  // DEPLOY SERVICES (SaaS) - Digital Experience
  {
    id: 101,
    tower: "dxp",
    type: "deploy-saas",
    name: "Customer Journey & Experience Platform",
    description: "Deploy end-to-end journey orchestration with persona-based experiences and lifecycle management.",
    duration: "8-10 weeks",
    deliverables: ["Journey platform", "Persona models", "Analytics integration"],
    price: "From $45k",
    tags: ["Journey Mapping", "Personalization", "Lifecycle"],
  },
  {
    id: 102,
    tower: "dxp",
    type: "deploy-saas",
    name: "Omnichannel Platform",
    description: "Implement unified channel orchestration across web, mobile, and partner touchpoints.",
    duration: "10-12 weeks",
    deliverables: ["Channel platform", "Unified APIs", "Content delivery"],
    price: "From $55k",
    tags: ["Omnichannel", "API Gateway", "CDN"],
  },
  {
    id: 103,
    tower: "dxp",
    type: "deploy-saas",
    name: "MarTech & Personalization Platform",
    description: "Deploy marketing automation, campaign orchestration, and AI-driven personalization.",
    duration: "8-10 weeks",
    deliverables: ["Marketing automation", "Personalization engine", "Campaign tools"],
    price: "From $50k",
    tags: ["Marketing Automation", "Personalization", "Campaigns"],
  },
  {
    id: 104,
    tower: "dxp",
    type: "deploy-saas",
    name: "CRM & Service Platform",
    description: "Implement CRM with lead-to-revenue lifecycle, service management, and customer interaction tracking.",
    duration: "10-12 weeks",
    deliverables: ["CRM platform", "Service desk", "Customer 360"],
    price: "From $60k",
    tags: ["CRM", "Service Management", "Customer 360"],
  },
  {
    id: 105,
    tower: "dxp",
    type: "deploy-saas",
    name: "CX Analytics & Optimization Platform",
    description: "Deploy experience analytics, A/B testing, and continuous optimization capabilities.",
    duration: "6-8 weeks",
    deliverables: ["Analytics platform", "Testing framework", "Optimization tools"],
    price: "From $40k",
    tags: ["Analytics", "A/B Testing", "Optimization"],
  },

  // DEPLOY SERVICES (SaaS) - Digital Workspace
  {
    id: 201,
    tower: "dws",
    type: "deploy-saas",
    name: "Modern Collaboration & Hybrid Work Platform",
    description: "Deploy integrated collaboration tools, intranet, and hybrid work enablement.",
    duration: "8-10 weeks",
    deliverables: ["Collaboration platform", "Intranet", "Hybrid work tools"],
    price: "From $45k",
    tags: ["Collaboration", "Intranet", "Hybrid Work"],
  },
  {
    id: 202,
    tower: "dws",
    type: "deploy-saas",
    name: "GRC & Compliance Management Platform",
    description: "Implement governance, risk, and compliance framework with policy management and audit tracking.",
    duration: "10-12 weeks",
    deliverables: ["GRC platform", "Policy management", "Compliance dashboard"],
    price: "From $55k",
    tags: ["GRC", "Compliance", "Risk Management"],
  },
  {
    id: 203,
    tower: "dws",
    type: "deploy-saas",
    name: "Back-Office Automation Platform",
    description: "Deploy RPA, workflow automation, and back-office process optimization.",
    duration: "8-10 weeks",
    deliverables: ["RPA platform", "Workflow automation", "Process optimization"],
    price: "From $50k",
    tags: ["RPA", "Automation", "Workflows"],
  },
  {
    id: 204,
    tower: "dws",
    type: "deploy-saas",
    name: "Core Business Systems Platform",
    description: "Implement sector-specific core systems with capability alignment and integration.",
    duration: "12-16 weeks",
    deliverables: ["Core systems", "Integration layer", "Business capabilities"],
    price: "From $75k",
    tags: ["Core Systems", "ERP", "Integration"],
  },
  {
    id: 205,
    tower: "dws",
    type: "deploy-saas",
    name: "Digital Adoption & Productivity Platform",
    description: "Deploy change management tools, training platforms, and productivity analytics.",
    duration: "6-8 weeks",
    deliverables: ["Adoption platform", "Training portal", "Productivity metrics"],
    price: "From $40k",
    tags: ["Change Management", "Training", "Adoption"],
  },

  // DEPLOY SERVICES (SaaS) - Data & Intelligence
  {
    id: 301,
    tower: "dia",
    type: "deploy-saas",
    name: "Data Governance & Quality Platform",
    description: "Deploy data governance framework, quality management, and stewardship tools.",
    duration: "8-10 weeks",
    deliverables: ["Governance platform", "Data catalog", "Quality tools"],
    price: "From $50k",
    tags: ["Data Governance", "Data Quality", "Catalog"],
  },
  {
    id: 302,
    tower: "dia",
    type: "deploy-saas",
    name: "Modern Data Platform",
    description: "Implement cloud data platform with data lake, warehouse, and integration pipelines.",
    duration: "12-14 weeks",
    deliverables: ["Data platform", "ETL pipelines", "Data warehouse"],
    price: "From $70k",
    tags: ["Data Lake", "Data Warehouse", "ETL"],
  },
  {
    id: 303,
    tower: "dia",
    type: "deploy-saas",
    name: "Analytics & BI Platform",
    description: "Deploy enterprise BI with dashboards, self-service analytics, and reporting.",
    duration: "10-12 weeks",
    deliverables: ["BI platform", "Dashboards", "Self-service analytics"],
    price: "From $55k",
    tags: ["BI", "Dashboards", "Self-Service"],
  },
  {
    id: 304,
    tower: "dia",
    type: "deploy-saas",
    name: "AI & ML Operations Platform",
    description: "Implement MLOps platform with model development, deployment, and monitoring.",
    duration: "10-12 weeks",
    deliverables: ["MLOps platform", "Model registry", "Monitoring tools"],
    price: "From $60k",
    tags: ["MLOps", "AI/ML", "Model Management"],
  },
  {
    id: 305,
    tower: "dia",
    type: "deploy-saas",
    name: "Data Monetization & Value Platform",
    description: "Deploy data product management, value measurement, and monetization capabilities.",
    duration: "8-10 weeks",
    deliverables: ["Data products", "Value metrics", "Monetization tools"],
    price: "From $50k",
    tags: ["Data Products", "Monetization", "Value Metrics"],
  },

  // DEPLOY SERVICES (SaaS) - SecDevOps
  {
    id: 401,
    tower: "sdo",
    type: "deploy-saas",
    name: "Zero-Trust Security Platform",
    description: "Deploy zero-trust architecture with identity management, access control, and security monitoring.",
    duration: "10-12 weeks",
    deliverables: ["Zero-trust framework", "IAM platform", "Security monitoring"],
    price: "From $60k",
    tags: ["Zero Trust", "IAM", "Security"],
  },
  {
    id: 402,
    tower: "sdo",
    type: "deploy-saas",
    name: "DevSecOps & CI/CD Platform",
    description: "Implement automated CI/CD pipelines with integrated security scanning and compliance.",
    duration: "8-10 weeks",
    deliverables: ["CI/CD pipelines", "Security scanning", "Deployment automation"],
    price: "From $50k",
    tags: ["CI/CD", "DevSecOps", "Automation"],
  },
  {
    id: 403,
    tower: "sdo",
    type: "deploy-saas",
    name: "IT Service Management Platform",
    description: "Deploy ITSM with incident, problem, change, and service request management.",
    duration: "8-10 weeks",
    deliverables: ["ITSM platform", "Service catalog", "Workflow automation"],
    price: "From $45k",
    tags: ["ITSM", "Service Desk", "ITIL"],
  },
  {
    id: 404,
    tower: "sdo",
    type: "deploy-saas",
    name: "Platform Observability & SRE",
    description: "Implement observability stack with monitoring, logging, tracing, and SRE practices.",
    duration: "8-10 weeks",
    deliverables: ["Observability platform", "Monitoring tools", "SRE framework"],
    price: "From $50k",
    tags: ["Observability", "Monitoring", "SRE"],
  },
  {
    id: 405,
    tower: "sdo",
    type: "deploy-saas",
    name: "Integration & API Management Platform",
    description: "Deploy API gateway, integration platform, and automation orchestration.",
    duration: "10-12 weeks",
    deliverables: ["API gateway", "Integration platform", "Automation tools"],
    price: "From $55k",
    tags: ["API Management", "Integration", "iPaaS"],
  },
];

const Marketplace = () => {
  const [selectedTowers, setSelectedTowers] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("design");
  const [sortBy, setSortBy] = useState("default");

  const toggleTower = (towerId: string) => {
    setSelectedTowers((prev) =>
      prev.includes(towerId) ? prev.filter((id) => id !== towerId) : [...prev, towerId]
    );
  };

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]
    );
  };

  const toggleDuration = (durationId: string) => {
    setSelectedDurations((prev) =>
      prev.includes(durationId) ? prev.filter((id) => id !== durationId) : [...prev, durationId]
    );
  };

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(capability) ? prev.filter((c) => c !== capability) : [...prev, capability]
    );
  };

  // Extract price from string like "From $25k"
  const extractPrice = (priceStr: string): number => {
    const match = priceStr.match(/\$(\d+)k/);
    return match ? parseInt(match[1]) * 1000 : 0;
  };

  // Get available capabilities based on selected towers
  const availableCapabilities = useMemo(() => {
    if (selectedTowers.length === 0) {
      return Object.values(capabilityAreas).flat();
    }
    return selectedTowers.flatMap((tower) => capabilityAreas[tower as keyof typeof capabilityAreas] || []);
  }, [selectedTowers]);

  const filteredAndSortedServices = useMemo(() => {
    let filtered = services.filter((service) => {
      const matchesTower = selectedTowers.length === 0 || selectedTowers.includes(service.tower) || service.id === 0;
      const matchesType = service.type === activeTab;
      const matchesSearch =
        searchQuery === "" ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Price filter
      const servicePrice = extractPrice(service.price);
      const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(rangeId => {
        const range = priceRanges.find(r => r.id === rangeId);
        return range && servicePrice >= range.min && servicePrice < range.max;
      });

      // Duration filter
      const matchesDuration = selectedDurations.length === 0 || selectedDurations.some(durationId => {
        const duration = durations.find(d => d.id === durationId);
        return duration && service.duration.includes(duration.label.split(' ')[0]);
      });

      // Capability filter
      const matchesCapability = selectedCapabilities.length === 0 || selectedCapabilities.some(cap =>
        service.tags.some(tag => tag.toLowerCase().includes(cap.toLowerCase()))
      );

      return matchesTower && matchesType && matchesSearch && matchesPrice && matchesDuration && matchesCapability;
    });

    // Sort services
    if (sortBy === "price-low") {
      filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    } else if (sortBy === "duration-short") {
      filtered.sort((a, b) => {
        const aDuration = parseInt(a.duration.split('-')[0]);
        const bDuration = parseInt(b.duration.split('-')[0]);
        return aDuration - bDuration;
      });
    } else if (sortBy === "duration-long") {
      filtered.sort((a, b) => {
        const aDuration = parseInt(a.duration.split('-')[0]);
        const bDuration = parseInt(b.duration.split('-')[0]);
        return bDuration - aDuration;
      });
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [services, selectedTowers, selectedPriceRanges, selectedDurations, selectedCapabilities, searchQuery, activeTab, sortBy]);

  const getTowerIcon = (towerId: string) => {
    const tower = towers.find((t) => t.id === towerId);
    return tower ? tower.icon : Globe;
  };

  const getTowerColor = (towerId: string) => {
    const tower = towers.find((t) => t.id === towerId);
    return tower ? tower.color : "text-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-accent/60 to-accent/40 pb-12 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Design & Deploy <span className="text-gradient-brand italic">Services</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Architecture-backed transformation services across all four towers.
              From strategic design to ready-to-deploy implementations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Tabs for Service Types */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="design">Design Services</TabsTrigger>
            <TabsTrigger value="deploy-saas">Deploy Services (SaaS)</TabsTrigger>
            <TabsTrigger value="deploy-onprem">Deploy Services (On-Prem)</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-64 shrink-0 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Search</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration-short">Duration: Shortest First</SelectItem>
                    <SelectItem value="duration-long">Duration: Longest First</SelectItem>
                    <SelectItem value="name">Name: A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tower Filter */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">Category</label>
                <div className="space-y-2">
                  {towers.map((tower) => (
                    <label key={tower.id} className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedTowers.includes(tower.id)}
                        onChange={() => toggleTower(tower.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <tower.icon size={16} className={tower.color} />
                      <span className="text-sm text-foreground">{tower.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">Price Range</label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range.id)}
                        onChange={() => togglePriceRange(range.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">Duration</label>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <label key={duration.id} className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(duration.id)}
                        onChange={() => toggleDuration(duration.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{duration.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capability Area Filter */}
              {availableCapabilities.length > 0 && (
                <div>
                  <label className="mb-3 block text-sm font-medium text-foreground">Capability Area</label>
                  <div className="space-y-2">
                    {[...new Set(availableCapabilities)].map((capability) => (
                      <label key={capability} className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCapabilities.includes(capability)}
                          onChange={() => toggleCapability(capability)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{capability}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              {(selectedTowers.length > 0 || selectedPriceRanges.length > 0 || selectedDurations.length > 0 || selectedCapabilities.length > 0 || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTowers([]);
                    setSelectedPriceRanges([]);
                    setSelectedDurations([]);
                    setSelectedCapabilities([]);
                    setSearchQuery("");
                    setSortBy("default");
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Services Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedServices.length} {filteredAndSortedServices.length === 1 ? "service" : "services"} found
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="gap-2 lg:hidden"
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>

            {activeTab === "deploy-onprem" && filteredAndSortedServices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-accent/30 p-12 text-center">
                <ShieldCheck size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">Coming Soon</h3>
                <p className="text-muted-foreground">
                  On-premise deployment services are currently in development.
                  <br />
                  Check back soon or explore our SaaS deployment options.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("deploy-saas")}
                  className="mt-6"
                >
                  View SaaS Services
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredAndSortedServices.map((service, i) => {
                const Icon = getTowerIcon(service.tower);
                const colorClass = getTowerColor(service.tower);
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-lg border border-border bg-accent p-2 ${colorClass}`}>
                          <Icon size={18} />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {service.type === "design" ? "Design" : service.type === "deploy-saas" ? "Deploy (SaaS)" : "Deploy (On-Prem)"}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium text-foreground">{service.price}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto space-y-2 border-t border-border pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="text-foreground">{service.duration}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Deliverables: </span>
                        <span className="text-foreground">{service.deliverables.join(", ")}</span>
                      </div>
                    </div>

                    <Button className="mt-6 w-full rounded-full bg-gradient-brand text-primary-foreground shadow-brand hover:opacity-90">
                      <a href="/service/digital-experience-strategy" className="block w-full">
                        View Details
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
              </div>
            )}

            {filteredAndSortedServices.length === 0 && activeTab !== "deploy-onprem" && (
              <div className="rounded-2xl border border-dashed border-border bg-accent/30 p-12 text-center">
                <p className="text-muted-foreground">No services match your current filters.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTowers([]);
                    setSelectedPriceRanges([]);
                    setSelectedDurations([]);
                    setSelectedCapabilities([]);
                    setSearchQuery("");
                    setSortBy("default");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;
