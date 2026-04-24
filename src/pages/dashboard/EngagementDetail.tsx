import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  Users,
  FileText,
  Activity,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Mail,
  Percent,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashboardLayout from "@/components/DashboardLayout";

// Mock engagement data
const mockEngagement = {
  id: "ENG-2024-001",
  name: "IT.GPRC",
  client: "STC Bank",
  type: "Design",
  status: "Paused",
  healthStatus: "amber", // green, amber, red
  deliveryLead: "Rayyan Basha",
  startDate: "December 1, 2024",
  forecastEndDate: "June 30, 2025",
  actualProgress: 65,
  plannedProgress: 70,
  invoiced: 318215.25,
  paid: 302304.49,
  tower: "Digital Workspace",
};

const upcomingSessions = [
  {
    id: 1,
    title: "Architecture Review Workshop",
    date: "2026-02-20",
    time: "10:00 AM - 12:00 PM",
    attendees: ["Mohammed Al-Rashid", "Sarah Al-Mansour", "Ahmed Hassan", "Rayyan Basha", "James Chen", "Maria Santos", "David Kumar", "Alex Johnson"],
    type: "Workshop",
    status: "Confirmed",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    description: "Review current architecture design and gather feedback from stakeholders",
    location: "Virtual",
  },
  {
    id: 2,
    title: "Stakeholder Alignment",
    date: "2026-02-22",
    time: "2:00 PM - 3:30 PM",
    attendees: ["Mohammed Al-Rashid", "Sarah Al-Mansour", "Rayyan Basha", "James Chen", "Maria Santos"],
    type: "Meeting",
    status: "Confirmed",
    meetingLink: "https://meet.google.com/xyz-abcd-efg",
    description: "Align on project priorities and next steps",
    location: "Virtual",
  },
  {
    id: 3,
    title: "Technical Deep Dive",
    date: "2026-02-25",
    time: "9:00 AM - 11:00 AM",
    attendees: ["Ahmed Hassan", "Rayyan Basha", "James Chen", "Maria Santos", "David Kumar", "Alex Johnson"],
    type: "Workshop",
    status: "Confirmed",
    meetingLink: "https://meet.google.com/tech-dive-123",
    description: "Deep dive into technical implementation details",
    location: "Virtual",
  },
];

const requestedSessions = [
  {
    id: 4,
    title: "GRC Framework Review",
    requestedBy: "Mohammed Al-Rashid",
    requestedDate: "2026-02-15",
    preferredDate: "2026-02-28",
    preferredTime: "10:00 AM - 11:30 AM",
    type: "Workshop",
    status: "Pending Approval",
    description: "Review the proposed GRC framework with compliance team",
    attendees: ["Mohammed Al-Rashid", "Sarah Al-Mansour", "Ahmed Hassan"],
  },
  {
    id: 5,
    title: "Security Assessment Discussion",
    requestedBy: "Ahmed Hassan",
    requestedDate: "2026-02-16",
    preferredDate: "2026-03-01",
    preferredTime: "2:00 PM - 3:00 PM",
    type: "Meeting",
    status: "Pending Approval",
    description: "Discuss security assessment findings and remediation plan",
    attendees: ["Ahmed Hassan", "Rayyan Basha", "James Chen"],
  },
];

const pastSessions = [
  {
    id: 6,
    title: "Project Kickoff Meeting",
    date: "2026-01-15",
    time: "10:00 AM - 11:30 AM",
    attendees: ["Mohammed Al-Rashid", "Sarah Al-Mansour", "Ahmed Hassan", "Fatima Al-Zahrani", "Rayyan Basha", "James Chen"],
    type: "Meeting",
    status: "Completed",
    recordingLink: "https://drive.google.com/file/d/kickoff-recording",
    notes: "Discussed project scope, timeline, and key deliverables. Client emphasized importance of integration with existing systems. Next steps: Client to provide access credentials and documentation.",
    location: "Virtual",
    duration: "90 minutes",
  },
  {
    id: 7,
    title: "Current State Assessment Workshop",
    date: "2026-01-22",
    time: "9:00 AM - 12:00 PM",
    attendees: ["Sarah Al-Mansour", "Ahmed Hassan", "Fatima Al-Zahrani", "Omar Abdullah", "Rayyan Basha", "James Chen", "Maria Santos"],
    type: "Workshop",
    status: "Completed",
    recordingLink: "https://drive.google.com/file/d/assessment-recording",
    notes: "Conducted comprehensive assessment of current GRC processes. Identified key gaps in compliance monitoring and risk management. Action items: Document findings and prepare gap analysis report.",
    location: "STC Bank HQ, Riyadh",
    duration: "180 minutes",
  },
  {
    id: 8,
    title: "Architecture Design Review",
    date: "2026-02-05",
    time: "2:00 PM - 4:00 PM",
    attendees: ["Mohammed Al-Rashid", "Ahmed Hassan", "Rayyan Basha", "James Chen", "Maria Santos", "David Kumar"],
    type: "Workshop",
    status: "Completed",
    recordingLink: "https://drive.google.com/file/d/architecture-recording",
    notes: "Presented proposed architecture design. Client requested modifications to integration approach. Agreed on revised timeline for architecture finalization. Follow-up: Share updated architecture diagrams by Feb 10.",
    location: "Virtual",
    duration: "120 minutes",
  },
  {
    id: 9,
    title: "Weekly Status Update",
    date: "2026-02-12",
    time: "11:00 AM - 11:30 AM",
    attendees: ["Mohammed Al-Rashid", "Rayyan Basha"],
    type: "Meeting",
    status: "Completed",
    recordingLink: null,
    notes: "Reviewed progress on Milestone 2. Discussed payment discrepancy issue. Client committed to resolving by end of week.",
    location: "Virtual",
    duration: "30 minutes",
  },
];

const topRisks = [
  {
    id: 1,
    title: "Delayed stakeholder approvals",
    severity: "Critical",
    status: "Open",
    owner: "James Chen",
    dueDate: "Feb 18, 2026",
  },
  {
    id: 2,
    title: "Integration dependencies not resolved",
    severity: "High",
    status: "Open",
    owner: "Maria Santos",
    dueDate: "Feb 20, 2026",
  },
];

const topIssues = [
  {
    id: 1,
    title: "Missing technical documentation from client",
    severity: "Critical",
    status: "Blocked",
    owner: "David Kumar",
    dueDate: "Feb 19, 2026",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "deliverable",
    title: "Architecture Blueprint v2.0 delivered",
    timestamp: "2 hours ago",
    user: "James Chen",
  },
  {
    id: 2,
    type: "session",
    title: "Workshop completed: Current State Assessment",
    timestamp: "1 day ago",
    user: "System",
  },
  {
    id: 3,
    type: "update",
    title: "Status updated to In Progress",
    timestamp: "2 days ago",
    user: "James Chen",
  },
  {
    id: 4,
    type: "risk",
    title: "New risk added: Stakeholder approvals",
    timestamp: "3 days ago",
    user: "James Chen",
  },
];

// Mock milestones data
const mockMilestones = [
  {
    id: 1,
    name: "Milestone 01",
    description: "Discovery & Current State Assessment",
    startDate: "2026-01-15",
    endDate: "2026-01-31",
    originalContractDate: "2026-01-31",
    adjustedContractDate: "2026-01-31",
    forecastDate: "2026-01-31",
    status: "Completed",
    progress: 100,
  },
  {
    id: 2,
    name: "Milestone 02",
    description: "Architecture Design & Blueprint",
    startDate: "2026-02-01",
    endDate: "2026-02-21",
    originalContractDate: "2026-02-20",
    adjustedContractDate: "2026-02-21",
    forecastDate: "2026-02-21",
    status: "In Progress",
    progress: 70,
  },
  {
    id: 3,
    name: "Milestone 03",
    description: "Implementation Roadmap",
    startDate: "2026-02-22",
    endDate: "2026-03-10",
    originalContractDate: "2026-03-08",
    adjustedContractDate: "2026-03-10",
    forecastDate: "2026-03-12",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 4,
    name: "Milestone 04",
    description: "Handover & Knowledge Transfer",
    startDate: "2026-03-11",
    endDate: "2026-03-20",
    originalContractDate: "2026-03-20",
    adjustedContractDate: "2026-03-20",
    forecastDate: "2026-03-22",
    status: "Not Started",
    progress: 0,
  },
];

// Mock deliverables data
const mockDeliverables = [
  {
    id: "D1",
    name: "Project Charter",
    milestone: 1,
    milestoneName: "Milestone 01",
    status: "Closed",
    startDate: "2026-01-15",
    endDate: "2026-01-22",
    dueDate: "2026-01-22",
    owner: "James Chen",
    completionProgress: 100,
    supportingMaterials: [
      { name: "Charter Document v1.0", link: "#" },
      { name: "Stakeholder Sign-off", link: "#" },
    ],
  },
  {
    id: "D2",
    name: "Digital GRC Design Summary",
    milestone: 2,
    milestoneName: "Milestone 02",
    status: "Pending Acceptance",
    startDate: "2026-02-01",
    endDate: "2026-02-15",
    dueDate: "2026-02-15",
    owner: "Maria Santos",
    completionProgress: 95,
    supportingMaterials: [
      { name: "Design Summary Document", link: "#" },
      { name: "Architecture Diagrams", link: "#" },
    ],
  },
  {
    id: "D3",
    name: "Baseline Assessment Report",
    milestone: 3,
    milestoneName: "Milestone 03",
    status: "In Progress",
    startDate: "2026-02-22",
    endDate: "2026-03-05",
    dueDate: "2026-03-05",
    owner: "David Kumar",
    completionProgress: 60,
    supportingMaterials: [
      { name: "Current State Analysis", link: "#" },
    ],
  },
  {
    id: "D4",
    name: "ABACUS Tool Deployment",
    milestone: 4,
    milestoneName: "Milestone 04",
    status: "New",
    startDate: "2026-03-11",
    endDate: "2026-03-20",
    dueDate: "2026-03-20",
    owner: "Alex Johnson",
    completionProgress: 0,
    supportingMaterials: [],
  },
];

