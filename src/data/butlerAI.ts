// Butler.AI Knowledge Base and Configuration
// STATIC PROTOTYPE - All responses are hardcoded, no API calls

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

// KNOWLEDGE-RICH CONVERSATION PATTERNS
// Each response should: 1) Diagnose the problem, 2) Explain root cause, 3) Present modern solution, 4) Recommend TMaaS offering

// Educational context for each transformation goal
export const transformationContext = {
  "data-value": {
    context: "Data transformation is one of the highest-impact areas — but also where most organizations get stuck. The challenge isn't usually the analytics tools themselves. It's the underlying data architecture.\n\nMost legacy systems were built for transactions, not insights. That creates three core problems: siloed data across systems, inconsistent data quality, and no unified view of your business.",
    commonPatterns: ["Data silos across systems", "Inconsistent data quality", "No unified business view", "All of the above"]
  },
  "customer-experience": {
    context: "Customer experience transformation often stalls not because of poor design, but because of backend system disconnection. When your CRM, support platform, and transaction systems don't talk to each other, customers feel the friction at every touchpoint.\n\nThe issue isn't adding more channels — it's creating a unified experience layer that connects them all.",
    commonPatterns: ["Disconnected customer touchpoints", "Slow response times", "Inconsistent experience across channels", "All of the above"]
  },
  "internal-operations": {
    context: "Operational efficiency breaks down when core business systems operate in silos. Your ERP, HR, finance, and supply chain platforms each have their own data models and workflows — creating manual handoffs and reconciliation overhead.\n\nThe modern approach isn't replacing everything. It's building a digital core that orchestrates across your existing systems.",
    commonPatterns: ["Manual processes and handoffs", "System silos and data duplication", "Slow approval workflows", "All of the above"]
  },
  "devops": {
    context: "Delivery speed isn't just about tools — it's about the entire software supply chain. Most organizations have CI/CD pipelines, but they're still slow because security, compliance, and testing are bolted on at the end rather than built into the flow.\n\nThe shift to SecDevOps means security and compliance become automated guardrails, not manual gates.",
    commonPatterns: ["Security slows down delivery", "Manual compliance checks", "Inconsistent deployment processes", "All of the above"]
  }
};

// STATIC MOCKED RESPONSES - 16 recommendation paths (4 goals × 4 stages)
export const mockedRecommendations = {
  // PATH 1: Customer Experience
  "customer-experience-exploring": {
    message: "Based on what you've told me, I'd suggest the Digital Experience Strategy service. TMaaS packages this as a structured blueprint — rather than starting from scratch, you get a proven architecture you can adapt and deploy. At the exploration stage, this gives you a clear framework to define your platform direction and make the case internally. Want to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  "customer-experience-designing": {
    message: "Based on what you've told me, I'd suggest the Digital Experience Strategy service. You're already in design mode — this blueprint accelerates that by giving you a reference architecture for a scalable, compliant digital experience platform. It cuts design time by over 50%. Want to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  "customer-experience-implementing": {
    message: "Based on what you've told me, I'd suggest starting with the Digital Experience Strategy service. TMaaS's current services are at the Design stage — which is the right foundation before implementation. Deploy services are coming soon. Getting your blueprint in place now means you're ready to move fast when they launch. Want to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  "customer-experience-optimizing": {
    message: "Based on what you've told me, I'd suggest the Digital Experience Strategy service as your baseline review. TMaaS Drive services for ongoing optimization are coming soon — but starting with the strategy blueprint helps you identify where your current platform needs strengthening. Want to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  
  // PATH 2: Internal Operations
  "internal-operations-exploring": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service. TMaaS packages this as a structured blueprint for designing your core business platforms — integrated, efficient, and compliant. At the exploration stage, this gives you a clear architecture to work from rather than defining everything from scratch. Want to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  "internal-operations-designing": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service. You're in design mode — this blueprint gives you a reference architecture for your Digital Core Platform, cutting design and deployment time by 35%. Want to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  "internal-operations-implementing": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service as your starting point. TMaaS Deploy services are coming soon — but having the strategy blueprint in place now means your implementation has a solid, compliant foundation to build from. Want to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  "internal-operations-optimizing": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service as a baseline review of your current platform architecture. TMaaS Drive services for optimization are coming soon. Getting the strategy layer right first ensures your optimization efforts are targeted and effective. Want to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  
  // PATH 3: Data Value
  "data-value-exploring": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service. TMaaS packages this as a structured blueprint for building your data platform architecture, analytics capabilities, and AI roadmap. At the exploration stage, this gives you a clear picture of what to build and in what order. Want to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  "data-value-designing": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service. You're in design mode — this blueprint gives you a reference architecture for integrating your data systems and enabling actionable insights across the organization. Want to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  "data-value-implementing": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service as your foundation. TMaaS Deploy services are coming soon — but a solid data architecture blueprint now means your implementation is structured and scalable from day one. Want to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  "data-value-optimizing": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service as a review of your current data architecture. TMaaS Drive services for continuous optimization are coming soon. This blueprint helps you identify the gaps between what you have and what you need. Want to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  
  // PATH 4: DevOps
  "devops-exploring": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service. TMaaS packages this as a structured blueprint for defining your security posture, DevOps maturity, and platform engineering roadmap. At the exploration stage, this gives you a clear baseline to build from. Want to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  },
  "devops-designing": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service. You're in design mode — this blueprint gives you a reference architecture for integrating security and DevOps practices across your delivery lifecycle. Want to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  },
  "devops-implementing": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service as your foundation. TMaaS Deploy services are coming soon — but having your SecDevOps blueprint in place ensures your implementation is secure and structured from the start. Want to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  },
  "devops-optimizing": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service as a maturity review of your current delivery setup. TMaaS Drive services for continuous optimization are coming soon. This blueprint helps you identify where your pipeline needs strengthening. Want to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  }
};

