"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Plus, Sparkles, LinkIcon, FileText, StickyNote, X, Trash2, Check, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { mockInsights } from "@/lib/mock-insights"
import { useToast } from "@/hooks/use-toast"
import { suggestTags } from "@/app/actions/suggest-tags"
import { BackButton } from "@/components/back-button"

type InsightType = "customer" | "competitive" | "market"
type DataSourceType = "link" | "file" | "note" | null

interface Competitor {
  id: string
  name: string
  website?: string
}

export default function EditInsightPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const insightId = params.id as string

  const insight = mockInsights.find((i) => i.id === insightId)

  const [insightType, setInsightType] = useState<InsightType>(insight?.type || "customer")
  const [observation, setObservation] = useState(insight?.observation || "")
  const [dataSourceType, setDataSourceType] = useState<DataSourceType>(insight?.dataSourceType || null)
  const [dataSourceValue, setDataSourceValue] = useState(insight?.dataSource || "")
  const [tags, setTags] = useState<string[]>(insight?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [showTagInput, setShowTagInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true)
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

  // Competitor state
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: "status-quo", name: "Status Quo" },
    {
      id: "adobe",
      name: "Adobe",
      website: "https://www.adobe.com/",
    },
    {
      id: "optimizely",
      name: "Optimizely",
      website: "https://www.optimizely.com/",
    },
    {
      id: "sitecore",
      name: "Sitecore",
      website: "https://www.sitecore.com/",
    },
    {
      id: "contentful",
      name: "Contentful",
      website: "https://www.contentful.com/",
    },
    {
      id: "contentstack",
      name: "Contentstack",
      website: "https://www.contentstack.com/",
    },
    {
      id: "sanity",
      name: "Sanity",
      website: "https://www.sanity.io/",
    },
  ])
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>(
    insight?.competitor?.name?.toLowerCase().replace(/\s+/g, "-") || "status-quo",
  )
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false)
  const [isEditingCompetitor, setIsEditingCompetitor] = useState(false)
  const [editingCompetitorId, setEditingCompetitorId] = useState<string>("")
  const [competitorName, setCompetitorName] = useState("")
  const [competitorWebsite, setCompetitorWebsite] = useState("")

  // Debounced tag suggestions
  const fetchTagSuggestions = useCallback(
    async (text: string) => {
      if (!aiAssistEnabled || text.trim().length < 20) {
        setSuggestedTags([])
        return
      }

      setIsLoadingSuggestions(true)
      try {
        const result = await suggestTags({
          observation: text,
          insightType:
            insightType === "customer" ? "Customer" : insightType === "competitive" ? "Competitive" : "Market",
          existingTags: tags,
        })

        if (result.success && result.tags.length > 0) {
          setSuggestedTags(result.tags)
        } else {
          setSuggestedTags([])
        }
      } catch (error) {
        console.error("Failed to fetch tag suggestions:", error)
        setSuggestedTags([])
      } finally {
        setIsLoadingSuggestions(false)
      }
    },
    [aiAssistEnabled, insightType, tags],
  )

  // Debounce the observation changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (observation.trim().length >= 20) {
        fetchTagSuggestions(observation)
      } else {
        setSuggestedTags([])
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [observation, fetchTagSuggestions])

  // Re-fetch suggestions when insight type changes
  useEffect(() => {
    if (observation.trim().length >= 20) {
      fetchTagSuggestions(observation)
    }
  }, [insightType, fetchTagSuggestions, observation])

  // Update page title dynamically
  useEffect(() => {
    if (insight) {
      document.title = `Edit ${insight.observation.slice(0, 50)}... | ProductMark`
    }
  }, [insight])

  useEffect(() => {
    if (!insight) {
      toast({
        title: "Insight not found",
        description: "The insight you're looking for doesn't exist.",
        variant: "destructive",
      })
      router.push("/insights")
    }
  }, [insight, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!observation.trim()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    toast({
      title: "Insight updated",
      description: "Your changes have been saved successfully.",
    })
    router.push("/insights")
  }

  const handleDelete = () => {
    toast({
      title: "Insight deleted",
      description: "The insight has been successfully deleted.",
    })
    router.push("/insights")
  }

  const handleDataSourceSelect = (type: DataSourceType) => {
    setDataSourceType(type)
    if (!dataSourceValue) {
      setDataSourceValue("")
    }
  }

  const handleClearDataSource = () => {
    setDataSourceType(null)
    setDataSourceValue("")
  }

  const handleAddTag = (tag?: string) => {
    const tagToAdd = tag || tagInput
    if (tagToAdd.trim() && !tags.includes(tagToAdd.trim().toLowerCase())) {
      setTags([...tags, tagToAdd.trim().toLowerCase()])
      setTagInput("")
      setSuggestedTags(suggestedTags.filter((t) => t !== tagToAdd.trim().toLowerCase()))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddSuggestedTag = (tag: string) => {
    handleAddTag(tag)
  }

  const handleCompetitorChange = (value: string) => {
    if (value === "add-new") {
      setIsAddingCompetitor(true)
      setIsEditingCompetitor(false)
      setSelectedCompetitor("")
      clearCompetitorForm()
    } else if (value === "edit-current") {
      const competitor = competitors.find((c) => c.id === selectedCompetitor)
      if (competitor) {
        setIsEditingCompetitor(true)
        setIsAddingCompetitor(false)
        setEditingCompetitorId(competitor.id)
        setCompetitorName(competitor.name)
        setCompetitorWebsite(competitor.website || "")
      }
    } else {
      setSelectedCompetitor(value)
      setIsAddingCompetitor(false)
      setIsEditingCompetitor(false)
    }
  }

  const clearCompetitorForm = () => {
    setCompetitorName("")
    setCompetitorWebsite("")
  }

  const handleAddCompetitor = () => {
    if (competitorName.trim()) {
      const newId = `competitor-${Date.now()}`
      const newCompetitor: Competitor = {
        id: newId,
        name: competitorName.trim(),
      }
      if (competitorWebsite.trim()) {
        newCompetitor.website = competitorWebsite.trim()
      }
      setCompetitors([...competitors, newCompetitor])
      setSelectedCompetitor(newId)
      clearCompetitorForm()
      setIsAddingCompetitor(false)
    }
  }

  const handleEditCompetitor = () => {
    if (competitorName.trim() && editingCompetitorId) {
      const updatedCompetitors = competitors.map((comp) => {
        if (comp.id === editingCompetitorId) {
          return {
            id: comp.id,
            name: competitorName.trim(),
            website: competitorWebsite.trim() || undefined,
          }
        }
        return comp
      })
      setCompetitors(updatedCompetitors)
      clearCompetitorForm()
      setIsEditingCompetitor(false)
      setEditingCompetitorId("")
    }
  }

  const handleCancelCompetitorForm = () => {
    setIsAddingCompetitor(false)
    setIsEditingCompetitor(false)
    setEditingCompetitorId("")
    clearCompetitorForm()
  }

  if (!insight) return null

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between pt-8">
        <div className="flex items-center gap-4">
          <BackButton href="/insights" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Edit your insight</h1>
            <p className="text-base text-muted-foreground">Refine and sharpen your strategic intelligence.</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive bg-transparent"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Insight Details</CardTitle>
            <CardDescription>Edit the core information about this insight</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Insight Type */}
            <div className="space-y-3">
              <Label>Insight Type</Label>
              <Select value={insightType} onValueChange={(value) => setInsightType(value as InsightType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="competitive">Competitive</SelectItem>
                  <SelectItem value="market">Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Competitive-specific: Competitor Selection */}
            {insightType === "competitive" && (
              <div className="space-y-4 p-4 rounded-lg border bg-red-50/30 dark:bg-red-950/20">
                <div>
                  <Label>Competitor</Label>
                  <p className="text-xs text-muted-foreground mb-2">Select an existing competitor or add a new one</p>
                  <Select value={selectedCompetitor} onValueChange={handleCompetitorChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a competitor" />
                    </SelectTrigger>
                    <SelectContent>
                      {competitors.map((comp) => (
                        <SelectItem key={comp.id} value={comp.id}>
                          <div className="flex flex-col">
                            <span>{comp.name}</span>
                            {comp.website && (
                              <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {comp.website}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                      <SelectItem value="add-new">
                        <div className="flex items-center gap-2 text-primary font-medium py-1">
                          <Plus className="h-4 w-4" />
                          <span>Add New Competitor</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Edit button - only show when a non-status-quo competitor is selected */}
                  {selectedCompetitor &&
                    selectedCompetitor !== "status-quo" &&
                    !isAddingCompetitor &&
                    !isEditingCompetitor && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleCompetitorChange("edit-current")}
                        className="mt-2 w-full bg-transparent"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Competitor
                      </Button>
                    )}

                  {(isAddingCompetitor || isEditingCompetitor) && (
                    <div className="mt-3 p-4 border rounded-lg space-y-3 bg-background">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {isEditingCompetitor ? "Edit Competitor" : "Add New Competitor"}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleCancelCompetitorForm}
                          className="h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Competitor Name *</Label>
                        <Input
                          placeholder="e.g., Acme Corp"
                          value={competitorName}
                          onChange={(e) => setCompetitorName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              isEditingCompetitor ? handleEditCompetitor() : handleAddCompetitor()
                            }
                            if (e.key === "Escape") {
                              handleCancelCompetitorForm()
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
                          value={competitorWebsite}
                          onChange={(e) => setCompetitorWebsite(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              isEditingCompetitor ? handleEditCompetitor() : handleAddCompetitor()
                            }
                            if (e.key === "Escape") {
                              handleCancelCompetitorForm()
                            }
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={isEditingCompetitor ? handleEditCompetitor : handleAddCompetitor}
                          disabled={!competitorName.trim()}
                          className="flex-1"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          {isEditingCompetitor ? "Save Changes" : "Add Competitor"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={handleCancelCompetitorForm}
                          className="flex-1 bg-transparent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Main Observation */}
            <div className="space-y-3">
              <Label>What did you learn?</Label>
              <Textarea
                placeholder="Describe the insight..."
                rows={6}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                required
                className="resize-none"
              />
            </div>

            {/* Tags Section */}
            <div className="space-y-2">
              <Label>Tags</Label>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary/70 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* AI-suggested tags */}
              {aiAssistEnabled && suggestedTags.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    <span>Suggested tags</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAddSuggestedTag(tag)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoadingSuggestions && aiAssistEnabled && observation.length >= 20 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  <span>Analyzing for tags...</span>
                </div>
              )}

              {!showTagInput ? (
                <button
                  type="button"
                  onClick={() => setShowTagInput(true)}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add custom tag
                </button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., enterprise, security)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                      if (e.key === "Escape") {
                        setShowTagInput(false)
                        setTagInput("")
                      }
                    }}
                    className="text-sm h-8"
                    autoFocus
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddTag()}
                    size="sm"
                    variant="outline"
                    disabled={!tagInput.trim()}
                    className="h-8 px-3 bg-transparent"
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowTagInput(false)
                      setTagInput("")
                    }}
                    size="sm"
                    variant="ghost"
                    className="h-8 px-3"
                  >
                    Done
                  </Button>
                </div>
              )}
            </div>

            {/* Data Source */}
            <div className="space-y-3">
              <Label>Data Source</Label>
              <p className="text-xs text-muted-foreground">
                {dataSourceType ? "Update your source material" : "Add source material for this insight"}
              </p>

              {!dataSourceType ? (
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleDataSourceSelect("link")}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Link</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDataSourceSelect("note")}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <StickyNote className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Note</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDataSourceSelect("file")}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">File</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-center gap-2">
                      {dataSourceType === "link" && <LinkIcon className="h-4 w-4 text-muted-foreground" />}
                      {dataSourceType === "note" && <StickyNote className="h-4 w-4 text-muted-foreground" />}
                      {dataSourceType === "file" && <FileText className="h-4 w-4 text-muted-foreground" />}
                      <span className="text-sm font-medium capitalize">{dataSourceType}</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={handleClearDataSource}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {dataSourceType === "link" && (
                    <Input
                      placeholder="https://example.com/source"
                      value={dataSourceValue}
                      onChange={(e) => setDataSourceValue(e.target.value)}
                      type="url"
                    />
                  )}
                  {dataSourceType === "note" && (
                    <Textarea
                      placeholder="Type or paste your notes here..."
                      rows={4}
                      value={dataSourceValue}
                      onChange={(e) => setDataSourceValue(e.target.value)}
                      className="resize-none"
                    />
                  )}
                  {dataSourceType === "file" && (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* AI Assist Toggle */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="space-y-0.5">
                <Label htmlFor="ai-assist">AI Assist</Label>
                <p className="text-xs text-muted-foreground">Get intelligent tag suggestions as you type</p>
              </div>
              <Switch id="ai-assist" checked={aiAssistEnabled} onCheckedChange={setAiAssistEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={!observation.trim() || isSubmitting} className="px-8">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      {/* Metadata */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Created by {insight.author}</span>
          <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
