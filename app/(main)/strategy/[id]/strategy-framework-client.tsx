"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Pencil, Users, Target, MessageSquare, TrendingUp, Crosshair, Home } from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/back-button"
import type {
  ICPData,
  PersonaData,
  MarketOpportunityData,
  PositioningCanvasData,
  MessagingHouseData,
  SalesPitchData,
} from "@/lib/mock-strategy-frameworks"

type FrameworkType = "icp" | "persona" | "market-opportunity" | "positioning" | "messaging-house" | "sales-pitch"

type FrameworkData =
  | (ICPData & { type: "icp" })
  | (PersonaData & { type: "persona" })
  | (MarketOpportunityData & { type: "market-opportunity" })
  | (PositioningCanvasData & { type: "positioning" })
  | (MessagingHouseData & { type: "messaging-house" })
  | (SalesPitchData & { type: "sales-pitch" })

interface StrategyFrameworkClientProps {
  framework: FrameworkData
}

function StrategyFrameworkClient({ framework }: StrategyFrameworkClientProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getFrameworkIcon = (type: FrameworkType) => {
    switch (type) {
      case "icp":
        return <Target className="h-5 w-5" />
      case "persona":
        return <Users className="h-5 w-5" />
      case "market-opportunity":
        return <TrendingUp className="h-5 w-5" />
      case "positioning":
        return <Crosshair className="h-5 w-5" />
      case "messaging-house":
        return <Home className="h-5 w-5" />
      case "sales-pitch":
        return <MessageSquare className="h-5 w-5" />
    }
  }

  const getFrameworkLabel = (type: FrameworkType) => {
    switch (type) {
      case "icp":
        return "ICP"
      case "persona":
        return "Persona"
      case "market-opportunity":
        return "Market Opportunity"
      case "positioning":
        return "Positioning Canvas"
      case "messaging-house":
        return "Campaign Messaging House"
      case "sales-pitch":
        return "Sales Pitch"
    }
  }

  const renderFrameworkContent = () => {
    switch (framework.type) {
      case "icp":
        return <ICPContent framework={framework} />
      case "persona":
        return <PersonaContent framework={framework} />
      case "market-opportunity":
        return <MarketOpportunityContent framework={framework} />
      case "positioning":
        return <PositioningContent framework={framework} />
      case "messaging-house":
        return <MessagingHouseContent framework={framework} />
      case "sales-pitch":
        return <SalesPitchContent framework={framework} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <BackButton href="/strategy" label="Back to Strategy" />
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{framework.name}</h1>
            <Badge variant="outline" className="flex items-center gap-1">
              {getFrameworkIcon(framework.type)}
              {getFrameworkLabel(framework.type)}
            </Badge>
          </div>
          <p className="text-muted-foreground">{framework.description}</p>
        </div>
        <Link href={`/strategy/${framework.id}/edit`}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Framework
          </Button>
        </Link>
      </div>

      {/* Metadata */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created by</p>
              <p className="font-medium">{framework.author}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="font-medium">{formatDate(framework.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Modified</p>
              <p className="font-medium">{formatDate(framework.lastModified)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Content */}
      {renderFrameworkContent()}
    </div>
  )
}

// ICP Content Component
function ICPContent({ framework }: { framework: ICPData & { type: "icp" } }) {
  return (
    <div className="space-y-6">
      <ContentSection title="Company Profile">
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard label="Company Size" value={framework.companySize} />
          <InfoCard label="Revenue" value={framework.revenue} />
          <InfoCard label="Geography" value={framework.geography} />
          <InfoCard label="Maturity Stage" value={framework.maturity} />
        </div>
        <InfoCard label="Industries" value={framework.industries} />
        <InfoCard label="Business Model" value={framework.businessModel} />
        <InfoCard label="Tech Stack" value={framework.techStack} />
      </ContentSection>

      <ContentSection title="Pain Points & Needs">
        <InfoCard label="Pain Points" value={framework.painPoints} multiline />
        <InfoCard label="Needs" value={framework.needs} multiline />
      </ContentSection>

      <ContentSection title="Disqualifiers">
        <InfoCard label="Disqualifiers" value={framework.disqualifiers} multiline />
      </ContentSection>
    </div>
  )
}

// Persona Content Component
function PersonaContent({ framework }: { framework: PersonaData & { type: "persona" } }) {
  return (
    <div className="space-y-6">
      <ContentSection title="Role & Responsibilities">
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard label="Job Title" value={framework.jobTitle} />
          <InfoCard label="Department" value={framework.department} />
          <InfoCard label="Seniority" value={framework.seniority} />
        </div>
        <InfoCard label="Responsibilities" value={framework.responsibilities} multiline />
      </ContentSection>

      <ContentSection title="Goals & Challenges">
        <InfoCard label="Business Goals" value={framework.businessGoals} multiline />
        <InfoCard label="Personal Goals" value={framework.personalGoals} multiline />
        <InfoCard label="Challenges" value={framework.challenges} multiline />
        <InfoCard label="Pain Points" value={framework.painPoints} multiline />
      </ContentSection>

      <ContentSection title="Buying Behavior">
        <InfoCard label="Decision Criteria" value={framework.decisionCriteria} multiline />
        <InfoCard label="Buying Role" value={framework.buyingRole} />
        <InfoCard label="Objections" value={framework.objections} multiline />
        <InfoCard label="Communication Preferences" value={framework.communicationPreferences} multiline />
      </ContentSection>
    </div>
  )
}

// Market Opportunity Content Component
function MarketOpportunityContent({
  framework,
}: { framework: MarketOpportunityData & { type: "market-opportunity" } }) {
  return (
    <div className="space-y-6">
      <ContentSection title="TAM (Total Addressable Market)">
        <InfoCard label="Total Customers" value={framework.tam.totalCustomers} />
        <InfoCard label="Average Revenue per Customer" value={framework.tam.avgRevenue} />
        <InfoCard label="Total Revenue Opportunity" value={framework.tam.totalRevenue} />
        <InfoCard label="Growth Rate" value={framework.tam.growthRate} />
        <InfoCard label="Sources" value={framework.tam.sources} multiline />
      </ContentSection>

      <ContentSection title="SAM (Serviceable Addressable Market)">
        <InfoCard label="Target Segments" value={framework.sam.segments} multiline />
        <InfoCard label="Market Portion" value={framework.sam.marketPortion} />
        <InfoCard label="ICP Customers" value={framework.sam.icpCustomers} />
        <InfoCard label="Revenue Opportunity" value={framework.sam.revenueOpportunity} />
        <InfoCard label="Barriers to Entry" value={framework.sam.barriers} multiline />
      </ContentSection>

      <ContentSection title="SOM (Serviceable Obtainable Market)">
        <InfoCard label="Target Market Share" value={framework.som.marketShare} />
        <InfoCard label="Customers (Year 1-3)" value={framework.som.customersYear1} />
        <InfoCard label="Revenue Target" value={framework.som.revenue} />
        <InfoCard label="Constraints" value={framework.som.constraints} multiline />
        <InfoCard label="Assumptions" value={framework.som.assumptions} multiline />
      </ContentSection>
    </div>
  )
}

// Positioning Content Component
function PositioningContent({ framework }: { framework: PositioningCanvasData & { type: "positioning" } }) {
  return (
    <div className="space-y-6">
      <ContentSection title="Market Context">
        <InfoCard label="Target Market" value={framework.targetMarket} multiline />
        <InfoCard label="Market Category" value={framework.marketCategory} multiline />
        <InfoCard label="Relevant Trends" value={framework.relevantTrends} multiline />
      </ContentSection>

      <ContentSection title="Competitive Positioning">
        <InfoCard label="Competitive Alternatives" value={framework.competitiveAlternatives} multiline />
        <InfoCard label="Unique Attributes" value={framework.uniqueAttributes} multiline />
      </ContentSection>

      <ContentSection title="Value Proposition">
        <InfoCard label="Value & Benefits" value={framework.value} multiline />
        <InfoCard label="Proof Points" value={framework.proof} multiline />
      </ContentSection>
    </div>
  )
}

// Messaging House Content Component
function MessagingHouseContent({ framework }: { framework: MessagingHouseData & { type: "messaging-house" } }) {
  return (
    <div className="space-y-6">
      <ContentSection title="Overarching Message">
        <InfoCard label="Core Message" value={framework.overarchingMessage} multiline />
      </ContentSection>

      <ContentSection title="Message Pillars">
        {framework.pillars.map((pillar, index) => (
          <div key={pillar.id} className="p-6 rounded-xl border bg-card space-y-4">
            <h4 className="font-semibold text-lg">Pillar {index + 1}</h4>
            <InfoCard label="Value Statement" value={pillar.value} />
            <InfoCard label="Benefit" value={pillar.benefit} multiline />
            <InfoCard label="Supporting Feature" value={pillar.feature} multiline />
          </div>
        ))}
      </ContentSection>
    </div>
  )
}

// Sales Pitch Content Component
function SalesPitchContent({ framework }: { framework: SalesPitchData & { type: "sales-pitch" } }) {
  return (
    <div className="space-y-6">
      <ContentSection title="1. Set the Scene">
        <InfoCard label="Current State & Problem" value={framework.setTheScene} multiline />
      </ContentSection>

      <ContentSection title="2. Introduce the Shift">
        <InfoCard label="Market Change & Urgency" value={framework.introduceTheShift} multiline />
      </ContentSection>

      <ContentSection title="3. Name the Winning Strategy">
        <InfoCard label="Strategic Approach" value={framework.nameTheWinningStrategy} multiline />
      </ContentSection>

      <ContentSection title="4. Show the Value">
        <InfoCard label="Solution & Benefits" value={framework.showTheValue} multiline />
      </ContentSection>

      <ContentSection title="5. Prove It">
        <InfoCard label="Evidence & Social Proof" value={framework.proveIt} multiline />
      </ContentSection>
    </div>
  )
}

// Helper Components
function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight border-b pb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function InfoCard({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  // Format bullet points and line breaks for better readability
  const formatValue = (text: string) => {
    if (!multiline) return text

    // Split by newlines and format as list items if they start with bullet points or dashes
    const lines = text.split("\n").filter((line) => line.trim())
    const hasBullets = lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))

    if (hasBullets) {
      return (
        <ul className="space-y-2 list-none">
          {lines.map((line, index) => {
            const cleanLine = line.trim().replace(/^[-•]\s*/, "")
            return cleanLine ? (
              <li key={index} className="flex gap-2 leading-relaxed">
                <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                <span>{cleanLine}</span>
              </li>
            ) : null
          })}
        </ul>
      )
    }

    // Otherwise, render as paragraphs
    return lines.map((line, index) =>
      line.trim() ? (
        <p key={index} className="leading-relaxed">
          {line.trim()}
        </p>
      ) : null,
    )
  }

  return (
    <div className="p-6 rounded-lg border bg-card hover:shadow-sm transition-shadow">
      <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">{label}</p>
      <div className="text-sm text-foreground">
        {multiline ? formatValue(value) : <p className="leading-relaxed">{value}</p>}
      </div>
    </div>
  )
}

export default StrategyFrameworkClient
