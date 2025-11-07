"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, TrendingUp, Target, Plus, Sparkles, LinkIcon, FileText, StickyNote } from "lucide-react"
import { BackButton } from "@/components/back-button"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

type InsightType = "customer" | "competitive" | "market"
type DataSourceType = "link" | "file" | "note"

const insightTypes = [
  {
    id: "customer" as InsightType,
    label: "Customer",
    description: "Customer behaviors, needs, and feedback",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "competitive" as InsightType,
    label: "Competitive",
    description: "Competitor moves and market positioning",
    icon: TrendingUp,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    id: "market" as InsightType,
    label: "Market",
    description: "Industry trends and market dynamics",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    borderColor: "border-green-200 dark:border-green-800",
  },
]

interface Competitor {
  name: string
  website?: string
}

export default function NewInsightClient() {
  const router = useRouter()
  const [insightType, setInsightType] = useState<InsightType>("customer")
  const [dataSourceType, setDataSourceType] = useState<DataSourceType>("link")
  const [jobsExpanded, setJobsExpanded] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { name: "Status Quo" },
    { name: "Competitor A", website: "https://competitora.com" },
    { name: "Competitor B", website: "https://competitorb.com" },
  ])
  const [selectedCompetitor, setSelectedCompetitor] = useState("")
  const [newCompetitorName, setNewCompetitorName] = useState("")
  const [newCompetitorWebsite, setNewCompetitorWebsite] = useState("")
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddCompetitor = () => {
    if (newCompetitorName.trim() && !competitors.some((c) => c.name === newCompetitorName.trim())) {
      const newCompetitor: Competitor = {
        name: newCompetitorName.trim(),
      }
      if (newCompetitorWebsite.trim()) {
        newCompetitor.website = newCompetitorWebsite.trim()
      }
      setCompetitors([...competitors, newCompetitor])
      setSelectedCompetitor(newCompetitorName.trim().toLowerCase().replace(/\s+/g, "-"))
      setNewCompetitorName("")
      setNewCompetitorWebsite("")
      setIsAddingCompetitor(false)
    }
  }

  const handleCancelAddCompetitor = () => {
    setIsAddingCompetitor(false)
    setNewCompetitorName("")
    setNewCompetitorWebsite("")
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton href="/insights" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Insight</h1>
          <p className="text-sm text-muted-foreground">
            Capture and save a new market, customer, or competitor finding.
          </p>
        </div>
      </div>

      {/* Required Information */}
      <Card>
        <CardHeader>
          <CardTitle>Required Information</CardTitle>
          <CardDescription>These fields help structure your insight</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Insight Type */}
          <div className="space-y-3">
            <Label>Insight Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {insightTypes.map((type) => {
                const Icon = type.icon
                const isSelected = insightType === type.id
                return (
                  <button
                    key={type.id}
                    onClick={() => setInsightType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                      isSelected
                        ? `${type.borderColor} ${type.bgColor}`
                        : "border-border hover:border-muted-foreground/30",
                    )}
                  >
                    <div className={cn("p-2 rounded-lg", isSelected && type.bgColor)}>
                      <Icon className={cn("h-5 w-5", isSelected ? type.color : "text-foreground/60")} />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Customer-specific: Jobs-to-be-Done */}
          {insightType === "customer" && (
            <Collapsible open={jobsExpanded} onOpenChange={setJobsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <span>Jobs-to-be-Done</span>
                  <Plus className={cn("h-4 w-4 transition-transform", jobsExpanded && "rotate-45")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4 p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                <p className="text-sm text-muted-foreground">
                  Frame your insight using the JTBD framework to uncover buyer motivations beyond features.
                </p>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Job Statement</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Define the outcome your buyer is trying to achieve
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground min-w-[80px]">When</span>
                        <Input placeholder="e.g., evaluating new tools for my team" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground min-w-[80px]">I want to</span>
                        <Input placeholder="e.g., compare options quickly without demos" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground min-w-[80px]">So I can</span>
                        <Input placeholder="e.g., make a confident decision in days, not weeks" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Functional Jobs</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Practical tasks buyers need to accomplish (e.g., "compare vendors quickly")
                    </p>
                    <Textarea
                      placeholder="e.g., Evaluate features across 5+ vendors, Get budget approval from finance, Onboard team in under 2 weeks"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Emotional Jobs</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      How buyers want to feel (e.g., "confident in my decision")
                    </p>
                    <Textarea
                      placeholder="e.g., Feel confident defending my choice to leadership, Avoid looking foolish if the tool fails, Look like an innovator to my team"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Context</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Circumstances and constraints (e.g., budget cycles, team size, existing systems)
                    </p>
                    <Textarea
                      placeholder="e.g., End of fiscal year with frozen budget, Team of 50+ using outdated legacy system, High pressure to show ROI within 90 days"
                      rows={3}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Competitive-specific: Competitor Selection */}
          {insightType === "competitive" && (
            <div className="space-y-4">
              <div>
                <Label>Competitor</Label>
                <p className="text-xs text-muted-foreground mb-2">Select an existing competitor or add a new one</p>
                <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a competitor" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitors.map((comp) => (
                      <SelectItem key={comp.name} value={comp.name.toLowerCase().replace(/\s+/g, "-")}>
                        <div className="flex flex-col">
                          <span>{comp.name}</span>
                          {comp.website && (
                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">{comp.website}</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!isAddingCompetitor ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full bg-transparent"
                    onClick={() => setIsAddingCompetitor(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Competitor
                  </Button>
                ) : (
                  <div className="mt-3 p-4 border rounded-lg bg-muted/50 space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Competitor Name *</Label>
                      <Input
                        placeholder="e.g., Acme Corp"
                        value={newCompetitorName}
                        onChange={(e) => setNewCompetitorName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddCompetitor()
                          }
                          if (e.key === "Escape") {
                            handleCancelAddCompetitor()
                          }
                        }}
                        autoFocus
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Website <span className="text-muted-foreground font-normal">(Optional)</span>
                      </Label>
                      <Input
                        type="url"
                        placeholder="https://acmecorp.com"
                        value={newCompetitorWebsite}
                        onChange={(e) => setNewCompetitorWebsite(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddCompetitor()
                          }
                          if (e.key === "Escape") {
                            handleCancelAddCompetitor()
                          }
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        Website helps uniquely identify the competitor and can be used for research
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddCompetitor}
                        disabled={!newCompetitorName.trim()}
                        className="flex-1"
                      >
                        Add Competitor
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleCancelAddCompetitor}
                        className="flex-1 bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {selectedCompetitor === "status-quo" && (
                <div>
                  <Label>Define Status Quo</Label>
                  <p className="text-xs text-muted-foreground mb-2">What does the status quo mean in this context?</p>
                  <Textarea placeholder="Select what the status quo means..." rows={3} />
                </div>
              )}
            </div>
          )}

          {/* Data Source */}
          <div className="space-y-3">
            <Label>Data Source</Label>
            <p className="text-xs text-muted-foreground">Provide the source material for this insight</p>
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setDataSourceType("link")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  dataSourceType === "link"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <LinkIcon className="h-4 w-4" />
                Link
              </button>
              <button
                onClick={() => setDataSourceType("file")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  dataSourceType === "file"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <FileText className="h-4 w-4" />
                File
              </button>
              <button
                onClick={() => setDataSourceType("note")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  dataSourceType === "note"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <StickyNote className="h-4 w-4" />
                Note
              </button>
            </div>
            {dataSourceType === "link" && <Input placeholder="https://example.com/research" />}
            {dataSourceType === "file" && (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              </div>
            )}
            {dataSourceType === "note" && <Textarea placeholder="Type or paste your notes here..." rows={4} />}
          </div>
        </CardContent>
      </Card>

      {/* Optional Context */}
      <Card>
        <CardHeader>
          <CardTitle>Optional Context</CardTitle>
          <CardDescription>Add additional context to enrich your insight</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Source Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select source type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-interview">Customer Interview</SelectItem>
                  <SelectItem value="survey">Survey</SelectItem>
                  <SelectItem value="market-research">Market Research</SelectItem>
                  <SelectItem value="competitor-analysis">Competitor Analysis</SelectItem>
                  <SelectItem value="sales-call">Sales Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" />
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag (e.g., enterprise, onboarding, security)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button onClick={handleAddTag} size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-primary/70">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Structured Fields */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>1. Core Observation</Label>
                <Button variant="ghost" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                What did you learn? Distill it into a single, punchy statement.
              </p>
              <Textarea
                placeholder="e.g., Enterprise customers abandon onboarding when SSO isn't available in the first 48 hours"
                rows={2}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>2. Evidence / Proof</Label>
                <Button variant="ghost" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Data, customer quotes, or market signals that validate this observation.
              </p>
              <Textarea
                placeholder="e.g., 7 out of 10 enterprise trials churned without SSO. Sales noted 'SSO is a blocker' in 15+ deal notes."
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>3. Why It Matters</Label>
                <Button variant="ghost" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Connect it to customer pain, market dynamics, or business impact.
              </p>
              <Textarea
                placeholder="e.g., Enterprise buyers have strict security requirements. Without SSO, we lose $200k+ ARR deals."
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>4. Implication / So What</Label>
                <Button variant="ghost" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                What does this mean for product, positioning, or GTM strategy?
              </p>
              <Textarea
                placeholder="e.g., SSO should be prioritized in roadmap. Highlight security features earlier in sales process."
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>5. Recommended Action</Label>
                <Button variant="ghost" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Suggest a next step, hypothesis, or decision this should inform.
              </p>
              <Textarea
                placeholder="e.g., Move SSO to Q1 priority. Update sales deck to lead with security features."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button>Save Insight</Button>
      </div>
    </div>
  )
}
