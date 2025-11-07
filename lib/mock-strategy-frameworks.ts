// Mock data for all strategic frameworks

// ============================================
// ICP (Ideal Customer Profile) Mock Data
// ============================================

export interface ICPData {
  id: string
  name: string
  description: string
  companySize: string
  revenue: string
  industries: string
  geography: string
  businessModel: string
  techStack: string
  maturity: string
  painPoints: string
  needs: string
  disqualifiers: string
  createdAt: string
  lastModified: string
  author: string
}

export const mockICPs: ICPData[] = [
  {
    id: "icp-1",
    name: "Mid-Market SaaS Companies",
    description:
      "Fast-growing B2B SaaS companies in the mid-market segment looking to scale their go-to-market operations efficiently.",
    companySize: "50-500 employees",
    revenue: "$10M-$100M ARR",
    industries: "B2B SaaS, Cloud Infrastructure, Developer Tools, Marketing Technology, Sales Enablement",
    geography: "North America (primary), EMEA (secondary)",
    businessModel:
      "B2B SaaS with subscription-based revenue model. Primarily selling to other businesses with annual or multi-year contracts. Mix of product-led growth and sales-led motions.",
    techStack:
      "Modern cloud-native stack: AWS/GCP/Azure, Salesforce, HubSpot, Slack, Notion, GitHub, Figma, Amplitude/Mixpanel for analytics",
    maturity: "Series B-C funding stage, transitioning from early growth to scale-up phase",
    painPoints:
      "- Struggling to align product, marketing, and sales teams around a unified go-to-market strategy\n- Lack of structured frameworks for positioning and messaging\n- Difficulty tracking and measuring marketing effectiveness\n- Sales team lacks consistent enablement materials\n- Competitive landscape is crowded and differentiation is unclear\n- Limited resources to build comprehensive GTM infrastructure",
    needs:
      "- Centralized platform for strategic planning and execution\n- Frameworks and templates to accelerate GTM planning\n- Better collaboration between product marketing, demand gen, and sales\n- Data-driven insights to inform strategy decisions\n- Scalable processes that don't require large teams",
    disqualifiers:
      "- Companies under $5M ARR (too early stage)\n- Enterprise companies over $500M (need more sophisticated solutions)\n- B2C companies (different GTM motion)\n- Companies without dedicated marketing function\n- Bootstrapped companies with very limited budgets (<$50K for tools)",
    createdAt: "2024-01-10T09:00:00Z",
    lastModified: "2024-01-15T14:30:00Z",
    author: "Sarah Johnson",
  },
  {
    id: "icp-2",
    name: "Enterprise Technology Vendors",
    description:
      "Established enterprise software and technology companies looking to modernize their product marketing and go-to-market approach.",
    companySize: "500-5000 employees",
    revenue: "$100M-$1B ARR",
    industries: "Enterprise Software, Cybersecurity, Data & Analytics, Infrastructure, DevOps Tools",
    geography: "Global with strong presence in North America, EMEA, and APAC",
    businessModel:
      "Enterprise B2B with complex sales cycles (6-18 months). Mix of direct sales and channel partnerships. Land-and-expand strategy with multiple product lines.",
    techStack:
      "Enterprise-grade tools: Salesforce, Marketo/Eloqua, Seismic, Highspot, Tableau, Snowflake, Confluence, JIRA",
    maturity:
      "Mature companies, often post-IPO or late-stage private. Established market presence but facing disruption from newer competitors.",
    painPoints:
      "- Legacy positioning and messaging that no longer resonates\n- Siloed teams with inconsistent go-to-market execution\n- Difficulty launching new products into existing customer base\n- Competitive threats from more agile startups\n- Complex product portfolio that's hard to message clearly\n- Long sales cycles and need for better enablement\n- Struggle to demonstrate ROI and business value",
    needs:
      "- Strategic frameworks to reposition against modern competitors\n- Tools to manage complex product portfolios and messaging\n- Better competitive intelligence and battlecards\n- Scalable enablement for large, distributed sales teams\n- Executive-level reporting and insights\n- Integration with existing enterprise tools",
    disqualifiers:
      "- Companies under $50M ARR (not enterprise scale)\n- Startups without established product-market fit\n- Companies selling primarily to SMB (different motion)\n- Organizations without dedicated product marketing teams\n- Companies not willing to invest in strategic planning",
    createdAt: "2024-01-12T10:30:00Z",
    lastModified: "2024-01-20T16:45:00Z",
    author: "Mike Chen",
  },
  {
    id: "icp-3",
    name: "High-Growth Startups (Series A-B)",
    description:
      "Early-stage startups that have achieved product-market fit and are scaling their go-to-market operations rapidly.",
    companySize: "20-100 employees",
    revenue: "$2M-$15M ARR",
    industries: "SaaS, Fintech, AI/ML, Developer Tools, Vertical SaaS",
    geography: "Primarily North America, expanding to international markets",
    businessModel:
      "Product-led growth with sales-assist for larger deals. Freemium or free trial model with conversion to paid plans. Focus on rapid user acquisition and expansion.",
    techStack: "Modern, lightweight stack: Notion, Linear, Figma, Amplitude, Segment, Stripe, Intercom, Slack",
    maturity: "Series A-B stage, recently raised funding and hiring aggressively",
    painPoints:
      "- First product marketing hire trying to build everything from scratch\n- No established frameworks or processes for GTM\n- Founders did initial positioning but it needs refinement\n- Sales team is growing but lacks consistent messaging\n- Competitive landscape is evolving quickly\n- Limited time and resources to build comprehensive strategy\n- Need to move fast and iterate quickly",
    needs:
      "- Quick-start templates and frameworks to accelerate setup\n- Best practices and guidance for first-time PMMs\n- Lightweight, flexible tools that don't slow them down\n- Affordable pricing for early-stage budgets\n- Community and resources to learn from peers\n- Easy to implement without extensive training",
    disqualifiers:
      "- Pre-seed or seed stage without revenue\n- Companies without product-market fit\n- B2C consumer apps (different GTM approach)\n- Companies with no plans to hire marketing/PMM\n- Organizations looking for enterprise-grade complexity",
    createdAt: "2024-01-18T11:15:00Z",
    lastModified: "2024-01-22T09:20:00Z",
    author: "Emma Wilson",
  },
]

