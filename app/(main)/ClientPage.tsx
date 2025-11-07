"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  TrendingUp,
  Lightbulb,
  Target,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { mockInsights, type InsightData } from "@/lib/mock-insights"
import { mockGTMFrameworks } from "@/lib/mock-gtm-frameworks"
import { useState } from "react"

const mockUser = {
  role: "Team Lead", // or "Member"
  plan: "Team", // or "Individual"
}

export default function ClientPage() {
  const [view, setView] = useState<"me" | "team">("me")
  const showTeamToggle = mockUser.role === "Team Lead" && mockUser.plan === "Team"

  const recentInsights = mockInsights.slice(0, 3)

  // Calculate insight breakdown
  const customerCount = mockInsights.filter((i) => i.type === "customer").length
  const competitiveCount = mockInsights.filter((i) => i.type === "competitive").length
  const marketCount = mockInsights.filter((i) => i.type === "market").length

  const allTasks = mockGTMFrameworks.flatMap((framework) =>
    framework.tasks
      .filter((task) => task.status !== "done" && task.status !== "backlog")
      .map((task) => ({
        ...task,
        frameworkId: framework.id,
        frameworkName: framework.name,
        frameworkType: framework.type,
      })),
  )
  const upcomingTasks = allTasks.slice(0, 5)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  const getCategoryColor = (type: InsightData["type"]) => {
    switch (type) {
      case "customer":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "competitive":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "market":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (type: InsightData["type"]) => {
    switch (type) {
      case "customer":
        return <Users className="h-5 w-5 text-blue-600" />
      case "competitive":
        return <BarChart3 className="h-5 w-5 text-orange-600" />
      case "market":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getFrameworkTypeBadge = (type: "launch" | "campaign") => {
    return type === "launch"
      ? "bg-purple-100 text-purple-800 border-purple-200"
      : "bg-blue-100 text-blue-800 border-blue-200"
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track your product marketing work.</p>
      </div>

      {showTeamToggle && (
        <div className="flex items-center gap-2 border-b">
          <button
            onClick={() => setView("me")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              view === "me" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Me
            {view === "me" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B8F71]" />}
          </button>
          <button
            onClick={() => setView("team")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              view === "team" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Team
            {view === "team" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B8F71]" />}
          </button>
        </div>
      )}

      {view === "me" ? (
        <>
          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Insights Card */}
            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Insights</CardTitle>
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="font-bold tracking-tight text-3xl">{mockInsights.length}</div>
                    <p className="text-sm text-muted-foreground mt-1.5">Total insights captured</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">{customerCount} Customer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="text-muted-foreground">{competitiveCount} Competitive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">{marketCount} Market</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col xl:flex-row gap-3 xl:gap-2 pt-6">
                  <Button asChild className="w-full xl:flex-1 bg-[#6B8F71] hover:bg-[#5a7860]">
                    <Link href="/insights/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Insight
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full xl:flex-1 bg-transparent">
                    <Link href="/insights">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Strategy Card */}
            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Strategy</CardTitle>
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="font-bold tracking-tight text-3xl">2</div>
                    <p className="text-sm text-muted-foreground mt-1.5">Active frameworks implemented</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="text-muted-foreground">2 In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">0 Complete</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col xl:flex-row gap-3 xl:gap-2 pt-6">
                  <Button asChild className="w-full xl:flex-1 bg-[#6B8F71] hover:bg-[#5a7860]">
                    <Link href="/strategy/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Framework
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full xl:flex-1 bg-transparent">
                    <Link href="/strategy">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enablement Card */}
            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Enablement</CardTitle>
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="font-bold tracking-tight text-3xl">10</div>
                    <p className="text-sm text-muted-foreground mt-1.5">Total assets delivered</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">8 Delivered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400" />
                      <span className="text-muted-foreground">2 Draft</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col xl:flex-row gap-3 xl:gap-2 pt-6">
                  <Button asChild className="w-full xl:flex-1 bg-[#6B8F71] hover:bg-[#5a7860]">
                    <Link href="/enablement/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Asset
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full xl:flex-1 bg-transparent">
                    <Link href="/enablement">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two Column Layout for Tasks and Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold">Upcoming Tasks</CardTitle>
                <Link href="/strategy">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {upcomingTasks.map((task, index) => (
                    <div key={task.id}>
                      <Link
                        href={`/strategy/${task.frameworkId}/task/${task.id}`}
                        className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors my-1"
                      >
                        <div className="py-3 px-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className={`text-xs capitalize ${getFrameworkTypeBadge(task.frameworkType)}`}
                              >
                                {task.frameworkType}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{task.frameworkName}</span>
                            </div>
                            <p className="text-sm font-medium leading-none">{task.name}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span className="text-xs whitespace-nowrap">{task.dueDate || "No due date"}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs px-2 capitalize ${getPriorityColor(task.priority)}`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {index < upcomingTasks.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                <Link href="/insights">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentInsights.map((insight, index) => (
                    <div key={insight.id}>
                      <Link
                        href={`/insights/details/${insight.id}`}
                        className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors my-1"
                      >
                        <div className="flex gap-3 py-3 px-3">
                          <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-muted flex items-center justify-center flex-shrink-0">
                            {getCategoryIcon(insight.type)}
                          </div>
                          <div className="flex-1 space-y-2 min-w-0">
                            <p className="text-sm leading-snug line-clamp-2">{insight.observation}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className={`text-xs capitalize ${getCategoryColor(insight.type)}`}
                              >
                                {insight.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{formatDate(insight.createdAt)}</span>
                              <span className="text-xs text-muted-foreground">by {insight.author}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {index < recentInsights.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <TeamDashboardView />
      )}
    </div>
  )
}

function TeamDashboardView() {
  const teamMetrics = {
    activeInsights: 73,
    insightsGrowth: 12,
    gtmPlans: 5,
    launchingSoon: 2,
    assets: 47,
    inReview: 8,
  }

  const upcomingTasks = [
    {
      id: "1",
      priority: "High",
      framework: "Q1 Enterprise Launch",
      name: "Update pricing page copy",
      category: "Marketing",
      dueDate: "Due in 2 days",
      assignee: { initials: "SJ", color: "bg-green-600" },
    },
    {
      id: "2",
      priority: "Med",
      framework: "Partner Campaign",
      name: "Create co-marketing deck",
      category: "Product Marketing",
      dueDate: "Due in 5 days",
      assignee: { initials: "MK", color: "bg-amber-600" },
    },
    {
      id: "3",
      priority: "Low",
      framework: "Q1 Enterprise Launch",
      name: "Review battle card updates",
      category: "Sales Enablement",
      dueDate: "Due in 1 week",
      assignee: { initials: "AR", color: "bg-orange-600" },
    },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "insight",
      icon: Users,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      title: "New customer insight",
      description: "Enterprise customers need SSO within 48 hours",
      author: "Sarah",
      time: "2h ago",
    },
    {
      id: "2",
      type: "task",
      icon: CheckCircle2,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      title: "Task completed",
      description: "Positioning document finalized",
      author: "Mike",
      time: "4h ago",
    },
    {
      id: "3",
      type: "asset",
      icon: FileText,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      title: "Asset updated",
      description: "Battle card moved to review",
      author: "Alex",
      time: "5h ago",
    },
    {
      id: "4",
      type: "deadline",
      icon: Clock,
      iconColor: "text-gray-600",
      iconBg: "bg-gray-50",
      title: "Deadline approaching",
      description: "Launch blog post due in 2 days",
      author: "System",
      time: "6h ago",
    },
    {
      id: "5",
      type: "competitive",
      icon: AlertCircle,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      title: "Competitive insight",
      description: "Adobe launched new pricing tier",
      author: "Emma",
      time: "1d ago",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-l-red-500"
      case "Med":
        return "border-l-amber-500"
      case "Low":
        return "border-l-blue-500"
      default:
        return "border-l-gray-300"
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Med":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Team Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Active Insights</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamMetrics.activeInsights}</div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />+{teamMetrics.insightsGrowth} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">GTM Plans</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamMetrics.gtmPlans}</div>
            <p className="text-sm text-blue-600 mt-2">{teamMetrics.launchingSoon} launching soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Assets</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamMetrics.assets}</div>
            <p className="text-sm text-amber-600 mt-2">{teamMetrics.inReview} in review</p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className={`border-l-4 ${getPriorityColor(task.priority)} bg-card rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={`text-xs ${getPriorityBadgeColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{task.framework}</span>
                      </div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.category} • {task.dueDate}
                      </p>
                    </div>
                    <div
                      className={`h-10 w-10 rounded-full ${task.assignee.color} flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}
                    >
                      {task.assignee.initials}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      {activity.icon({ className: `h-5 w-5 ${activity.iconColor}` })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.author} • {activity.time}
                      </p>
                    </div>
                  </div>
                  {index < recentActivity.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
