export interface GTMTask {
  id: string
  name: string
  description: string
  status: "backlog" | "todo" | "in-progress" | "review" | "done"
  priority: "high" | "medium" | "low"
  assignee?: {
    name: string
    role: string
  }
  dueDate?: string
  estimatedHours?: number
  tags?: string[]
  raci?: {
    responsible?: string
    accountable?: string
    consulted?: string[]
    informed?: string[]
  }
  deliverables?: string[]
}

export interface GTMFramework {
  id: string
  name: string
  type: "launch" | "campaign"
  description: string
  createdAt: string
  lastModified: string
  status: "planning" | "in-progress" | "completed"
  tasks: GTMTask[]
}

export const mockGTMFrameworks: GTMFramework[] = [
  {
    id: "gtm-1",
    name: "Enterprise AI Assistant Q1",
    type: "launch",
    description: "New AI-powered assistant feature targeting enterprise customers",
    createdAt: "2024-01-15",
    lastModified: "2024-02-20",
    status: "in-progress",
    tasks: [
      {
        id: "task-1",
        name: "Develop positioning framework",
        description: "Create comprehensive positioning and messaging for the new feature",
        status: "done",
        priority: "high",
        assignee: {
          name: "Sarah Chen",
          role: "Product Marketing Manager",
        },
        dueDate: "2024-01-20",
        estimatedHours: 16,
        tags: ["positioning", "messaging"],
        raci: {
          responsible: "Sarah Chen",
          accountable: "VP Marketing",
          consulted: ["Product Team", "Sales Team"],
          informed: ["Executive Team"],
        },
        deliverables: ["Positioning doc", "Messaging framework"],
      },
      {
        id: "task-2",
        name: "Create messaging framework",
        description: "Develop key messages, value props, and talk tracks",
        status: "in-progress",
        priority: "high",
        assignee: {
          name: "Sarah Chen",
          role: "Product Marketing Manager",
        },
        dueDate: "2024-01-25",
        estimatedHours: 12,
        tags: ["messaging"],
        raci: {
          responsible: "Sarah Chen",
          accountable: "VP Marketing",
          consulted: ["Product Team"],
          informed: ["Sales Team"],
        },
        deliverables: ["Messaging guide", "Talk tracks"],
      },
      {
        id: "task-3",
        name: "Build launch website pages",
        description: "Design and develop product pages for the new feature",
        status: "in-progress",
        priority: "high",
        assignee: {
          name: "Mike Johnson",
          role: "Content Marketing Manager",
        },
        dueDate: "2024-02-01",
        estimatedHours: 24,
        tags: ["website", "content"],
        raci: {
          responsible: "Mike Johnson",
          accountable: "VP Marketing",
          consulted: ["Design Team", "Product Team"],
          informed: ["Sales Team"],
        },
        deliverables: ["Product pages", "Feature pages"],
      },
      {
        id: "task-4",
        name: "Develop sales enablement materials",
        description: "Create one-pagers, battle cards, and demo scripts",
        status: "todo",
        priority: "high",
        assignee: {
          name: "Sarah Chen",
          role: "Product Marketing Manager",
        },
        dueDate: "2024-02-05",
        estimatedHours: 20,
        tags: ["sales enablement"],
        raci: {
          responsible: "Sarah Chen",
          accountable: "VP Marketing",
          consulted: ["Sales Team"],
          informed: ["Product Team"],
        },
        deliverables: ["One-pagers", "Battle cards", "Demo scripts"],
      },
      {
        id: "task-5",
        name: "Develop customer case studies",
        description: "Interview beta customers and create case studies",
        status: "todo",
        priority: "medium",
        assignee: {
          name: "Mike Johnson",
          role: "Content Marketing Manager",
        },
        dueDate: "2024-02-10",
        estimatedHours: 30,
        tags: ["content", "case studies"],
        raci: {
          responsible: "Mike Johnson",
          accountable: "VP Marketing",
          consulted: ["Customer Success"],
          informed: ["Sales Team"],
        },
        deliverables: ["3 case studies", "Video testimonials"],
      },
      {
        id: "task-6",
        name: "Plan press and analyst outreach",
        description: "Coordinate with PR team for media coverage",
        status: "todo",
        priority: "medium",
        assignee: {
          name: "Emily Rodriguez",
          role: "PR Manager",
        },
        dueDate: "2024-02-15",
        estimatedHours: 16,
        tags: ["PR", "analyst relations"],
        raci: {
          responsible: "Emily Rodriguez",
          accountable: "VP Marketing",
          consulted: ["Executive Team"],
          informed: ["Product Team"],
        },
        deliverables: ["Press release", "Media kit", "Analyst briefings"],
      },
      {
        id: "task-7",
        name: "Create social media content calendar",
        description: "Plan and schedule social posts for launch period",
        status: "review",
        priority: "low",
        assignee: {
          name: "David Park",
          role: "Social Media Manager",
        },
        dueDate: "2024-02-18",
        estimatedHours: 8,
        tags: ["social media"],
        raci: {
          responsible: "David Park",
          accountable: "Marketing Manager",
          consulted: ["Content Team"],
          informed: ["Sales Team"],
        },
        deliverables: ["Content calendar", "Social posts"],
      },
      {
        id: "task-8",
        name: "Update internal wiki and knowledge base",
        description: "Document new feature information for internal teams",
        status: "backlog",
        priority: "low",
        assignee: {
          name: "Alex Thompson",
          role: "Product Operations",
        },
        dueDate: "2024-02-25",
        estimatedHours: 6,
        tags: ["documentation"],
        raci: {
          responsible: "Alex Thompson",
          accountable: "Product Manager",
          consulted: ["Product Team"],
          informed: ["All Teams"],
        },
        deliverables: ["Wiki pages", "FAQ document"],
      },
      {
        id: "task-9",
        name: "Archive beta program materials",
        description: "Organize and archive beta testing documents and feedback",
        status: "todo",
        priority: "low",
        assignee: {
          name: "Jordan Lee",
          role: "Product Coordinator",
        },
        dueDate: "2024-02-28",
        estimatedHours: 4,
        tags: ["documentation", "archive"],
        raci: {
          responsible: "Jordan Lee",
          accountable: "Product Manager",
          consulted: ["Product Team"],
          informed: ["Marketing Team"],
        },
        deliverables: ["Archived materials", "Beta feedback summary"],
      },
      {
        id: "task-10",
        name: "Create launch retrospective agenda",
        description: "Prepare agenda and materials for post-launch review",
        status: "review",
        priority: "low",
        assignee: {
          name: "Sarah Chen",
          role: "Product Marketing Manager",
        },
        dueDate: "2024-03-05",
        estimatedHours: 3,
        tags: ["planning", "retrospective"],
        raci: {
          responsible: "Sarah Chen",
          accountable: "VP Marketing",
          consulted: ["Product Team", "Sales Team"],
          informed: ["Executive Team"],
        },
        deliverables: ["Retrospective agenda", "Feedback form"],
      },
      {
        id: "task-11",
        name: "Order launch celebration swag",
        description: "Coordinate with vendors for team celebration items",
        status: "in-progress",
        priority: "low",
        assignee: {
          name: "Maya Patel",
          role: "Operations Coordinator",
        },
        dueDate: "2024-02-22",
        estimatedHours: 5,
        tags: ["operations", "team"],
        raci: {
          responsible: "Maya Patel",
          accountable: "Operations Manager",
          consulted: ["Marketing Team"],
          informed: ["All Teams"],
        },
        deliverables: ["Swag order confirmation", "Delivery schedule"],
      },
    ],
  },
  {
    id: "gtm-2",
    name: "Mid-Market Developer Outreach",
    type: "campaign",
    description: "Multi-channel demand generation targeting developer teams at mid-market companies",
    createdAt: "2024-02-01",
    lastModified: "2024-02-18",
    status: "planning",
    tasks: [
      {
        id: "task-12",
        name: "Define campaign objectives and KPIs",
        description: "Set clear goals and success metrics for the campaign",
        status: "done",
        priority: "high",
        assignee: {
          name: "Jennifer Wu",
          role: "Demand Gen Manager",
        },
        dueDate: "2024-02-05",
        estimatedHours: 8,
        tags: ["planning", "strategy"],
        raci: {
          responsible: "Jennifer Wu",
          accountable: "VP Marketing",
          consulted: ["Sales Team", "Marketing Ops"],
          informed: ["Executive Team"],
        },
        deliverables: ["Campaign plan", "KPI dashboard"],
      },
      {
        id: "task-13",
        name: "Develop campaign messaging and creative",
        description: "Create ad copy, email templates, and landing pages",
        status: "in-progress",
        priority: "high",
        assignee: {
          name: "Chris Martinez",
          role: "Content Strategist",
        },
        dueDate: "2024-02-12",
        estimatedHours: 20,
        tags: ["creative", "content"],
        raci: {
          responsible: "Chris Martinez",
          accountable: "Marketing Manager",
          consulted: ["Design Team", "Product Marketing"],
          informed: ["Sales Team"],
        },
        deliverables: ["Ad copy", "Email templates", "Landing pages"],
      },
      {
        id: "task-14",
        name: "Set up marketing automation workflows",
        description: "Configure email nurture sequences and lead scoring",
        status: "in-progress",
        priority: "high",
        assignee: {
          name: "Taylor Kim",
          role: "Marketing Operations",
        },
        dueDate: "2024-02-15",
        estimatedHours: 16,
        tags: ["marketing ops", "automation"],
        raci: {
          responsible: "Taylor Kim",
          accountable: "Marketing Ops Manager",
          consulted: ["Demand Gen Team"],
          informed: ["Sales Team"],
        },
        deliverables: ["Automation workflows", "Lead scoring model"],
      },
      {
        id: "task-15",
        name: "Configure ad campaigns across channels",
        description: "Set up campaigns in LinkedIn, Google Ads, and Facebook",
        status: "todo",
        priority: "high",
        assignee: {
          name: "Jennifer Wu",
          role: "Demand Gen Manager",
        },
        dueDate: "2024-02-18",
        estimatedHours: 12,
        tags: ["paid media"],
        raci: {
          responsible: "Jennifer Wu",
          accountable: "VP Marketing",
          consulted: ["Creative Team"],
          informed: ["Sales Team"],
        },
        deliverables: ["Campaign configs", "Tracking setup"],
      },
      {
        id: "task-16",
        name: "Create campaign tracking and reporting",
        description: "Build dashboards for campaign performance monitoring",
        status: "todo",
        priority: "medium",
        assignee: {
          name: "Taylor Kim",
          role: "Marketing Operations",
        },
        dueDate: "2024-02-20",
        estimatedHours: 10,
        tags: ["analytics", "reporting"],
        raci: {
          responsible: "Taylor Kim",
          accountable: "Marketing Ops Manager",
          consulted: ["Demand Gen Team"],
          informed: ["VP Marketing"],
        },
        deliverables: ["Performance dashboard", "Weekly report template"],
      },
      {
        id: "task-17",
        name: "Coordinate sales team handoff process",
        description: "Define lead routing and follow-up procedures",
        status: "review",
        priority: "medium",
        assignee: {
          name: "Jennifer Wu",
          role: "Demand Gen Manager",
        },
        dueDate: "2024-02-22",
        estimatedHours: 8,
        tags: ["sales enablement"],
        raci: {
          responsible: "Jennifer Wu",
          accountable: "VP Marketing",
          consulted: ["Sales Team", "Marketing Ops"],
          informed: ["Sales Leadership"],
        },
        deliverables: ["Lead routing rules", "Sales playbook"],
      },
      {
        id: "task-18",
        name: "Set up campaign reporting dashboard",
        description: "Create comprehensive analytics dashboard for campaign metrics",
        status: "backlog",
        priority: "low",
        assignee: {
          name: "Sam Rivers",
          role: "Data Analyst",
        },
        dueDate: "2024-03-01",
        estimatedHours: 12,
        tags: ["analytics", "reporting"],
        raci: {
          responsible: "Sam Rivers",
          accountable: "Marketing Ops Manager",
          consulted: ["Demand Gen Team"],
          informed: ["Marketing Leadership"],
        },
        deliverables: ["Analytics dashboard", "Reporting documentation"],
      },
      {
        id: "task-19",
        name: "Design campaign promotional swag",
        description: "Create branded items for campaign giveaways",
        status: "backlog",
        priority: "low",
        assignee: {
          name: "Casey Williams",
          role: "Brand Designer",
        },
        dueDate: "2024-03-05",
        estimatedHours: 8,
        tags: ["design", "brand"],
        raci: {
          responsible: "Casey Williams",
          accountable: "Creative Director",
          consulted: ["Marketing Team"],
          informed: ["Demand Gen Team"],
        },
        deliverables: ["Swag designs", "Vendor quotes"],
      },
      {
        id: "task-20",
        name: "Update campaign budget tracker",
        description: "Maintain updated spreadsheet of campaign spend and ROI",
        status: "done",
        priority: "low",
        assignee: {
          name: "Morgan Hayes",
          role: "Marketing Analyst",
        },
        dueDate: "2024-02-15",
        estimatedHours: 4,
        tags: ["finance", "reporting"],
        raci: {
          responsible: "Morgan Hayes",
          accountable: "Marketing Ops Manager",
          consulted: ["Finance Team"],
          informed: ["VP Marketing"],
        },
        deliverables: ["Budget tracker", "ROI projections"],
      },
      {
        id: "task-21",
        name: "Archive previous campaign assets",
        description: "Organize and archive materials from previous quarter",
        status: "todo",
        priority: "low",
        assignee: {
          name: "Riley Anderson",
          role: "Marketing Coordinator",
        },
        dueDate: "2024-02-28",
        estimatedHours: 6,
        tags: ["operations", "documentation"],
        raci: {
          responsible: "Riley Anderson",
          accountable: "Marketing Manager",
          consulted: ["Demand Gen Team"],
          informed: ["Marketing Ops"],
        },
        deliverables: ["Archived files", "Asset inventory"],
      },
      {
        id: "task-22",
        name: "Schedule campaign retrospective meeting",
        description: "Plan post-campaign review with stakeholders",
        status: "review",
        priority: "low",
        assignee: {
          name: "Jennifer Wu",
          role: "Demand Gen Manager",
        },
        dueDate: "2024-03-10",
        estimatedHours: 2,
        tags: ["planning", "team"],
        raci: {
          responsible: "Jennifer Wu",
          accountable: "VP Marketing",
          consulted: ["Marketing Team", "Sales Team"],
          informed: ["Executive Team"],
        },
        deliverables: ["Meeting invite", "Retrospective agenda"],
      },
    ],
  },
]
