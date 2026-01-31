"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, ChevronLeft, ChevronRight, Flag, Info, Edit2, Check, X, Plus, Pencil } from "lucide-react"
import Link from "next/link"
import type { GTMFramework, GTMTask } from "@/lib/mock-gtm-frameworks"
import { BackButton } from "@/components/back-button"

interface TaskDetailClientProps {
  framework: GTMFramework
  task: GTMTask
}

const statusOrder = ["backlog", "todo", "in-progress", "review", "done"] as const
const statusLabels = {
  backlog: "Backlog",
  todo: "To Do",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
}

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/30 dark:text-red-400",
  medium: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700",
  low: "bg-primary/10 text-primary border-primary/30 dark:text-blue-400",
}

export default function TaskDetailClient({ framework, task }: TaskDetailClientProps) {
  const [notes, setNotes] = useState("")
  const [isEditingRaci, setIsEditingRaci] = useState(false)
  const [editedRaci, setEditedRaci] = useState({
    responsible: task.raci?.responsible || "",
    accountable: task.raci?.accountable || "",
    consulted: task.raci?.consulted || [],
    informed: task.raci?.informed || [],
  })
  const [consultedInput, setConsultedInput] = useState("")
  const [informedInput, setInformedInput] = useState("")

  const currentStatusIndex = statusOrder.indexOf(task.status)
  const canMovePrevious = currentStatusIndex > 0
  const canMoveNext = currentStatusIndex < statusOrder.length - 1

  const handleStatusChange = (direction: "previous" | "next") => {
    const newIndex = direction === "previous" ? currentStatusIndex - 1 : currentStatusIndex + 1
    const newStatus = statusOrder[newIndex]
    console.log(`Moving task to ${newStatus}`)
  }

  const handleSaveRaci = () => {
    console.log("Saving RACI:", editedRaci)
    setIsEditingRaci(false)
  }

  const handleCancelRaci = () => {
    setEditedRaci({
      responsible: task.raci?.responsible || "",
      accountable: task.raci?.accountable || "",
      consulted: task.raci?.consulted || [],
      informed: task.raci?.informed || [],
    })
    setIsEditingRaci(false)
  }

  const addConsulted = () => {
    if (consultedInput.trim() && !editedRaci.consulted.includes(consultedInput.trim())) {
      setEditedRaci({
        ...editedRaci,
        consulted: [...editedRaci.consulted, consultedInput.trim()],
      })
      setConsultedInput("")
    }
  }

  const removeConsulted = (item: string) => {
    setEditedRaci({
      ...editedRaci,
      consulted: editedRaci.consulted.filter((c) => c !== item),
    })
  }

  const addInformed = () => {
    if (informedInput.trim() && !editedRaci.informed.includes(informedInput.trim())) {
      setEditedRaci({
        ...editedRaci,
        informed: [...editedRaci.informed, informedInput.trim()],
      })
      setInformedInput("")
    }
  }

  const removeInformed = (item: string) => {
    setEditedRaci({
      ...editedRaci,
      informed: editedRaci.informed.filter((i) => i !== item),
    })
  }

  const displayRaci = isEditingRaci ? editedRaci : task.raci

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <BackButton href={`/strategy/${framework.id}`} label="Back to Task Board" />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/strategy" className="hover:text-foreground transition-colors">
          Strategy
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/strategy/${framework.id}`} className="hover:text-foreground transition-colors">
          {framework.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{task.name}</span>
      </div>

      {/* Edit Button */}
      <div className="flex items-center justify-end">
        <Button variant="default" asChild>
          <Link href={`/strategy/${framework.id}/task/${task.id}/edit`}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Task
          </Link>
        </Button>
      </div>

      {/* Task Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight">{task.name}</h1>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{task.description}</p>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Add notes or updates about this task..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <Button size="sm">Save Notes</Button>
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!canMovePrevious}
                  onClick={() => handleStatusChange("previous")}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {canMovePrevious && statusLabels[statusOrder[currentStatusIndex - 1]]}
                </Button>
                <div className="flex-1 text-center">
                  <Badge variant="secondary" className="text-sm px-4 py-1">
                    {statusLabels[task.status]}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" disabled={!canMoveNext} onClick={() => handleStatusChange("next")}>
                  {canMoveNext && statusLabels[statusOrder[currentStatusIndex + 1]]}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-sm">
                <Flag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Priority:</span>
                <Badge variant="outline" className={`${priorityColors[task.priority]} capitalize`}>
                  {task.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Roles & Responsibilities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Roles & Responsibilities</CardTitle>
              {!isEditingRaci ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingRaci(true)}>
                  <Edit2 className="h-3 w-3" />
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={handleSaveRaci}>
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCancelRaci}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <TooltipProvider>
                {/* Responsible */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-32">Responsible</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">The person doing the work</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {isEditingRaci ? (
                    <Input
                      value={editedRaci.responsible}
                      onChange={(e) => setEditedRaci({ ...editedRaci, responsible: e.target.value })}
                      placeholder="Enter name"
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{displayRaci?.responsible || "Not assigned"}</p>
                  )}
                </div>

                <Separator />

                {/* Accountable */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-32">Accountable</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">The person who approves</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {isEditingRaci ? (
                    <Input
                      value={editedRaci.accountable}
                      onChange={(e) => setEditedRaci({ ...editedRaci, accountable: e.target.value })}
                      placeholder="Enter name"
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{displayRaci?.accountable || "Not assigned"}</p>
                  )}
                </div>

                <Separator />

                {/* Consulted */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-32">Consulted</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Teams/people providing input</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {isEditingRaci && (
                    <div className="flex gap-2">
                      <Input
                        value={consultedInput}
                        onChange={(e) => setConsultedInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addConsulted()
                          }
                        }}
                        placeholder="Add team/person"
                        className="text-sm"
                      />
                      <Button size="sm" variant="outline" onClick={addConsulted}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {displayRaci?.consulted && displayRaci.consulted.length > 0 ? (
                      displayRaci.consulted.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                          {isEditingRaci && (
                            <button onClick={() => removeConsulted(item)} className="ml-1 hover:text-destructive">
                              <X className="h-2.5 w-2.5" />
                            </button>
                          )}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Informed */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-32">Informed</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">People who need updates</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {isEditingRaci && (
                    <div className="flex gap-2">
                      <Input
                        value={informedInput}
                        onChange={(e) => setInformedInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addInformed()
                          }
                        }}
                        placeholder="Add team/person"
                        className="text-sm"
                      />
                      <Button size="sm" variant="outline" onClick={addInformed}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {displayRaci?.informed && displayRaci.informed.length > 0 ? (
                      displayRaci.informed.map((item) => (
                        <Badge key={item} variant="outline" className="text-xs">
                          {item}
                          {isEditingRaci && (
                            <button onClick={() => removeInformed(item)} className="ml-1 hover:text-destructive">
                              <X className="h-2.5 w-2.5" />
                            </button>
                          )}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </div>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