// ============================================
// Persona (Buyer Persona) Mock Data
// ============================================

export interface PersonaData {
  id: string
  name: string
  description: string
  jobTitle: string
  department: string
  seniority: string
  responsibilities: string
  businessGoals: string
  personalGoals: string
  challenges: string
  painPoints: string
  decisionCriteria: string
  buyingRole: string
  objections: string
  communicationPreferences: string
  createdAt: string
  lastModified: string
  author: string
}

export const mockPersonas: PersonaData[] = [
  {
    id: "persona-1",
    name: "Product Marketing Director Diana",
    description:
      "Mid-level product marketing leader at a B2B SaaS company responsible for positioning, messaging, and go-to-market strategy.",
    jobTitle: "Director of Product Marketing",
    department: "Marketing",
    seniority: "Director level (reports to VP Marketing or CMO)",
    responsibilities:
      "- Own product positioning and messaging across portfolio\n- Lead go-to-market strategy for new product launches\n- Manage competitive intelligence and battlecards\n- Create sales enablement materials and training\n- Collaborate with product, sales, and marketing teams\n- Conduct market research and customer interviews\n- Manage 2-4 product marketing managers",
    businessGoals:
      "- Successfully launch 3-4 major product releases per year\n- Increase win rates against key competitors by 15%\n- Improve sales team confidence in messaging and positioning\n- Accelerate time-to-market for new product launches\n- Drive product adoption and expansion revenue",
    personalGoals:
      "- Build a high-performing product marketing team\n- Establish PMM as a strategic function in the organization\n- Get promoted to VP of Product Marketing within 18 months\n- Become recognized as a thought leader in product marketing\n- Develop repeatable frameworks and processes",
    challenges:
      "- Constantly context-switching between multiple product launches\n- Difficult to get alignment across product, sales, and marketing\n- Limited time for strategic thinking due to tactical execution\n- Hard to measure and demonstrate PMM impact\n- Sales team doesn't consistently use enablement materials\n- Competitive landscape changes faster than we can respond",
    painPoints:
      "- Spending too much time in meetings and not enough on strategy\n- Recreating positioning and messaging docs from scratch each time\n- No single source of truth for product marketing assets\n- Difficult to track what's working and what's not\n- Sales team complains about lack of competitive intel\n- Executive team doesn't understand the value of product marketing",
    decisionCriteria:
      "- Does it save time and make the team more efficient?\n- Will it improve cross-functional collaboration?\n- Can it help demonstrate PMM impact to leadership?\n- Is it easy to adopt without extensive training?\n- Does it integrate with existing tools (Salesforce, Slack, etc.)?\n- Is the pricing reasonable for our budget?",
    buyingRole:
      "Primary decision maker for product marketing tools. Needs to get budget approval from CMO but has strong influence. Will involve team members in evaluation.",
    objections:
      "- 'We already have tools for this (Google Docs, Notion, etc.)'\n- 'My team is too busy to learn a new tool'\n- 'How is this different from what we're already doing?'\n- 'We need to see ROI before committing'\n- 'What if the team doesn't adopt it?'\n- 'Can we start with a pilot before rolling out company-wide?'",
    communicationPreferences:
      "- Prefers LinkedIn for professional content and thought leadership\n- Reads product marketing blogs and newsletters (PMA, Sharebird)\n- Attends virtual events and webinars (but rarely in-person)\n- Values peer recommendations and case studies\n- Responds well to personalized outreach that shows understanding of challenges\n- Prefers concise, actionable content over lengthy whitepapers",
    createdAt: "2024-01-10T09:00:00Z",
    lastModified: "2024-01-15T14:30:00Z",
    author: "Sarah Johnson",
  },
  {
    id: "persona-2",
    name: "VP of Marketing Victor",
    description:
      "Senior marketing executive responsible for overall marketing strategy, team performance, and revenue contribution.",
    jobTitle: "VP of Marketing",
    department: "Marketing",
    seniority: "VP level (reports to CMO or CEO)",
    responsibilities:
      "- Set overall marketing strategy and priorities\n- Manage marketing budget ($5M-$20M annually)\n- Lead team of 15-30 marketing professionals\n- Drive pipeline generation and revenue goals\n- Report marketing performance to executive team and board\n- Align marketing with sales and product organizations\n- Build and scale marketing operations and processes",
    businessGoals:
      "- Hit quarterly pipeline and revenue targets\n- Improve marketing efficiency and ROI\n- Build a world-class marketing organization\n- Establish marketing as a strategic growth driver\n- Scale processes to support company growth\n- Improve brand awareness and market position",
    personalGoals:
      "- Get promoted to CMO or take on broader responsibilities\n- Build a reputation as a strategic marketing leader\n- Develop future marketing leaders on the team\n- Speak at industry conferences and events\n- Successfully navigate company through next growth stage",
    challenges:
      "- Pressure to do more with less (budget constraints)\n- Difficult to prove marketing's impact on revenue\n- Sales and marketing alignment is always a challenge\n- Hard to find and retain top marketing talent\n- Balancing short-term execution with long-term strategy\n- Too many tools and not enough integration",
    painPoints:
      "- Can't get clear visibility into what's working across the team\n- Product marketing and demand gen operate in silos\n- Sales complains about lead quality and lack of enablement\n- Executive team questions marketing's contribution to revenue\n- Spending too much time on reporting instead of strategy\n- Team is overwhelmed and burning out",
    decisionCriteria:
      "- Will it help us hit our revenue goals?\n- Does it improve team efficiency and productivity?\n- Can it provide better visibility and reporting for executives?\n- Will it improve cross-functional collaboration?\n- Is it scalable as we grow?\n- What's the total cost of ownership (not just software cost)?",
    buyingRole:
      "Economic buyer with final approval authority. Relies on team leads (like PMM Director) to evaluate and recommend solutions. Focused on strategic value and ROI.",
    objections:
      "- 'We already have too many tools'\n- 'What's the ROI and how quickly can we see results?'\n- 'How does this integrate with our existing stack?'\n- 'Do we have the resources to implement and manage this?'\n- 'What if we outgrow this solution in 12-18 months?'\n- 'Can you show me examples from similar companies?'",
    communicationPreferences:
      "- Reads Harvard Business Review, Forbes, and marketing publications\n- Active on LinkedIn but selective about engagement\n- Attends executive-level conferences and events\n- Values peer networks and executive roundtables\n- Prefers executive briefings over detailed demos\n- Responds to strategic, business-focused messaging (not tactical features)",
    createdAt: "2024-01-12T10:30:00Z",
    lastModified: "2024-01-20T16:45:00Z",
    author: "Mike Chen",
  },
  {
    id: "persona-3",
    name: "First Product Marketer Fiona",
    description:
      "The first product marketing hire at a high-growth startup, responsible for building the PMM function from scratch.",
    jobTitle: "Product Marketing Manager (first PMM hire)",
    department: "Marketing",
    seniority: "Individual contributor, but with strategic influence",
    responsibilities:
      "- Build product marketing function from the ground up\n- Create initial positioning and messaging frameworks\n- Develop sales enablement materials and competitive intel\n- Support product launches and go-to-market initiatives\n- Work closely with founders on strategic direction\n- Collaborate with small, scrappy marketing and sales teams\n- Wear many hats and fill gaps across marketing",
    businessGoals:
      "- Establish clear, differentiated positioning in the market\n- Enable sales team to sell more effectively\n- Successfully launch next major product release\n- Build repeatable processes for product marketing\n- Prove the value of product marketing to the organization\n- Set foundation for future PMM team growth",
    personalGoals:
      "- Successfully transition from IC to people manager\n- Build credibility as a product marketing expert\n- Learn and grow quickly in a startup environment\n- Eventually lead the product marketing team\n- Build a portfolio of successful launches and initiatives",
    challenges:
      "- Everything is new and there are no established processes\n- Limited resources and budget to work with\n- Founders have strong opinions about positioning\n- Sales team is skeptical about marketing's value\n- Wearing too many hats and struggling to prioritize\n- No mentorship or guidance from senior PMMs\n- Imposter syndrome and fear of making mistakes",
    painPoints:
      "- Don't know where to start or what to prioritize\n- Creating everything from scratch is time-consuming\n- No templates or frameworks to accelerate work\n- Difficult to get buy-in from founders and sales\n- Feeling isolated without a PMM peer group\n- Worried about making the wrong strategic decisions\n- Need to show results quickly to prove value",
    decisionCriteria:
      "- Is it easy to get started without extensive training?\n- Does it provide templates and best practices?\n- Is the pricing affordable for a startup budget?\n- Can I implement it myself without IT support?\n- Will it help me move faster and be more productive?\n- Does it have good documentation and support?",
    buyingRole:
      "Influencer and champion. Needs to convince founders or VP Marketing to approve purchase. Budget is limited so price sensitivity is high.",
    objections:
      "- 'Can we just use free tools like Google Docs and Notion?'\n- 'We're too early stage for this'\n- 'I need to prove value before investing in tools'\n- 'What if I'm the only one who uses it?'\n- 'We might outgrow this quickly as we scale'\n- 'Can I try it for free first?'",
    communicationPreferences:
      "- Very active on LinkedIn and Twitter\n- Reads product marketing blogs and newsletters religiously\n- Joins Slack communities and online forums\n- Attends virtual meetups and webinars\n- Values peer recommendations and community-driven content\n- Prefers practical, tactical content over high-level strategy\n- Responds well to founder stories and startup-focused messaging",
    createdAt: "2024-01-18T11:15:00Z",
    lastModified: "2024-01-22T09:20:00Z",
    author: "Emma Wilson",
  },
]

