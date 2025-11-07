export interface CompetitorFields {
  name: string
  website?: string
}

export interface InsightAnalysis {
  evidence?: string
  why?: string
  implication?: string
  action?: string
  generatedAt?: string
}

export interface InsightData {
  id: string
  type: "customer" | "competitive" | "market"
  observation: string
  dataSource?: string
  dataSourceType?: "link" | "file" | "note"
  tags: string[]
  competitor?: CompetitorFields
  author: string
  createdAt: string
  updatedAt?: string
  analysis?: InsightAnalysis
}

export const mockInsights: InsightData[] = [
  {
    id: "1",
    type: "customer",
    observation:
      "Enterprise customers abandon onboarding when SSO isn't available in the first 48 hours. Security teams at Fortune 500 companies require SSO as a non-negotiable requirement, and without it we're losing $200K+ ARR deals.",
    dataSource: "https://example.com/customer-interviews-q4-2023",
    dataSourceType: "link",
    tags: ["enterprise", "security", "onboarding", "sso", "blocker"],
    author: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    analysis: {
      evidence:
        "7 out of 10 enterprise trials churned without SSO. Sales noted 'SSO is a blocker' in 15+ deal notes. Security compliance requirements documented in RFPs from Fortune 500 prospects.",
      why: "Enterprise buyers have strict security requirements. Without SSO, we lose $200k+ ARR deals. Security teams at Fortune 500 companies won't approve tools that don't integrate with their identity management systems.",
      implication:
        "SSO should be prioritized in roadmap to unlock enterprise market. Current product positioning doesn't emphasize security features enough. Sales team needs better discovery questions around security requirements.",
      action:
        "Move SSO to Q1 priority on product roadmap. Update sales deck to lead with security features. Create enterprise-focused landing page highlighting compliance and security.",
      generatedAt: "2024-01-15T10:31:00Z",
    },
  },
  {
    id: "2",
    type: "competitive",
    observation:
      "Adobe released AI analytics at $49/month vs our planned $99/month. Their features are comparable but significantly cheaper, creating immediate pricing pressure in mid-market where we compete directly.",
    dataSource: "https://www.adobe.com/pricing",
    dataSourceType: "link",
    tags: ["ai", "pricing", "mid-market", "competitive-threat"],
    competitor: {
      name: "Adobe",
      website: "https://www.adobe.com/",
    },
    author: "Mike Chen",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
    analysis: {
      evidence:
        "Adobe pricing page shows AI features at $49/month. Feature comparison shows 80% overlap with our planned offering. 3 recent lost deals cited pricing as primary concern.",
      why: "Mid-market customers are price-sensitive and will choose comparable features at lower cost. Our current pricing strategy assumes premium positioning that may not hold in this segment.",
      implication:
        "Need to reconsider pricing strategy for AI features. May need to differentiate on capabilities rather than just price. Risk losing mid-market share if we don't respond.",
      action:
        "Conduct pricing analysis across mid-market segment. Consider tiered AI feature set. Explore value-based pricing positioning. Monitor competitive response and market reaction.",
      generatedAt: "2024-01-10T14:21:00Z",
    },
  },
  {
    id: "3",
    type: "market",
    observation:
      "GDPR compliance is becoming table stakes for all SaaS platforms operating in EU. 12 RFPs in Q4 explicitly required EU data centers, and Gartner shows 78% of European buyers prioritize data residency. €20M in fines issued to non-compliant companies in 2023.",
    dataSource:
      "Analysis of Q4 2023 RFPs and Gartner report 'Data Privacy Requirements in European SaaS Buying, 2024'. New EU regulations require data residency options.",
    dataSourceType: "note",
    tags: ["gdpr", "compliance", "eu", "data-residency", "legal"],
    author: "Emma Wilson",
    createdAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-08T09:15:00Z",
    analysis: {
      evidence:
        "12 RFPs in Q4 explicitly required EU data centers. Gartner report shows 78% of European buyers prioritize data residency. €20M in fines issued to non-compliant companies in 2023.",
      why: "EU market represents 30% growth opportunity. Non-compliance blocks us from enterprise deals. Competitors with EU data centers have significant advantage in this market.",
      implication:
        "Need to establish EU data center presence to compete effectively. Marketing messaging must emphasize compliance capabilities. Legal and security documentation needs updating.",
      action:
        "Evaluate EU cloud provider partnerships (AWS EU, Azure EU). Create GDPR compliance documentation. Update marketing site with EU data residency options. Train sales team on compliance messaging.",
      generatedAt: "2024-01-08T09:16:00Z",
    },
  },
  {
    id: "4",
    type: "customer",
    observation:
      "SMB customers expect to see ROI within 30 days or they churn during trial. Analysis of 50 churned accounts shows average time-to-value was 45 days, exceeding the patience threshold. Successful customers achieved first win in 18 days average.",
    dataSource:
      "Churn analysis from 50 SMB accounts Jan-Dec 2023. Exit interviews by CS team. Internal onboarding metrics dashboard.",
    dataSourceType: "note",
    tags: ["smb", "onboarding", "churn", "time-to-value", "retention"],
    author: "Alex Rodriguez",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    type: "competitive",
    observation:
      "Status quo (spreadsheets + email) is our biggest competitor for SMB segment. 60% of lost deals went to 'do nothing' rather than a competitor product. Buyers cite 'good enough for now' and change management friction.",
    dataSource: "https://example.com/q4-lost-deal-analysis",
    dataSourceType: "link",
    tags: ["status-quo", "smb", "spreadsheets", "change-management"],
    competitor: {
      name: "Status Quo",
    },
    author: "Sarah Johnson",
    createdAt: "2024-01-18T11:20:00Z",
    updatedAt: "2024-01-18T11:20:00Z",
  },
  {
    id: "6",
    type: "market",
    observation:
      "Remote work tools seeing 40% YoY growth but enterprise budgets are freezing. Gartner predicts consolidation as companies cut number of vendors. Multi-product suites have advantage over point solutions.",
    dataSource: "https://example.com/gartner-remote-work-trends-2024",
    dataSourceType: "link",
    tags: ["remote-work", "market-trends", "consolidation", "enterprise"],
    author: "Mike Chen",
    createdAt: "2024-01-05T13:30:00Z",
    updatedAt: "2024-01-05T13:30:00Z",
  },
  {
    id: "7",
    type: "customer",
    observation:
      "Product managers spend 15+ hours/week in meetings but only 3 hours on actual product strategy work. They're drowning in tactical execution and reporting, leaving no time for strategic thinking about market positioning.",
    dataSource:
      "Time-tracking study with 25 enterprise PMs over 4 weeks. Interview transcripts and calendar analysis included.",
    dataSourceType: "note",
    tags: ["product-management", "time-management", "strategy", "meetings"],
    author: "Emma Wilson",
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z",
  },
  {
    id: "8",
    type: "competitive",
    observation:
      "Optimizely launched mobile app with offline mode while we still require internet connection. Sales team reports this as top objection in field sales scenarios where connectivity is unreliable.",
    dataSource: "https://www.optimizely.com/mobile-app-release",
    dataSourceType: "link",
    tags: ["mobile", "offline", "feature-gap", "field-sales"],
    competitor: {
      name: "Optimizely",
      website: "https://www.optimizely.com/",
    },
    author: "Mike Chen",
    createdAt: "2024-01-22T09:00:00Z",
    updatedAt: "2024-01-22T09:00:00Z",
  },
  {
    id: "9",
    type: "market",
    observation:
      "AI features are now expected as baseline, not differentiators. 85% of RFPs mention AI capabilities as requirement. Buyers assume every modern SaaS product has AI built-in.",
    dataSource:
      "RFP analysis from Q4 2023 showing AI mentioned in 85 of 100 enterprise RFPs. Gartner Magic Quadrant report notes AI as table stakes.",
    dataSourceType: "note",
    tags: ["ai", "market-expectations", "rfp", "baseline-features"],
    author: "Sarah Johnson",
    createdAt: "2024-01-25T14:30:00Z",
    updatedAt: "2024-01-25T14:30:00Z",
  },
  {
    id: "10",
    type: "customer",
    observation:
      "Users abandon the tool after hitting data limits on the free tier. 70% of churned free users never saw upgrade prompts. Need better visibility into usage approaching limits before hitting the wall.",
    dataSource: "https://example.com/free-tier-churn-analysis",
    dataSourceType: "link",
    tags: ["freemium", "churn", "data-limits", "monetization", "user-experience"],
    author: "Alex Rodriguez",
    createdAt: "2024-01-28T11:15:00Z",
    updatedAt: "2024-01-28T11:15:00Z",
  },
]
