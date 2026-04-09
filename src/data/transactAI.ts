// Transact.AI Mode 01 - Post-Login Personalized Advisory Data
// Mock data structure that would normally come from Supabase

export interface UserEngagement {
  id: string;
  name: string;
  service: string;
  tower: "Digital Experience" | "Digital Workspace" | "Data & Intelligence" | "Digital Operations";
  status: "In Progress" | "Awaiting Inputs" | "Completed" | "On Hold";
  progress: number;
  startDate: string;
  expectedCompletion: string;
  deliveryLead: string;
  nextMilestone: string;
  recentActivity: string[];
  pendingActions?: string[];
}

export interface UserSession {
  id: string;
  title: string;
  engagementId: string;
  date: string;
  time: string;
  type: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export interface UserDocument {
  id: string;
  name: string;
  type: string;
  engagementId: string;
  uploadedDate: string;
  status: "Approved" | "Pending Review" | "Requires Changes";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  organizationType: "enterprise" | "smb" | "startup";
  industry: string;
  transformationStage: "starting" | "underway" | "optimizing";
  joinedDate: string;
  engagements: UserEngagement[];
  upcomingSessions: UserSession[];
  documents: UserDocument[];
  preferences: {
    communicationStyle: "detailed" | "concise";
    focusAreas: string[];
  };
}

// Mock User Profile Data (would be fetched from Supabase)
export const mockUserProfile: UserProfile = {
  id: "user-001",
  name: "Sarah Mitchell",
  email: "sarah.mitchell@stcbank.com",
  role: "Chief Digital Officer",
  organization: "STC Bank",
  organizationType: "enterprise",
  industry: "Financial Services",
  transformationStage: "underway",
  joinedDate: "2025-11-15",
  engagements: [
    {
      id: "eng-001",
      name: "Customer Experience Strategy",
      service: "Digital Experience Strategy",
      tower: "Digital Experience",
      status: "In Progress",
      progress: 35,
      startDate: "2026-02-01",
      expectedCompletion: "2026-05-30",
      deliveryLead: "Alex Johnson",
      nextMilestone: "Architecture Workshop",
      recentActivity: [
        "Initial discovery session completed",
        "Customer journey mapping in progress",
        "Stakeholder interviews scheduled"
      ]
    },
    {
      id: "eng-002",
      name: "Collaboration Platform Implementation",
      service: "Digital Workspace Strategy",
      tower: "Digital Workspace",
      status: "Awaiting Inputs",
      progress: 65,
      startDate: "2026-01-10",
      expectedCompletion: "2026-04-15",
      deliveryLead: "Alex Johnson",
      nextMilestone: "Design Review",
      recentActivity: [
        "Technical architecture approved",
        "Vendor selection completed",
        "Awaiting security requirements document"
      ],
      pendingActions: [
        "Submit security requirements document",
        "Review and approve integration architecture"
      ]
    },
    {
      id: "eng-003",
      name: "Data Platform Modernisation",
      service: "Data Governance Platform",
      tower: "Data & Intelligence",
      status: "In Progress",
      progress: 30,
      startDate: "2026-02-15",
      expectedCompletion: "2026-07-30",
      deliveryLead: "Maria Santos",
      nextMilestone: "Requirements Workshop",
      recentActivity: [
        "Current state assessment completed",
        "Data governance framework drafted",
        "Stakeholder alignment session held"
      ]
    }
  ],
  upcomingSessions: [
    {
      id: "session-001",
      title: "Architecture Blueprint Review",
      engagementId: "eng-002",
      date: "2026-03-18",
      time: "10:00 AM",
      type: "Virtual Workshop",
      status: "Scheduled"
    },
    {
      id: "session-002",
      title: "Customer Journey Mapping",
      engagementId: "eng-001",
      date: "2026-03-20",
      time: "2:00 PM",
      type: "Collaborative Session",
      status: "Scheduled"
    },
    {
      id: "session-003",
      title: "Data Governance Framework Review",
      engagementId: "eng-003",
      date: "2026-03-25",
      time: "11:00 AM",
      type: "Virtual Workshop",
      status: "Scheduled"
    }
  ],
  documents: [
    {
      id: "doc-001",
      name: "Security Requirements v2.pdf",
      type: "Requirements Document",
      engagementId: "eng-002",
      uploadedDate: "2026-03-10",
      status: "Pending Review"
    },
    {
      id: "doc-002",
      name: "Customer Journey Map.pdf",
      type: "Deliverable",
      engagementId: "eng-001",
      uploadedDate: "2026-03-12",
      status: "Approved"
    }
  ],
  preferences: {
    communicationStyle: "detailed",
    focusAreas: ["Customer Experience", "Digital Transformation", "Data Governance"]
  }
};

// Conversation Templates for Mode 01
export const mode01Templates = {
  greeting: {
    new: "Hi {name}! I'm Transact.AI Mode 01, your personal transformation advisor. I've reviewed your profile and current engagements. How can I help you today?",
    returning: "Welcome back, {name}! I see you have {activeCount} active engagements and {pendingCount} pending actions. What would you like to focus on?"
  },
  
  contextAware: {
    engagementStatus: "You're currently working on {engagementName} ({progress}% complete). Your next milestone is {nextMilestone}.",
    pendingActions: "I notice you have {count} pending actions across your engagements. Would you like me to walk you through them?",
    upcomingSessions: "You have {count} sessions coming up in the next 7 days. Your next one is {sessionTitle} on {date}.",
    recentActivity: "Recent activity on {engagementName}: {activity}"
  },
  
  recommendations: {
    nextSteps: "Based on your current progress, I recommend focusing on: {recommendations}",
    resources: "Here are some resources that might help with {topic}: {resources}",
    escalation: "This looks like something your delivery lead {leadName} should review. Would you like me to help you draft a message?"
  }
};

// Intent Patterns for Mode 01 (Post-Login Context)
export const mode01IntentPatterns = {
  engagementQuery: [
    { pattern: /status|progress|how.*going|update/i, intent: "engagement_status" },
    { pattern: /next.*step|what.*do|action|task/i, intent: "next_actions" },
    { pattern: /when.*complete|timeline|deadline|finish/i, intent: "timeline_query" },
    { pattern: /who.*lead|contact.*team|delivery.*lead/i, intent: "team_contact" }
  ],
  
  sessionQuery: [
    { pattern: /session|meeting|workshop|when.*next/i, intent: "upcoming_sessions" },
    { pattern: /reschedule|change.*time|move.*session/i, intent: "session_management" },
    { pattern: /prepare|what.*bring|agenda/i, intent: "session_preparation" }
  ],
  
  documentQuery: [
    { pattern: /document|file|upload|submit/i, intent: "document_status" },
    { pattern: /pending.*review|waiting.*approval/i, intent: "approval_status" },
    { pattern: /template|example|sample/i, intent: "document_template" }
  ],
  
  advisory: [
    { pattern: /recommend|suggest|advice|should.*do/i, intent: "advisory_recommendation" },
    { pattern: /best.*practice|how.*to|guide/i, intent: "advisory_guidance" },
    { pattern: /similar|other.*client|example/i, intent: "advisory_examples" }
  ],
  
  navigation: [
    { pattern: /show.*me|where.*find|navigate|go.*to/i, intent: "platform_navigation" },
    { pattern: /how.*use|feature|function/i, intent: "platform_help" }
  ]
};

// Quick Actions for Mode 01
export const mode01QuickActions = [
  {
    id: "view-pending",
    label: "Show my pending actions",
    category: "engagement",
    icon: "AlertCircle"
  },
  {
    id: "next-session",
    label: "What's my next session?",
    category: "session",
    icon: "Calendar"
  },
  {
    id: "engagement-summary",
    label: "Summarize my engagements",
    category: "engagement",
    icon: "Package"
  },
  {
    id: "contact-lead",
    label: "Contact my delivery lead",
    category: "team",
    icon: "MessageSquare"
  },
  {
    id: "document-status",
    label: "Check document status",
    category: "document",
    icon: "FileText"
  },
  {
    id: "recommendations",
    label: "Get recommendations",
    category: "advisory",
    icon: "Sparkles"
  }
];