// ============================================
// Market Opportunity (TAM/SAM/SOM) Mock Data
// ============================================

export interface MarketOpportunityData {
  id: string
  name: string
  description: string
  tam: {
    totalCustomers: string
    avgRevenue: string
    totalRevenue: string
    growthRate: string
    sources: string
  }
  sam: {
    segments: string
    marketPortion: string
    icpCustomers: string
    revenueOpportunity: string
    barriers: string
  }
  som: {
    marketShare: string
    customersYear1: string
    revenue: string
    constraints: string
    assumptions: string
  }
  createdAt: string
  lastModified: string
  author: string
}

export const mockMarketOpportunities: MarketOpportunityData[] = [
  {
    id: "market-opp-1",
    name: "Product Marketing Platform Market Opportunity",
    description:
      "Market sizing for B2B SaaS product marketing and go-to-market planning software targeting mid-market and enterprise companies.",
    tam: {
      totalCustomers: "~50,000 B2B SaaS companies globally with >$5M ARR",
      avgRevenue: "$25,000 per year (average contract value)",
      totalRevenue: "$1.25 billion total addressable market",
      growthRate: "15% CAGR (compound annual growth rate)",
      sources:
        "Gartner Market Analysis 2024, SaaS industry reports, Crunchbase data on B2B SaaS companies, analyst estimates for marketing software spend",
    },
    sam: {
      segments:
        "Mid-market B2B SaaS ($10M-$100M ARR) and Enterprise ($100M-$1B ARR) companies in North America and EMEA with dedicated product marketing teams",
      marketPortion: "~40% of TAM (companies with mature enough organizations to have PMM function)",
      icpCustomers: "~20,000 companies that fit our ICP criteria",
      revenueOpportunity: "$500 million serviceable addressable market",
      barriers:
        "- Companies need to have dedicated product marketing function\n- Requires budget for marketing tools and software\n- Must have pain points around GTM efficiency and collaboration\n- Need to be willing to adopt new tools and processes",
    },
    som: {
      marketShare: "Target 2% market share in first 3 years",
      customersYear1: "400 customers by end of Year 3",
      revenue: "$10 million ARR at 2% market share",
      constraints:
        "- Sales team capacity (can only handle ~150 new customers per year initially)\n- Product maturity and feature completeness\n- Brand awareness and market presence\n- Competition from established players\n- Customer success capacity to ensure retention",
      assumptions:
        "- Average contract value of $25K/year\n- 85% annual retention rate\n- 6-month average sales cycle\n- 30% annual growth in sales capacity\n- Product-market fit validated by Year 1\n- Successful execution of go-to-market strategy",
    },
    createdAt: "2024-01-10T09:00:00Z",
    lastModified: "2024-01-25T14:30:00Z",
    author: "Sarah Johnson",
  },
  {
    id: "market-opp-2",
    name: "AI-Powered Sales Enablement Market",
    description:
      "Market opportunity for AI-driven sales enablement and competitive intelligence platform targeting enterprise B2B companies.",
    tam: {
      totalCustomers: "~100,000 B2B companies globally with sales teams of 50+ reps",
      avgRevenue: "$50,000 per year (higher ACV for enterprise)",
      totalRevenue: "$5 billion total addressable market",
      growthRate: "25% CAGR driven by AI adoption and remote selling trends",
      sources:
        "Forrester Research on Sales Enablement, Gartner Magic Quadrant for Sales Enablement Platforms, IDC market analysis, industry surveys",
    },
    sam: {
      segments:
        "Enterprise B2B companies ($100M+ revenue) in technology, financial services, healthcare, and manufacturing with complex sales processes",
      marketPortion: "~30% of TAM (enterprises with budget and need for advanced enablement)",
      icpCustomers: "~30,000 enterprise companies with mature sales organizations",
      revenueOpportunity: "$1.5 billion serviceable addressable market",
      barriers:
        "- Requires enterprise sales motion and longer sales cycles\n- Need to integrate with existing sales tech stack\n- Must demonstrate clear ROI and business value\n- Competitive landscape with established players\n- Security and compliance requirements for enterprise",
    },
    som: {
      marketShare: "Target 1% market share in first 5 years",
      customersYear1: "300 enterprise customers by end of Year 5",
      revenue: "$15 million ARR at 1% market share",
      constraints:
        "- Enterprise sales cycles are 9-12 months\n- Requires significant investment in sales and customer success\n- Product needs to be enterprise-ready (security, compliance, scale)\n- Competition from well-funded incumbents\n- Need to build brand credibility in enterprise market",
      assumptions:
        "- Average contract value of $50K/year\n- 90% annual retention rate for enterprise\n- 9-month average sales cycle\n- 20% annual growth in sales capacity\n- Successful land-and-expand strategy\n- Strong customer references and case studies",
    },
    createdAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-28T16:45:00Z",
    author: "Mike Chen",
  },
]

