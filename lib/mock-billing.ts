export interface Plan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number // price per month when billed annually
  features: string[]
  isPopular?: boolean
  isCurrent?: boolean
  currentBillingCycle?: "monthly" | "annual"
}

export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "bank"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface BillingHistoryItem {
  id: string
  date: string
  description: string
  amount: number
  status: "paid" | "pending" | "failed"
  invoiceUrl?: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: "team_leader" | "team_member"
  addedDate: string
  isIncluded: boolean // true if part of base plan, false if additional ($29/month)
}

export const mockPlans: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    description: "For individual PMMs capturing insights and building strategy on their own.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Unlimited insights",
      "Up to 4 strategy frameworks",
      "10 AI assists/month",
      "Basic integrations: Slack, LinkedIn",
      "Share with stakeholders",
    ],
  },
  {
    id: "assist",
    name: "Assist",
    description: "Best Starter Plan",
    monthlyPrice: 49,
    annualPrice: 37, // 25% savings when billed annually ($444/year)
    features: [
      "Unlimited frameworks",
      "250 AI assists/month",
      "Insight tagging & search",
      "Shared enablement hub (up to 10 stakeholders)",
      "Private stakeholder feedback",
      "Integrations: Google Workspace, Microsoft 365",
      "Priority support via chat or email",
    ],
    isPopular: true,
  },
  {
    id: "team",
    name: "Team",
    description: "Includes one team leader + one team member",
    monthlyPrice: 99,
    annualPrice: 74, // 25% savings when billed annually ($888/year)
    features: [
      "1,000 AI assists/month",
      "Multiple workspaces",
      "Unlimited stakeholders in enablement hub",
      "Advanced analytics & reporting",
      "Advanced integrations: HubSpot, Salesforce",
      "$29/additional team member per month",
    ],
    isCurrent: true,
    currentBillingCycle: "annual",
  },
]

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
]

export const mockBillingHistory: BillingHistoryItem[] = [
  {
    id: "inv_1",
    date: "2025-01-01",
    description: "Team Plan - January 2025",
    amount: 149,
    status: "paid",
    invoiceUrl: "#",
  },
  {
    id: "inv_2",
    date: "2024-12-01",
    description: "Team Plan - December 2024",
    amount: 149,
    status: "paid",
    invoiceUrl: "#",
  },
  {
    id: "inv_3",
    date: "2024-11-01",
    description: "Team Plan - November 2024",
    amount: 149,
    status: "paid",
    invoiceUrl: "#",
  },
  {
    id: "inv_4",
    date: "2024-10-01",
    description: "Pro Plan - October 2024",
    amount: 49,
    status: "paid",
    invoiceUrl: "#",
  },
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm_1",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "team_leader",
    addedDate: "2024-01-15",
    isIncluded: true,
  },
  {
    id: "tm_2",
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "team_member",
    addedDate: "2024-01-15",
    isIncluded: true,
  },
  {
    id: "tm_3",
    name: "Alex Rivera",
    email: "alex@company.com",
    role: "team_member",
    addedDate: "2024-08-20",
    isIncluded: false,
  },
]
