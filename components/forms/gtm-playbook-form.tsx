"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Tag, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function GTMPlaybookForm() {
  const [launchDate, setLaunchDate] = useState<Date>()
  const [messagingPillars, setMessagingPillars] = useState([{ theme: "", benefit: "", feature: "" }])
  const [personas, setPersonas] = useState([{ role: "", painPoints: "", outcomes: "" }])
  const [competitors, setCompetitors] = useState([{ name: "", differentiator: "", whyWin: "", whyLose: "" }])

  const addMessagingPillar = () => {
    setMessagingPillars([...messagingPillars, { theme: "", benefit: "", feature: "" }])
  }

  const removeMessagingPillar = (index: number) => {
    setMessagingPillars(messagingPillars.filter((_, i) => i !== index))
  }

  const addPersona = () => {
    setPersonas([...personas, { role: "", painPoints: "", outcomes: "" }])
  }

  const removePersona = (index: number) => {
    setPersonas(personas.filter((_, i) => i !== index))
  }

  const addCompetitor = () => {
    setCompetitors([...competitors, { name: "", differentiator: "", whyWin: "", whyLose: "" }])
  }

  const removeCompetitor = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* 1. Overview */}
      <Card>
        <CardHeader>
          <CardTitle>1. Overview</CardTitle>
          <CardDescription>Define the product, launch tier, timeline, and success metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product / Feature*</Label>
            <Input id="product" placeholder="e.g., Enterprise AI Assistant" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="launch-tier">Launch Tier*</Label>
              <Select>
                <SelectTrigger id="launch-tier">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tier-1">Tier 1 - Major Launch</SelectItem>
                  <SelectItem value="tier-2">Tier 2 - Standard Launch</SelectItem>
                  <SelectItem value="tier-3">Tier 3 - Minor Update</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Launch Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !launchDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {launchDate ? format(launchDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={launchDate} onSelect={setLaunchDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Owner(s)*</Label>
            <Input id="owner" placeholder="e.g., Product Marketing, Sales Enablement" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal*</Label>
            <Textarea id="goal" placeholder="e.g., Drive adoption, expand use cases, win new ICP" rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="success-metrics">Success Metrics*</Label>
            <Textarea id="success-metrics" placeholder="KPIs, pipeline targets, adoption metrics..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* 2. Positioning & Messaging */}
      <Card>
        <CardHeader>
          <CardTitle>2. Positioning & Messaging</CardTitle>
          <CardDescription>Define your positioning statement, value proposition, and messaging pillars</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="positioning">Positioning Statement*</Label>
            <Textarea
              id="positioning"
              placeholder="For [ICP], who need [problem], our [product] is a [category] that [unique value]. Unlike [alternative], it [differentiator]."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value-prop">Core Narrative / Value Proposition*</Label>
            <Textarea id="value-prop" placeholder="Describe the core value proposition and narrative..." rows={3} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Messaging Pillars</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMessagingPillar}>
                <Plus className="h-4 w-4 mr-1" />
                Add Pillar
              </Button>
            </div>
            {messagingPillars.map((pillar, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6 space-y-3">
                  {messagingPillars.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeMessagingPillar(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Input placeholder="Value Theme" />
                  <Input placeholder="Benefit" />
                  <Input placeholder="Feature / Proof Point" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="elevator-pitch">Elevator Pitch</Label>
            <Textarea id="elevator-pitch" placeholder="30-second pitch..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline / One-Liner</Label>
            <Input id="tagline" placeholder="Memorable one-line description" />
          </div>
        </CardContent>
      </Card>

      {/* 3. Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle>3. Target Audience</CardTitle>
          <CardDescription>Define your ICP, personas, use cases, and buying triggers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="icp">ICP (Ideal Customer Profile)*</Label>
            <Textarea id="icp" placeholder="Describe your ideal customer profile..." rows={3} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Primary Personas</Label>
              <Button type="button" variant="outline" size="sm" onClick={addPersona}>
                <Plus className="h-4 w-4 mr-1" />
                Add Persona
              </Button>
            </div>
            {personas.map((persona, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6 space-y-3">
                  {personas.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removePersona(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Input placeholder="Role / Title" />
                  <Textarea placeholder="Key Pain Points" rows={2} />
                  <Textarea placeholder="Desired Outcomes" rows={2} />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="use-cases">Use Cases*</Label>
            <Textarea id="use-cases" placeholder="List 3-5 primary use cases..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buying-triggers">Buying Triggers / Objections</Label>
            <Textarea
              id="buying-triggers"
              placeholder="What triggers a purchase? What objections might arise?"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 4. Competitive Landscape */}
      <Card>
        <CardHeader>
          <CardTitle>4. Competitive Landscape</CardTitle>
          <CardDescription>Analyze competitors, differentiators, and objection handling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Primary Competitors</Label>
              <Button type="button" variant="outline" size="sm" onClick={addCompetitor}>
                <Plus className="h-4 w-4 mr-1" />
                Add Competitor
              </Button>
            </div>
            {competitors.map((competitor, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6 space-y-3">
                  {competitors.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeCompetitor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Input placeholder="Competitor Name" />
                  <Textarea placeholder="Key Differentiator" rows={2} />
                  <Textarea placeholder="Why We Win" rows={2} />
                  <Textarea placeholder="Why We Lose" rows={2} />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="objection-handling">Objection Handling</Label>
            <Textarea
              id="objection-handling"
              placeholder="Objection → Reframe → Proof Point (list common objections and responses)"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="win-loss">Win / Loss Insights</Label>
            <Textarea id="win-loss" placeholder="Top themes or quotes from win/loss analysis..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* 5. Pricing & Packaging */}
      <Card>
        <CardHeader>
          <CardTitle>5. Pricing & Packaging</CardTitle>
          <CardDescription>Define product SKUs, pricing model, and key messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skus">Product SKUs / Plans*</Label>
            <Textarea id="skus" placeholder="List available plans or SKUs..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricing-model">Pricing Model*</Label>
            <Select>
              <SelectTrigger id="pricing-model">
                <SelectValue placeholder="Select pricing model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="usage-based">Usage-Based</SelectItem>
                <SelectItem value="freemium">Freemium</SelectItem>
                <SelectItem value="one-time">One-Time Purchase</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricing-messages">Key Pricing Messages</Label>
            <Textarea id="pricing-messages" placeholder="How to position pricing and value..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricing-faqs">Pricing FAQs</Label>
            <Textarea id="pricing-faqs" placeholder="Common pricing questions and answers..." rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* 6. Launch & Campaign Plan */}
      <Card>
        <CardHeader>
          <CardTitle>6. Launch & Campaign Plan</CardTitle>
          <CardDescription>Outline launch strategy, channels, timeline, and KPIs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="launch-objective">Launch Objective*</Label>
            <Textarea id="launch-objective" placeholder="What is the primary objective of this launch?" rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="core-message">Core Message*</Label>
            <Textarea id="core-message" placeholder="The main message for this launch..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="channels">Channel Plan</Label>
            <Textarea
              id="channels"
              placeholder="List channels and tactics (Web, Email, Sales, PR, Events, etc.)"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline / Milestones</Label>
            <Textarea id="timeline" placeholder="Key dates and milestones..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="launch-kpis">Launch KPIs</Label>
            <Textarea id="launch-kpis" placeholder="Adoption, ARR, MQLs, NPS, etc." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* 7. Sales & Enablement */}
      <Card>
        <CardHeader>
          <CardTitle>7. Sales & Enablement</CardTitle>
          <CardDescription>Provide discovery questions, demo scripts, and sales assets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discovery">Discovery Questions</Label>
            <Textarea id="discovery" placeholder="Key questions for sales discovery calls..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-script">Demo Script / Flow</Label>
            <Textarea id="demo-script" placeholder="Outline the demo flow and key talking points..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sales-objections">Sales Objection Handling</Label>
            <Textarea id="sales-objections" placeholder="Common objections and how to handle them..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof-points">Proof Points / ROI Stories</Label>
            <Textarea id="proof-points" placeholder="Customer success stories, ROI data, case studies..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sales-assets">Sales Assets</Label>
            <Textarea
              id="sales-assets"
              placeholder="List available assets: Pitch Deck, One-Pager, Email Templates, Battlecard, FAQ Sheet..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* 8. Customer Success & Adoption */}
      <Card>
        <CardHeader>
          <CardTitle>8. Customer Success & Adoption</CardTitle>
          <CardDescription>Define activation, success metrics, and upsell plays</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activation">Activation Checklist</Label>
            <Textarea id="activation" placeholder="Steps for customer activation and onboarding..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cs-metrics">Success Metrics</Label>
            <Textarea id="cs-metrics" placeholder="How do we measure customer success?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="onboarding">Onboarding Resources</Label>
            <Textarea id="onboarding" placeholder="List onboarding materials and resources..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upsell">Upsell / Cross-sell Plays</Label>
            <Textarea id="upsell" placeholder="Opportunities for expansion and upsell..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* 9. Resources & Links */}
      <Card>
        <CardHeader>
          <CardTitle>9. Resources & Links</CardTitle>
          <CardDescription>Link to supporting documents and resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="strategy-deck">Strategy Deck</Label>
            <Input id="strategy-deck" type="url" placeholder="Link to strategy deck..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="messaging-doc">Messaging Document</Label>
            <Input id="messaging-doc" type="url" placeholder="Link to messaging doc..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="launch-calendar">Launch Calendar</Label>
            <Input id="launch-calendar" type="url" placeholder="Link to launch calendar..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sales-folder">Sales Assets Folder</Label>
            <Input id="sales-folder" type="url" placeholder="Link to sales assets..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="analytics">Analytics Dashboard</Label>
            <Input id="analytics" type="url" placeholder="Link to analytics dashboard..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Tag className="h-4 w-4 mt-2.5 text-muted-foreground" />
              <Input id="tags" placeholder="Add tags (comma separated)" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Save as Draft</Button>
        <Button>Create GTM Playbook</Button>
      </div>
    </div>
  )
}
