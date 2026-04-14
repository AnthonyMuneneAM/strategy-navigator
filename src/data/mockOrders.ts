// Mock data for marketplace orders - Dubai Electricity & Water Authority

export interface ServiceInput {
  id: string;
  name: string;
  description: string;
  status: "Pending" | "Submitted" | "In Review" | "Accepted";
  submittedFiles?: { name: string; uploadDate: string }[];
  submittedDate?: string;
  reviewFeedback?: string;
}

export interface DeliverableAttachment {
  id: string;
  type: "file" | "link";
  name: string;
  url?: string; // For links
  uploadDate: string;
  size?: string; // For files
}

export interface ServiceDeliverable {
  id: string;
  name: string;
  description: string;
  status: "In Progress" | "Submitted" | "Under Review" | "Accepted";
  attachments?: DeliverableAttachment[];
  submissionDate?: string;
  reviewDeadline?: string; // 5 days from submission
  clientFeedback?: string;
}

export interface ServiceOrder {
  id: string;
  serviceOrderNumber: string;
  serviceName: string;
  serviceCode: string;
  serviceType: "Design" | "Deploy" | "Drive";
  clientOrganisation: string;
  startDate: string;
  price: number;
  currency: string;
  duration: string;
  stage: "Payment Pending" | "Client Input Pending" | "Input in Review" | "In Delivery" | "Deliverables Pending Review" | "Closed";
  deliveryLead: string;
  inputs: ServiceInput[];
  deliverables: ServiceDeliverable[];
}