// STATIC MOCKED FAQ RESPONSES - 4 FAQ paths
export const mockedFAQs = {
  "what-is-tmaas": {
    message: "TMaaS — Technology Management as a Service — is a digital platform that helps organisations design, deploy, and manage their digital transformation through structured services, AI-driven guidance, and collaborative delivery workspaces. Instead of traditional consulting, TMaaS gives you proven blueprints you can adapt and deploy.",
    options: ["Explore the services", "How does it work?", "Connect me with the team"]
  },
  "how-does-it-work": {
    message: "You describe your transformation challenge, Butler qualifies your context with two questions, and TMaaS recommends the right service. Once you engage a service, a structured delivery workspace is created for your team to manage execution together.",
    options: ["Show me the services", "What does it cost?", "Get started"]
  },
  "what-does-it-cost": {
    message: "Pricing is scoped to your specific transformation context after an initial service assessment. Speak to the TMaaS team to understand the right engagement model for your organisation.",
    options: ["Connect me with the team", "Explore the services"]
  },
  "how-to-get-started": {
    message: "Click Get Started to create your account, describe your transformation challenge to Butler, and explore the service catalogue. Butler will recommend a starting point based on your context.",
    options: ["Get Started", "Explore the services"]
  }
};

// STATIC ESCALATION RESPONSE - 1 escalation path
export const mockedEscalation = {
  message: "I wasn't able to find a clear answer for that. Would you like me to connect you with the TMaaS team?",
  contact: {
    name: "Anthony Mwangi",
    email: "support@digitalqatalyst.com",
    title: "Transformation Specialist"
  }
};

// TEAM HANDOFF SIMULATION
export const teamHandoff = {
  connecting: "Let me connect you with someone from our team...",
  checking: "Checking team availability...",
  available: "Great news! Anthony Mwangi is available right now.",
  introduction: "Hi there! I'm Anthony, a Transformation Specialist at TMaaS. Butler filled me in on your interest. How can I help you today?",
  
  // Simulated agent responses based on user input
  responses: {
    greeting: [
      "Thanks for reaching out! I'm here to help. What specific aspect of digital transformation are you looking to explore?",
      "Great to connect with you! What brings you to TMaaS today?",
      "Happy to help! What's your main challenge right now?"
    ],
    pricing: [
      "Our pricing is tailored to your specific needs. Design services typically start at $25k for a 4-6 week engagement. Would you like me to walk you through what's included?",
      "Great question! Investment depends on the scope and complexity. For a typical Digital Experience Strategy, we're looking at $25-30k. Can I learn more about your organization to give you a more accurate estimate?"
    ],
    timeline: [
      "Most of our Design services run 4-6 weeks, while Deploy services are 8-14 weeks depending on complexity. What timeline are you working with?",
      "Good question! Design phase is typically 4-6 weeks. If you're looking at implementation, that's another 8-12 weeks. Does that align with your expectations?"
    ],
    services: [
      "We offer services across four transformation towers: Digital Experience, Digital Workspace, Data & Intelligence, and SecDevOps. Which area is most relevant to your needs?",
      "TMaaS provides both Design services (strategic blueprints) and Deploy services (implementation). Based on what Butler shared, I think the Digital Experience Strategy might be a good fit. Want to dive deeper into that?"
    ],
    consultation: [
      "I'd be happy to schedule a consultation! Can you share your email and best time to connect? We typically do 30-minute discovery calls.",
      "Absolutely! Let me get you on the calendar. What's your email address and preferred time zone?"
    ],
    general: [
      "That's a great question. Let me make sure I understand correctly - are you asking about [topic]?",
      "I can definitely help with that. Could you give me a bit more context about your situation?",
      "Interesting! Tell me more about what you're trying to achieve."
    ]
  }
};

// Legacy data structures (kept for backward compatibility but not used in static prototype)
export const knowledgeBase: KnowledgeBaseEntry[] = [];
export const serviceRecommendations: ServiceRecommendation[] = [];
export const intentPatterns = { faq: [], routing: [], advisory: [] };
export const conversationTemplates = {
  greeting: {
    concierge: "",
    advisory: ""
  },
  qualification: {
    orgType: "",
    transformationStage: ""
  },
  escalation: ""
};
