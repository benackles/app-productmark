export interface EnablementAsset {
  id: string
  type:
    | "competitive-battle-card"
    | "messaging-document"
    | "website-copy"
    | "sales-pitch-deck"
    | "gtm-brief"
    | "gtm-playbook"
    | "gtm-communications-plan" // Added GTM Communications Plan asset type
    | "case-study"
    | "demo-script"
    | "objection-handling"
  title: string
  description: string
  status: "draft" | "in-review" | "approved" | "delivered"
  createdAt: Date
  updatedAt: Date
  tags: string[]
  sourceOfTruth: {
    type: "document" | "spreadsheet" | "presentation" | "pdf" | "url"
    name: string
    url: string
    permissions: "view" | "edit"
  }
  stakeholders: Array<{
    id: string
    name: string
    email: string
    role: "sales-rep" | "sales-manager" | "enablement" | "customer-success" | "pmm" | "pm" | "partner"
    status: "pending" | "approved" | "changes-requested"
    feedback?: string
  }>
  relatedInsightIds?: string[]
  relatedStrategyIds?: string[]
}

export const assetTypeLabels: Record<string, string> = {
  "competitive-battle-card": "Competitive Battle Card",
  "messaging-document": "Messaging Document",
  "website-copy": "Website Copy Document",
  "sales-pitch-deck": "Sales Pitch Deck",
  "gtm-brief": "GTM Brief",
  "gtm-playbook": "GTM Playbook", // Added label for GTM Playbook
  "gtm-communications-plan": "GTM Communications Plan", // Added label
  "case-study": "Case Study",
  "demo-script": "Demo Script",
  "objection-handling": "Objection Handling",
}

export const stakeholderTypeLabels: Record<string, string> = {
  "sales-rep": "Sales Rep",
  "sales-manager": "Sales Manager",
  enablement: "Enablement",
  "customer-success": "Customer Success",
  pmm: "Product Marketing",
  pm: "Product Manager",
  partner: "Partner",
}