// ============================================
// Positioning Canvas Mock Data
// ============================================

export interface PositioningCanvasData {
  id: string
  name: string
  description: string
  competitiveAlternatives: string
  uniqueAttributes: string
  value: string
  proof: string
  targetMarket: string
  marketCategory: string
  relevantTrends: string
  createdAt: string
  lastModified: string
  author: string
}

export const mockPositioningCanvases: PositioningCanvasData[] = [
  {
    id: "positioning-1",
    name: "Enterprise Platform Positioning",
    description: "Strategic positioning for our product marketing platform targeting enterprise B2B SaaS companies.",
    competitiveAlternatives:
      "**Direct Competitors:**\n- Traditional product marketing tools (Crayon, Klue for competitive intel)\n- General collaboration tools (Notion, Confluence for documentation)\n- Sales enablement platforms (Seismic, Highspot)\n\n**Indirect Alternatives:**\n- Spreadsheets and Google Docs (status quo)\n- Hiring more product marketers\n- Consulting firms for strategy work\n- Building internal tools",
    uniqueAttributes:
      "**What Makes Us Different:**\n- Purpose-built for product marketing workflows (not adapted from other use cases)\n- Strategic frameworks embedded in the product (ICP, positioning, messaging house)\n- AI-powered insights from competitive intelligence and market data\n- Seamless collaboration between PMM, product, and sales teams\n- Single source of truth for all product marketing assets\n- Built-in best practices from top product marketers",
    value:
      "**Business Outcomes:**\n- 50% faster time-to-market for product launches\n- 30% improvement in sales win rates with better positioning\n- 10x more efficient competitive intelligence gathering\n- Unified go-to-market strategy across teams\n- Measurable impact on pipeline and revenue\n- Scale product marketing without proportional headcount growth\n\n**Why It Matters:**\nProduct marketing teams are overwhelmed with tactical execution and lack time for strategic thinking. Our platform automates the tactical work and provides frameworks for strategic decisions, allowing PMMs to focus on high-impact activities that drive revenue.",
    proof:
      "**Evidence & Validation:**\n- 200+ B2B SaaS companies using the platform\n- Average 6-month payback period on investment\n- 92% customer retention rate\n- Case studies: TechCorp reduced launch time from 6 months to 3 months, SaaSCo improved win rates by 35%\n- Recognized by Gartner as 'Cool Vendor in Marketing Technology'\n- 4.8/5 rating on G2 with 150+ reviews\n- Used by product marketing teams at Stripe, Notion, and Figma",
    targetMarket:
      "**Who Cares Most:**\n- Mid-market to enterprise B2B SaaS companies ($10M-$500M ARR)\n- Companies with dedicated product marketing teams (2+ PMMs)\n- Organizations struggling with GTM alignment and efficiency\n- Fast-growing companies scaling from 50-500 employees\n- Product marketing leaders who need to demonstrate impact\n- Companies in competitive markets requiring strong differentiation",
    marketCategory:
      "**How We Want to Be Seen:**\nProduct Marketing Operating System - not just another tool, but the central platform that product marketers use to plan, execute, and measure their entire go-to-market strategy.\n\nWe're creating a new category at the intersection of:\n- Strategic planning (like Cascade or Aha! for strategy)\n- Collaboration (like Notion or Confluence)\n- Sales enablement (like Seismic or Highspot)\n- Competitive intelligence (like Crayon or Klue)\n\nBut purpose-built specifically for product marketing workflows.",
    relevantTrends:
      "**Market Shifts Creating Urgency:**\n\n1. **Product Marketing Professionalization:** PMM is evolving from a tactical role to a strategic function. Companies are investing more in product marketing and need tools to match the sophistication.\n\n2. **Remote/Hybrid Work:** Distributed teams need better collaboration tools. The old way of working (docs scattered across drives) doesn't work anymore.\n\n3. **AI Transformation:** AI is changing how work gets done. Teams that leverage AI for tactical work can focus on strategic thinking and creativity.\n\n4. **Competitive Intensity:** Markets are more crowded than ever. Companies need stronger positioning and differentiation to win.\n\n5. **Efficiency Pressure:** Economic headwinds mean doing more with less. Tools that improve productivity and demonstrate ROI are essential.\n\n6. **Data-Driven Marketing:** Executives expect marketing to prove impact. Product marketers need better ways to measure and report their contribution.",
    createdAt: "2024-01-10T09:00:00Z",
    lastModified: "2024-01-25T14:30:00Z",
    author: "Sarah Johnson",
  },
  {
    id: "positioning-2",
    name: "SMB Startup Positioning",
    description: "Positioning strategy for targeting early-stage startups and first-time product marketers.",
    competitiveAlternatives:
      "**What Customers Use Today:**\n- Free tools: Google Docs, Sheets, Slides\n- Notion or Confluence for documentation\n- Figma for design collaboration\n- Slack for team communication\n- Nothing (founders doing PMM themselves)\n- Hiring expensive consultants for one-off projects",
    uniqueAttributes:
      "**Our Unique Approach:**\n- Quick-start templates for first-time PMMs\n- Guided workflows that teach best practices\n- Affordable pricing for startup budgets ($99/month vs $1000+/month)\n- No implementation required - start using in minutes\n- Built by product marketers, for product marketers\n- Community-driven with peer learning and support",
    value:
      "**What You Get:**\n- Launch your first product in weeks, not months\n- Professional positioning and messaging without hiring a consultant\n- Confidence that you're following best practices\n- Templates and frameworks that accelerate your work 10x\n- Community of peers to learn from and get feedback\n- Affordable solution that fits startup budgets\n\n**The Real Impact:**\nFirst-time product marketers are overwhelmed and don't know where to start. We give them a clear path forward with templates, guidance, and community support so they can be successful without years of experience.",
    proof:
      "**Why Startups Trust Us:**\n- 500+ startups using the platform\n- Featured in Product Marketing Alliance newsletter\n- 4.9/5 rating from first-time PMMs\n- Success stories from Y Combinator and Techstars companies\n- Active community of 2000+ product marketers\n- Free resources and templates downloaded 50,000+ times",
    targetMarket:
      "**Perfect For:**\n- Series A-B startups ($2M-$15M ARR)\n- First product marketing hire at the company\n- Founders doing product marketing themselves\n- Small marketing teams (1-5 people)\n- Companies with limited budgets (<$10K/year for tools)\n- Fast-moving teams that need to ship quickly",
    marketCategory:
      "**Product Marketing Starter Kit** - Everything a first-time product marketer needs to be successful, packaged in an easy-to-use platform with templates, guidance, and community support.\n\nThink of us as the 'Canva for Product Marketing' - making professional product marketing accessible to everyone, not just experts.",
    relevantTrends:
      "**Why Now:**\n\n1. **Product Marketing Democratization:** More startups are hiring their first PMM earlier. They need tools designed for beginners, not just experts.\n\n2. **Startup Efficiency:** Startups are under pressure to do more with less. They can't afford expensive consultants or enterprise tools.\n\n3. **Remote-First Startups:** Distributed teams need async collaboration tools. The old way (in-person whiteboarding) doesn't work.\n\n4. **Community-Driven Learning:** People want to learn from peers, not just top-down training. Community is the new competitive advantage.\n\n5. **Template Economy:** People want to start with templates and customize, not build from scratch. Speed matters more than perfection.",
    createdAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-28T16:45:00Z",
    author: "Emma Wilson",
  },
]

