"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Edit3,
  Trash2,
  Calendar,
  Users,
  Target,
  TrendingUp,
  ExternalLink,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { mockInsights } from "@/lib/mock-insights"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { generateInsightAnalysis, regenerateAnalysisField } from "@/app/actions/generate-insight-analysis"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BackButton } from "@/components/back-button"

const insightTypeConfig = {
  customer: {
    color: "bg-blue-500",
    icon: Users,
    label: "Customer",
  },
  competitive: {
    color: "bg-red-500",
    icon: Target,
    label: "Competitive",
  },
  market: {
    color: "bg-green-500",
    icon: TrendingUp,
    label: "Market",
  },
}

type AnalysisField = "evidence" | "why" | "implication" | "action"

export default function InsightDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const insight = mockInsights.find((i) => i.id === params.id)

  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false)
  const [analysisData, setAnalysisData] = useState(insight?.analysis)
  const [editingField, setEditingField] = useState<AnalysisField | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [isRegenerating, setIsRegenerating] = useState<AnalysisField | null>(null)
  const [analysisExpanded, setAnalysisExpanded] = useState(true)

  // Update page title dynamically
  useEffect(() => {
    if (insight) {
      document.title = `${insight.observation.slice(0, 50)}... | ProductMark`
    }
  }, [insight])

  if (!insight) {
    router.push("/insights")
    return null
  }

  const handleDelete = () => {
    toast({
      title: "Insight deleted",
      description: "The insight has been successfully deleted.",
    })
    router.push("/insights")
  }

  const handleGenerateAnalysis = async () => {
    setIsGeneratingAnalysis(true)
    try {
      const result = await generateInsightAnalysis({
        observation: insight.observation,
        insightType: insight.type,
        dataSource: insight.dataSource,
        tags: insight.tags,
        competitor: insight.competitor,
      })

      if (result.success && result.analysis) {
        setAnalysisData(result.analysis)
        toast({
          title: "Analysis generated",
          description: "AI has analyzed your insight successfully.",
        })
      } else {
        toast({
          title: "Generation failed",
          description: result.error || "Failed to generate analysis. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating analysis:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingAnalysis(false)
    }
  }

  const handleRegenerateField = async (field: AnalysisField) => {
    setIsRegenerating(field)
    try {
      const result = await regenerateAnalysisField(field, insight.observation, insight.type, {
        dataSource: insight.dataSource,
        tags: insight.tags,
        competitor: insight.competitor,
      })

      if (result.success && result.content) {
        setAnalysisData((prev) => ({
          ...prev,
          [field]: result.content,
        }))
        toast({
          title: "Field regenerated",
          description: "AI has regenerated this field successfully.",
        })
      } else {
        toast({
          title: "Regeneration failed",
          description: result.error || "Failed to regenerate field. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(`Error regenerating ${field}:`, error)
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsRegenerating(null)
    }
  }

  const handleStartEdit = (field: AnalysisField) => {
    setEditingField(field)
    setEditingValue(analysisData?.[field] || "")
  }

  const handleSaveEdit = () => {
    if (editingField) {
      setAnalysisData((prev) => ({
        ...prev,
        [editingField]: editingValue,
      }))
      toast({
        title: "Field updated",
        description: "Your changes have been saved.",
      })
      setEditingField(null)
      setEditingValue("")
    }
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setEditingValue("")
  }

  const config = insightTypeConfig[insight.type]
  const Icon = config.icon

  const fieldLabels = {
    evidence: "Evidence / Proof",
    why: "Why It Matters",
    implication: "Implication / So What",
    action: "Recommended Action",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BackButton href="/insights" label="Back to Insights" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("p-2 rounded-lg text-white", config.color)}>
              <Icon className="h-5 w-5" />
            </div>
            <Badge variant="secondary" className="text-sm">
              {config.label}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{insight.observation}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(insight.createdAt).toLocaleDateString()}
            </div>
            <span>•</span>
            <span>By {insight.author}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/insights/edit/${insight.id}`}>
            <Button variant="outline" size="sm">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Competitive-specific: Competitor */}
        {insight.type === "competitive" && insight.competitor && (
          <Card>
            <CardHeader>
              <CardTitle>Competitor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Competitor</h3>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium">{insight.competitor.name}</p>
                  {insight.competitor.website && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={insight.competitor.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
                {insight.competitor.website && (
                  <p className="text-sm text-muted-foreground mt-1">{insight.competitor.website}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Analysis Section */}
        <Card>
          <Collapsible open={analysisExpanded} onOpenChange={setAnalysisExpanded}>
            <CardHeader className="pb-3">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle>AI Analysis</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {analysisData?.generatedAt && (
                      <span className="text-xs text-muted-foreground">
                        Generated {new Date(analysisData.generatedAt).toLocaleDateString()}
                      </span>
                    )}
                    <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className={cn("transition-transform duration-200", analysisExpanded && "rotate-180")}>
                        ▼
                      </span>
                    </Button>
                  </div>
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {!analysisData ? (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No analysis yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Generate AI-powered analysis to get evidence, implications, and recommendations.
                    </p>
                    <Button onClick={handleGenerateAnalysis} disabled={isGeneratingAnalysis}>
                      {isGeneratingAnalysis ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Analysis...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Analysis
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(["evidence", "why", "implication", "action"] as AnalysisField[]).map((field) => (
                      <div key={field} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold">{fieldLabels[field]}</h3>
                          {editingField !== field && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStartEdit(field)}
                                className="h-7 px-2"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRegenerateField(field)}
                                disabled={isRegenerating === field}
                                className="h-7 px-2"
                              >
                                {isRegenerating === field ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Sparkles className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                        {editingField === field ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              className="min-h-[100px] resize-none"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveEdit}>
                                <Check className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEdit} className="bg-transparent">
                                <X className="h-3 w-3 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-base leading-relaxed text-foreground/90">
                            {analysisData?.[field] || "No content generated yet."}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Tags */}
        {insight.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Source */}
        {insight.dataSource && (
          <Card>
            <CardHeader>
              <CardTitle>Data Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">{insight.dataSourceType || "link"}</span>
                </div>
                <p className="text-sm leading-relaxed break-words">{insight.dataSource}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Created:</span> {new Date(insight.createdAt).toLocaleDateString()} by{" "}
              {insight.author}
            </div>
            {insight.updatedAt && (
              <div>
                <span className="font-medium">Last updated:</span> {new Date(insight.updatedAt).toLocaleDateString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
