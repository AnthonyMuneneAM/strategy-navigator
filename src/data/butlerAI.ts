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

// STATIC MOCKED RESPONSES - 16 recommendation paths (4 goals × 4 stages)
export const mockedRecommendations = {
  // PATH 1: Customer Experience
  "customer-experience-exploring": {
    message: "Based on what you've told me, I'd suggest the Digital Experience Strategy service. TMaaS packages this as a structured blueprint — rather than starting from scratch, you get a proven architecture you can adapt and deploy. At the exploration stage, this gives you a clear framework to define your platform direction and make the case internally. Ready to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  "customer-experience-designing": {
    message: "Based on what you've told me, I'd suggest the Digital Experience Strategy service. You're already in design mode — this blueprint accelerates that by giving you a reference architecture for a scalable, compliant digital experience platform. It cuts design time by over 50%. Ready to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  "customer-experience-implementing": {
    message: "Based on what you've told me, I'd suggest starting with the Digital Experience Strategy service. TMaaS's current services are at the Design stage — which is the right foundation before implementation. Deploy services are coming soon. Getting your blueprint in place now means you're ready to move fast when they launch. Ready to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  "customer-experience-optimizing": {
    message: "Based on what you've told me, I'd suggest the Digital Experience Strategy service as your baseline review. TMaaS Drive services for ongoing optimisation are coming soon — but starting with the strategy blueprint helps you identify where your current platform needs strengthening. Ready to take a look?",
    serviceName: "Digital Experience Strategy",
    serviceUrl: "/service/1"
  },
  
  // PATH 2: Internal Operations
  "internal-operations-exploring": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service. TMaaS packages this as a structured blueprint for designing your core business platforms — integrated, efficient, and compliant. At the exploration stage, this gives you a clear architecture to work from rather than defining everything from scratch. Ready to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  "internal-operations-designing": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service. You're in design mode — this blueprint gives you a reference architecture for your Digital Core Platform, cutting design and deployment time by 35%. Ready to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  "internal-operations-implementing": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service as your starting point. TMaaS Deploy services are coming soon — but having the strategy blueprint in place now means your implementation has a solid, compliant foundation to build from. Ready to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  "internal-operations-optimizing": {
    message: "Based on what you've told me, I'd suggest the DWS Strategy service as a baseline review of your current platform architecture. TMaaS Drive services for optimisation are coming soon. Getting the strategy layer right first ensures your optimisation efforts are targeted and effective. Ready to take a look?",
    serviceName: "DWS Strategy",
    serviceUrl: "/service/2"
  },
  
  // PATH 3: Data Value
  "data-value-exploring": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service. TMaaS packages this as a structured blueprint for building your data platform architecture, analytics capabilities, and AI roadmap. At the exploration stage, this gives you a clear picture of what to build and in what order. Ready to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  "data-value-designing": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service. You're in design mode — this blueprint gives you a reference architecture for integrating your data systems and enabling actionable insights across the organisation. Ready to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  "data-value-implementing": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service as your foundation. TMaaS Deploy services are coming soon — but a solid data architecture blueprint now means your implementation is structured and scalable from day one. Ready to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  "data-value-optimizing": {
    message: "Based on what you've told me, I'd suggest the Digital Intelligence and Analytics Strategy service as a review of your current data architecture. TMaaS Drive services for continuous optimisation are coming soon. This blueprint helps you identify the gaps between what you have and what you need. Ready to take a look?",
    serviceName: "DI&A Strategy",
    serviceUrl: "/service/3"
  },
  
  // PATH 4: DevOps
  "devops-exploring": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service. TMaaS packages this as a structured blueprint for defining your security posture, DevOps maturity, and platform engineering roadmap. At the exploration stage, this gives you a clear baseline to build from. Ready to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  },
  "devops-designing": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service. You're in design mode — this blueprint gives you a reference architecture for integrating security and DevOps practices across your delivery lifecycle. Ready to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  },
  "devops-implementing": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service as your foundation. TMaaS Deploy services are coming soon — but having your SecDevOps blueprint in place ensures your implementation is secure and structured from the start. Ready to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  },
  "devops-optimizing": {
    message: "Based on what you've told me, I'd suggest the SecDevOps Strategy service as a maturity review of your current delivery setup. TMaaS Drive services for continuous optimisation are coming soon. This blueprint helps you identify where your pipeline needs strengthening. Ready to take a look?",
    serviceName: "SecDevOps Strategy",
    serviceUrl: "/service/4"
  }
};

// STATIC MOCKED FAQ RESPONSES - 4 FAQ paths
export const mockedFAQs = {
  "what-is-tmaas": {
    message: "TMaaS — Technology Management as a Service — is a digital platform that helps organisations design, deploy, and manage their digital transformation through structured services, AI-driven guidance, and collaborative delivery workspaces. Instead of traditional consulting, TMaaS gives you proven blueprints you can adapt and deploy.",
    options: ["Explore the services", "How does it work?", "Talk to the team"]
  },
  "how-does-it-work": {
    message: "You describe your transformation challenge, Butler qualifies your context with two questions, and TMaaS recommends the right service. Once you engage a service, a structured delivery workspace is created for your team to manage execution together.",
    options: ["Show me the services", "What does it cost?", "Get started"]
  },
  "what-does-it-cost": {
    message: "Pricing is scoped to your specific transformation context after an initial service assessment. Speak to the TMaaS team to understand the right engagement model for your organisation.",
    options: ["Talk to the team", "Explore the services"]
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