export const mockOrders: ServiceOrder[] = [
  {
    id: "SO-001",
    serviceOrderNumber: "SO-2026-001",
    serviceName: "Enterprise Architecture Strategy (Vision) - Design",
    serviceCode: "S01",
    serviceType: "Design",
    clientOrganisation: "Dubai Electricity & Water Authority",
    startDate: "2026-02-01",
    price: 155100.0,
    currency: "AED",
    duration: "6 Weeks",
    stage: "Input in Review",
    deliveryLead: "Rayyan Basha",
    inputs: [
      {
        id: "IN-001",
        name: "Business Vision",
        description: "Strategy, Business Model, Value Chain, Locations documentation",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Business_Strategy_2026.pdf", uploadDate: "2026-02-05" },
          { name: "DEWA_Value_Chain_Model.xlsx", uploadDate: "2026-02-05" },
        ],
        submittedDate: "2026-02-05",
        reviewFeedback: "All required documentation received and validated. Ready for analysis.",
      },
      {
        id: "IN-002",
        name: "Business Assets (Organization Structure)",
        description: "Organization Structure, Roles, Job Descriptions",
        status: "Submitted",
        submittedFiles: [
          { name: "DEWA_Org_Structure_2026.pdf", uploadDate: "2026-02-06" },
          { name: "DEWA_Role_Descriptions.docx", uploadDate: "2026-02-06" },
        ],
        submittedDate: "2026-02-06",
      },
      {
        id: "IN-003",
        name: "Business Assets (Products & Services)",
        description: "Products, Services, Channels, Segments information",
        status: "In Review",
        submittedFiles: [
          { name: "DEWA_Service_Catalog.xlsx", uploadDate: "2026-02-08" },
          { name: "DEWA_Product_Portfolio.pdf", uploadDate: "2026-02-08" },
        ],
        submittedDate: "2026-02-08",
      },
      {
        id: "IN-004",
        name: "Initiatives View",
        description: "Roadmap, Initiatives, Packages, Requirements",
        status: "Pending",
      },
    ],
    deliverables: [
      {
        id: "DEL-001",
        name: "Practice Strategy Summary Report",
        description: "Presentation Report summarizing the practice strategy",
        status: "In Progress",
        attachments: [
          {
            id: "ATT-001",
            type: "file",
            name: "Strategy_Summary_Draft_v1.pptx",
            uploadDate: "2026-02-10",
            size: "2.4 MB",
          },
        ],
      },
      {
        id: "DEL-002",
        name: "Practice Playbook Report",
        description: "Presentation Report with detailed playbook",
        status: "In Progress",
        attachments: [
          {
            id: "ATT-002",
            type: "file",
            name: "Playbook_Draft_v2.pptx",
            uploadDate: "2026-02-11",
            size: "3.1 MB",
          },
          {
            id: "ATT-003",
            type: "link",
            name: "Collaborative Playbook (Google Slides)",
            url: "https://docs.google.com/presentation/d/example",
            uploadDate: "2026-02-11",
          },
        ],
      },
    ],
  },
  {
    id: "SO-002",
    serviceOrderNumber: "SO-2026-002",
    serviceName: "Target Business Capabilities Canvas",
    serviceCode: "SO02",
    serviceType: "Design",
    clientOrganisation: "Dubai Electricity & Water Authority",
    startDate: "2026-03-01",
    price: 281100.0,
    currency: "AED",
    duration: "8 Weeks",
    stage: "In Delivery",
    deliveryLead: "Rayyan Basha",
    inputs: [
      {
        id: "IN-005",
        name: "Business Vision",
        description: "Strategy, Business Model, Value Chain documentation",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Business_Vision_SO02.pdf", uploadDate: "2026-03-05" },
        ],
        submittedDate: "2026-03-05",
        reviewFeedback: "Business vision documentation is clear and comprehensive.",
      },
      {
        id: "IN-006",
        name: "Current State Assessment",
        description: "Existing capabilities and maturity assessment",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Current_State.xlsx", uploadDate: "2026-03-06" },
        ],
        submittedDate: "2026-03-06",
        reviewFeedback: "Current state assessment provides good baseline.",
      },
    ],
    deliverables: [
      {
        id: "DEL-003",
        name: "Practice Strategy Summary Report",
        description: "Presentation Report",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-004",
            type: "file",
            name: "DEWA_Strategy_Summary_Final.pptx",
            uploadDate: "2026-03-15",
            size: "3.8 MB",
          },
          {
            id: "ATT-005",
            type: "file",
            name: "Executive_Summary.pdf",
            uploadDate: "2026-03-15",
            size: "1.2 MB",
          },
        ],
        submissionDate: "2026-03-15",
      },
      {
        id: "DEL-004",
        name: "Practice Playbook Report",
        description: "Presentation Report",
        status: "In Progress",
        attachments: [
          {
            id: "ATT-006",
            type: "link",
            name: "Playbook Working Document",
            url: "https://docs.google.com/document/d/example",
            uploadDate: "2026-03-12",
          },
        ],
      },
      {
        id: "DEL-005",
        name: "Digital Canvas Model",
        description: "ABACUS Diagram",
        status: "In Progress",
      },
      {
        id: "DEL-006",
        name: "Digital Principles Catalog",
        description: "ABACUS Catalog",
        status: "In Progress",
      },
      {
        id: "DEL-007",
        name: "Digital Canvas Process Catalog",
        description: "ABACUS Catalog",
        status: "In Progress",
      },
    ],
  },
  {
    id: "SO-003",
    serviceOrderNumber: "SO-2026-003",
    serviceName: "Enterprise Architecture Operating Model",
    serviceCode: "SO03",
    serviceType: "Design",
    clientOrganisation: "Dubai Electricity & Water Authority",
    startDate: "2026-04-01",
    price: 180000.0,
    currency: "AED",
    duration: "8 Weeks",
    stage: "Client Input Pending",
    deliveryLead: "Rayyan Basha",
    inputs: [
      {
        id: "IN-007",
        name: "Business Vision",
        description: "Strategy, Business Model, Value Chain, Locations",
        status: "Submitted",
        submittedFiles: [
          { name: "DEWA_Vision_SO03.pdf", uploadDate: "2026-04-05" },
        ],
        submittedDate: "2026-04-05",
      },
      {
        id: "IN-008",
        name: "Business Assets (Organization)",
        description: "Organization Structure, Roles, Job Descriptions",
        status: "Pending",
      },
      {
        id: "IN-009",
        name: "Practice View",
        description: "Strategy, Architecture, Operating Model, Roadmap",
        status: "Pending",
      },
    ],
    deliverables: [
      {
        id: "DEL-008",
        name: "Practice Strategy Summary Report",
        description: "Presentation Report",
        status: "In Progress",
      },
      {
        id: "DEL-009",
        name: "Practice Playbook Report",
        description: "Presentation Report",
        status: "In Progress",
      },
      {
        id: "DEL-010",
        name: "Practice Function Map",
        description: "Architecture Model",
        status: "In Progress",
      },
      {
        id: "DEL-011",
        name: "Practice Function Catalog",
        description: "Excel Workbook",
        status: "In Progress",
      },
      {
        id: "DEL-012",
        name: "Operating Model Templates",
        description: "Excel, Word or Powerpoint",
        status: "In Progress",
      },
    ],
  },
  {
    id: "SO-004",
    serviceOrderNumber: "SO-2026-004",
    serviceName: "Current Assets Portfolio (Baseline)",
    serviceCode: "SO04",
    serviceType: "Design",
    clientOrganisation: "Dubai Electricity & Water Authority",
    startDate: "2026-01-15",
    price: 333100.0,
    currency: "AED",
    duration: "12 Weeks",
    stage: "Deliverables Pending Review",
    deliveryLead: "David Kumar",
    inputs: [
      {
        id: "IN-010",
        name: "Business Assets",
        description: "Policies, procedures, guidelines, Products, Services, Channels, Segments",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Business_Policies.pdf", uploadDate: "2026-01-20" },
          { name: "DEWA_Service_Portfolio.xlsx", uploadDate: "2026-01-20" },
        ],
        submittedDate: "2026-01-20",
        reviewFeedback: "Complete documentation received.",
      },
      {
        id: "IN-011",
        name: "Application Assets",
        description: "Applications, Licenses, Interfaces",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Application_Inventory.xlsx", uploadDate: "2026-01-22" },
        ],
        submittedDate: "2026-01-22",
        reviewFeedback: "Application inventory is comprehensive.",
      },
      {
        id: "IN-012",
        name: "Data Assets",
        description: "Databases, Data Flows, Data Models, Reports",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Data_Catalog.xlsx", uploadDate: "2026-01-25" },
        ],
        submittedDate: "2026-01-25",
        reviewFeedback: "Data assets documented well.",
      },
      {
        id: "IN-013",
        name: "Technology Assets",
        description: "Hosting, Compute, Network, Configuration Item",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Infrastructure_Inventory.xlsx", uploadDate: "2026-01-28" },
        ],
        submittedDate: "2026-01-28",
        reviewFeedback: "Infrastructure documentation complete.",
      },
      {
        id: "IN-014",
        name: "Operational Assets",
        description: "Devices, Control Systems, High-voltage Equipment, Power Supply, Operational Systems",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Operational_Assets.xlsx", uploadDate: "2026-02-01" },
        ],
        submittedDate: "2026-02-01",
        reviewFeedback: "Operational assets inventory received.",
      },
      {
        id: "IN-015",
        name: "Security Assets",
        description: "Threats & Vulnerability, Access Controls, Encryption, Authentication & Identity",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Security_Assessment.pdf", uploadDate: "2026-02-03" },
        ],
        submittedDate: "2026-02-03",
        reviewFeedback: "Security documentation complete.",
      },
    ],
    deliverables: [
      {
        id: "DEL-013",
        name: "Practice Strategy Summary Report",
        description: "Presentation Report",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-013",
            type: "file",
            name: "DEWA_Practice_Strategy_Summary.pptx",
            uploadDate: "2026-02-08",
            size: "4.2 MB",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
      {
        id: "DEL-014",
        name: "Practice Playbook Report",
        description: "Presentation Report",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-014",
            type: "file",
            name: "DEWA_Practice_Playbook.pptx",
            uploadDate: "2026-02-08",
            size: "5.1 MB",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
      {
        id: "DEL-015",
        name: "Business Assets Artefact Portfolio",
        description: "Organisation Structure ABACUS Diagram, Business Channels ABACUS Catalog, Business Services ABACUS Catalog",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-015",
            type: "file",
            name: "DEWA_Business_Assets_Portfolio.zip",
            uploadDate: "2026-02-08",
            size: "12.3 MB",
          },
          {
            id: "ATT-016",
            type: "link",
            name: "Business Assets Dashboard",
            url: "https://abacus.dq.ae/dewa/business-assets",
            uploadDate: "2026-02-08",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
      {
        id: "DEL-016",
        name: "Application Assets Artefact Portfolio",
        description: "Application Landscape ABACUS Catalog, Application Licenses ABACUS Catalog",
        status: "Under Review",
        attachments: [
          {
            id: "ATT-017",
            type: "file",
            name: "DEWA_Application_Assets_Portfolio.zip",
            uploadDate: "2026-02-08",
            size: "8.7 MB",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
      {
        id: "DEL-017",
        name: "Data Assets Artefact Portfolio",
        description: "Subject Area Model ABACUS Diagram, Data Entities ABACUS Catalog",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-018",
            type: "file",
            name: "DEWA_Data_Assets_Portfolio.zip",
            uploadDate: "2026-02-08",
            size: "6.9 MB",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
      {
        id: "DEL-018",
        name: "Technology Assets Artefact Portfolio",
        description: "Configuration Item ABACUS Catalog, Hosting ABACUS Catalog, Compute ABACUS Catalog, Network ABACUS Catalog",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-019",
            type: "file",
            name: "DEWA_Technology_Assets_Portfolio.zip",
            uploadDate: "2026-02-08",
            size: "15.2 MB",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
      {
        id: "DEL-019",
        name: "Security Assets Artefact Portfolio",
        description: "Security Requirements & Controls ABACUS Catalog, Security Zones ABACUS Catalog, Conduits ABACUS Catalog, Asset Security Levels ABACUS Catalog",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-020",
            type: "file",
            name: "DEWA_Security_Assets_Portfolio.zip",
            uploadDate: "2026-02-08",
            size: "9.4 MB",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
      {
        id: "DEL-020",
        name: "Operational Assets Artefact Portfolio",
        description: "Control Systems ABACUS Catalog, Operational Devices ABACUS Catalog",
        status: "Submitted",
        attachments: [
          {
            id: "ATT-021",
            type: "file",
            name: "DEWA_Operational_Assets_Portfolio.zip",
            uploadDate: "2026-02-08",
            size: "11.8 MB",
          },
        ],
        submissionDate: "2026-02-08",
        reviewDeadline: "2026-02-13",
      },
    ],
  },
  {
    id: "SO-005",
    serviceOrderNumber: "SO-2026-005",
    serviceName: "Current Assets Portfolio (Assessment)",
    serviceCode: "SO05",
    serviceType: "Design",
    clientOrganisation: "Dubai Electricity & Water Authority",
    startDate: "2025-12-01",
    price: 205500.0,
    currency: "AED",
    duration: "12 Weeks",
    stage: "Closed",
    deliveryLead: "Alex Johnson",
    inputs: [
      {
        id: "IN-016",
        name: "Business Assets",
        description: "Products, Services, Channels, Segments",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Business_Assets.xlsx", uploadDate: "2025-12-05" },
        ],
        submittedDate: "2025-12-05",
        reviewFeedback: "Complete and validated.",
      },
      {
        id: "IN-017",
        name: "Application Assets",
        description: "Applications, Licenses, Interfaces",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Applications.xlsx", uploadDate: "2025-12-05" },
        ],
        submittedDate: "2025-12-05",
        reviewFeedback: "Complete and validated.",
      },
      {
        id: "IN-018",
        name: "Data Assets",
        description: "Databases, Data Flows, Data Models, Reports",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Data_Assets.xlsx", uploadDate: "2025-12-06" },
        ],
        submittedDate: "2025-12-06",
        reviewFeedback: "Complete and validated.",
      },
      {
        id: "IN-019",
        name: "Technology Assets",
        description: "Hosting, Compute, Network, Configuration Item",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Tech_Assets.xlsx", uploadDate: "2025-12-06" },
        ],
        submittedDate: "2025-12-06",
        reviewFeedback: "Complete and validated.",
      },
      {
        id: "IN-020",
        name: "Operational Assets",
        description: "Devices, Control Systems, High-voltage Equipment, Power Supply, Operational Systems",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Operational.xlsx", uploadDate: "2025-12-07" },
        ],
        submittedDate: "2025-12-07",
        reviewFeedback: "Complete and validated.",
      },
      {
        id: "IN-021",
        name: "Security Assets",
        description: "Threats & Vulnerability, Access Controls, Encryption, Authentication & Identity",
        status: "Accepted",
        submittedFiles: [
          { name: "DEWA_Security.pdf", uploadDate: "2025-12-07" },
        ],
        submittedDate: "2025-12-07",
        reviewFeedback: "Complete and validated.",
      },
    ],
    deliverables: [
      {
        id: "DEL-021",
        name: "Practice Strategy Summary Report",
        description: "Presentation Report",
        status: "Accepted",
        attachments: [
          {
            id: "ATT-022",
            type: "file",
            name: "DEWA_Assessment_Strategy_Summary.pptx",
            uploadDate: "2025-12-20",
            size: "4.5 MB",
          },
        ],
        submissionDate: "2025-12-20",
        clientFeedback: "Excellent analysis and recommendations. Approved.",
      },
      {
        id: "DEL-022",
        name: "Practice Playbook Report",
        description: "Presentation Report",
        status: "Accepted",
        attachments: [
          {
            id: "ATT-023",
            type: "file",
            name: "DEWA_Assessment_Playbook.pptx",
            uploadDate: "2025-12-20",
            size: "5.3 MB",
          },
        ],
        submissionDate: "2025-12-20",
        clientFeedback: "Comprehensive playbook. Approved.",
      },
      {
        id: "DEL-023",
        name: "Digital Canvas Jam Gap Model",
        description: "ABACUS Diagram",
        status: "Accepted",
        attachments: [
          {
            id: "ATT-024",
            type: "file",
            name: "DEWA_Gap_Model.abacus",
            uploadDate: "2025-12-20",
            size: "2.1 MB",
          },
          {
            id: "ATT-025",
            type: "link",
            name: "Interactive Gap Model Dashboard",
            url: "https://abacus.dq.ae/dewa/gap-model",
            uploadDate: "2025-12-20",
          },
        ],
        submissionDate: "2025-12-20",
        clientFeedback: "Gap analysis is thorough. Approved.",
      },
      {
        id: "DEL-024",
        name: "EA Capability Maturity Heatmap Model",
        description: "ABACUS Diagram",
        status: "Accepted",
        attachments: [
          {
            id: "ATT-026",
            type: "file",
            name: "DEWA_Maturity_Heatmap.abacus",
            uploadDate: "2025-12-20",
            size: "1.8 MB",
          },
        ],
        submissionDate: "2025-12-20",
        clientFeedback: "Maturity assessment is accurate. Approved.",
      },
    ],
  },
  {
    id: "SO-006",
    serviceOrderNumber: "SO-2026-006",
    serviceName: "Initiatives Backlog & Roadmap Design",
    serviceCode: "SO06",
    serviceType: "Design",
    clientOrganisation: "Dubai Electricity & Water Authority",
    startDate: "2026-05-01",
    price: 227400.0,
    currency: "AED",
    duration: "12 Weeks",
    stage: "Payment Pending",
    deliveryLead: "Rayyan Basha",
    inputs: [
      {
        id: "IN-022",
        name: "Business Vision",
        description: "Strategy, Business Model, Value Chain, Locations",
        status: "Pending",
      },
      {
        id: "IN-023",
        name: "Initiatives View",
        description: "Roadmap, Initiatives, Packages, Requirements",
        status: "Pending",
      },
    ],
    deliverables: [
      {
        id: "DEL-025",
        name: "Practice Strategy Summary Report",
        description: "Presentation Report",
        status: "In Progress",
      },
      {
        id: "DEL-026",
        name: "Practice Playbook Report",
        description: "Presentation Report",
        status: "In Progress",
      },
      {
        id: "DEL-027",
        name: "Initiative Catalog",
        description: "Excel Workbook",
        status: "In Progress",
      },
    ],
  },
];
