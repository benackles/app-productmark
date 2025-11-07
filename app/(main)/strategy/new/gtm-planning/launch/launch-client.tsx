"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import Link from "next/link"

interface LaunchPhase {
  id: string
  name: string
  timeline: string
  objectives: string
  tactics: string
  deliverables: string
}

export default function LaunchClient() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [launchDate, setLaunchDate] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [successMetrics, setSuccessMetrics] = useState("")
  const [phases, setPhases] = useState<LaunchPhase[]>([
    {
      id: "1",
      name: "Pre-Launch",
      timeline: "",
      objectives: "",
      tactics: "",
      deliverables: "",
    },
  ])

  const addPhase = () => {
    const newPhase: LaunchPhase = {
      id: Date.now().toString(),
      name: "",
      timeline: "",
      objectives: "",
      tactics: "",
      deliverables: "",
    }
    setPhases([...phases, newPhase])
  }

  const removePhase = (id: string) => {
    if (phases.length > 1) {
      setPhases(phases.filter((phase) => phase.id !== id))
    }
  }

  const updatePhase = (id: string, field: keyof LaunchPhase, value: string) => {
    setPhases(phases.map((phase) => (phase.id === id ? { ...phase, [field]: value } : phase)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement save functionality
    console.log("Tiered Launch Framework:", {
      name,
      description,
      launchDate,
      targetAudience,
      successMetrics,
      phases,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-24">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tiered Launch Framework</h1>
        <p className="text-muted-foreground">Plan and execute a product launch</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Define the core details of your product launch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Launch Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Enterprise Platform v2.0 Launch"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of what you're launching and why"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="launchDate">Target Launch Date</Label>
            <Input id="launchDate" type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Textarea
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Who is this launch targeting? Include specific segments, personas, or customer types"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="successMetrics">Success Metrics</Label>
            <Textarea
              id="successMetrics"
              value={successMetrics}
              onChange={(e) => setSuccessMetrics(e.target.value)}
              placeholder="How will you measure launch success? Include specific KPIs and targets"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Launch Phases</h2>
            <p className="text-sm text-muted-foreground">
              Break down your launch into phases with clear objectives and tactics
            </p>
          </div>
          <Button type="button" onClick={addPhase} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Phase
          </Button>
        </div>

        {phases.map((phase, index) => (
          <Card key={phase.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Phase {index + 1}</CardTitle>
                {phases.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removePhase(phase.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`phase-name-${phase.id}`}>Phase Name *</Label>
                <Input
                  id={`phase-name-${phase.id}`}
                  value={phase.name}
                  onChange={(e) => updatePhase(phase.id, "name", e.target.value)}
                  placeholder="e.g., Pre-Launch, Launch Day, Post-Launch"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phase-timeline-${phase.id}`}>Timeline</Label>
                <Input
                  id={`phase-timeline-${phase.id}`}
                  value={phase.timeline}
                  onChange={(e) => updatePhase(phase.id, "timeline", e.target.value)}
                  placeholder="e.g., 4 weeks before launch, Launch week, Weeks 1-4 post-launch"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phase-objectives-${phase.id}`}>Objectives</Label>
                <Textarea
                  id={`phase-objectives-${phase.id}`}
                  value={phase.objectives}
                  onChange={(e) => updatePhase(phase.id, "objectives", e.target.value)}
                  placeholder="What are you trying to achieve in this phase?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phase-tactics-${phase.id}`}>Key Tactics</Label>
                <Textarea
                  id={`phase-tactics-${phase.id}`}
                  value={phase.tactics}
                  onChange={(e) => updatePhase(phase.id, "tactics", e.target.value)}
                  placeholder="What specific activities and channels will you use?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phase-deliverables-${phase.id}`}>Deliverables</Label>
                <Textarea
                  id={`phase-deliverables-${phase.id}`}
                  value={phase.deliverables}
                  onChange={(e) => updatePhase(phase.id, "deliverables", e.target.value)}
                  placeholder="What assets, content, or outputs need to be created?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 z-10">
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" asChild>
            <Link href="/strategy/new/gtm-planning">Cancel</Link>
          </Button>
          <Button type="submit">Create Framework</Button>
        </div>
      </div>
    </form>
  )
}
