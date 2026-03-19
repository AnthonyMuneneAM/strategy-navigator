// Butler.AI Knowledge Base and Configuration
export interface ServiceRecommendation {
  id: string;
  name: string;
  description: string;
  url: string;
  reason: string;
  tower: "dxp" | "dws" | "dia" | "sdo";
  type: "design" | "deploy-saas" | "deploy-onprem";
  price: string;
  duration: string;
  confidence: number;
}

export interface KnowledgeBaseEntry {
  id: string;
  question: string;
  answer: string;
  category: "platform" | "services" | "pricing" | "process";
  keywords: string[];
  links?: Array<{
    text: string;
    url: string;
  }>;
}

// Extended Knowledge Base
export const knowledgeBase: KnowledgeBaseEntry[] = [
  {
    id: "what-is-tmaas",
    question: "What is TMaaS?",
    answer: "TMaaS (Transformation as a Service) is a comprehensive digital transformation platform that simplifies complex business changes using our proven 4D Framework:\n\n🔍 Discern - Identify challenges and assess capabilities\n🎨 Design - Create strategic blueprints and architectures\n🚀 Deploy - Execute with ready-to-launch solutions\n📈 Drive - Optimize outcomes and enable continuous improvement\n\nWe turn your business problems into architecture-backed transformation blueprints.",
    category: "platform",
    keywords: ["tmaas", "transformation", "platform", "4d framework", "what is"],
    links: [
      { text: "Explore Services", url: "/explore" },
      { text: "View Framework", url: "/explore" }
    ]
  },
  {
    id: "4d-framework",
    question: "What is the 4D Framework?",
    answer: "The 4D Framework is our proven methodology for digital transformation:\n\n1. Discern 🔍\n• Problem identification and context assessment\n• Capability gap analysis\n• Transformation signal translation\n\n2. Design 🎨\n• Strategic blueprint creation\n• Architecture design\n• Implementation roadmaps\n\n3. Deploy 🚀\n• Solution implementation\n• SaaS and on-premise options\n• Change management\n\n4. Drive 📈\n• Continuous optimization\n• Performance monitoring\n• Adoption enablement",
    category: "platform",
    keywords: ["4d", "framework", "methodology", "discern", "design", "deploy", "drive"],
    links: [
      { text: "See Framework in Action", url: "/explore" },
      { text: "Browse Services by Phase", url: "/explore" }
    ]
  },
  {
    id: "how-it-works",
    question: "How does TMaaS work?",
    answer: "TMaaS works through a structured, proven approach:\n\nStep 1: Problem Diagnosis 🔍\n• AI-powered challenge analysis\n• Context and capability assessment\n• Transformation opportunity identification\n\nStep 2: Service Matching 🎯\n• Personalized service recommendations\n• Expert consultation and validation\n• Custom solution design\n\nStep 3: Implementation 🚀\n• Architecture-backed deployment\n• Expert-led execution\n• Change management support\n\nStep 4: Optimization 📈\n• Performance monitoring\n• Continuous improvement\n• Adoption enablement",
    category: "process",
    keywords: ["how", "works", "process", "steps", "implementation"],
    links: [
      { text: "Start Diagnosis", url: "#diagnose" },
      { text: "Browse Services", url: "/marketplace" }
    ]
  },
  {
    id: "pricing-model",
    question: "How much does TMaaS cost?",
    answer: "TMaaS pricing is transparent and value-based:\n\nDesign Services 🎨\n• Strategic blueprints: $25k - $75k\n• Duration: 4-12 weeks\n• Includes: Architecture, roadmap, business case\n\nDeploy Services 🚀\n• SaaS implementations: $40k - $75k\n• Duration: 6-16 weeks\n• Includes: Full deployment, training, support\n\nManaged Services 📈\n• Custom pricing based on scope\n• Ongoing optimization and support\n\nWhat's Always Included:\n✅ Expert consultation\n✅ Proven frameworks\n✅ Implementation support\n✅ Training and documentation",
    category: "pricing",
    keywords: ["cost", "price", "pricing", "investment", "budget"],
    links: [
      { text: "View Detailed Pricing", url: "/marketplace" },
      { text: "Get Custom Quote", url: "/explore" }
    ]
  },
  {
    id: "service-types",
    question: "What types of services do you offer?",
    answer: "We offer services across four transformation towers:\n\nDigital Experience Platform 🌐\n• Customer journey optimization\n• Omnichannel platforms\n• CRM and service management\n\nDigital Workspace Solutions 👥\n• Collaboration platforms\n• Governance and compliance\n• Productivity optimization\n\nData & Intelligence 📊\n• Data platform architecture\n• Analytics and BI\n• AI/ML implementation\n\nSecDevOps 🔒\n• Security architecture\n• DevOps automation\n• Platform engineering",
    category: "services",
    keywords: ["services", "types", "towers", "digital experience", "workspace", "data", "security"],
    links: [
      { text: "Explore All Services", url: "/marketplace" },
      { text: "Get Recommendations", url: "#diagnose" }
    ]
  }
];

