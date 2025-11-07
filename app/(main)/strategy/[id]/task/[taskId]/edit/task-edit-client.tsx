"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronRight, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { GTMFramework, GTMTask } from "@/lib/mock-gtm-frameworks"
import { BackButton } from "@/components/back-button"

interface TaskEditClientProps {
  framework: GTMFramework
  task: GTMTask
}

const statusOptions = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
]

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

export default function TaskEditClient({ framework, task }: TaskEditClientProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: task.name,
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    estimatedHours: task.estimatedHours.toString(),
    dueDate: new Date(task.dueDate).toISOString().split("T")[0],
    tags: task.tags?.join(", ") || "",
    raci: {
      responsible: task.raci?.responsible || "",
      accountable: task.raci?.accountable || "",
      consulted: task.raci?.consulted?.join(", ") || "",
      informed: task.raci?.informed?.join(", ") || "",
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving task:", formData)
    // In a real app, this would save to the backend
    router.push(`/strategy/${framework.id}/task/${task.id}`)
  }

  const handleCancel = () => {
    router.push(`/strategy/${framework.id}/task/${task.id}`)
  }

  return (
    <div className="space-y-6">
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
        <Link href={`/strategy/${framework.id}/task/${task.id}`} className="hover:text-foreground transition-colors">
          Task Details
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Edit</span>
      </div>

      {/* Back Button */}
      <BackButton href={`/strategy/${framework.id}/task/${task.id}`} />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Edit Task</h1>
        <p className="text-muted-foreground mt-2">Update task details and assignments</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update the task name, title, and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Task Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Create landing page mockup"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Task Title*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Design and prototype landing page"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about this task..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Status & Priority */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Priority</CardTitle>
            <CardDescription>Set the current status and priority level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status*</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority*</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Set the due date and estimated hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date*</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours*</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                  placeholder="e.g., 8"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RACI Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>RACI Assignments</CardTitle>
            <CardDescription>Assign roles and responsibilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsible (Person doing the work)</Label>
              <Input
                id="responsible"
                value={formData.raci.responsible}
                onChange={(e) => setFormData({ ...formData, raci: { ...formData.raci, responsible: e.target.value } })}
                placeholder="e.g., John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountable">Accountable (Person who approves)</Label>
              <Input
                id="accountable"
                value={formData.raci.accountable}
                onChange={(e) => setFormData({ ...formData, raci: { ...formData.raci, accountable: e.target.value } })}
                placeholder="e.g., Jane Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consulted">Consulted (Comma-separated)</Label>
              <Input
                id="consulted"
                value={formData.raci.consulted}
                onChange={(e) => setFormData({ ...formData, raci: { ...formData.raci, consulted: e.target.value } })}
                placeholder="e.g., Marketing Team, Design Team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="informed">Informed (Comma-separated)</Label>
              <Input
                id="informed"
                value={formData.raci.informed}
                onChange={(e) => setFormData({ ...formData, raci: { ...formData.raci, informed: e.target.value } })}
                placeholder="e.g., Sales Team, Leadership"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add tags to categorize this task (comma-separated)</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., design, high-priority, customer-facing"
            />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