export const mockEnablementAssets: EnablementAsset[] = [
  {
    id: "asset-1",
    type: "competitive-battle-card",
    title: "Competing Against Adobe",
    description:
      "Comprehensive battle card for competing against Adobe in the creative tools market, with focus on pricing and feature differentiation.",
    status: "delivered",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-10"),
    tags: ["competitive", "adobe", "enterprise", "design-tools"],
    sourceOfTruth: {
      type: "document",
      name: "Adobe Battle Card Master",
      url: "https://docs.google.com/document/d/example1",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh1",
        name: "Sarah Chen",
        email: "sarah.chen@productmark.com",
        role: "sales-manager",
        status: "approved",
        feedback: "Great work on the competitive positioning. The pricing comparison is very clear.",
      },
      {
        id: "sh2",
        name: "Mike Johnson",
        email: "mike.johnson@productmark.com",
        role: "pmm",
        status: "approved",
      },
    ],
    relatedInsightIds: ["1", "3"],
    relatedStrategyIds: ["strategy-1"],
  },
  {
    id: "asset-2",
    type: "messaging-document",
    title: "Enterprise Value Proposition",
    description:
      "Core messaging framework for enterprise customers, including value propositions, key messages, and positioning against competitors.",
    status: "delivered",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-15"),
    tags: ["messaging", "enterprise", "positioning"],
    sourceOfTruth: {
      type: "presentation",
      name: "Enterprise Messaging Master Deck",
      url: "https://docs.google.com/presentation/d/example2",
      permissions: "view",
    },
    stakeholders: [
      {
        id: "sh3",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@productmark.com",
        role: "pmm",
        status: "approved",
        feedback: "The value props are crystal clear. Love the customer quote integration.",
      },
      {
        id: "sh4",
        name: "James Park",
        email: "james.park@productmark.com",
        role: "sales-manager",
        status: "approved",
      },
    ],
    relatedInsightIds: ["2", "5"],
    relatedStrategyIds: ["strategy-2"],
  },
  {
    id: "asset-3",
    type: "case-study",
    title: "TechCorp Success Story",
    description: "How TechCorp reduced onboarding time by 60% and increased user adoption with our platform.",
    status: "delivered",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-28"),
    tags: ["case-study", "enterprise", "onboarding", "saas"],
    sourceOfTruth: {
      type: "pdf",
      name: "TechCorp Case Study Final",
      url: "https://drive.google.com/file/d/example3",
      permissions: "view",
    },
    stakeholders: [
      {
        id: "sh5",
        name: "Rachel Kim",
        email: "rachel.kim@productmark.com",
        role: "customer-success",
        status: "approved",
        feedback: "The customer quote from their VP is perfect. Great storytelling.",
      },
      {
        id: "sh6",
        name: "Tom Wilson",
        email: "tom.wilson@productmark.com",
        role: "sales-rep",
        status: "approved",
      },
    ],
    relatedInsightIds: ["4"],
  },
  {
    id: "asset-4",
    type: "sales-pitch-deck",
    title: "Enterprise Sales Deck",
    description:
      "Comprehensive sales presentation for enterprise prospects, covering problem, solution, ROI, and customer success stories.",
    status: "in-review",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-18"),
    tags: ["sales", "enterprise", "presentation"],
    sourceOfTruth: {
      type: "presentation",
      name: "Enterprise Sales Deck v3.2",
      url: "https://docs.google.com/presentation/d/example4",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh7",
        name: "David Lee",
        email: "david.lee@productmark.com",
        role: "sales-manager",
        status: "changes-requested",
        feedback: "Can we add more specific ROI numbers on slide 12? Also, the competitive slide needs updating.",
      },
      {
        id: "sh8",
        name: "Lisa Zhang",
        email: "lisa.zhang@productmark.com",
        role: "pmm",
        status: "pending",
      },
    ],
    relatedInsightIds: ["1"],
    relatedStrategyIds: ["strategy-1"],
  },
  {
    id: "asset-5",
    type: "demo-script",
    title: "AI Feature Demo Script",
    description: "15-minute demo script showcasing our new AI-powered features for enterprise customers.",
    status: "delivered",
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-03-05"),
    tags: ["demo", "ai", "enterprise", "product"],
    sourceOfTruth: {
      type: "document",
      name: "AI Demo Script Master",
      url: "https://docs.google.com/document/d/example5",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh9",
        name: "Alex Martinez",
        email: "alex.martinez@productmark.com",
        role: "sales-rep",
        status: "approved",
        feedback: "This script flows really well. The AI feature transitions are smooth.",
      },
      {
        id: "sh10",
        name: "Jennifer Brown",
        email: "jennifer.brown@productmark.com",
        role: "pm",
        status: "approved",
      },
    ],
    relatedInsightIds: ["6", "7"],
  },
  {
    id: "asset-6",
    type: "objection-handling",
    title: "Pricing Objection Responses",
    description: "Framework for handling common pricing objections with proof points and customer success stories.",
    status: "delivered",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-03-12"),
    tags: ["objections", "pricing", "sales"],
    sourceOfTruth: {
      type: "spreadsheet",
      name: "Objection Handling Framework",
      url: "https://docs.google.com/spreadsheets/d/example6",
      permissions: "view",
    },
    stakeholders: [
      {
        id: "sh11",
        name: "Carlos Ruiz",
        email: "carlos.ruiz@productmark.com",
        role: "sales-manager",
        status: "approved",
      },
      {
        id: "sh12",
        name: "Nina Patel",
        email: "nina.patel@productmark.com",
        role: "enablement",
        status: "approved",
        feedback: "These responses are exactly what the team needs. Very practical.",
      },
    ],
    relatedInsightIds: ["8"],
  },
  {
    id: "asset-7",
    type: "gtm-brief",
    title: "Q1 Product Launch Brief",
    description:
      "Go-to-market brief for our Q1 product launch, including target market, positioning, channels, and timeline.",
    status: "in-review",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-20"),
    tags: ["gtm", "launch", "product-marketing"],
    sourceOfTruth: {
      type: "document",
      name: "Q1 Launch GTM Brief",
      url: "https://docs.google.com/document/d/example7",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh13",
        name: "Samantha Lee",
        email: "samantha.lee@productmark.com",
        role: "pmm",
        status: "pending",
      },
      {
        id: "sh14",
        name: "Robert Taylor",
        email: "robert.taylor@productmark.com",
        role: "pm",
        status: "pending",
      },
      {
        id: "sh15",
        name: "Maria Garcia",
        email: "maria.garcia@productmark.com",
        role: "sales-manager",
        status: "changes-requested",
        feedback: "Need more clarity on the sales enablement timeline. When will materials be ready?",
      },
    ],
    relatedInsightIds: ["2", "5", "9"],
    relatedStrategyIds: ["strategy-3"],
  },
  {
    id: "asset-8",
    type: "competitive-battle-card",
    title: "Competing Against Optimizely",
    description: "Battle card for competing with Optimizely in the A/B testing and experimentation market.",
    status: "delivered",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-22"),
    tags: ["competitive", "optimizely", "a-b-testing"],
    sourceOfTruth: {
      type: "document",
      name: "Optimizely Battle Card",
      url: "https://docs.google.com/document/d/example8",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh16",
        name: "Kevin Zhang",
        email: "kevin.zhang@productmark.com",
        role: "pmm",
        status: "approved",
      },
    ],
    relatedInsightIds: ["10"],
  },
  {
    id: "asset-9",
    type: "demo-script",
    title: "SMB Onboarding Demo",
    description: "Quick 10-minute demo focused on fast time-to-value for small and medium businesses.",
    status: "delivered",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-08"),
    tags: ["demo", "smb", "onboarding"],
    sourceOfTruth: {
      type: "document",
      name: "SMB Demo Script",
      url: "https://docs.google.com/document/d/example9",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh17",
        name: "Amanda White",
        email: "amanda.white@productmark.com",
        role: "sales-rep",
        status: "approved",
      },
      {
        id: "sh18",
        name: "Chris Anderson",
        email: "chris.anderson@productmark.com",
        role: "customer-success",
        status: "approved",
        feedback: "Perfect for SMB prospects. Hits all the key value drivers quickly.",
      },
    ],
    relatedInsightIds: ["4", "6"],
  },
  {
    id: "asset-10",
    type: "website-copy",
    title: "Homepage Hero Copy",
    description: "Approved copy for the homepage hero section with headline, subheadline, and CTA.",
    status: "delivered",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-20"),
    tags: ["website", "marketing", "homepage"],
    sourceOfTruth: {
      type: "document",
      name: "Website Copy Master Doc",
      url: "https://docs.google.com/document/d/example10",
      permissions: "view",
    },
    stakeholders: [
      {
        id: "sh19",
        name: "Sophie Martin",
        email: "sophie.martin@productmark.com",
        role: "pmm",
        status: "approved",
        feedback: "The headline really captures our value prop. Great work!",
      },
      {
        id: "sh20",
        name: "Daniel Kim",
        email: "daniel.kim@productmark.com",
        role: "pm",
        status: "approved",
      },
    ],
    relatedInsightIds: ["2"],
  },
  {
    id: "asset-11",
    type: "gtm-playbook",
    title: "Enterprise AI Assistant Q1 2024 Launch",
    description:
      "Comprehensive go-to-market playbook for Enterprise AI Assistant launch targeting Fortune 500 companies. Includes complete positioning, competitive analysis, pricing strategy, launch plan, and sales enablement materials.",
    status: "in-review",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-25"),
    tags: ["gtm", "playbook", "enterprise", "ai", "launch", "q1-2024"],
    sourceOfTruth: {
      type: "document",
      name: "Enterprise AI Assistant GTM Playbook - Master",
      url: "https://docs.google.com/document/d/gtm-playbook-master",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh21",
        name: "Sarah Chen",
        email: "sarah.chen@productmark.com",
        role: "sales-manager",
        status: "approved",
        feedback:
          "The sales enablement section is comprehensive. Discovery questions are spot-on for enterprise deals.",
      },
      {
        id: "sh22",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@productmark.com",
        role: "pmm",
        status: "approved",
        feedback: "Excellent competitive positioning. The messaging pillars really differentiate us from incumbents.",
      },
      {
        id: "sh23",
        name: "James Park",
        email: "james.park@productmark.com",
        role: "enablement",
        status: "changes-requested",
        feedback: "Need to add more detail on the demo script flow and objection handling for security concerns.",
      },
      {
        id: "sh24",
        name: "Rachel Kim",
        email: "rachel.kim@productmark.com",
        role: "customer-success",
        status: "approved",
        feedback: "The activation checklist and success metrics align perfectly with our CS playbook.",
      },
    ],
    relatedInsightIds: ["1", "2", "5", "6"],
    relatedStrategyIds: ["gtm-1"],
  },
  {
    id: "asset-12",
    type: "gtm-playbook",
    title: "SMB Self-Service Platform Launch",
    description:
      "Go-to-market playbook for SMB self-service platform targeting companies with 10-500 employees. Focus on product-led growth, freemium model, and rapid time-to-value.",
    status: "delivered",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-10"),
    tags: ["gtm", "playbook", "smb", "self-service", "plg", "freemium"],
    sourceOfTruth: {
      type: "document",
      name: "SMB Self-Service GTM Playbook",
      url: "https://docs.google.com/document/d/smb-gtm-playbook",
      permissions: "view",
    },
    stakeholders: [
      {
        id: "sh25",
        name: "Amanda White",
        email: "amanda.white@productmark.com",
        role: "sales-rep",
        status: "approved",
        feedback: "The PLG motion is well-defined. Conversion triggers are actionable.",
      },
      {
        id: "sh26",
        name: "Chris Anderson",
        email: "chris.anderson@productmark.com",
        role: "customer-success",
        status: "approved",
      },
      {
        id: "sh27",
        name: "Sophie Martin",
        email: "sophie.martin@productmark.com",
        role: "pmm",
        status: "approved",
        feedback: "Love the messaging for SMB audience. Much more approachable than enterprise positioning.",
      },
    ],
    relatedInsightIds: ["4", "6", "8"],
    relatedStrategyIds: ["gtm-2"],
  },
  {
    id: "asset-13",
    type: "gtm-communications-plan",
    title: "Q1 GTM Communications Plan",
    description:
      "Communications plan for the Q1 product launch, including messaging, channels, timing, and key stakeholders.",
    status: "draft",
    createdAt: new Date("2024-03-25"),
    updatedAt: new Date("2024-03-25"),
    tags: ["gtm", "communications", "plan", "q1"],
    sourceOfTruth: {
      type: "document",
      name: "Q1 GTM Communications Plan",
      url: "https://docs.google.com/document/d/q1-gtm-plan",
      permissions: "edit",
    },
    stakeholders: [
      {
        id: "sh28",
        name: "John Doe",
        email: "john.doe@productmark.com",
        role: "pm",
        status: "pending",
      },
      {
        id: "sh29",
        name: "Jane Smith",
        email: "jane.smith@productmark.com",
        role: "pmm",
        status: "pending",
      },
    ],
    relatedInsightIds: ["11"],
    relatedStrategyIds: ["gtm-3"],
  },
]

// Export as named export for compatibility
export const enablementAssets = mockEnablementAssets