// Mock activities data - activities are the work items that make up deliverables
const mockActivities = [
  // Project Charter activities
  {
    id: "A1",
    name: "Stakeholder Interviews",
    deliverableId: "D1",
    deliverableName: "Project Charter",
    status: "Completed",
    startDate: "2026-01-15",
    endDate: "2026-01-18",
    owner: "James Chen",
  },
  {
    id: "A2",
    name: "Charter Document Drafting",
    deliverableId: "D1",
    deliverableName: "Project Charter",
    status: "Completed",
    startDate: "2026-01-19",
    endDate: "2026-01-22",
    owner: "James Chen",
  },
  // Digital GRC Design Summary activities
  {
    id: "A3",
    name: "Requirements Gathering",
    deliverableId: "D2",
    deliverableName: "Digital GRC Design Summary",
    status: "Completed",
    startDate: "2026-02-01",
    endDate: "2026-02-05",
    owner: "Maria Santos",
  },
  {
    id: "A4",
    name: "Architecture Design",
    deliverableId: "D2",
    deliverableName: "Digital GRC Design Summary",
    status: "Completed",
    startDate: "2026-02-06",
    endDate: "2026-02-12",
    owner: "Maria Santos",
  },
  {
    id: "A5",
    name: "Design Review & Documentation",
    deliverableId: "D2",
    deliverableName: "Digital GRC Design Summary",
    status: "Pending Acceptance",
    startDate: "2026-02-13",
    endDate: "2026-02-15",
    owner: "Maria Santos",
  },
  // Baseline Assessment Report activities
  {
    id: "A6",
    name: "Current State Analysis",
    deliverableId: "D3",
    deliverableName: "Baseline Assessment Report",
    status: "Completed",
    startDate: "2026-02-22",
    endDate: "2026-02-26",
    owner: "David Kumar",
  },
  {
    id: "A7",
    name: "Gap Analysis",
    deliverableId: "D3",
    deliverableName: "Baseline Assessment Report",
    status: "In Progress",
    startDate: "2026-02-27",
    endDate: "2026-03-02",
    owner: "David Kumar",
  },
  {
    id: "A8",
    name: "Report Compilation",
    deliverableId: "D3",
    deliverableName: "Baseline Assessment Report",
    status: "Not Started",
    startDate: "2026-03-03",
    endDate: "2026-03-05",
    owner: "David Kumar",
  },
  // ABACUS Tool Deployment activities
  {
    id: "A9",
    name: "Environment Setup",
    deliverableId: "D4",
    deliverableName: "ABACUS Tool Deployment",
    status: "New",
    startDate: "2026-03-11",
    endDate: "2026-03-13",
    owner: "Alex Johnson",
  },
  {
    id: "A10",
    name: "Tool Configuration",
    deliverableId: "D4",
    deliverableName: "ABACUS Tool Deployment",
    status: "New",
    startDate: "2026-03-14",
    endDate: "2026-03-17",
    owner: "Alex Johnson",
  },
  {
    id: "A11",
    name: "Testing & Validation",
    deliverableId: "D4",
    deliverableName: "ABACUS Tool Deployment",
    status: "New",
    startDate: "2026-03-18",
    endDate: "2026-03-20",
    owner: "Alex Johnson",
  },
];

// Mock RAID data
const mockRisks = [
  {
    id: "R001",
    title: "Delayed stakeholder approvals",
    description: "Key stakeholders may not be available for timely review and approval of deliverables",
    severity: "Critical",
    probability: "High",
    impact: "High",
    status: "Open",
    owner: "James Chen",
    identifiedDate: "2026-02-01",
    dueDate: "2026-02-18",
    mitigationPlan: "Schedule approval sessions in advance, identify backup approvers",
  },
  {
    id: "R002",
    title: "Integration dependencies not resolved",
    description: "Third-party system integration points may not be ready on time",
    severity: "High",
    probability: "Medium",
    impact: "High",
    status: "Mitigating",
    owner: "Maria Santos",
    identifiedDate: "2026-02-05",
    dueDate: "2026-02-20",
    mitigationPlan: "Weekly sync with integration team, parallel development approach",
  },
  {
    id: "R003",
    title: "Resource availability constraints",
    description: "Key technical resources may be pulled to other priority projects",
    severity: "Medium",
    probability: "Medium",
    impact: "Medium",
    status: "Monitoring",
    owner: "David Kumar",
    identifiedDate: "2026-01-20",
    dueDate: "2026-03-01",
    mitigationPlan: "Secure resource commitment from management, identify backup resources",
  },
];

const mockIssues = [
  {
    id: "I001",
    title: "Missing technical documentation from client",
    description: "Client has not provided current state architecture documentation as promised",
    severity: "Critical",
    status: "Blocked",
    owner: "David Kumar",
    identifiedDate: "2026-02-10",
    dueDate: "2026-02-19",
    resolution: "Escalated to client sponsor, scheduled follow-up meeting",
  },
  {
    id: "I002",
    title: "Access to production environment delayed",
    description: "Security team has not granted access to production systems for assessment",
    severity: "High",
    status: "In Progress",
    owner: "Alex Johnson",
    identifiedDate: "2026-02-12",
    dueDate: "2026-02-22",
    resolution: "Security review in progress, temporary dev environment provided",
  },
];

const mockAssumptions = [
  {
    id: "A001",
    title: "Client team availability",
    description: "Assuming client SMEs will be available for 4 hours per week for workshops and reviews",
    category: "Resources",
    status: "Valid",
    owner: "James Chen",
    identifiedDate: "2026-01-15",
    validatedDate: "2026-01-20",
  },
  {
    id: "A002",
    title: "Current state documentation accuracy",
    description: "Assuming provided documentation reflects actual current state as of Q4 2025",
    category: "Information",
    status: "Valid",
    owner: "Maria Santos",
    identifiedDate: "2026-01-15",
    validatedDate: "2026-01-25",
  },
  {
    id: "A003",
    title: "Technology stack approval",
    description: "Assuming recommended technology stack will be approved without major changes",
    category: "Technical",
    status: "Pending Validation",
    owner: "David Kumar",
    identifiedDate: "2026-02-01",
    validatedDate: null,
  },
];

const mockDependencies = [
  {
    id: "D001",
    title: "Enterprise architecture standards",
    description: "Requires finalized enterprise architecture standards from EA team",
    type: "Internal",
    status: "Pending",
    owner: "James Chen",
    dependentOn: "EA Team",
    identifiedDate: "2026-01-20",
    requiredDate: "2026-02-15",
  },
  {
    id: "D002",
    title: "API specifications from vendor",
    description: "Requires API documentation from third-party CRM vendor",
    type: "External",
    status: "Received",
    owner: "Maria Santos",
    dependentOn: "CRM Vendor",
    identifiedDate: "2026-01-25",
    requiredDate: "2026-02-10",
  },
  {
    id: "D003",
    title: "Security compliance approval",
    description: "Architecture must be approved by security compliance team",
    type: "Internal",
    status: "In Progress",
    owner: "Alex Johnson",
    dependentOn: "Security Team",
    identifiedDate: "2026-02-01",
    requiredDate: "2026-02-25",
  },
];

// Mock team members data
const mockTeamMembers = [
  {
    id: "TM001",
    name: "Rayyan Basha",
    email: "rayyan.basha@dq.com",
    role: "Delivery Lead",
    avatar: "RB",
    joinedDate: "2026-01-15",
    allocation: 100,
    deliverables: ["D1", "D2"],
    raidItems: ["R001", "D001"],
    status: "Active",
  },
  {
    id: "TM002",
    name: "James Chen",
    email: "james.chen@dq.com",
    role: "Solution Architect",
    avatar: "JC",
    joinedDate: "2026-01-15",
    allocation: 80,
    deliverables: ["D2", "D3"],
    raidItems: ["R001", "A001"],
    status: "Active",
  },
  {
    id: "TM003",
    name: "Maria Santos",
    email: "maria.santos@dq.com",
    role: "Technical Lead",
    avatar: "MS",
    joinedDate: "2026-01-20",
    allocation: 100,
    deliverables: ["D3", "D4"],
    raidItems: ["R002", "D002"],
    status: "Active",
  },
  {
    id: "TM004",
    name: "David Kumar",
    email: "david.kumar@dq.com",
    role: "Developer",
    avatar: "DK",
    joinedDate: "2026-02-01",
    allocation: 100,
    deliverables: ["D4"],
    raidItems: ["R003", "I001"],
    status: "Active",
  },
  {
    id: "TM005",
    name: "Alex Johnson",
    email: "alex.johnson@dq.com",
    role: "Developer",
    avatar: "AJ",
    joinedDate: "2026-02-01",
    allocation: 50,
    deliverables: [],
    raidItems: ["I002", "D003"],
    status: "Active",
  },
];

// Mock stakeholders data
const mockStakeholders = [
  {
    id: "SH001",
    name: "Mohammed Al-Rashid",
    position: "Chief Information Officer",
    organisation: "STC Bank",
    influence: "High",
    interest: "High",
    engagementStrategy: "Manage Closely",
    lastInteraction: "2026-02-15",
    email: "m.alrashid@stcbank.com",
    notes: "Key decision maker for digital transformation initiatives. Requires weekly updates.",
  },
  {
    id: "SH002",
    name: "Sarah Al-Mansour",
    position: "Head of IT Governance",
    organisation: "STC Bank",
    influence: "High",
    interest: "Medium",
    engagementStrategy: "Keep Satisfied",
    lastInteraction: "2026-02-10",
    email: "s.almansour@stcbank.com",
    notes: "Responsible for compliance and risk management. Needs to approve all governance frameworks.",
  },
  {
    id: "SH003",
    name: "Ahmed Hassan",
    position: "IT Security Manager",
    organisation: "STC Bank",
    influence: "Medium",
    interest: "High",
    engagementStrategy: "Keep Informed",
    lastInteraction: "2026-02-12",
    email: "a.hassan@stcbank.com",
    notes: "Very engaged in security aspects. Attends all technical reviews.",
  },
  {
    id: "SH004",
    name: "Fatima Al-Zahrani",
    position: "Business Process Owner",
    organisation: "STC Bank",
    influence: "Medium",
    interest: "Medium",
    engagementStrategy: "Keep Informed",
    lastInteraction: "2026-02-08",
    email: "f.alzahrani@stcbank.com",
    notes: "Represents business units. Interested in operational impact.",
  },
  {
    id: "SH005",
    name: "Omar Abdullah",
    position: "IT Operations Manager",
    organisation: "STC Bank",
    influence: "Low",
    interest: "Medium",
    engagementStrategy: "Monitor",
    lastInteraction: "2026-01-28",
    email: "o.abdullah@stcbank.com",
    notes: "Will be involved during implementation phase.",
  },
];

// Mock financial data
const mockContractData = {
  contractNumber: "CNT-2026-001",
  contractDate: "2026-01-10",
  contractValue: 1272861.0, // SAR 318,215.25 × 4
  currency: "SAR",
  startDate: "2026-01-15",
  endDate: "2026-03-20",
  clientEntity: "STC Bank",
  contractType: "Fixed Price",
};

const mockPaymentMilestones = [
  {
    id: "PM001",
    name: "Milestone 1",
    description: "Discovery & Current State Assessment",
    value: 318215.25,
    dueDate: "2026-01-31",
    status: "Partially Paid",
    paidAmount: 302304.49,
    paidDate: "2026-02-05",
    invoiceNumber: "INV-2026-001",
  },
  {
    id: "PM002",
    name: "Milestone 2",
    description: "Architecture Design & Blueprint",
    value: 318215.25,
    dueDate: "2026-02-21",
    status: "Pending",
    paidAmount: 0,
    paidDate: null,
    invoiceNumber: "INV-2026-002",
  },
  {
    id: "PM003",
    name: "Milestone 3",
    description: "Implementation Roadmap",
    value: 318215.25,
    dueDate: "2026-03-10",
    status: "Paused",
    paidAmount: 0,
    paidDate: null,
    invoiceNumber: null,
  },
  {
    id: "PM004",
    name: "Milestone 4",
    description: "Handover & Knowledge Transfer",
    value: 318215.25,
    dueDate: "2026-03-20",
    status: "Paused",
    paidAmount: 0,
    paidDate: null,
    invoiceNumber: null,
  },
];

