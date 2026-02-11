import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Users, Database, ShieldCheck, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const towers = [
  { id: "dxp", name: "Digital Experience", icon: Globe, color: "text-blue-500" },
  { id: "dws", name: "Digital Workspace", icon: Users, color: "text-purple-500" },
  { id: "dia", name: "Data & Intelligence", icon: Database, color: "text-green-500" },
  { id: "sdo", name: "SecDevOps", icon: ShieldCheck, color: "text-orange-500" },
];

const serviceTypes = [
  { id: "design", name: "Design Services", description: "Strategic architecture and blueprints" },
  { id: "deploy", name: "Deploy Services", description: "Ready-to-execute implementations" },
];

// Sample services data
const services = [
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
    tower: "dxp",
    type: "deploy",
    name: "Customer Onboarding Optimization",
    description: "Streamline and automate your customer onboarding journey with proven patterns.",
    duration: "6-8 weeks",
    deliverables: ["Implemented flows", "Analytics", "Documentation"],
    price: "From $35k",
    tags: ["Automation", "User Experience", "Conversion"],
  },
  {
    id: 3,
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
    id: 4,
    tower: "dws",
    type: "deploy",
    name: "IT Governance Framework Implementation",
    description: "Deploy comprehensive IT governance with policies, workflows, and compliance tracking.",
    duration: "8-10 weeks",
    deliverables: ["Governance framework", "Policies", "Compliance dashboard"],
    price: "From $40k",
    tags: ["GPRC", "Compliance", "Risk Management"],
  },
  {
    id: 5,
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
    id: 6,
    tower: "dia",
    type: "deploy",
    name: "Business Intelligence Platform",
    description: "Deploy modern BI platform with dashboards, reporting, and self-service analytics.",
    duration: "10-12 weeks",
    deliverables: ["BI platform", "Dashboards", "Training"],
    price: "From $50k",
    tags: ["BI", "Dashboards", "Self-Service"],
  },
  {
    id: 7,
    tower: "sdo",
    type: "design",
    name: "SecDevOps Strategy",
    description: "Define security posture, DevOps maturity, and platform engineering roadmap.",
    duration: "4-6 weeks",
    deliverables: ["Security architecture", "DevOps roadmap", "Platform strategy"],
    price: "From $25k",
    tags: ["Security", "DevOps", "Platform Engineering"],
  },
  {
    id: 8,
    tower: "sdo",
    type: "deploy",
    name: "CI/CD Pipeline Implementation",
    description: "Build automated deployment pipelines with security scanning and compliance checks.",
    duration: "6-8 weeks",
    deliverables: ["CI/CD pipelines", "Security integration", "Documentation"],
    price: "From $35k",
    tags: ["Automation", "CI/CD", "Security"],
  },
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedTowers, setSelectedTowers] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTower = (towerId: string) => {
    setSelectedTowers((prev) =>
      prev.includes(towerId) ? prev.filter((id) => id !== towerId) : [...prev, towerId]
    );
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    );
  };

  const filteredServices = services.filter((service) => {
    const matchesTower = selectedTowers.length === 0 || selectedTowers.includes(service.tower);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(service.type);
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTower && matchesType && matchesSearch;
  });

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
              Services <span className="text-gradient-brand italic">Marketplace</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Browse architecture-backed transformation services across all four towers.
              From strategic design to ready-to-deploy implementations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
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

              {/* Service Type Filter */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">Service Type</label>
                <div className="space-y-2">
                  {serviceTypes.map((type) => (
                    <label key={type.id} className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type.id)}
                        onChange={() => toggleType(type.id)}
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-foreground">{type.name}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tower Filter */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">Transformation Tower</label>
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

              {/* Clear Filters */}
              {(selectedTowers.length > 0 || selectedTypes.length > 0 || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTowers([]);
                    setSelectedTypes([]);
                    setSearchQuery("");
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
                {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"} found
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

            <div className="grid gap-6 md:grid-cols-2">
              {filteredServices.map((service, i) => {
                const Icon = getTowerIcon(service.tower);
                const colorClass = getTowerColor(service.tower);
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-lg border border-border bg-accent p-2 ${colorClass}`}>
                          <Icon size={18} />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {service.type === "design" ? "Design" : "Deploy"}
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

                    <div className="mt-4 space-y-2 border-t border-border pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="text-foreground">{service.duration}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Deliverables: </span>
                        <span className="text-foreground">{service.deliverables.join(", ")}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="mt-6 w-full rounded-full bg-gradient-brand text-primary-foreground shadow-brand hover:opacity-90"
                    >
                      View Details
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-accent/30 p-12 text-center">
                <p className="text-muted-foreground">No services match your current filters.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTowers([]);
                    setSelectedTypes([]);
                    setSearchQuery("");
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