// ============================================
// Messaging House Mock Data
// ============================================

export interface MessagePillar {
  id: string
  value: string
  benefit: string
  feature: string
}

export interface MessagingHouseData {
  id: string
  name: string
  description: string
  overarchingMessage: string
  pillars: MessagePillar[]
  createdAt: string
  lastModified: string
  author: string
}

export const mockMessagingHouses: MessagingHouseData[] = [
  {
    id: "messaging-1",
    name: "Q1 2024 Product Messaging",
    description: "Core messaging framework for our product marketing platform targeting mid-market B2B SaaS companies.",
    overarchingMessage:
      "ProductMark is the operating system for product marketing teams, helping B2B SaaS companies launch products faster, win more deals, and scale their go-to-market without adding headcount.",
    pillars: [
      {
        id: "pillar-1",
        value: "Launch products 50% faster and with greater confidence",
        benefit:
          "Stop starting from scratch every time. Our strategic frameworks and templates guide you through positioning, messaging, and launch planning so you can ship faster without sacrificing quality.",
        feature:
          "Built-in frameworks for ICP definition, positioning canvas, messaging house, and tiered launch planning with AI-powered suggestions and best practices from top product marketers.",
      },
      {
        id: "pillar-2",
        value: "Win more deals with stronger competitive positioning",
        benefit:
          "Arm your sales team with the competitive intelligence and battlecards they need to win. Keep your positioning sharp and your team aligned on what makes you different.",
        feature:
          "Automated competitive intelligence tracking, AI-powered battlecard generation, and real-time updates that sync directly to your sales enablement platform.",
      },
      {
        id: "pillar-3",
        value: "Scale your impact without scaling your team",
        benefit:
          "Do more with less by automating tactical work and focusing your team on strategic decisions. Measure what matters and prove your impact to leadership.",
        feature:
          "AI-powered content generation, workflow automation, cross-functional collaboration tools, and executive dashboards that show product marketing's contribution to pipeline and revenue.",
      },
    ],
    createdAt: "2024-01-10T09:00:00Z",
    lastModified: "2024-01-25T14:30:00Z",
    author: "Sarah Johnson",
  },
  {
    id: "messaging-2",
    name: "Enterprise Sales Messaging",
    description: "Messaging framework specifically for enterprise sales conversations with VPs and C-level executives.",
    overarchingMessage:
      "ProductMark transforms product marketing from a cost center to a revenue driver, giving enterprise marketing leaders the visibility, efficiency, and strategic impact they need to hit their goals.",
    pillars: [
      {
        id: "pillar-1",
        value: "Prove marketing's impact on revenue with data-driven insights",
        benefit:
          "Stop guessing and start measuring. Show executives exactly how product marketing contributes to pipeline, win rates, and revenue with clear attribution and ROI metrics.",
        feature:
          "Executive dashboards with pipeline influence tracking, win/loss analysis, competitive win rate trends, and ROI calculators that connect product marketing activities to revenue outcomes.",
      },
      {
        id: "pillar-2",
        value: "Align your entire go-to-market organization around a unified strategy",
        benefit:
          "Break down silos between product, marketing, and sales. Get everyone working from the same playbook with consistent messaging and shared visibility into what's working.",
        feature:
          "Cross-functional collaboration workspace, single source of truth for positioning and messaging, automated sync to CRM and sales enablement tools, and real-time updates across teams.",
      },
      {
        id: "pillar-3",
        value: "Scale your product marketing organization efficiently",
        benefit:
          "Grow your impact without proportional headcount growth. Standardize processes, automate tactical work, and empower your team to focus on strategic initiatives that move the needle.",
        feature:
          "Reusable templates and frameworks, AI-powered content generation, workflow automation, team collaboration tools, and built-in best practices that accelerate new hire onboarding.",
      },
    ],
    createdAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-28T16:45:00Z",
    author: "Mike Chen",
  },
]

