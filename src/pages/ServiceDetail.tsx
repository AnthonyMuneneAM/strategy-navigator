import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Globe, CheckCircle2, TrendingUp, Users, Target, Download, Share2, Star, Clock, Award, Zap, Shield, BarChart3, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";

// Dashboard Metric Card Component with alternating animations
const DashboardMetricCard = ({
  icon: Icon,
  title,
  description,
  metricLabel,
  percentage,
  secondaryPercentage,
  secondaryLabel,
  gradient,
  textColor,
  borderColor,
  delay,
  isCustomGradient = false
}: {
  icon: any;
  title: string;
  description: string;
  metricLabel: string;
  percentage: number;
  secondaryPercentage: number;
  secondaryLabel: string;
  gradient: string;
  textColor: string;
  borderColor: string;
  delay: number;
  isCustomGradient?: boolean;
}) => {
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // Start with description visible for 4 seconds, then alternate every 5 seconds
    const initialTimer = setTimeout(() => {
      setShowMetrics(true);
    }, 4000);

    const interval = setInterval(() => {
      setShowMetrics((prev) => !prev);
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`flex items-center gap-4 rounded-xl border ${borderColor} bg-white p-4 shadow-sm transition-all hover:shadow-lg`}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, type: "spring", stiffness: 200 }}
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-lg ${!isCustomGradient ? gradient : ''}`}
        style={isCustomGradient ? { background: gradient } : {}}
      >
        <Icon size={24} className="text-white" />
      </motion.div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-h-[32px]">
            <AnimatePresence mode="wait">
              {!showMetrics ? (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xs font-semibold text-slate-600 block mb-0.5">{title}</span>
                  <p className="text-[10px] leading-tight text-slate-500">
                    {description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-baseline gap-2"
                >
                  <span className={`text-2xl font-bold ${textColor}`}>
                    {percentage}%
                  </span>
                  <span className="text-[10px] text-slate-500">{metricLabel}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {showMetrics && (
            <motion.div
              key="bars"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${!isCustomGradient ? gradient : ''}`}
                  style={isCustomGradient ? { background: gradient } : {}}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${secondaryPercentage}%` }}
                    transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${textColor.replace('text-', 'bg-')}/40`}
                  />
                </div>
                <span className="text-[9px] text-slate-400 whitespace-nowrap">{secondaryLabel}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const ServiceDetail = () => {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [gradientIndex, setGradientIndex] = useState(0);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsPlaceholderRef = useRef<HTMLDivElement>(null);

  // Subtle gradient variations using DQ brand colors
  const gradients = [
    'linear-gradient(135deg, hsl(11 96% 60% / 0.15), hsl(25 100% 62% / 0.12), hsl(200 80% 60% / 0.10))',
    'linear-gradient(135deg, hsl(25 100% 62% / 0.15), hsl(200 80% 60% / 0.12), hsl(220 70% 55% / 0.10))',
    'linear-gradient(135deg, hsl(200 80% 60% / 0.15), hsl(220 70% 55% / 0.12), hsl(11 96% 60% / 0.10))',
    'linear-gradient(135deg, hsl(220 70% 55% / 0.15), hsl(11 96% 60% / 0.12), hsl(25 100% 62% / 0.10))',
  ];

  // Rotate gradients every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll to fade gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 500;
      
      if (scrollPosition <= fadeStart) {
        setScrollOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        const opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setScrollOpacity(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle sticky tabs
  useEffect(() => {
    const handleScroll = () => {
      if (tabsPlaceholderRef.current) {
        const rect = tabsPlaceholderRef.current.getBoundingClientRect();
        const navbarHeight = 64; // Height of navbar
        
        // Tabs become sticky when they reach the navbar
        setIsTabsSticky(rect.top <= navbarHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceData = {
    name: "Digital Experience Strategy",
    category: "Digital Experience",
    type: "Design",
    tower: "Digital Experience",
    price: "From $25k",
    duration: "4-6 weeks",
    capabilities: ["Customer Journey", "Omnichannel", "MarTech", "CRM", "Analytics"],
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Animated Gradient Background */}
      <div 
        className="fixed inset-0 transition-all duration-[3000ms] ease-in-out pointer-events-none"
        style={{
          background: gradients[gradientIndex],
          opacity: scrollOpacity,
        }}
      />
      
      {/* Gradient to White Fade Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.7) 80%, rgb(255, 255, 255) 100%)',
          opacity: scrollOpacity > 0.3 ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent pb-14 pt-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <a
              href="/marketplace"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to Marketplace
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2">
              {/* Icon and Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-3"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand shadow-lg">
                  <Globe size={28} className="text-primary-foreground" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">Digital Experience</Badge>
                  <Badge variant="secondary">Design Service</Badge>
                  <Badge variant="outline" className="gap-1">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    4.8 Rating
                  </Badge>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold text-foreground md:text-5xl"
              >
                Digital Experience Strategy
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-lg leading-relaxed text-muted-foreground"
              >
                Define the end-to-end customer experience architecture that enables organisations to deliver
                seamless, scalable, and insight-driven digital interactions across channels, journeys, and service
                touchpoints.
              </motion.p>

              {/* Key Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid gap-4 sm:grid-cols-2"
              >
                {[
                  { icon: Zap, label: "Architecture-First", color: "text-blue-600" },
                  { icon: Shield, label: "Governance", color: "text-purple-600" },
                  { icon: BarChart3, label: "Scalable", color: "text-green-600" },
                  { icon: Award, label: "Execution-Ready", color: "text-orange-600" },
                ].map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
                    <feature.icon size={20} className={feature.color} />
                    <span className="text-sm font-medium text-foreground">{feature.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Sticky Sidebar Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                {/* Price */}
                <div className="mb-5 text-center">
                  <div className="mb-1 text-xs font-medium text-muted-foreground">Starting Investment</div>
                  <div className="text-3xl font-bold text-foreground">$25k</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Fixed pricing available</div>
                </div>

                {/* Quick Stats */}
                <div className="mb-5 space-y-3 rounded-xl border border-border bg-accent/30 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={14} />
                      Duration
                    </div>
                    <span className="text-xs font-semibold text-foreground">4-6 weeks</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Award size={14} />
                      Service Type
                    </div>
                    <span className="text-xs font-semibold text-foreground">Design</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe size={14} />
                      Tower
                    </div>
                    <span className="text-xs font-semibold text-foreground">Digital Experience</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full rounded-xl bg-gradient-brand text-primary-foreground shadow-brand hover:opacity-90 hover:shadow-lg transition-all"
                  onClick={() => setRequestDialogOpen(true)}
                >
                  Request Service
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Request Dialog */}
      <ServiceRequestDialog
        open={requestDialogOpen}
        onOpenChange={setRequestDialogOpen}
        service={serviceData}
      />

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-[1400px] px-8">
          <Tabs defaultValue="overview" className="w-full">
            {/* Placeholder for sticky tabs */}
            <div ref={tabsPlaceholderRef} className="h-0" />
            
            {/* Enhanced Tab Navigation with Sticky Effect */}
            <div 
              ref={tabsRef}
              className={`mb-8 border-b border-border transition-all duration-300 ${
                isTabsSticky 
                  ? 'fixed top-16 left-0 right-0 z-40 bg-white shadow-sm py-0' 
                  : 'relative'
              }`}
            >
              <div className={`${isTabsSticky ? 'mx-auto max-w-[1400px] px-8' : ''}`}>
                <div className="overflow-x-auto">
                  <TabsList className="inline-flex h-auto w-full min-w-max gap-8 bg-transparent p-0 lg:w-auto">
                    <TabsTrigger 
                      value="overview" 
                      className="relative rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="deliverables"
                      className="relative rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                    >
                      Deliverables
                    </TabsTrigger>
                    <TabsTrigger 
                      value="inputs"
                      className="relative rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                    >
                      Required Inputs
                    </TabsTrigger>
                    <TabsTrigger 
                      value="methodology"
                      className="relative rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                    >
                      Methodology
                    </TabsTrigger>
                    <TabsTrigger 
                      value="impact"
                      className="relative rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
                    >
                      Impact
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-16">
              {/* Visual Feature Showcase - Inspired by Atlassian */}
              <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-accent/20 p-8 md:p-12">
                <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <Badge className="mb-4 bg-primary/10 text-primary">Connect and Communicate</Badge>
                    <h2 className="mb-4 text-3xl font-bold text-foreground">
                      Seamless Digital Experience Architecture
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                      Link and sync customer journeys, touchpoints, and engagement strategies to keep your digital
                      experience architecture aligned, scalable, and execution-ready.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "End-to-end journey orchestration",
                        "Unified omnichannel architecture",
                        "Real-time personalization engine",
                        "Integrated analytics framework"
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                            <CheckCircle2 size={14} className="text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Visual Mockup Area */}
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl">
                      <div className="flex h-full flex-col justify-center gap-4 p-8">
                        {/* Dashboard Card 1 - Customer Journey */}
                        <DashboardMetricCard
                          icon={Users}
                          title="Journey Completion"
                          description="87% of customers complete their end-to-end journey without drop-offs"
                          metricLabel="Completion Rate"
                          percentage={87}
                          secondaryPercentage={65}
                          secondaryLabel="Cross-channel engagement"
                          gradient="bg-gradient-brand"
                          textColor="text-primary"
                          borderColor="border-primary/20"
                          delay={0.2}
                        />

                        {/* Dashboard Card 2 - Omnichannel */}
                        <DashboardMetricCard
                          icon={Globe}
                          title="Channel Coverage"
                          description="92% of touchpoints integrated across web, mobile, and in-store"
                          metricLabel="Integration Score"
                          percentage={92}
                          secondaryPercentage={78}
                          secondaryLabel="Real-time sync rate"
                          gradient="bg-gradient-navy"
                          textColor="text-[hsl(222,47%,11%)]"
                          borderColor="border-[hsl(222,47%,11%)]/20"
                          delay={0.4}
                        />

                        {/* Dashboard Card 3 - Analytics */}
                        <DashboardMetricCard
                          icon={BarChart3}
                          title="Data Accuracy"
                          description="95% accuracy in real-time customer insights and behavioral predictions"
                          metricLabel="Prediction Accuracy"
                          percentage={95}
                          secondaryPercentage={88}
                          secondaryLabel="Data freshness score"
                          gradient="linear-gradient(135deg, hsl(25 100% 62%), hsl(11 96% 60%))"
                          textColor="text-primary"
                          borderColor="border-primary/20"
                          delay={0.6}
                          isCustomGradient
                        />
                      </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                    <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-[hsl(222,47%,11%)]/10 blur-2xl" />
                  </div>
                </div>
              </div>

              {/* Strategic Positioning */}
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                    <Target size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Strategic Positioning</h2>
                    <p className="text-sm text-muted-foreground">Foundation for transformation success</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <p className="text-lg leading-relaxed text-foreground">
                    This service establishes the structural foundations required to orchestrate marketing, sales, and
                    service experiences across the full growth lifecycle. Our approach emphasizes architecture-first
                    thinking, ensuring scalability and governance while creating long-term value through direct
                    alignment between experience strategy and execution.
                  </p>
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <div className="mb-8 text-center">
                  <Badge className="mb-4 bg-primary/10 text-primary">Measurable Results</Badge>
                  <h2 className="text-3xl font-bold text-foreground">Business Impact You Can Track</h2>
                  <p className="mt-3 text-muted-foreground">Real outcomes from architecture-driven transformation</p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      icon: TrendingUp,
                      title: "Customer Acquisition & Conversion",
                      description:
                        "Architecture-driven design optimizes journey orchestration, reducing friction and improving conversion rates across all touchpoints.",
                      stat: "25-40%",
                      statLabel: "Conversion Lift"
                    },
                    {
                      icon: Users,
                      title: "Customer Lifetime Value & Retention",
                      description:
                        "Unified experience architecture enables personalized engagement strategies that increase retention and maximize CLV.",
                      stat: "30-50%",
                      statLabel: "CLV Increase"
                    },
                    {
                      icon: Target,
                      title: "Digital Engagement Performance",
                      description:
                        "Integrated analytics and optimization frameworks drive continuous improvement in experience quality and business outcomes.",
                      stat: "20-35%",
                      statLabel: "Engagement Boost"
                    },
                  ].map((metric, idx) => (
                    <motion.div
                      key={metric.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-elevated hover:border-primary/20"
                    >
                      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100" />
                      
                      {/* Stat Badge */}
                      <div className="mb-4 inline-flex flex-col items-start gap-1 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-3">
                        <div className="text-2xl font-bold text-primary">{metric.stat}</div>
                        <div className="text-xs font-medium text-muted-foreground">{metric.statLabel}</div>
                      </div>

                      {/* Icon */}
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm transition-transform group-hover:scale-105">
                        <metric.icon size={24} className="text-primary" />
                      </div>
                      
                      <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary">{metric.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{metric.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Capability Areas */}
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                    <Layers size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Capability Areas Covered</h2>
                    <p className="text-sm text-muted-foreground">End-to-end architecture definition</p>
                  </div>
                </div>
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                  Our Design Services provide end-to-end architecture definition across the following capability areas.
                  By covering these capability areas, we prevent siloed implementations, ensure long-term scalability,
                  and align strategy directly to execution.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Customer Journey & Experience Strategy",
                      description:
                        "Define persona models, lifecycle journeys, service design principles, and governance frameworks across growth stages.",
                      icon: Users,
                      color: "text-blue-600",
                      bgColor: "bg-blue-500/10"
                    },
                    {
                      title: "Omnichannel Platform Architecture",
                      description:
                        "Design the digital channel ecosystem (web, mobile, portals, branch, partner channels) with unified orchestration and delivery models.",
                      icon: Globe,
                      color: "text-purple-600",
                      bgColor: "bg-purple-500/10"
                    },
                    {
                      title: "MarTech & Personalisation Architecture",
                      description:
                        "Define campaign orchestration, marketing technology stack alignment, content governance, and personalisation strategy.",
                      icon: Zap,
                      color: "text-green-600",
                      bgColor: "bg-green-500/10"
                    },
                    {
                      title: "CRM & Service Architecture",
                      description:
                        "Design lead-to-revenue lifecycle models, CRM operating structures, and customer interaction frameworks.",
                      icon: Target,
                      color: "text-orange-600",
                      bgColor: "bg-orange-500/10"
                    },
                    {
                      title: "CX Analytics & Optimisation",
                      description:
                        "Establish experimentation models, performance analytics frameworks, and feedback loops for continuous optimisation.",
                      icon: BarChart3,
                      color: "text-pink-600",
                      bgColor: "bg-pink-500/10"
                    },
                  ].map((capability, i) => (
                    <motion.div
                      key={capability.title}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-elevated hover:border-primary/20"
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${capability.bgColor} shadow-sm transition-transform group-hover:scale-105`}>
                        <capability.icon size={20} className={capability.color} />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">{capability.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Deliverables Tab */}
            <TabsContent value="deliverables" className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Service Deliverables</h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  The deliverables focus on designing and implementing a robust Digital Experience practice. They are
                  structured across four stages of the Design service, ensuring tangible, executive-ready, and
                  implementation-oriented outputs.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      stage: "Envision Stage",
                      deliverable: "Design Report",
                      description:
                        "Structured documentation of the Digital Experience practice design and strategy, including architecture principles, capability maps, and transformation roadmap.",
                      items: [
                        "Architecture principles & patterns",
                        "Capability maturity assessment",
                        "Transformation roadmap",
                        "Governance framework",
                      ],
                    },
                    {
                      stage: "Model Stage",
                      deliverable: "Design Infographic",
                      description:
                        "Executive-ready visual summary of the practice design, platform architecture, and expected outcomes.",
                      items: [
                        "Platform architecture diagram",
                        "Journey orchestration model",
                        "Technology stack overview",
                        "Expected business outcomes",
                      ],
                    },
                    {
                      stage: "Specify Stage",
                      deliverable: "Design Specifications",
                      description:
                        "Platform requirements and high-level solution designs, including integration architecture, orchestration models, and governance structures.",
                      items: [
                        "Functional requirements",
                        "Integration architecture",
                        "Data & analytics specifications",
                        "Security & compliance requirements",
                      ],
                    },
                    {
                      stage: "Prototype Stage",
                      deliverable: "Design Prototypes",
                      description:
                        "Practical prototypes demonstrating solution behaviour across journeys and channels, validating orchestration logic and reducing implementation ambiguity.",
                      items: [
                        "Journey prototypes",
                        "Channel experience mockups",
                        "Orchestration flow validation",
                        "User testing insights",
                      ],
                    },
                  ].map((stage) => (
                    <div key={stage.stage} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-elevated hover:border-primary/20">
                      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-3 font-semibold">
                            {stage.stage}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">{stage.deliverable}</h3>
                        </div>
                        <CheckCircle2 size={24} className="text-primary transition-transform group-hover:scale-110" />
                      </div>
                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {stage.items.map((item) => (
                          <div key={item} className="flex items-center gap-2.5 rounded-lg bg-accent/30 px-3 py-2 text-sm text-foreground">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Required Inputs Tab */}
            <TabsContent value="inputs" className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Required Inputs</h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  To ensure the Digital Experience Strategy is contextually relevant and executable, we require access
                  to the following organizational assets and documentation. These inputs enable us to align the
                  architecture with your strategic objectives and operational realities.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Business Vision",
                      description:
                        "Strategic direction and business model documentation that guides transformation priorities.",
                      items: [
                        "Corporate strategy & strategic objectives",
                        "Business model canvas & value propositions",
                        "Value streams & revenue models",
                        "Market positioning & competitive landscape",
                      ],
                      icon: Target,
                      color: "text-blue-600",
                      bgColor: "bg-blue-500/10",
                    },
                    {
                      title: "Enterprise Assets",
                      description:
                        "Current state documentation of business capabilities, data, applications, and technology infrastructure.",
                      items: [
                        "Business capability models",
                        "Data architecture & data catalog",
                        "Application portfolio & integrations",
                        "Technology stack & infrastructure",
                      ],
                      icon: Globe,
                      color: "text-purple-600",
                      bgColor: "bg-purple-500/10",
                    },
                    {
                      title: "Experience Assets",
                      description:
                        "Customer and market insights that inform experience design and channel strategy.",
                      items: [
                        "Customer segments & personas",
                        "Customer journeys & pain points",
                        "Digital touchpoints & channels",
                        "Experience metrics & feedback",
                      ],
                      icon: Users,
                      color: "text-green-600",
                      bgColor: "bg-green-500/10",
                    },
                    {
                      title: "Transformation Portfolio",
                      description:
                        "Existing transformation initiatives and requirements that need to be integrated or aligned.",
                      items: [
                        "Transformation roadmaps & timelines",
                        "Active initiatives & projects",
                        "Business requirements & use cases",
                        "Constraints & dependencies",
                      ],
                      icon: TrendingUp,
                      color: "text-orange-600",
                      bgColor: "bg-orange-500/10",
                    },
                  ].map((input) => (
                    <div key={input.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-elevated hover:border-primary/20">
                      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="mb-5 flex items-start gap-4">
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${input.bgColor} shadow-sm transition-transform group-hover:scale-105`}>
                          <input.icon size={24} className={input.color} />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">{input.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{input.description}</p>
                        </div>
                      </div>
                      <div className="ml-[72px] space-y-2.5">
                        {input.items.map((item) => (
                          <div key={item} className="flex items-start gap-3 rounded-lg bg-accent/30 px-3 py-2">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                            <span className="text-sm text-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="mb-2 font-semibold text-foreground">Input Flexibility</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We understand that not all organizations have complete documentation across all areas. Our delivery
                    approach includes discovery workshops to capture missing information and validate existing assets.
                    The quality and completeness of inputs directly impacts the speed and precision of delivery.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Methodology Tab */}
            <TabsContent value="methodology" className="space-y-12">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">The DQ Methodology</h2>
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                  An architecture-first approach that combines structured frameworks, proven practices, and AI-accelerated
                  delivery to ensure scalable, executable transformation outcomes.
                </p>

                {/* Design Method */}
                <div className="mb-12 rounded-2xl border border-border bg-card p-8">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    The DQ Design Method — Best Practices, Yet Targeted Designs
                  </h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    The design approach integrates four essential dimensions to deliver architecture that is both
                    industry-aligned and contextually relevant:
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "Framework Reference",
                        description:
                          "Structured blueprints aligned with industry standards ensure architectural integrity and cohesion.",
                      },
                      {
                        title: "Best Practices & Standards",
                        description:
                          "Incorporates proven global practices to ensure scalability and future readiness.",
                      },
                      {
                        title: "Client Context",
                        description:
                          "Tailors the design to the organisation's strategic objectives, maturity, and operational realities.",
                      },
                      {
                        title: "Reference Case",
                        description:
                          "Leverages comparable implementations to validate decisions and optimise outcomes.",
                      },
                    ].map((dimension) => (
                      <div key={dimension.title} className="rounded-xl border border-border bg-accent/30 p-5">
                        <h4 className="mb-2 font-semibold text-foreground">{dimension.title}</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">{dimension.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DBP Foundation */}
                <div className="mb-12">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    The DQ Digital Business Platform (DBP) Foundation
                  </h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Digital Experience Strategy is anchored within the DQ Digital Business Platform (DBP), composed of
                    four integrated pillars that operate as an integrated architecture rather than standalone initiatives:
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { name: "Digital Experience", color: "bg-blue-500" },
                      { name: "Digital Workspace", color: "bg-purple-500" },
                      { name: "Digital Intelligence & Analytics", color: "bg-green-500" },
                      { name: "Digital SecDevOps", color: "bg-orange-500" },
                    ].map((pillar) => (
                      <div
                        key={pillar.name}
                        className="rounded-xl border border-border bg-card p-5 text-center transition-shadow hover:shadow-elevated"
                      >
                        <div className={`mx-auto mb-3 h-2 w-12 rounded-full ${pillar.color}`}></div>
                        <p className="text-sm font-medium text-foreground">{pillar.name}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    These pillars enable real-time insight, seamless workflows, and cross-functional orchestration across
                    the enterprise.
                  </p>
                </div>

                {/* AI-Accelerated Blueprints */}
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    Framework & AI-Accelerated Blueprints
                  </h3>
                  <p className="mb-6 leading-relaxed text-foreground">
                    DQ's AI-Accelerated Blueprints convert framework-driven platform designs into executable outputs. By
                    combining structured architecture with AI-assisted prototyping and build acceleration, this approach:
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Reduces time to market",
                      "Lowers transformation cost",
                      "Increases solution agility",
                      "Produces validated, implementation-ready outputs",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="shrink-0 text-primary" />
                        <span className="text-sm font-medium text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact" className="space-y-12">
              {/* Hero Stats Section */}
              <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/20 p-8 md:p-12">
                <div className="relative z-10">
                  <Badge className="mb-4 bg-primary/10 text-primary">Proven Results</Badge>
                  <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Business Impact & ROI</h2>
                  <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
                    Our architecture-first approach delivers measurable business outcomes across key performance indicators.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { value: "15-30%", label: "Conversion Rate Improvement" },
                      { value: "20-40%", label: "Customer Lifetime Value Increase" },
                      { value: "25-50%", label: "Faster Time-to-Market" },
                      { value: "30-60%", label: "Reduced Complexity" }
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
                      >
                        <div className="mb-2 text-3xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-8 -left-8 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
              </div>

              {/* Expected Outcomes */}
              <div>
                <h3 className="mb-6 text-2xl font-bold text-foreground">Expected Outcomes</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      metric: "15-30%",
                      description: "Improvement in customer acquisition and conversion rates",
                      icon: TrendingUp,
                      color: "text-blue-600",
                      bgColor: "bg-blue-500/10"
                    },
                    {
                      metric: "20-40%",
                      description: "Increase in customer lifetime value through optimized engagement",
                      icon: Users,
                      color: "text-purple-600",
                      bgColor: "bg-purple-500/10"
                    },
                    {
                      metric: "25-50%",
                      description: "Reduction in time-to-market for new digital experiences",
                      icon: Zap,
                      color: "text-green-600",
                      bgColor: "bg-green-500/10"
                    },
                    {
                      metric: "30-60%",
                      description: "Decrease in integration and orchestration complexity",
                      icon: Shield,
                      color: "text-orange-600",
                      bgColor: "bg-orange-500/10"
                    },
                  ].map((outcome, idx) => (
                    <motion.div 
                      key={outcome.description}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-elevated hover:border-primary/20"
                    >
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${outcome.bgColor} transition-transform group-hover:scale-105`}>
                        <outcome.icon size={24} className={outcome.color} />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 text-2xl font-bold text-primary">{outcome.metric}</div>
                        <p className="text-sm leading-relaxed text-foreground">{outcome.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Who This Service Is For */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="mb-4 text-2xl font-bold text-foreground">Who This Service Is For</h3>
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  This service is designed for senior executives and transformation leaders who need to establish or
                  modernize their digital experience capabilities:
                </p>
                <div className="flex flex-wrap gap-3">
                  {["CIOs", "CDOs", "Heads of Digital", "Marketing Directors", "Transformation Leads"].map(
                    (role) => (
                      <Badge key={role} variant="secondary" className="px-4 py-2 text-sm">
                        {role}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center md:p-12">
                <h3 className="mb-4 text-2xl font-bold text-foreground">Ready to Transform Your Digital Experience?</h3>
                <p className="mb-6 text-muted-foreground">
                  Let's discuss how our architecture-first approach can deliver measurable results for your organization.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg"
                    className="rounded-xl bg-gradient-brand text-primary-foreground shadow-brand hover:opacity-90"
                    onClick={() => setRequestDialogOpen(true)}
                  >
                    Request Service
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-xl">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default ServiceDetail;
