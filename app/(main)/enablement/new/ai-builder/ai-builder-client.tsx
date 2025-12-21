"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sparkles, FileText, Target, MessageSquare, Rocket, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { mockStrategyFrameworks } from "@/lib/mock-strategy-frameworks"

type Step = "source" | "asset-type" | "audience" | "customize" | "generate"

const assetTypes = [
  { id: "pitch-deck", label: "Sales Pitch Deck", icon: FileText, description: "Persuasive presentation for prospects" },
  { id: "one-pager", label: "One-Pager", icon: FileText, description: "Concise overview for quick reference" },
  { id: "battle-card", label: "Battle Card", icon: Target, description: "Competitive positioning guide" },
  {
    id: "messaging-doc",
    label: "Messaging Document",
    icon: MessageSquare,
    description: "Consistent messaging framework",
  },
  { id: "gtm-brief", label: "GTM Brief", icon: Rocket, description: "Go-to-market execution plan" },
]

const audiences = [
  { id: "sales", label: "Sales Teams", description: "Field reps and account executives" },
  { id: "cs", label: "Customer Success", description: "CS managers and support teams" },
  { id: "executives", label: "Executives", description: "C-suite and leadership" },
  { id: "partners", label: "Partners", description: "Channel and alliance partners" },
  { id: "marketing", label: "Marketing", description: "Marketing and demand gen teams" },
]

export function AIAssetBuilderClient() {
  const [step, setStep] = useState<Step>("source")
  const [selectedSource, setSelectedSource] = useState("")
  const [sourceType, setSourceType] = useState<"positioning" | "messaging" | "gtm" | "">("")
  const [selectedAssetType, setSelectedAssetType] = useState("")
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSourceSelect = (type: "positioning" | "messaging" | "gtm", id: string) => {
    setSourceType(type)
    setSelectedSource(id)
    setStep("asset-type")
  }

  const handleAssetTypeSelect = (typeId: string) => {
    setSelectedAssetType(typeId)
    setStep("audience")
  }

  const handleAudienceToggle = (audienceId: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(audienceId) ? prev.filter((id) => id !== audienceId) : [...prev, audienceId],
    )
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setStep("generate")
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  const getSourceName = () => {
    if (!selectedSource || !sourceType) return ""
    if (sourceType === "positioning") {
      return mockStrategyFrameworks.positioningCanvases.find((p) => p.id === selectedSource)?.name || ""
    }
    if (sourceType === "messaging") {
      return mockStrategyFrameworks.messagingHouses.find((m) => m.id === selectedSource)?.name || ""
    }
    return "GTM Plan"
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/enablement/new">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Asset Builder</h1>
          <p className="text-muted-foreground mt-1">Generate assets from your strategic frameworks</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        <Badge variant={step === "source" ? "default" : "outline"} className="gap-1">
          1. Source
        </Badge>
        <div className="h-[1px] w-8 bg-border" />
        <Badge variant={step === "asset-type" ? "default" : "outline"} className="gap-1">
          2. Asset Type
        </Badge>
        <div className="h-[1px] w-8 bg-border" />
        <Badge variant={step === "audience" ? "default" : "outline"} className="gap-1">
          3. Audience
        </Badge>
        <div className="h-[1px] w-8 bg-border" />
        <Badge variant={step === "generate" ? "default" : "outline"} className="gap-1">
          4. Generate
        </Badge>
      </div>

      {/* Step 1: Select Source */}
      {step === "source" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Strategy Source</CardTitle>
              <CardDescription>Choose the strategic framework to build your asset from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Positioning */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Positioning Frameworks</Label>
                <div className="grid gap-3">
                  {mockStrategyFrameworks.positioningCanvases.map((canvas) => (
                    <button
                      key={canvas.id}
                      onClick={() => handleSourceSelect("positioning", canvas.id)}
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all text-left"
                    >
                      <div>
                        <p className="font-medium">{canvas.name}</p>
                        <p className="text-sm text-muted-foreground">{canvas.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messaging */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Messaging Frameworks</Label>
                <div className="grid gap-3">
                  {mockStrategyFrameworks.messagingHouses.map((house) => (
                    <button
                      key={house.id}
                      onClick={() => handleSourceSelect("messaging", house.id)}
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all text-left"
                    >
                      <div>
                        <p className="font-medium">{house.name}</p>
                        <p className="text-sm text-muted-foreground">{house.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Select Asset Type */}
      {step === "asset-type" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Asset Type</CardTitle>
              <CardDescription>
                Building from <span className="font-medium text-foreground">{getSourceName()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {assetTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleAssetTypeSelect(type.id)}
                    className="flex flex-col gap-2 p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <type.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{type.label}</p>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("source")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Select Audience */}
      {step === "audience" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tailor to Audience</CardTitle>
              <CardDescription>Select who will use this asset (choose one or more)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {audiences.map((audience) => (
                  <div
                    key={audience.id}
                    className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={audience.id}
                      checked={selectedAudiences.includes(audience.id)}
                      onCheckedChange={() => handleAudienceToggle(audience.id)}
                    />
                    <label htmlFor={audience.id} className="flex-1 cursor-pointer">
                      <p className="font-medium">{audience.label}</p>
                      <p className="text-sm text-muted-foreground">{audience.description}</p>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("asset-type")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleGenerate} disabled={selectedAudiences.length === 0}>
              Generate Asset
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Generate */}
      {step === "generate" && (
        <Card>
          <CardHeader>
            <CardTitle>Generating Your Asset</CardTitle>
            <CardDescription>AI is creating your enablement asset based on your selections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Analyzing strategic frameworks...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="font-medium">Asset generated successfully!</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Summary:</p>
                  <ul className="text-sm space-y-1">
                    <li>
                      <span className="font-medium">Source:</span> {getSourceName()}
                    </li>
                    <li>
                      <span className="font-medium">Asset Type:</span>{" "}
                      {assetTypes.find((t) => t.id === selectedAssetType)?.label}
                    </li>
                    <li>
                      <span className="font-medium">Audiences:</span>{" "}
                      {selectedAudiences.map((id) => audiences.find((a) => a.id === id)?.label).join(", ")}
                    </li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1">View Asset</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Download
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
