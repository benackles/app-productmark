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

interface CampaignTactic {
  id: string
  channel: string
  description: string
  timeline: string
  budget: string
  owner: string
}

export default function CampaignClient() {
  const [name, setName] = useState("")
  const [objective, setObjective] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState("")
  const [keyMessage, setKeyMessage] = useState("")
  const [successMetrics, setSuccessMetrics] = useState("")
  const [tactics, setTactics] = useState<CampaignTactic[]>([
    {
      id: "1",
      channel: "",
      description: "",
      timeline: "",
      budget: "",
      owner: "",
    },
  ])

  const addTactic = () => {
    const newTactic: CampaignTactic = {
      id: Date.now().toString(),
      channel: "",
      description: "",
      timeline: "",
      budget: "",
      owner: "",
    }
    setTactics([...tactics, newTactic])
  }

  const removeTactic = (id: string) => {
    if (tactics.length > 1) {
      setTactics(tactics.filter((tactic) => tactic.id !== id))
    }
  }

  const updateTactic = (id: string, field: keyof CampaignTactic, value: string) => {
    setTactics(tactics.map((tactic) => (tactic.id === id ? { ...tactic, [field]: value } : tactic)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement save functionality
    console.log("Campaign Framework:", {
      name,
      objective,
      targetAudience,
      startDate,
      endDate,
      budget,
      keyMessage,
      successMetrics,
      tactics,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-24">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campaign Framework</h1>
        <p className="text-muted-foreground">Plan and execute a marketing campaign</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Define the core details of your marketing campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Q1 Enterprise Demand Gen Campaign"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Campaign Objective</Label>
            <Textarea
              id="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="What is the primary goal of this campaign? What do you want to achieve?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Textarea
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Who is this campaign targeting? Include specific segments, personas, or customer types"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Total Budget</Label>
            <Input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g., $50,000" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyMessage">Key Message</Label>
            <Textarea
              id="keyMessage"
              value={keyMessage}
              onChange={(e) => setKeyMessage(e.target.value)}
              placeholder="What's the core message or value proposition for this campaign?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="successMetrics">Success Metrics</Label>
            <Textarea
              id="successMetrics"
              value={successMetrics}
              onChange={(e) => setSuccessMetrics(e.target.value)}
              placeholder="How will you measure campaign success? Include specific KPIs and targets"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Campaign Tactics</h2>
            <p className="text-sm text-muted-foreground">
              Define the specific channels and activities for this campaign
            </p>
          </div>
          <Button type="button" onClick={addTactic} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Tactic
          </Button>
        </div>

        {tactics.map((tactic, index) => (
          <Card key={tactic.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Tactic {index + 1}</CardTitle>
                {tactics.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeTactic(tactic.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`tactic-channel-${tactic.id}`}>Channel *</Label>
                <Input
                  id={`tactic-channel-${tactic.id}`}
                  value={tactic.channel}
                  onChange={(e) => updateTactic(tactic.id, "channel", e.target.value)}
                  placeholder="e.g., LinkedIn Ads, Email, Webinar, Content Marketing"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`tactic-description-${tactic.id}`}>Description</Label>
                <Textarea
                  id={`tactic-description-${tactic.id}`}
                  value={tactic.description}
                  onChange={(e) => updateTactic(tactic.id, "description", e.target.value)}
                  placeholder="What specific activities will you do in this channel?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`tactic-timeline-${tactic.id}`}>Timeline</Label>
                <Input
                  id={`tactic-timeline-${tactic.id}`}
                  value={tactic.timeline}
                  onChange={(e) => updateTactic(tactic.id, "timeline", e.target.value)}
                  placeholder="e.g., Week 1-2, Ongoing throughout campaign"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`tactic-budget-${tactic.id}`}>Budget Allocation</Label>
                <Input
                  id={`tactic-budget-${tactic.id}`}
                  value={tactic.budget}
                  onChange={(e) => updateTactic(tactic.id, "budget", e.target.value)}
                  placeholder="e.g., $10,000 or 20% of total budget"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`tactic-owner-${tactic.id}`}>Owner</Label>
                <Input
                  id={`tactic-owner-${tactic.id}`}
                  value={tactic.owner}
                  onChange={(e) => updateTactic(tactic.id, "owner", e.target.value)}
                  placeholder="Who is responsible for executing this tactic?"
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