// Service Recommendation Engine
export const serviceRecommendations: ServiceRecommendation[] = [
  // Starting Journey Recommendations
  {
    id: "diagnose-ai",
    name: "Diagnose AI",
    description: "AI-powered problem analysis and transformation roadmap creation. Perfect for organizations beginning their digital transformation journey.",
    url: "#diagnose",
    reason: "Ideal for getting clarity on transformation priorities and creating a strategic roadmap",
    tower: "dxp",
    type: "design",
    price: "Free",
    duration: "30 minutes",
    confidence: 95
  },
  {
    id: "digital-org-strategy",
    name: "Digital Organisation Strategy",
    description: "Comprehensive transformation strategy covering all four execution streams with enterprise-grade governance.",
    url: "/marketplace",
    reason: "Best fit for organizations needing holistic transformation across all business areas",
    tower: "dxp",
    type: "design",
    price: "From $75k",
    duration: "8-12 weeks",
    confidence: 90
  },
  
  // Enterprise Recommendations
  {
    id: "data-intelligence-strategy",
    name: "Data & Intelligence Strategy",
    description: "Enterprise data platform architecture, analytics capabilities, and AI implementation roadmap.",
    url: "/marketplace",
    reason: "Critical for enterprises looking to leverage data as a strategic asset",
    tower: "dia",
    type: "design",
    price: "From $30k",
    duration: "5-7 weeks",
    confidence: 88
  },
  {
    id: "secdevops-strategy",
    name: "SecDevOps Strategy",
    description: "Security posture definition, DevOps maturity assessment, and platform engineering roadmap.",
    url: "/marketplace",
    reason: "Essential for enterprises requiring robust security and scalable development practices",
    tower: "sdo",
    type: "design",
    price: "From $25k",
    duration: "4-6 weeks",
    confidence: 85
  },

  // SMB Recommendations
  {
    id: "digital-experience-strategy",
    name: "Digital Experience Platform Strategy",
    description: "Customer experience transformation with modern digital touchpoints and journey optimization.",
    url: "/marketplace",
    reason: "Perfect for SMBs looking to improve customer interactions and drive growth",
    tower: "dxp",
    type: "design",
    price: "From $25k",
    duration: "4-6 weeks",
    confidence: 92
  },
  {
    id: "digital-workspace-strategy",
    name: "Digital Workspace Solutions Strategy",
    description: "Modernize internal collaboration, productivity tools, and governance frameworks.",
    url: "/marketplace",
    reason: "Ideal for improving team productivity and operational efficiency",
    tower: "dws",
    type: "design",
    price: "From $25k",
    duration: "4-6 weeks",
    confidence: 87
  },

  // Deploy Services
  {
    id: "crm-platform-deploy",
    name: "CRM & Service Platform",
    description: "Complete CRM implementation with lead-to-revenue lifecycle and customer service management.",
    url: "/services/crm-deploy",
    reason: "Ready-to-deploy solution for organizations with defined CRM requirements",
    tower: "dxp",
    type: "deploy-saas",
    price: "From $60k",
    duration: "10-12 weeks",
    confidence: 90
  },
  {
    id: "data-platform-deploy",
    name: "Modern Data Platform",
    description: "Cloud data platform with data lake, warehouse, and integration pipelines.",
    url: "/services/data-platform-deploy",
    reason: "Perfect for organizations ready to implement a modern data architecture",
    tower: "dia",
    type: "deploy-saas",
    price: "From $70k",
    duration: "12-14 weeks",
    confidence: 88
  }
];

// Intent Classification Patterns
export const intentPatterns = {
  faq: [
    { pattern: /what is tmaas|what is transformation/i, intent: "faq_what_is_tmaas" },
    { pattern: /how does|how it works|how do you/i, intent: "faq_how_it_works" },
    { pattern: /cost|price|pricing|budget|investment/i, intent: "faq_pricing" },
    { pattern: /4d framework|framework|methodology/i, intent: "faq_4d_framework" },
    { pattern: /services|what do you offer|types of services/i, intent: "faq_service_types" }
  ],
  routing: [
    { pattern: /explore|services|marketplace|browse/i, intent: "route_explore" },
    { pattern: /learn|about|information|tell me more/i, intent: "route_learn" },
    { pattern: /contact|talk|team|support|help|human/i, intent: "route_contact" }
  ],
  advisory: [
    { pattern: /recommend|suggest|help me choose|what should/i, intent: "advisory_recommend" },
    { pattern: /customer|experience|cx|journey/i, intent: "advisory_customer_experience" },
    { pattern: /data|analytics|ai|intelligence|ml/i, intent: "advisory_data" },
    { pattern: /security|devops|platform|infrastructure/i, intent: "advisory_security" },
    { pattern: /workspace|collaboration|productivity|teams/i, intent: "advisory_workspace" },
    { pattern: /governance|compliance|risk|grc/i, intent: "advisory_governance" }
  ]
};

// Conversation Templates
export const conversationTemplates = {
  greeting: {
    concierge: "👋 Welcome to TMaaS! I'm your AI transformation assistant.\n\nI'm here to help you understand our platform and find the right services for your needs. What would you like to know?",
    advisory: "🎯 Hi! I'm your TMaaS AI advisor.\n\nI can help you find the perfect transformation services based on your specific needs. What brings you to our marketplace today?"
  },
  qualification: {
    orgType: "To give you the best recommendations, I'd like to understand your context better.\n\nWhat type of organization are you?",
    transformationStage: "Thanks! Now, where are you in your transformation journey?"
  },
  escalation: "I want to make sure you get the best help possible. It seems like you might need more specialized assistance.\n\nWould you like me to connect you with one of our transformation experts? They can provide detailed guidance tailored to your specific situation."
};