// ============================================
// Sales Pitch Narrative Mock Data
// ============================================

export interface SalesPitchData {
  id: string
  name: string
  description: string
  setTheScene: string
  introduceTheShift: string
  nameTheWinningStrategy: string
  showTheValue: string
  proveIt: string
  createdAt: string
  lastModified: string
  author: string
}

export const mockSalesPitches: SalesPitchData[] = [
  {
    id: "pitch-1",
    name: "Enterprise Sales Pitch",
    description:
      "Strategic narrative for selling to enterprise B2B SaaS companies with established product marketing teams.",
    setTheScene:
      "You're a VP of Marketing at a fast-growing B2B SaaS company. Your product marketing team is drowning in tactical execution—creating sales decks, updating battlecards, writing launch emails—and they have no time for strategic thinking.\n\nYour sales team complains that messaging is inconsistent and competitive intel is outdated. Your CEO asks 'What's product marketing's impact on revenue?' and you struggle to answer with data.\n\nMeanwhile, your competitors are moving faster, your win rates are declining, and you're under pressure to do more with less. You've tried hiring more product marketers, but that's expensive and slow. You've tried using general tools like Notion and Google Docs, but they're not built for product marketing workflows.\n\nYou know product marketing should be a strategic function that drives revenue, but right now it feels like a cost center that's always playing catch-up.",
    introduceTheShift:
      "Here's what's changing: Product marketing is evolving from a tactical support function to a strategic revenue driver. The best companies are treating product marketing as a core part of their go-to-market engine, not just a content factory.\n\nBut this shift requires new ways of working. The old approach—scattered docs, manual processes, siloed teams—can't scale. You need:\n\n• **Strategic frameworks** to guide decision-making, not just templates for execution\n• **Cross-functional collaboration** that breaks down silos between product, marketing, and sales\n• **Data and insights** to prove impact and inform strategy\n• **Automation** to handle tactical work so your team can focus on strategy\n• **AI-powered intelligence** to stay ahead of competitors and market trends\n\nThe companies that figure this out will win. The ones that don't will fall behind as competitors move faster and markets get more crowded.\n\nThe question isn't whether to change—it's how quickly you can adapt before you lose ground.",
    nameTheWinningStrategy:
      "The winning strategy is to build a **Product Marketing Operating System**—a central platform that connects strategy, execution, and measurement in one place.\n\nThis means:\n\n1. **Start with strategy, not tactics.** Use proven frameworks (ICP, positioning, messaging house) to make better decisions faster.\n\n2. **Automate the tactical work.** Let AI handle competitive intelligence, content generation, and updates so your team focuses on high-impact activities.\n\n3. **Break down silos.** Give product, marketing, and sales teams shared visibility and a single source of truth.\n\n4. **Measure what matters.** Track how product marketing contributes to pipeline, win rates, and revenue—not just activity metrics.\n\n5. **Scale without proportional headcount.** Build repeatable processes and leverage technology to do more with your existing team.\n\nThis isn't about adding another tool to your stack. It's about fundamentally changing how product marketing works—from reactive and tactical to proactive and strategic.",
    showTheValue:
      "That's exactly what ProductMark does. We're the operating system for product marketing teams at B2B SaaS companies.\n\n**Here's how it works:**\n\n• **Strategic Frameworks:** Built-in templates for ICP definition, positioning canvas, messaging house, and launch planning guide your team through strategic decisions with best practices from top product marketers.\n\n• **AI-Powered Intelligence:** Automated competitive tracking, AI-generated battlecards, and market insights keep you ahead of competitors without manual research.\n\n• **Cross-Functional Collaboration:** Product, marketing, and sales teams work from the same platform with shared visibility, real-time updates, and seamless integration with your existing tools.\n\n• **Impact Measurement:** Executive dashboards show how product marketing contributes to pipeline, win rates, and revenue with clear attribution and ROI metrics.\n\n• **Workflow Automation:** AI handles tactical work like content generation, competitive updates, and asset management so your team focuses on strategy.\n\n**The result?** Product marketing teams launch products 50% faster, improve win rates by 30%, and scale their impact without adding headcount. Marketing leaders can finally prove product marketing's contribution to revenue with data, not anecdotes.",
    proveIt:
      "Don't just take our word for it. Here's what's happening with companies using ProductMark:\n\n**TechCorp (Series C SaaS, $50M ARR):**\n• Reduced product launch time from 6 months to 3 months\n• Improved sales win rate by 35% with better competitive positioning\n• Product marketing team of 3 now has the impact of a team of 8\n• CMO can show board exactly how PMM contributes to pipeline\n\n**SaaSCo (Enterprise Software, $200M ARR):**\n• Unified messaging across 15 product lines and 3 regions\n• Sales team adoption of battlecards increased from 20% to 85%\n• Competitive win rate improved by 28% in first 6 months\n• Saved $500K by not hiring 2 additional product marketers\n\n**The numbers across our customer base:**\n• 50% faster time-to-market for product launches\n• 30% improvement in sales win rates\n• 10x more efficient competitive intelligence gathering\n• 92% customer retention rate\n• Average 6-month payback period\n\n**Industry recognition:**\n• Named 'Cool Vendor in Marketing Technology' by Gartner\n• 4.8/5 rating on G2 with 150+ reviews\n• Used by product marketing teams at Stripe, Notion, and Figma\n\nThe companies that are winning in competitive markets aren't just working harder—they're working smarter with the right tools and processes. ProductMark is how they do it.",
    createdAt: "2024-01-10T09:00:00Z",
    lastModified: "2024-01-25T14:30:00Z",
    author: "Sarah Johnson",
  },
  {
    id: "pitch-2",
    name: "First PMM Hire Pitch",
    description:
      "Sales narrative for first-time product marketers at early-stage startups who are building the function from scratch.",
    setTheScene:
      "You just got hired as the first product marketer at a fast-growing startup. Congratulations! But now you're staring at a blank page wondering: Where do I even start?\n\nThe founders have strong opinions about positioning, but it's not resonating with customers. The sales team is making up their own messaging. There are no processes, no templates, no frameworks—just a lot of expectations and pressure to show results quickly.\n\nYou're spending nights and weekends Googling 'how to write a positioning statement' and 'product launch checklist.' You're creating everything from scratch, which is slow and stressful. You're not sure if you're doing it right, and there's no one to ask.\n\nYou know product marketing is important, but you're drowning in tactical work and have no time for strategy. You're worried about making mistakes that could hurt the company. And you're feeling the imposter syndrome hard.",
    introduceTheShift:
      "Here's the reality: Product marketing is becoming more important, but also more complex. The bar is higher than ever.\n\nStartups used to wait until Series B to hire their first product marketer. Now they're hiring at Series A or even earlier. Why? Because in crowded markets, you can't just build a great product—you need great positioning, messaging, and go-to-market execution.\n\nBut here's the problem: Most first-time product marketers are set up to fail. They're expected to:\n• Build the entire product marketing function from scratch\n• Create professional positioning and messaging without experience\n• Launch products successfully without templates or guidance\n• Prove their value quickly to justify the hire\n\nAll while learning on the job with no mentorship or support.\n\nThe old way—figuring it out yourself through trial and error—is too slow and risky. You need a faster path to success.",
    nameTheWinningStrategy:
      "The winning strategy is to **learn from the best and accelerate with proven frameworks**.\n\nInstead of reinventing the wheel, you should:\n\n1. **Start with templates, not blank pages.** Use proven frameworks from successful product marketers so you're not guessing.\n\n2. **Follow guided workflows.** Get step-by-step guidance on what to do and when, so you're confident you're on the right track.\n\n3. **Learn from peers.** Connect with other first-time PMMs who are facing the same challenges and can share what's working.\n\n4. **Move fast and iterate.** Ship quickly with 'good enough' and improve based on feedback, rather than trying to make everything perfect.\n\n5. **Show results early.** Focus on high-impact activities that demonstrate value quickly, so you build credibility and buy-in.\n\nThis isn't about becoming an expert overnight. It's about having the right tools, guidance, and support to be successful in your first product marketing role.",
    showTheValue:
      "That's what ProductMark gives you. We're the starter kit for first-time product marketers.\n\n**Here's what you get:**\n\n• **Quick-Start Templates:** Pre-built frameworks for ICP, positioning, messaging house, and launch planning that you can customize in minutes, not days.\n\n• **Guided Workflows:** Step-by-step guidance that teaches you best practices as you work, so you're learning and executing at the same time.\n\n• **AI-Powered Assistance:** AI helps you write positioning statements, generate messaging, and create competitive battlecards so you're not starting from a blank page.\n\n• **Community Support:** Join 2000+ product marketers in our community to ask questions, get feedback, and learn from peers who've been there.\n\n• **Affordable Pricing:** $99/month (not $1000+/month like enterprise tools) because we know startup budgets are tight.\n\n**The result?** You can launch your first product in weeks instead of months. You'll have professional positioning and messaging without hiring an expensive consultant. And you'll have the confidence that you're following best practices, not just making it up as you go.",
    proveIt:
      "Here's what first-time product marketers are saying:\n\n**Fiona, First PMM at Series A Startup:**\n'I was completely overwhelmed when I started. ProductMark gave me the templates and guidance I needed to ship my first launch in 6 weeks. I don't know what I would have done without it.'\n\n**Marcus, Solo PMM at Seed Stage Company:**\n'The community alone is worth it. Being able to ask questions and get feedback from other PMMs who understand what I'm going through has been invaluable. Plus the templates saved me hundreds of hours.'\n\n**The numbers:**\n• 500+ startups using ProductMark\n• 4.9/5 rating from first-time PMMs\n• Average time to first launch: 6 weeks (vs 4-6 months without)\n• 50,000+ free templates downloaded\n• Featured in Product Marketing Alliance newsletter\n\n**Success stories:**\n• Y Combinator companies using ProductMark for their first launches\n• Techstars startups building their PMM function with our frameworks\n• First-time PMMs getting promoted to lead teams after successful launches\n\nYou don't have to figure this out alone. Join hundreds of first-time product marketers who are building successful careers with ProductMark.",
    createdAt: "2024-01-18T11:15:00Z",
    lastModified: "2024-01-22T09:20:00Z",
    author: "Emma Wilson",
  },
]

// Export all mock data
export const mockStrategyFrameworks = {
  icps: mockICPs,
  personas: mockPersonas,
  marketOpportunities: mockMarketOpportunities,
  positioningCanvases: mockPositioningCanvases,
  messagingHouses: mockMessagingHouses,
  salesPitches: mockSalesPitches,
}
