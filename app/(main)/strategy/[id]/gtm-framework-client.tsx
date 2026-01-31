"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Target, TrendingUp, Pencil } from "lucide-react"
import Link from "next/link"
import { KanbanBoard } from "@/components/kanban-board"
import type { GTMFramework } from "@/lib/mock-gtm-frameworks"
import { BackButton } from "@/components/back-button"

interface GTMFrameworkClientProps {
  framework: GTMFramework
}

function GTMFrameworkClient({ framework }: GTMFrameworkClientProps) {
  const completedTasks = framework.tasks.filter((t) => t.status === "done").length
  const completionPercentage = Math.round((completedTasks / framework.tasks.length) * 100)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <BackButton href="/strategy" label="Back to Strategy" />
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{framework.name}</h1>
            <Badge variant="outline">{framework.type === "launch" ? "Launch" : "Campaign"}</Badge>
          </div>
          <p className="text-muted-foreground">
            Manage and track your {framework.type === "launch" ? "launch" : "campaign"} tasks
          </p>
        </div>
        <Link href={`/strategy/${framework.id}/edit`}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Strategy
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
              <p className="text-2xl font-bold">{framework.tasks.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold">
                {completedTasks} <span className="text-sm text-muted-foreground">({completionPercentage}%)</span>
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Kicked off</p>
              <p className="text-2xl font-bold">{formatDate(framework.createdAt)}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
              <p className="text-2xl font-bold">{formatDate(framework.lastModified)}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Task Board</h2>
        <KanbanBoard tasks={framework.tasks} frameworkId={framework.id} />
      </div>
    </div>
  )
}

export default GTMFrameworkClient