const mockContractDocuments = [
  {
    id: "DOC001",
    name: "Master Service Agreement",
    type: "Contract",
    uploadDate: "2026-01-10",
  },
  {
    id: "DOC002",
    name: "Statement of Work",
    type: "Contract",
    uploadDate: "2026-01-10",
  },
];

const mockContractChanges = [
  {
    id: "CCN001",
    subject: "Timeline Extension - Milestone 3",
    description: "Extended Milestone 3 delivery date by 2 weeks due to client resource availability",
    status: "Agreed",
    requestedBy: "Client",
    date: "2026-02-15",
    author: "Rayyan Basha",
    documents: [
      { name: "CCN-001 Timeline Extension", link: "#" },
    ],
  },
  {
    id: "CCN002",
    subject: "Additional Deliverable - Security Assessment",
    description: "Client requested additional security assessment deliverable for Milestone 2",
    status: "In Negotiation",
    requestedBy: "Client",
    date: "2026-02-18",
    author: "James Chen",
    documents: [
      { name: "CCN-002 Scope Change Request", link: "#" },
    ],
  },
];

const EngagementDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [plannedProgress, setPlannedProgress] = useState(mockEngagement.plannedProgress);
  const [actualProgress, setActualProgress] = useState(mockEngagement.actualProgress);
  const [milestones, setMilestones] = useState(mockMilestones);
  const [deliverables, setDeliverables] = useState(mockDeliverables);
  const [activities, setActivities] = useState(mockActivities);
  const [editingMilestone, setEditingMilestone] = useState<number | null>(null);
  const [editingDeliverable, setEditingDeliverable] = useState<string | null>(null);
  const [editingActivity, setEditingActivity] = useState<string | null>(null);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showAddDeliverable, setShowAddDeliverable] = useState<number | null>(null);
  const [showAddActivity, setShowAddActivity] = useState<string | null>(null);
  const [raidView, setRaidView] = useState<"risks" | "assumptions" | "issues" | "dependencies">("risks");
  const [editingTeamMember, setEditingTeamMember] = useState<string | null>(null);
  const [showAddTeamMember, setShowAddTeamMember] = useState(false);
  const [stakeholders, setStakeholders] = useState(mockStakeholders);
  const [editingStakeholder, setEditingStakeholder] = useState<string | null>(null);
  const [showAddStakeholder, setShowAddStakeholder] = useState(false);
  
  // Form state for team member
  const [teamMemberForm, setTeamMemberForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  
  // Form states for milestone
  const [milestoneForm, setMilestoneForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    originalContractDate: "",
    adjustedContractDate: "",
    forecastDate: "",
  });

  // Form states for deliverable
  const [deliverableForm, setDeliverableForm] = useState({
    name: "",
    milestone: 1,
    status: "New",
    startDate: "",
    endDate: "",
    dueDate: "",
    owner: "",
    completionProgress: 0,
    supportingMaterials: [] as { name: string; link: string }[],
  });

  // Form states for activity
  const [activityForm, setActivityForm] = useState({
    name: "",
    deliverableId: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
    owner: "",
  });

  // Form states for stakeholder
  const [stakeholderForm, setStakeholderForm] = useState({
    name: "",
    position: "",
    organisation: "",
    influence: "Medium",
    interest: "Medium",
    email: "",
    notes: "",
  });

  const getHealthColor = (status: string) => {
    switch (status) {
      case "green":
        return "bg-green-500";
      case "amber":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getHealthLabel = (status: string) => {
    switch (status) {
      case "green":
        return "On Track";
      case "amber":
        return "At Risk";
      case "red":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  const handleSaveProgress = () => {
    console.log("Saving progress:", { plannedProgress, actualProgress });
    setIsEditingProgress(false);
  };

  const handleCancelProgress = () => {
    setPlannedProgress(mockEngagement.plannedProgress);
    setActualProgress(mockEngagement.actualProgress);
    setIsEditingProgress(false);
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      case "Not Started":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getMilestoneStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "default";
      case "Not Started":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getDeliverableStatusColor = (status: string) => {
    switch (status) {
      case "Closed":
        return "bg-green-500";
      case "Pending Acceptance":
        return "bg-yellow-500";
      case "In Progress":
        return "bg-blue-500";
      case "New":
        return "bg-purple-500";
      default:
        return "bg-gray-400";
    }
  };

  const getDeliverableStatusVariant = (status: string) => {
    switch (status) {
      case "Closed":
        return "default";
      case "Pending Acceptance":
        return "secondary";
      case "In Progress":
        return "default";
      case "New":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600";
      case "In Progress":
        return "bg-blue-600";
      case "Pending Acceptance":
        return "bg-yellow-600";
      case "Not Started":
        return "bg-gray-500";
      case "New":
        return "bg-purple-600";
      default:
        return "bg-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getDaysBetween = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getGanttPosition = (startDate: string) => {
    const projectStart = new Date("2026-01-15");
    const milestoneStart = new Date(startDate);
    const diffTime = milestoneStart.getTime() - projectStart.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays / 65) * 100; // 65 days total project duration
  };

  const getGanttWidth = (startDate: string, endDate: string) => {
    const days = getDaysBetween(startDate, endDate);
    return (days / 65) * 100; // 65 days total project duration
  };

  const handleEditMilestone = (milestone: typeof mockMilestones[0]) => {
    setMilestoneForm({
      name: milestone.name,
      description: milestone.description,
      startDate: milestone.startDate,
      endDate: milestone.endDate,
      originalContractDate: milestone.originalContractDate,
      adjustedContractDate: milestone.adjustedContractDate,
      forecastDate: milestone.forecastDate,
    });
    setEditingMilestone(milestone.id);
  };

  const handleSaveMilestone = () => {
    if (editingMilestone) {
      setMilestones(
        milestones.map((m) =>
          m.id === editingMilestone
            ? { ...m, ...milestoneForm }
            : m
        )
      );
    } else {
      // Add new milestone
      const newId = Math.max(...milestones.map((m) => m.id)) + 1;
      setMilestones([
        ...milestones,
        {
          id: newId,
          ...milestoneForm,
          status: "Not Started",
          progress: 0,
        },
      ]);
    }
    setEditingMilestone(null);
    setShowAddMilestone(false);
    setMilestoneForm({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      originalContractDate: "",
      adjustedContractDate: "",
      forecastDate: "",
    });
  };

  const handleEditDeliverable = (deliverable: typeof mockDeliverables[0]) => {
    setDeliverableForm({
      name: deliverable.name,
      milestone: deliverable.milestone,
      status: deliverable.status,
      startDate: deliverable.startDate,
      endDate: deliverable.endDate,
      dueDate: deliverable.dueDate,
      owner: deliverable.owner,
      completionProgress: deliverable.completionProgress || 0,
      supportingMaterials: deliverable.supportingMaterials || [],
    });
    setEditingDeliverable(deliverable.id);
  };

  const handleSaveDeliverable = () => {
    if (editingDeliverable) {
      setDeliverables(
        deliverables.map((d) =>
          d.id === editingDeliverable
            ? {
                ...d,
                ...deliverableForm,
                milestoneName: milestones.find((m) => m.id === deliverableForm.milestone)?.name || "",
              }
            : d
        )
      );
    } else if (showAddDeliverable) {
      // Add new deliverable
      const newId = `D${deliverables.length + 1}`;
      setDeliverables([
        ...deliverables,
        {
          id: newId,
          ...deliverableForm,
          milestoneName: milestones.find((m) => m.id === deliverableForm.milestone)?.name || "",
        },
      ]);
    }
    setEditingDeliverable(null);
    setShowAddDeliverable(null);
    setDeliverableForm({
      name: "",
      milestone: 1,
      status: "New",
      startDate: "",
      endDate: "",
      dueDate: "",
      owner: "",
      completionProgress: 0,
      supportingMaterials: [],
    });
  };

  const handleDeleteMilestone = (id: number) => {
    if (confirm("Are you sure you want to delete this milestone?")) {
      setMilestones(milestones.filter((m) => m.id !== id));
      setDeliverables(deliverables.filter((d) => d.milestone !== id));
    }
  };

  const handleDeleteDeliverable = (id: string) => {
    if (confirm("Are you sure you want to delete this deliverable?")) {
      setDeliverables(deliverables.filter((d) => d.id !== id));
    }
  };

  const handleEditTeamMember = (member: typeof mockTeamMembers[0]) => {
    setTeamMemberForm({
      name: member.name,
      email: member.email,
      role: member.role,
    });
    setEditingTeamMember(member.id);
  };

  const handleSaveTeamMember = () => {
    console.log("Saving team member:", teamMemberForm);
    setEditingTeamMember(null);
    setShowAddTeamMember(false);
    setTeamMemberForm({
      name: "",
      email: "",
      role: "",
    });
  };

  const handleDeleteTeamMember = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      console.log("Deleting team member:", id);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Back Navigation */}
        <Link to="/dashboard/services">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={16} />
            Back to Engagements
          </Button>
        </Link>

        {/* Engagement Header */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{mockEngagement.name}</h1>
                <Badge variant={
                  mockEngagement.status === "In Progress" 
                    ? "default" 
                    : mockEngagement.status === "Paused"
                    ? "secondary"
                    : "outline"
                }>
                  {mockEngagement.status}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {mockEngagement.type}
                </Badge>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${getHealthColor(mockEngagement.healthStatus)}`} />
                  <span className="text-sm font-medium text-muted-foreground">
                    {getHealthLabel(mockEngagement.healthStatus)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Engagement ID: {mockEngagement.id}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Client</p>
                    <p className="text-sm font-medium text-foreground">{mockEngagement.client}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium text-foreground">{mockEngagement.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Delivery Lead</p>
                    <p className="text-sm font-medium text-foreground">{mockEngagement.deliveryLead}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Project Start Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {mockEngagement.startDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">Edit Details</Button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted p-1 h-auto gap-0.5">
            <TabsTrigger value="overview" className="px-4 py-1.5 text-sm">Overview</TabsTrigger>
            <TabsTrigger value="plan" className="px-4 py-1.5 text-sm">Plan</TabsTrigger>
            <TabsTrigger value="deliverables" className="px-4 py-1.5 text-sm">Deliverables</TabsTrigger>
            <TabsTrigger value="sessions" className="px-4 py-1.5 text-sm">Working Sessions</TabsTrigger>
            <TabsTrigger value="team" className="px-4 py-1.5 text-sm">Team</TabsTrigger>
            <TabsTrigger value="stakeholders" className="px-4 py-1.5 text-sm">Stakeholders</TabsTrigger>
            <TabsTrigger value="raid" className="px-4 py-1.5 text-sm">RAID Log</TabsTrigger>
            <TabsTrigger value="reports" className="px-4 py-1.5 text-sm">Reports</TabsTrigger>
            <TabsTrigger value="financials" className="px-4 py-1.5 text-sm">Financials</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Project Vision - Collapsible */}
            <Collapsible defaultOpen>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <FileText size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Project Vision</CardTitle>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown size={16} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Enable the design and implementation of a comprehensive GRC capability for STC Bank, ensuring alignment with SAMA ITGF and attainment of Level 3...
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Key Metrics - 4 Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">0/4</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Milestones Completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Package size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">4</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Total Deliverables</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <AlertCircle size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">11</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Open RAID Items</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Calendar size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">10</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Upcoming Sessions</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Project Progress */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Project Progress</CardTitle>
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle size={12} />
                      At Risk
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">Actual vs. planned progress tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Progress Overview</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Planned</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">70%</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Edit size={12} />
                            </Button>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-400" style={{ width: "70%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Actual</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">60%</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Edit size={12} />
                            </Button>
                            <Badge variant="destructive" className="text-xs">-10%</Badge>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-xs text-red-900 flex items-center gap-2">
                        <AlertCircle size={14} />
                        <span className="font-medium">Project is 10% behind planned schedule</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contract Value</p>
                      <p className="font-semibold text-foreground">SAR 1,272,861</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Service Order</p>
                      <p className="font-semibold text-foreground">SO-2024-STC-GRC-001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Snapshot */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Financial Snapshot</CardTitle>
                  <CardDescription className="text-xs">Payment status and collection overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText size={16} className="text-blue-600" />
                        <span className="text-xs text-blue-900 font-medium">Invoiced</span>
                      </div>
                      <p className="text-xl font-bold text-blue-900">SAR 318,215.25</p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-green-600" />
                        <span className="text-xs text-green-900 font-medium">Paid</span>
                      </div>
                      <p className="text-xl font-bold text-green-900">SAR 302,304.49</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Collection Progress</span>
                      <span className="text-sm font-semibold text-foreground">95%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-orange-600" />
                        <span className="text-xs text-orange-900 font-medium">Outstanding</span>
                      </div>
                      <p className="text-lg font-bold text-orange-900">SAR 15,910.76</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Impact Risks & Issues */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">High Impact Risks & Issues</CardTitle>
                    <CardDescription className="text-xs">Items with significant potential or actual impact on delivery</CardDescription>
                  </div>
                  <Button variant="link" className="text-orange-600 gap-1">
                    View All
                    <ArrowLeft size={14} className="rotate-180" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Risk Item */}
                <div className="p-4 rounded-lg border-l-4 border-l-yellow-500 bg-yellow-50/50 border border-yellow-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={16} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">Risk</Badge>
                        <Badge variant="destructive" className="text-xs">High Impact</Badge>
                        <Badge variant="secondary" className="text-xs">Medium Probability</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground">MS03/MS04 Contract Change Impact (CCN)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>Action:</strong> DQ to share CCN DQ - STC to align on CCN Capture sign-off on CCN
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pl-11">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      Rayyan Basha
                    </span>
                    <Badge variant="outline" className="text-xs">Scope Unmanaged</Badge>
                  </div>
                </div>

                {/* Issue Item 1 */}
                <div className="p-4 rounded-lg border-l-4 border-l-red-500 bg-red-50/50 border border-red-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={16} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 text-xs">Issue</Badge>
                        <Badge variant="destructive" className="text-xs">High Severity</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground">Delays in MS02 Acceptance</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>Action:</strong> Ensure escalation thrugh SteerCo if reviews are not completed on time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pl-11">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      Rayyan Basha
                    </span>
                    <Badge variant="outline" className="text-xs">Schedule Slippage</Badge>
                  </div>
                </div>

                {/* Issue Item 2 */}
                <div className="p-4 rounded-lg border-l-4 border-l-red-500 bg-red-50/50 border border-red-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={16} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 text-xs">Issue</Badge>
                        <Badge variant="destructive" className="text-xs">High Severity</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground">Milestone 01 Payment Discrepancy (WHT-related)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>Action:</strong> Escalation issued through weekly status and email shared
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pl-11">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      Rayyan Basha
                    </span>
                    <Badge variant="outline" className="text-xs">Unresolved Contractual Obligations</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Working Session */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Next Working Session</CardTitle>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300">Coming Soon</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-accent/30 border border-border">
                  <p className="text-base font-semibold text-foreground mb-4">Weekly test</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date & Time</p>
                        <p className="text-sm font-medium text-foreground">Friday, April 17, 2026 at 12:21:00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Session Type</p>
                        <p className="text-sm font-medium text-foreground">Weekly Status</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-4">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Delivery Plan</h2>
                <p className="text-sm text-muted-foreground">
                  Manage milestones, timelines, and dependencies
                </p>
              </div>
              <Button onClick={() => setShowAddMilestone(true)} className="gap-2">
                <Plus size={16} />
                Add Milestone
              </Button>
            </div>

            {/* Gantt Chart View */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Activities Timeline</CardTitle>
                    <CardDescription>Visual representation of activities grouped by deliverables. Click on any activity to edit.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus size={14} />
                    Add Activity
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Timeline Header */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-border pb-2">
                    <div className="w-72">Activity / Deliverable</div>
                    <div className="flex-1 relative">
                      <div className="flex justify-between px-2">
                        <span>Jan 15</span>
                        <span>Feb 1</span>
                        <span>Feb 15</span>
                        <span>Mar 1</span>
                        <span>Mar 20</span>
                      </div>
                    </div>
                    <div className="w-20 text-right">Actions</div>
                  </div>

                  {/* Activities grouped by Deliverables */}
                  {deliverables.map((deliverable) => {
                    const deliverableActivities = activities.filter(
                      (a) => a.deliverableId === deliverable.id
                    );
                    
                    return (
                      <div key={deliverable.id} className="space-y-2">
                        {/* Deliverable Header */}
                        <div className="flex items-center gap-2 bg-accent/50 rounded-lg p-2">
                          <div className="w-72">
                            <p className="text-sm font-semibold text-foreground">
                              {deliverable.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {deliverable.milestoneName}
                            </p>
                          </div>
                          <div className="flex-1"></div>
                          <div className="w-20"></div>
                        </div>

                        {/* Activities for this deliverable */}
                        {deliverableActivities.map((activity) => (
                          <div key={activity.id} className="flex items-center gap-2 group pl-4">
                            <div
                              className="w-72 cursor-pointer hover:bg-accent/50 rounded p-2 -m-2 transition-colors"
                              onClick={() => {
                                setActivityForm({
                                  name: activity.name,
                                  deliverableId: activity.deliverableId,
                                  status: activity.status,
                                  startDate: activity.startDate,
                                  endDate: activity.endDate,
                                  owner: activity.owner,
                                });
                                setEditingActivity(activity.id);
                              }}
                            >
                              <p className="text-sm font-medium text-foreground truncate">
                                {activity.name}
                              </p>
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-muted-foreground">
                                  {activity.owner}
                                </p>
                                <span className="text-xs text-muted-foreground">•</span>
                                <p className="text-xs text-muted-foreground">
                                  {getDaysBetween(activity.startDate, activity.endDate)} days
                                </p>
                              </div>
                            </div>
                            <div className="flex-1 relative h-10 bg-accent/20 rounded">
                              <div
                                className={`absolute top-1 h-8 rounded ${getActivityStatusColor(
                                  activity.status
                                )} flex items-center justify-between px-3 cursor-pointer hover:opacity-90 transition-opacity`}
                                style={{
                                  left: `${getGanttPosition(activity.startDate)}%`,
                                  width: `${getGanttWidth(activity.startDate, activity.endDate)}%`,
                                }}
                                onClick={() => {
                                  setActivityForm({
                                    name: activity.name,
                                    deliverableId: activity.deliverableId,
                                    status: activity.status,
                                    startDate: activity.startDate,
                                    endDate: activity.endDate,
                                    owner: activity.owner,
                                  });
                                  setEditingActivity(activity.id);
                                }}
                              >
                                <span className="text-xs font-medium text-white truncate">
                                  {formatDate(activity.startDate)}
                                </span>
                                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
                                  {activity.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="w-20 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setActivityForm({
                                    name: activity.name,
                                    deliverableId: activity.deliverableId,
                                    status: activity.status,
                                    startDate: activity.startDate,
                                    endDate: activity.endDate,
                                    owner: activity.owner,
                                  });
                                  setEditingActivity(activity.id);
                                }}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => {
                                  if (confirm("Are you sure you want to delete this activity?")) {
                                    setActivities(activities.filter((a) => a.id !== activity.id));
                                  }
                                }}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {deliverableActivities.length === 0 && (
                          <div className="pl-4 py-4 text-center text-sm text-muted-foreground">
                            No activities for this deliverable yet.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {deliverables.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm">No deliverables yet.</p>
                    <p className="text-xs mt-1">Add deliverables to milestones to see activities here.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Milestones List */}
            <div className="space-y-4">
              {milestones.map((milestone) => {
                const milestoneDeliverables = deliverables.filter(
                  (d) => d.milestone === milestone.id
                );
                
                return (
                  <Card key={milestone.id}>
                    <Collapsible>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 mt-1">
                                <ChevronRight size={16} className="transition-transform" />
                              </Button>
                            </CollapsibleTrigger>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {milestone.name}
                                </h3>
                                <Badge variant={getMilestoneStatusVariant(milestone.status) as any}>
                                  {milestone.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {milestone.description}
                              </p>
                              <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} className="text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {formatDate(milestone.startDate)} - {formatDate(milestone.endDate)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    Forecast: {formatDate(milestone.forecastDate)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText size={14} className="text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {milestoneDeliverables.length} deliverable{milestoneDeliverables.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditMilestone(milestone)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteMilestone(milestone.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Progress</span>
                            <span className="text-sm font-medium text-foreground">
                              {milestone.progress}%
                            </span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                      </CardHeader>

                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="border-t border-border pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-foreground">
                                Deliverables ({milestoneDeliverables.length})
                              </h4>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => {
                                  setDeliverableForm({
                                    ...deliverableForm,
                                    milestone: milestone.id,
                                  });
                                  setShowAddDeliverable(milestone.id);
                                }}
                              >
                                <Plus size={14} />
                                Add Deliverable
                              </Button>
                            </div>
                            {milestoneDeliverables.length > 0 ? (
                              <div className="space-y-2">
                                {milestoneDeliverables.map((deliverable) => (
                                  <div
                                    key={deliverable.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/30"
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      <div
                                        className={`h-2 w-2 rounded-full ${getDeliverableStatusColor(
                                          deliverable.status
                                        )}`}
                                      />
                                      <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">
                                          {deliverable.name}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1">
                                          <p className="text-xs text-muted-foreground">
                                            Due: {formatDate(deliverable.dueDate)}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Owner: {deliverable.owner}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant={getDeliverableStatusVariant(deliverable.status) as any}
                                        className="text-xs"
                                      >
                                        {deliverable.status}
                                      </Badge>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleEditDeliverable(deliverable)}
                                      >
                                        <Edit size={14} />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => handleDeleteDeliverable(deliverable.id)}
                                      >
                                        <Trash2 size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground text-sm">
                                No deliverables yet. Click "Add Deliverable" to create one.
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="deliverables" className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Deliverables</h2>
                <p className="text-sm text-muted-foreground">
                  Track and manage project deliverables across milestones
                </p>
              </div>
              <Button onClick={() => setShowAddDeliverable(1)} className="gap-2">
                <Plus size={16} />
                Add Deliverable
              </Button>
            </div>

            {/* Deliverables Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deliverable Name</TableHead>
                      <TableHead>Milestone</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Completion Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliverables.map((deliverable) => (
                      <TableRow 
                        key={deliverable.id}
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => handleEditDeliverable(deliverable)}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{deliverable.name}</p>
                            {deliverable.supportingMaterials && deliverable.supportingMaterials.length > 0 && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {deliverable.supportingMaterials.length} supporting material{deliverable.supportingMaterials.length !== 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {deliverable.milestoneName}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {deliverable.owner.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-foreground">{deliverable.owner}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={getDeliverableStatusVariant(deliverable.status) as any}
                            className="text-xs"
                          >
                            {deliverable.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {formatDate(deliverable.dueDate)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {deliverable.completionProgress}%
                              </span>
                            </div>
                            <Progress 
                              value={deliverable.completionProgress} 
                              className="h-2 w-24"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditDeliverable(deliverable);
                              }}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDeliverable(deliverable.id);
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {deliverables.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm">No deliverables yet.</p>
                    <p className="text-xs mt-1">Create your first deliverable to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Deliverables by Milestone */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Deliverables by Milestone</h3>
              {milestones.map((milestone) => {
                const milestoneDeliverables = deliverables.filter(
                  (d) => d.milestone === milestone.id
                );
                
                if (milestoneDeliverables.length === 0) return null;
                
                return (
                  <Card key={milestone.id}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-base font-semibold text-foreground">
                              {milestone.name}
                            </h4>
                            <Badge variant={getMilestoneStatusVariant(milestone.status) as any}>
                              {milestone.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {milestoneDeliverables.length} deliverable{milestoneDeliverables.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {milestoneDeliverables.map((deliverable) => (
                          <div
                            key={deliverable.id}
                            className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                            onClick={() => handleEditDeliverable(deliverable)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h5 className="font-medium text-foreground">{deliverable.name}</h5>
                                <Badge 
                                  variant={getDeliverableStatusVariant(deliverable.status) as any}
                                  className="text-xs"
                                >
                                  {deliverable.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <User size={14} />
                                  <span>{deliverable.owner}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  <span>Due {formatDate(deliverable.dueDate)}</span>
                                </div>
                                {deliverable.supportingMaterials && deliverable.supportingMaterials.length > 0 && (
                                  <div className="flex items-center gap-2">
                                    <FileText size={14} />
                                    <span>{deliverable.supportingMaterials.length} material{deliverable.supportingMaterials.length !== 1 ? 's' : ''}</span>
                                  </div>
                                )}
                              </div>
                              {deliverable.supportingMaterials && deliverable.supportingMaterials.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {deliverable.supportingMaterials.map((material, idx) => (
                                    <a
                                      key={idx}
                                      href={material.link}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-xs text-primary hover:underline flex items-center gap-1"
                                    >
                                      <FileText size={12} />
                                      {material.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-right mb-2">
                                <span className="text-sm font-medium text-foreground">
                                  {deliverable.completionProgress}%
                                </span>
                              </div>
                              <Progress 
                                value={deliverable.completionProgress} 
                                className="h-2 w-32"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            {/* Header with CTA */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Working Sessions</h2>
                <p className="text-sm text-muted-foreground">
                  Manage workshops, meetings, and client sessions
                </p>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                Schedule Session
              </Button>
            </div>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Upcoming Sessions</CardTitle>
                    <CardDescription className="text-xs">Confirmed sessions scheduled with the client</CardDescription>
                  </div>
                  <Badge variant="secondary">{upcomingSessions.length} sessions</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-semibold text-foreground">{session.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {session.type}
                          </Badge>
                          <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-300">
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{session.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span className="text-foreground">
                              {new Date(session.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-muted-foreground" />
                            <span className="text-foreground">{session.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-muted-foreground" />
                            <span className="text-foreground">{session.attendees.length} attendees</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 size={14} className="text-muted-foreground" />
                            <span className="text-foreground">{session.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Attendees */}
                    <Collapsible>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Users size={14} />
                            View Attendees ({session.attendees.length})
                            <ChevronDown size={14} />
                          </Button>
                        </CollapsibleTrigger>
                        {session.meetingLink && (
                          <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                              <Mail size={14} />
                              Join Meeting
                            </a>
                          </Button>
                        )}
                      </div>
                      <CollapsibleContent className="pt-3">
                        <div className="flex flex-wrap gap-2">
                          {session.attendees.map((attendee, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {attendee}
                            </Badge>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Requested Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Requested Sessions</CardTitle>
                    <CardDescription className="text-xs">Sessions requested by client pending approval</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    {requestedSessions.length} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {requestedSessions.map((session) => (
                  <div key={session.id} className="p-4 rounded-lg border-2 border-yellow-200 bg-yellow-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-semibold text-foreground">{session.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {session.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{session.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="text-muted-foreground mb-1">Requested By</p>
                            <p className="text-foreground font-medium">{session.requestedBy}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Preferred Date</p>
                            <p className="text-foreground font-medium">
                              {new Date(session.preferredDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Preferred Time</p>
                            <p className="text-foreground font-medium">{session.preferredTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-yellow-200">
                      <Button size="sm" className="gap-2">
                        <CheckCircle2 size={14} />
                        Approve & Schedule
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Edit size={14} />
                        Suggest Alternative
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-2 text-red-600 hover:text-red-700">
                        <Trash2 size={14} />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Past Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Past Sessions</CardTitle>
                    <CardDescription className="text-xs">Completed sessions with notes and recordings</CardDescription>
                  </div>
                  <Badge variant="secondary">{pastSessions.length} completed</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pastSessions.map((session) => (
                  <Collapsible key={session.id}>
                    <div className="p-4 rounded-lg border border-border bg-accent/30">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-sm font-semibold text-foreground">{session.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {session.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-gray-100 text-gray-800 border-gray-300">
                              {session.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-muted-foreground" />
                              <span className="text-foreground">
                                {new Date(session.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-muted-foreground" />
                              <span className="text-foreground">{session.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={14} className="text-muted-foreground" />
                              <span className="text-foreground">{session.attendees.length} attendees</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 size={14} className="text-muted-foreground" />
                              <span className="text-foreground">{session.location}</span>
                            </div>
                          </div>

                          {/* Session Notes Preview */}
                          {session.notes && (
                            <div className="p-3 rounded bg-white border border-border">
                              <p className="text-xs text-muted-foreground mb-1 font-medium">Session Notes:</p>
                              <p className="text-xs text-foreground line-clamp-2">{session.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-border">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <ChevronDown size={14} />
                            View Details
                          </Button>
                        </CollapsibleTrigger>
                        {session.recordingLink && (
                          <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href={session.recordingLink} target="_blank" rel="noopener noreferrer">
                              <Activity size={14} />
                              View Recording
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* Expanded Details */}
                      <CollapsibleContent className="pt-4 space-y-4">
                        {/* Full Notes */}
                        {session.notes && (
                          <div>
                            <p className="text-xs font-semibold text-foreground mb-2">Full Session Notes</p>
                            <div className="p-3 rounded bg-white border border-border">
                              <p className="text-xs text-foreground whitespace-pre-wrap">{session.notes}</p>
                            </div>
                          </div>
                        )}

                        {/* Attendees */}
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-2">Attendees ({session.attendees.length})</p>
                          <div className="flex flex-wrap gap-2">
                            {session.attendees.map((attendee, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    {attendee.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-foreground">{attendee}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Session Metadata */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground mb-1">Duration</p>
                            <p className="text-foreground font-medium">{session.duration}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground font-medium">{session.location}</p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Delivery Team</h2>
                <p className="text-sm text-muted-foreground">
                  Manage team members and their project assignments
                </p>
              </div>
              <Button onClick={() => setShowAddTeamMember(true)} className="gap-2">
                <Plus size={16} />
                Add Team Member
              </Button>
            </div>

            {/* Team Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Project Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTeamMembers.map((member) => (
                      <TableRow
                        key={member.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleEditTeamMember(member)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{member.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {deliverables.filter(d => d.owner === member.name).length} deliverable{deliverables.filter(d => d.owner === member.name).length !== 1 ? 's' : ''} • {activities.filter(a => member.deliverables.includes(a.deliverableId)).length} activit{activities.filter(a => member.deliverables.includes(a.deliverableId)).length !== 1 ? 'ies' : 'y'}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{member.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={member.status === "Active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditTeamMember(member)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteTeamMember(member.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Empty State */}
            {mockTeamMembers.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Users size={48} className="text-muted-foreground/20 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No team members yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add team members to start managing your delivery team
                  </p>
                  <Button onClick={() => setShowAddTeamMember(true)} className="gap-2">
                    <Plus size={16} />
                    Add Team Member
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stakeholders" className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Stakeholder Management</h2>
                <p className="text-sm text-muted-foreground">
                  Identify and manage key stakeholders for this engagement
                </p>
              </div>
              <Button onClick={() => setShowAddStakeholder(true)} className="gap-2">
                <Plus size={16} />
                Add Stakeholder
              </Button>
            </div>

            {/* Stakeholders Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Influence</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Engagement Strategy</TableHead>
                      <TableHead>Last Interaction</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stakeholders.map((stakeholder) => (
                      <TableRow
                        key={stakeholder.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => {
                          setStakeholderForm({
                            name: stakeholder.name,
                            position: stakeholder.position,
                            organisation: stakeholder.organisation,
                            influence: stakeholder.influence,
                            interest: stakeholder.interest,
                            email: stakeholder.email || "",
                            notes: stakeholder.notes || "",
                          });
                          setEditingStakeholder(stakeholder.id);
                        }}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{stakeholder.name}</p>
                            {stakeholder.email && (
                              <p className="text-xs text-muted-foreground">{stakeholder.email}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm text-foreground">{stakeholder.position}</p>
                            <p className="text-xs text-muted-foreground">{stakeholder.organisation}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              stakeholder.influence === "High"
                                ? "destructive"
                                : stakeholder.influence === "Medium"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {stakeholder.influence}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              stakeholder.interest === "High"
                                ? "default"
                                : stakeholder.interest === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {stakeholder.interest}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {stakeholder.engagementStrategy}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(stakeholder.lastInteraction)}
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                setStakeholderForm({
                                  name: stakeholder.name,
                                  position: stakeholder.position,
                                  organisation: stakeholder.organisation,
                                  influence: stakeholder.influence,
                                  interest: stakeholder.interest,
                                  email: stakeholder.email || "",
                                  notes: stakeholder.notes || "",
                                });
                                setEditingStakeholder(stakeholder.id);
                              }}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => {
                                if (confirm("Are you sure you want to remove this stakeholder?")) {
                                  setStakeholders(stakeholders.filter((s) => s.id !== stakeholder.id));
                                }
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {stakeholders.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm">No stakeholders yet.</p>
                    <p className="text-xs mt-1">Add stakeholders to manage engagement relationships.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stakeholder Matrix View - Contemporary Card-Based Design */}
            <div className="grid grid-cols-2 gap-4">
              {/* Manage Closely Quadrant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full border-2 border-red-200 bg-gradient-to-br from-red-50 via-white to-red-50/30 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-red-900 flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                          Manage Closely
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5 text-red-700">
                          High Influence • High Interest
                        </CardDescription>
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                        {stakeholders.filter((s) => s.influence === "High" && s.interest === "High").length}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1.5 px-4 pb-4">
                    {stakeholders
                      .filter((s) => s.influence === "High" && s.interest === "High")
                      .map((stakeholder, idx) => (
                        <motion.div
                          key={stakeholder.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="group relative"
                        >
                          <div
                            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-red-100 hover:border-red-300 hover:shadow-md transition-all cursor-pointer"
                            onClick={() => {
                              setStakeholderForm({
                                name: stakeholder.name,
                                position: stakeholder.position,
                                organisation: stakeholder.organisation,
                                influence: stakeholder.influence,
                                interest: stakeholder.interest,
                                email: stakeholder.email || "",
                                notes: stakeholder.notes || "",
                              });
                              setEditingStakeholder(stakeholder.id);
                            }}
                          >
                            <Avatar className="h-9 w-9 border-2 border-red-200">
                              <AvatarFallback className="bg-red-500 text-white font-semibold text-xs">
                                {stakeholder.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-foreground truncate">
                                {stakeholder.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {stakeholder.position}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge variant="outline" className="text-[10px] bg-red-50 border-red-200">
                                Last: {new Date(stakeholder.lastInteraction).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    {stakeholders.filter((s) => s.influence === "High" && s.interest === "High").length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <p className="text-xs">No stakeholders in this quadrant</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Keep Satisfied Quadrant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-amber-900 flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                          Keep Satisfied
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5 text-amber-700">
                          High Influence • Low-Medium Interest
                        </CardDescription>
                      </div>
                      <div className="text-2xl font-bold text-amber-600">
                        {stakeholders.filter((s) => s.influence === "High" && (s.interest === "Low" || s.interest === "Medium")).length}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1.5 px-4 pb-4">
                    {stakeholders
                      .filter((s) => s.influence === "High" && (s.interest === "Low" || s.interest === "Medium"))
                      .map((stakeholder, idx) => (
                        <motion.div
                          key={stakeholder.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="group relative"
                        >
                          <div
                            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
                            onClick={() => {
                              setStakeholderForm({
                                name: stakeholder.name,
                                position: stakeholder.position,
                                organisation: stakeholder.organisation,
                                influence: stakeholder.influence,
                                interest: stakeholder.interest,
                                email: stakeholder.email || "",
                                notes: stakeholder.notes || "",
                              });
                              setEditingStakeholder(stakeholder.id);
                            }}
                          >
                            <Avatar className="h-9 w-9 border-2 border-amber-200">
                              <AvatarFallback className="bg-amber-500 text-white font-semibold text-xs">
                                {stakeholder.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-foreground truncate">
                                {stakeholder.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {stakeholder.position}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge variant="outline" className="text-[10px] bg-amber-50 border-amber-200">
                                Last: {new Date(stakeholder.lastInteraction).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    {stakeholders.filter((s) => s.influence === "High" && (s.interest === "Low" || s.interest === "Medium")).length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <p className="text-xs">No stakeholders in this quadrant</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Keep Informed Quadrant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-blue-900 flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                          Keep Informed
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5 text-blue-700">
                          Low-Medium Influence • High Interest
                        </CardDescription>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {stakeholders.filter((s) => (s.influence === "Low" || s.influence === "Medium") && s.interest === "High").length}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1.5 px-4 pb-4">
                    {stakeholders
                      .filter((s) => (s.influence === "Low" || s.influence === "Medium") && s.interest === "High")
                      .map((stakeholder, idx) => (
                        <motion.div
                          key={stakeholder.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="group relative"
                        >
                          <div
                            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                            onClick={() => {
                              setStakeholderForm({
                                name: stakeholder.name,
                                position: stakeholder.position,
                                organisation: stakeholder.organisation,
                                influence: stakeholder.influence,
                                interest: stakeholder.interest,
                                email: stakeholder.email || "",
                                notes: stakeholder.notes || "",
                              });
                              setEditingStakeholder(stakeholder.id);
                            }}
                          >
                            <Avatar className="h-9 w-9 border-2 border-blue-200">
                              <AvatarFallback className="bg-blue-500 text-white font-semibold text-xs">
                                {stakeholder.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-foreground truncate">
                                {stakeholder.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {stakeholder.position}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge variant="outline" className="text-[10px] bg-blue-50 border-blue-200">
                                Last: {new Date(stakeholder.lastInteraction).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    {stakeholders.filter((s) => (s.influence === "Low" || s.influence === "Medium") && s.interest === "High").length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <p className="text-xs">No stakeholders in this quadrant</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Monitor Quadrant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="h-full border-2 border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50/30 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-gray-900 flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                          Monitor
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5 text-gray-700">
                          Low-Medium Influence • Low-Medium Interest
                        </CardDescription>
                      </div>
                      <div className="text-2xl font-bold text-gray-600">
                        {stakeholders.filter((s) => (s.influence === "Low" || s.influence === "Medium") && (s.interest === "Low" || s.interest === "Medium")).length}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1.5 px-4 pb-4">
                    {stakeholders
                      .filter((s) => (s.influence === "Low" || s.influence === "Medium") && (s.interest === "Low" || s.interest === "Medium"))
                      .map((stakeholder, idx) => (
                        <motion.div
                          key={stakeholder.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="group relative"
                        >
                          <div
                            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
                            onClick={() => {
                              setStakeholderForm({
                                name: stakeholder.name,
                                position: stakeholder.position,
                                organisation: stakeholder.organisation,
                                influence: stakeholder.influence,
                                interest: stakeholder.interest,
                                email: stakeholder.email || "",
                                notes: stakeholder.notes || "",
                              });
                              setEditingStakeholder(stakeholder.id);
                            }}
                          >
                            <Avatar className="h-9 w-9 border-2 border-gray-200">
                              <AvatarFallback className="bg-gray-400 text-white font-semibold text-xs">
                                {stakeholder.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-foreground truncate">
                                {stakeholder.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {stakeholder.position}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge variant="outline" className="text-[10px] bg-gray-50 border-gray-200">
                                Last: {new Date(stakeholder.lastInteraction).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    {stakeholders.filter((s) => (s.influence === "Low" || s.influence === "Medium") && (s.interest === "Low" || s.interest === "Medium")).length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <p className="text-xs">No stakeholders in this quadrant</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="raid" className="space-y-4">
            {/* RAID Header with Chips */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={raidView === "risks" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRaidView("risks")}
                  className="gap-2"
                >
                  <AlertCircle size={14} />
                  Risks ({mockRisks.length})
                </Button>
                <Button
                  variant={raidView === "assumptions" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRaidView("assumptions")}
                  className="gap-2"
                >
                  <CheckCircle2 size={14} />
                  Assumptions ({mockAssumptions.length})
                </Button>
                <Button
                  variant={raidView === "issues" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRaidView("issues")}
                  className="gap-2"
                >
                  <AlertCircle size={14} />
                  Issues ({mockIssues.length})
                </Button>
                <Button
                  variant={raidView === "dependencies" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRaidView("dependencies")}
                  className="gap-2"
                >
                  <Activity size={14} />
                  Dependencies ({mockDependencies.length})
                </Button>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                Add {raidView === "risks" ? "Risk" : raidView === "assumptions" ? "Assumption" : raidView === "issues" ? "Issue" : "Dependency"}
              </Button>
            </div>

            {/* Risks Table */}
            {raidView === "risks" && (
              <Card>
                <CardHeader>
                  <CardTitle>Risks</CardTitle>
                  <CardDescription>Track and manage project risks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Probability</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRisks.map((risk) => (
                        <TableRow key={risk.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{risk.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{risk.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {risk.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                risk.severity === "Critical"
                                  ? "destructive"
                                  : risk.severity === "High"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {risk.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{risk.probability}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{risk.impact}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                risk.status === "Open"
                                  ? "destructive"
                                  : risk.status === "Mitigating"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {risk.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{risk.owner}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(risk.dueDate)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Assumptions Table */}
            {raidView === "assumptions" && (
              <Card>
                <CardHeader>
                  <CardTitle>Assumptions</CardTitle>
                  <CardDescription>Track and validate project assumptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Identified</TableHead>
                        <TableHead>Validated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAssumptions.map((assumption) => (
                        <TableRow key={assumption.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{assumption.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{assumption.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {assumption.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{assumption.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                assumption.status === "Valid"
                                  ? "default"
                                  : assumption.status === "Pending Validation"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {assumption.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{assumption.owner}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(assumption.identifiedDate)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {assumption.validatedDate ? formatDate(assumption.validatedDate) : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Issues Table */}
            {raidView === "issues" && (
              <Card>
                <CardHeader>
                  <CardTitle>Issues</CardTitle>
                  <CardDescription>Track and resolve project issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Identified</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockIssues.map((issue) => (
                        <TableRow key={issue.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{issue.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{issue.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {issue.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                issue.severity === "Critical"
                                  ? "destructive"
                                  : issue.severity === "High"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {issue.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                issue.status === "Blocked"
                                  ? "destructive"
                                  : issue.status === "In Progress"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {issue.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{issue.owner}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(issue.identifiedDate)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(issue.dueDate)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Dependencies Table */}
            {raidView === "dependencies" && (
              <Card>
                <CardHeader>
                  <CardTitle>Dependencies</CardTitle>
                  <CardDescription>Track external and internal dependencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Dependent On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Required Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDependencies.map((dependency) => (
                        <TableRow key={dependency.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{dependency.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{dependency.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {dependency.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={dependency.type === "External" ? "default" : "secondary"}>
                              {dependency.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {dependency.dependentOn}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                dependency.status === "Received"
                                  ? "default"
                                  : dependency.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {dependency.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{dependency.owner}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(dependency.requiredDate)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view engagement reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reports view coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            {/* Contract Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Overview</CardTitle>
                <CardDescription>Key contract details and commercial terms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contract Number</p>
                    <p className="font-semibold text-foreground">{mockContractData.contractNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contract Date</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(mockContractData.contractDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contract Value</p>
                    <p className="font-semibold text-foreground">
                      {mockContractData.currency} {mockContractData.contractValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contract Type</p>
                    <Badge variant="outline">{mockContractData.contractType}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Client Entity</p>
                    <p className="font-semibold text-foreground">{mockContractData.clientEntity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(mockContractData.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">End Date</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(mockContractData.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-foreground">
                      {getDaysBetween(mockContractData.startDate, mockContractData.endDate)} days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Milestones */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Milestones</CardTitle>
                    <CardDescription>Track milestone payments and invoicing</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Paid</p>
                    <p className="text-lg font-bold text-foreground">
                      {mockContractData.currency}{" "}
                      {mockPaymentMilestones
                        .reduce((sum, m) => sum + m.paidAmount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPaymentMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="rounded-lg border border-border bg-accent/30 p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold text-foreground">{milestone.name}</h4>
                            <Badge
                              variant={
                                milestone.status === "Partially Paid"
                                  ? "default"
                                  : milestone.status === "Pending"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {milestone.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {mockContractData.currency} {milestone.value.toLocaleString()}
                          </p>
                          {milestone.invoiceNumber && (
                            <p className="text-xs text-muted-foreground">{milestone.invoiceNumber}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Due Date</p>
                          <p className="font-medium text-foreground">
                            {formatDate(milestone.dueDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Paid Amount</p>
                          <p className="font-medium text-foreground">
                            {mockContractData.currency} {milestone.paidAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Outstanding</p>
                          <p className="font-medium text-orange-600">
                            {mockContractData.currency}{" "}
                            {(milestone.value - milestone.paidAmount).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {milestone.paidDate && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            Paid on {formatDate(milestone.paidDate)}
                          </p>
                        </div>
                      )}

                      {milestone.status === "Partially Paid" && (
                        <div className="mt-3">
                          <Progress
                            value={(milestone.paidAmount / milestone.value) * 100}
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contract Documents & Changes */}
            <div className="space-y-6">
              {/* Contract Documents */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Contract Documents</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus size={14} />
                      Add Document
                    </Button>
                  </div>
                  <CardDescription className="text-xs">
                    Add references to contract documents stored externally
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockContractDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <FileText size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Added {formatDate(doc.uploadDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contract Changes */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Contract Changes</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus size={14} />
                      Add Change
                    </Button>
                  </div>
                  <CardDescription className="text-xs">
                    Track contract amendments and change requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockContractChanges.map((change) => (
                      <div
                        key={change.id}
                        className="p-4 rounded-lg border border-border bg-accent/30"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground text-sm">{change.subject}</h4>
                              <Badge
                                variant={
                                  change.status === "Agreed" || change.status === "Signed"
                                    ? "default"
                                    : change.status === "In Negotiation" || change.status === "In Specification"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {change.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{change.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Requested By</p>
                            <Badge variant="outline" className="text-xs">
                              {change.requestedBy}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Change ID</p>
                            <p className="text-xs font-medium text-foreground">{change.id}</p>
                          </div>
                        </div>

                        {change.documents && change.documents.length > 0 && (
                          <div className="pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-2">Relevant Documents</p>
                            <div className="space-y-1">
                              {change.documents.map((doc, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-xs text-primary hover:underline cursor-pointer"
                                >
                                  <FileText size={12} />
                                  <span>{doc.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{change.author}</span>
                            <span>•</span>
                            <span>{formatDate(change.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit size={12} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {mockContractChanges.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No contract changes recorded
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Milestone Dialog */}
        <Dialog open={editingMilestone !== null || showAddMilestone} onOpenChange={(open) => {
          if (!open) {
            setEditingMilestone(null);
            setShowAddMilestone(false);
            setMilestoneForm({
              name: "",
              description: "",
              startDate: "",
              endDate: "",
              originalContractDate: "",
              adjustedContractDate: "",
              forecastDate: "",
            });
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMilestone ? "Edit Milestone" : "Add New Milestone"}
              </DialogTitle>
              <DialogDescription>
                {editingMilestone
                  ? "Update milestone details and timeline"
                  : "Create a new milestone for this engagement"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="milestone-name">Milestone Name</Label>
                <Input
                  id="milestone-name"
                  value={milestoneForm.name}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, name: e.target.value })}
                  placeholder="e.g., Milestone 05"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="milestone-description">Description</Label>
                <Textarea
                  id="milestone-description"
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                  placeholder="Brief description of this milestone"
                  rows={3}
                />
              </div>
              
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-semibold text-foreground">Timeline</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="milestone-start">Start Date</Label>
                    <Input
                      id="milestone-start"
                      type="date"
                      value={milestoneForm.startDate}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milestone-end">End Date</Label>
                    <Input
                      id="milestone-end"
                      type="date"
                      value={milestoneForm.endDate}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground">Contract Dates</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="milestone-original" className="text-xs">
                      Original Contract Date
                    </Label>
                    <Input
                      id="milestone-original"
                      type="date"
                      value={milestoneForm.originalContractDate}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, originalContractDate: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Initial agreed date</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milestone-adjusted" className="text-xs">
                      Adjusted Contract Date
                    </Label>
                    <Input
                      id="milestone-adjusted"
                      type="date"
                      value={milestoneForm.adjustedContractDate}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, adjustedContractDate: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Revised agreed date</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milestone-forecast" className="text-xs">
                      Forecast Date
                    </Label>
                    <Input
                      id="milestone-forecast"
                      type="date"
                      value={milestoneForm.forecastDate}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, forecastDate: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Current projection</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingMilestone(null);
                  setShowAddMilestone(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveMilestone}>
                {editingMilestone ? "Save Changes" : "Create Milestone"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Deliverable Dialog */}
        <Dialog open={editingDeliverable !== null || showAddDeliverable !== null} onOpenChange={(open) => {
          if (!open) {
            setEditingDeliverable(null);
            setShowAddDeliverable(null);
            setDeliverableForm({
              name: "",
              milestone: 1,
              status: "New",
              startDate: "",
              endDate: "",
              dueDate: "",
              owner: "",
              completionProgress: 0,
              supportingMaterials: [],
            });
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingDeliverable ? "Edit Deliverable" : "Add New Deliverable"}
              </DialogTitle>
              <DialogDescription>
                {editingDeliverable
                  ? "Update deliverable details and timeline"
                  : "Create a new deliverable for this milestone"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="deliverable-name">Deliverable Name</Label>
                <Input
                  id="deliverable-name"
                  value={deliverableForm.name}
                  onChange={(e) => setDeliverableForm({ ...deliverableForm, name: e.target.value })}
                  placeholder="e.g., Technical Architecture Document"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliverable-milestone">Milestone</Label>
                  <Select
                    value={deliverableForm.milestone.toString()}
                    onValueChange={(value) =>
                      setDeliverableForm({ ...deliverableForm, milestone: parseInt(value) })
                    }
                  >
                    <SelectTrigger id="deliverable-milestone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {milestones.map((m) => (
                        <SelectItem key={m.id} value={m.id.toString()}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliverable-status">Status</Label>
                  <Select
                    value={deliverableForm.status}
                    onValueChange={(value) => setDeliverableForm({ ...deliverableForm, status: value })}
                  >
                    <SelectTrigger id="deliverable-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Pending Acceptance">Pending Acceptance</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliverable-owner">Owner</Label>
                  <Input
                    id="deliverable-owner"
                    value={deliverableForm.owner}
                    onChange={(e) => setDeliverableForm({ ...deliverableForm, owner: e.target.value })}
                    placeholder="e.g., James Chen"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliverable-progress">Completion Progress (%)</Label>
                  <Input
                    id="deliverable-progress"
                    type="number"
                    min="0"
                    max="100"
                    value={deliverableForm.completionProgress}
                    onChange={(e) => setDeliverableForm({ ...deliverableForm, completionProgress: parseInt(e.target.value) || 0 })}
                    placeholder="0-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliverable-start">Start Date</Label>
                  <Input
                    id="deliverable-start"
                    type="date"
                    value={deliverableForm.startDate}
                    onChange={(e) => setDeliverableForm({ ...deliverableForm, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliverable-end">End Date</Label>
                  <Input
                    id="deliverable-end"
                    type="date"
                    value={deliverableForm.endDate}
                    onChange={(e) => setDeliverableForm({ ...deliverableForm, endDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliverable-due">Due Date</Label>
                  <Input
                    id="deliverable-due"
                    type="date"
                    value={deliverableForm.dueDate}
                    onChange={(e) => setDeliverableForm({ ...deliverableForm, dueDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <Label>Supporting Materials</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDeliverableForm({
                        ...deliverableForm,
                        supportingMaterials: [
                          ...deliverableForm.supportingMaterials,
                          { name: "", link: "#" }
                        ]
                      });
                    }}
                    className="gap-2"
                  >
                    <Plus size={14} />
                    Add Material
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add links to supporting documents and materials
                </p>
                {deliverableForm.supportingMaterials.length > 0 && (
                  <div className="space-y-2">
                    {deliverableForm.supportingMaterials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          placeholder="Material name"
                          value={material.name}
                          onChange={(e) => {
                            const updated = [...deliverableForm.supportingMaterials];
                            updated[index].name = e.target.value;
                            setDeliverableForm({ ...deliverableForm, supportingMaterials: updated });
                          }}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Link/URL"
                          value={material.link}
                          onChange={(e) => {
                            const updated = [...deliverableForm.supportingMaterials];
                            updated[index].link = e.target.value;
                            setDeliverableForm({ ...deliverableForm, supportingMaterials: updated });
                          }}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            const updated = deliverableForm.supportingMaterials.filter((_, i) => i !== index);
                            setDeliverableForm({ ...deliverableForm, supportingMaterials: updated });
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingDeliverable(null);
                  setShowAddDeliverable(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveDeliverable}>
                {editingDeliverable ? "Save Changes" : "Create Deliverable"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Activity Dialog */}
        <Dialog open={editingActivity !== null || showAddActivity !== null} onOpenChange={(open) => {
          if (!open) {
            setEditingActivity(null);
            setShowAddActivity(null);
            setActivityForm({
              name: "",
              deliverableId: "",
              status: "Not Started",
              startDate: "",
              endDate: "",
              owner: "",
            });
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingActivity ? "Edit Activity" : "Add New Activity"}
              </DialogTitle>
              <DialogDescription>
                {editingActivity
                  ? "Update activity details and timeline"
                  : "Create a new activity for a deliverable"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="activity-name">Activity Name</Label>
                <Input
                  id="activity-name"
                  value={activityForm.name}
                  onChange={(e) => setActivityForm({ ...activityForm, name: e.target.value })}
                  placeholder="e.g., Requirements Gathering"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-deliverable">Deliverable</Label>
                  <Select
                    value={activityForm.deliverableId}
                    onValueChange={(value) =>
                      setActivityForm({ ...activityForm, deliverableId: value })
                    }
                  >
                    <SelectTrigger id="activity-deliverable">
                      <SelectValue placeholder="Select deliverable" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliverables.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity-status">Status</Label>
                  <Select
                    value={activityForm.status}
                    onValueChange={(value) => setActivityForm({ ...activityForm, status: value })}
                  >
                    <SelectTrigger id="activity-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Pending Acceptance">Pending Acceptance</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity-owner">Owner</Label>
                <Input
                  id="activity-owner"
                  value={activityForm.owner}
                  onChange={(e) => setActivityForm({ ...activityForm, owner: e.target.value })}
                  placeholder="e.g., James Chen"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-start">Start Date</Label>
                  <Input
                    id="activity-start"
                    type="date"
                    value={activityForm.startDate}
                    onChange={(e) => setActivityForm({ ...activityForm, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity-end">End Date</Label>
                  <Input
                    id="activity-end"
                    type="date"
                    value={activityForm.endDate}
                    onChange={(e) => setActivityForm({ ...activityForm, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingActivity(null);
                  setShowAddActivity(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => {
                if (editingActivity) {
                  setActivities(
                    activities.map((a) =>
                      a.id === editingActivity
                        ? {
                            ...a,
                            ...activityForm,
                            deliverableName: deliverables.find((d) => d.id === activityForm.deliverableId)?.name || "",
                          }
                        : a
                    )
                  );
                } else if (showAddActivity) {
                  const newId = `A${activities.length + 1}`;
                  setActivities([
                    ...activities,
                    {
                      id: newId,
                      ...activityForm,
                      deliverableName: deliverables.find((d) => d.id === activityForm.deliverableId)?.name || "",
                    },
                  ]);
                }
                setEditingActivity(null);
                setShowAddActivity(null);
                setActivityForm({
                  name: "",
                  deliverableId: "",
                  status: "Not Started",
                  startDate: "",
                  endDate: "",
                  owner: "",
                });
              }}>
                {editingActivity ? "Save Changes" : "Create Activity"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Team Member Dialog */}
        <Dialog open={editingTeamMember !== null || showAddTeamMember} onOpenChange={(open) => {
          if (!open) {
            setEditingTeamMember(null);
            setShowAddTeamMember(false);
            setTeamMemberForm({
              name: "",
              email: "",
              role: "",
            });
          }
        }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTeamMember ? "Team Member Details" : "Add Team Member"}
              </DialogTitle>
              <DialogDescription>
                {editingTeamMember
                  ? "View and update team member information and assignments"
                  : "Add a new member to the delivery team"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="member-name">Full Name</Label>
                    <Input
                      id="member-name"
                      value={teamMemberForm.name}
                      onChange={(e) => setTeamMemberForm({ ...teamMemberForm, name: e.target.value })}
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-email">Email Address</Label>
                    <Input
                      id="member-email"
                      type="email"
                      value={teamMemberForm.email}
                      onChange={(e) => setTeamMemberForm({ ...teamMemberForm, email: e.target.value })}
                      placeholder="e.g., john.smith@dq.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-role">Project Role</Label>
                  <Input
                    id="member-role"
                    value={teamMemberForm.role}
                    onChange={(e) => setTeamMemberForm({ ...teamMemberForm, role: e.target.value })}
                    placeholder="e.g., Solution Architect, Developer, Business Analyst"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the role for this specific project, not the platform role
                  </p>
                </div>
              </div>

              {/* Assignments - Only show when editing */}
              {editingTeamMember && (() => {
                const member = mockTeamMembers.find(m => m.id === editingTeamMember);
                if (!member) return null;
                
                // Get activities assigned to this member (through deliverables)
                const memberActivities = activities.filter(a => 
                  member.deliverables.includes(a.deliverableId)
                );
                
                // Get only Risks and Issues (not Dependencies or Assumptions)
                const memberRisks = mockRisks.filter(r => member.raidItems.includes(r.id));
                const memberIssues = mockIssues.filter(i => member.raidItems.includes(i.id));
                
                return (
                  <div className="pt-4 border-t border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Assignments</h4>
                      <Badge 
                        variant={member.status === "Active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {member.status}
                      </Badge>
                    </div>
                    
                    {/* Deliverables Ownership */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Deliverable Ownership ({deliverables.filter(d => d.owner === member.name).length})</Label>
                      </div>
                      {deliverables.filter(d => d.owner === member.name).length > 0 ? (
                        <div className="space-y-2">
                          {deliverables.filter(d => d.owner === member.name).map((deliverable) => (
                            <div
                              key={deliverable.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-border bg-primary/5"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs bg-primary/10">Owner</Badge>
                                  <p className="text-sm font-medium text-foreground">{deliverable.name}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">{deliverable.milestoneName}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant={getDeliverableStatusVariant(deliverable.status) as any} className="text-xs">
                                  {deliverable.status}
                                </Badge>
                                <div className="text-right">
                                  <p className="text-xs text-muted-foreground">Due {formatDate(deliverable.dueDate)}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Progress value={deliverable.completionProgress} className="h-1 w-16" />
                                    <span className="text-xs text-muted-foreground">{deliverable.completionProgress}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-border bg-accent/30 p-4 text-center">
                          <p className="text-xs text-muted-foreground">
                            Not an owner of any deliverables. Assign ownership from the Deliverables tab.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Activities */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Activity Assignments ({memberActivities.length})</Label>
                      </div>
                      {memberActivities.length > 0 ? (
                        <div className="space-y-2">
                          {memberActivities.map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/30"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{activity.name}</p>
                                <p className="text-xs text-muted-foreground">{activity.deliverableName}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-xs">
                                  {activity.status}
                                </Badge>
                                <div className="text-right">
                                  <p className="text-xs text-muted-foreground">
                                    {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-border bg-accent/30 p-4 text-center">
                          <p className="text-xs text-muted-foreground">
                            No activities assigned. Activities are assigned through the Plan tab.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Risks & Issues */}
                    <div className="space-y-2">
                      <Label className="text-sm">Risks & Issues ({memberRisks.length + memberIssues.length})</Label>
                      {(memberRisks.length + memberIssues.length) > 0 ? (
                        <div className="space-y-2">
                          {memberRisks.map((risk) => (
                            <div
                              key={risk.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/30"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">Risk</Badge>
                                  <p className="text-sm font-medium text-foreground">{risk.title}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">{risk.id}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={risk.severity === "Critical" ? "destructive" : "secondary"} className="text-xs">
                                  {risk.severity}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {risk.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                          {memberIssues.map((issue) => (
                            <div
                              key={issue.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/30"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">Issue</Badge>
                                  <p className="text-sm font-medium text-foreground">{issue.title}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">{issue.id}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={issue.severity === "Critical" ? "destructive" : "secondary"} className="text-xs">
                                  {issue.severity}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {issue.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-border bg-accent/30 p-4 text-center">
                          <p className="text-xs text-muted-foreground">
                            No risks or issues assigned. Assign from the RAID Log tab.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingTeamMember(null);
                  setShowAddTeamMember(false);
                }}
              >
                {editingTeamMember ? "Close" : "Cancel"}
              </Button>
              <Button onClick={handleSaveTeamMember}>
                {editingTeamMember ? "Save Changes" : "Add Member"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add/Edit Stakeholder Dialog */}
        <Dialog open={editingStakeholder !== null || showAddStakeholder} onOpenChange={(open) => {
          if (!open) {
            setEditingStakeholder(null);
            setShowAddStakeholder(false);
            setStakeholderForm({
              name: "",
              position: "",
              organisation: "",
              influence: "Medium",
              interest: "Medium",
              email: "",
              notes: "",
            });
          }
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingStakeholder ? "Edit Stakeholder" : "Add Stakeholder"}
              </DialogTitle>
              <DialogDescription>
                {editingStakeholder
                  ? "Update stakeholder information and engagement strategy"
                  : "Add a new stakeholder to this engagement"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-name">Name *</Label>
                  <Input
                    id="stakeholder-name"
                    value={stakeholderForm.name}
                    onChange={(e) => setStakeholderForm({ ...stakeholderForm, name: e.target.value })}
                    placeholder="e.g., Mohammed Al-Rashid"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-position">Position *</Label>
                  <Input
                    id="stakeholder-position"
                    value={stakeholderForm.position}
                    onChange={(e) => setStakeholderForm({ ...stakeholderForm, position: e.target.value })}
                    placeholder="e.g., Chief Information Officer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-organisation">Organisation</Label>
                  <Input
                    id="stakeholder-organisation"
                    value={stakeholderForm.organisation}
                    onChange={(e) => setStakeholderForm({ ...stakeholderForm, organisation: e.target.value })}
                    placeholder="e.g., STC Bank"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-email">Email</Label>
                  <Input
                    id="stakeholder-email"
                    type="email"
                    value={stakeholderForm.email}
                    onChange={(e) => setStakeholderForm({ ...stakeholderForm, email: e.target.value })}
                    placeholder="e.g., m.alrashid@stcbank.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-influence">Influence Level *</Label>
                  <Select
                    value={stakeholderForm.influence}
                    onValueChange={(value) => setStakeholderForm({ ...stakeholderForm, influence: value })}
                  >
                    <SelectTrigger id="stakeholder-influence">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Level of power or decision authority</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-interest">Interest Level *</Label>
                  <Select
                    value={stakeholderForm.interest}
                    onValueChange={(value) => setStakeholderForm({ ...stakeholderForm, interest: value })}
                  >
                    <SelectTrigger id="stakeholder-interest">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">How invested they are in the engagement</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Recommended Engagement Strategy</Label>
                  <Badge variant="outline" className="text-xs">
                    {stakeholderForm.influence === "High" && stakeholderForm.interest === "High" && "Manage Closely"}
                    {stakeholderForm.influence === "High" && stakeholderForm.interest !== "High" && "Keep Satisfied"}
                    {stakeholderForm.influence !== "High" && stakeholderForm.interest === "High" && "Keep Informed"}
                    {stakeholderForm.influence !== "High" && stakeholderForm.interest !== "High" && "Monitor"}
                  </Badge>
                </div>
                <div className="rounded-lg border border-border bg-accent/30 p-3">
                  <p className="text-xs text-muted-foreground">
                    {stakeholderForm.influence === "High" && stakeholderForm.interest === "High" && 
                      "Maintain regular alignment discussions. Include in steering committee sessions. Escalate risks early."}
                    {stakeholderForm.influence === "High" && stakeholderForm.interest !== "High" && 
                      "Provide periodic updates. Involve in major decisions. Keep satisfied with progress."}
                    {stakeholderForm.influence !== "High" && stakeholderForm.interest === "High" && 
                      "Share milestone updates. Invite to product demonstrations. Keep well informed."}
                    {stakeholderForm.influence !== "High" && stakeholderForm.interest !== "High" && 
                      "Maintain awareness of stakeholder perspective. Engage if interest increases."}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stakeholder-notes">Notes</Label>
                <Textarea
                  id="stakeholder-notes"
                  value={stakeholderForm.notes}
                  onChange={(e) => setStakeholderForm({ ...stakeholderForm, notes: e.target.value })}
                  placeholder="Additional context about this stakeholder..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingStakeholder(null);
                  setShowAddStakeholder(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => {
                const engagementStrategy = 
                  stakeholderForm.influence === "High" && stakeholderForm.interest === "High" ? "Manage Closely" :
                  stakeholderForm.influence === "High" ? "Keep Satisfied" :
                  stakeholderForm.interest === "High" ? "Keep Informed" : "Monitor";

                if (editingStakeholder) {
                  setStakeholders(
                    stakeholders.map((s) =>
                      s.id === editingStakeholder
                        ? {
                            ...s,
                            ...stakeholderForm,
                            engagementStrategy,
                            lastInteraction: s.lastInteraction,
                          }
                        : s
                    )
                  );
                } else {
                  const newId = `SH${String(stakeholders.length + 1).padStart(3, '0')}`;
                  setStakeholders([
                    ...stakeholders,
                    {
                      id: newId,
                      ...stakeholderForm,
                      engagementStrategy,
                      lastInteraction: new Date().toISOString().split('T')[0],
                    },
                  ]);
                }
                setEditingStakeholder(null);
                setShowAddStakeholder(false);
                setStakeholderForm({
                  name: "",
                  position: "",
                  organisation: "",
                  influence: "Medium",
                  interest: "Medium",
                  email: "",
                  notes: "",
                });
              }}>
                {editingStakeholder ? "Save Changes" : "Add Stakeholder"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EngagementDetail;