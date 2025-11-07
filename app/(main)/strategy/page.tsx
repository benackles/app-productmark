"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Target, Rocket, Users, MessageSquare } from "lucide-react"
import Link from "next/link"
import { mockGTMFrameworks } from "@/lib/mock-gtm-frameworks"
import { mockStrategyFrameworks } from "@/lib/mock-strategy-frameworks"

type FrameworkCategory = "all" | "target-audience" | "positioning" | "messaging" | "gtm-planning"

export default function StrategyPage() {
  const [selectedCategory, setSelectedCategory] = useState<FrameworkCategory>("all")

  const targetAudienceCount =
    mockStrategyFrameworks.icps.length +
    mockStrategyFrameworks.personas.length +
    mockStrategyFrameworks.marketOpportunities.length
  const positioningCount = mockStrategyFrameworks.positioningCanvases.length
  const messagingCount = mockStrategyFrameworks.messagingHouses.length + mockStrategyFrameworks.salesPitches.length
  const gtmPlanningCount = mockGTMFrameworks.length

  const allFrameworks = useMemo(() => {
    return [
      ...mockStrategyFrameworks.icps.map((f) => ({ ...f, type: "icp" as const, category: "target-audience" as const })),
      ...mockStrategyFrameworks.personas.map((f) => ({
        ...f,
        type: "persona" as const,
        category: "target-audience" as const,
      })),
      ...mockStrategyFrameworks.marketOpportunities.map((f) => ({
        ...f,
        type: "market-opportunity" as const,
        category: "target-audience" as const,
      })),
      ...mockStrategyFrameworks.positioningCanvases.map((f) => ({
        ...f,
        type: "positioning" as const,
        category: "positioning" as const,
      })),
      ...mockStrategyFrameworks.messagingHouses.map((f) => ({
        ...f,
        type: "messaging-house" as const,
        category: "messaging" as const,
      })),
      ...mockStrategyFrameworks.salesPitches.map((f) => ({
        ...f,
        type: "sales-pitch" as const,
        category: "messaging" as const,
      })),
      ...mockGTMFrameworks.map((f) => ({ ...f, category: "gtm-planning" as const })),
    ]
  }, [])

  const filteredFrameworks = useMemo(() => {
    if (selectedCategory === "all") return allFrameworks
    return allFrameworks.filter((f) => f.category === selectedCategory)
  }, [selectedCategory, allFrameworks])

  const getFrameworkTypeLabel = (type: string) => {
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
      case "launch":
        return "Launch"
      case "campaign":
        return "Campaign"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold tracking-tight text-4xl">Strategy</h1>
          <p className="text-muted-foreground">Define and manage your product marketing strategy.</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/strategy/new">
            <Plus className="mr-2 h-4 w-4" />
            New Framework
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <button
          onClick={() => setSelectedCategory("target-audience")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedCategory === "target-audience" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Target Audience</p>
              <p className="text-2xl font-bold">{targetAudienceCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedCategory("positioning")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedCategory === "positioning" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Positioning</p>
              <p className="text-2xl font-bold">{positioningCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
              <Target className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedCategory("messaging")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedCategory === "messaging" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Messaging</p>
              <p className="text-2xl font-bold">{messagingCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <MessageSquare className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedCategory("gtm-planning")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedCategory === "gtm-planning" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">GTM Planning</p>
              <p className="text-2xl font-bold">{gtmPlanningCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <Rocket className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {selectedCategory === "all"
            ? "All Frameworks"
            : selectedCategory === "target-audience"
              ? "Target Audience Frameworks"
              : selectedCategory === "positioning"
                ? "Positioning Frameworks"
                : selectedCategory === "messaging"
                  ? "Messaging Frameworks"
                  : "GTM Planning Frameworks"}
        </h2>
        {filteredFrameworks.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[300px]">
            <div className="flex flex-col items-center gap-1 text-center px-4">
              <h3 className="text-2xl font-bold tracking-tight">No frameworks yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedCategory === "all"
                  ? "Start by creating your first framework."
                  : "No frameworks in this category yet."}
              </p>
              <Button asChild variant="outline" onClick={() => setSelectedCategory("all")}>
                <Link href="/strategy/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Framework
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFrameworks.map((framework) => {
              const hasTasks = "tasks" in framework
              const completedTasks = hasTasks ? framework.tasks.filter((t) => t.status === "done").length : 0
              const totalTasks = hasTasks ? framework.tasks.length : 0
              const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

              return (
                <Link key={framework.id} href={`/strategy/${framework.id}`}>
                  <div className="p-6 rounded-xl border bg-card hover:border-primary transition-colors cursor-pointer h-full">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{framework.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{framework.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {getFrameworkTypeLabel(framework.type)}
                        </Badge>
                      </div>

                      {hasTasks && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">
                              {completedTasks}/{totalTasks} tasks
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(framework.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
