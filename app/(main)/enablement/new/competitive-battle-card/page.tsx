"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LinkIcon, Tag, Award, ExternalLink } from "lucide-react"
import { getCompetitorsFromInsights } from "@/lib/competitors"

export default function NewCompetitiveBattleCardPage() {
  const router = useRouter()
  const [competitors, setCompetitors] = useState<Array<{ name: string; website?: string }>>([])
  const [useCustomCompetitor, setUseCustomCompetitor] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    competitor: "",
    competitorWebsite: "",
    description: "",
    ourStrengths: "",
    theirWeaknesses: "",
    keyDifferentiators: "",
    commonObjections: "",
    winStrategy: "",
    sourceUrl: "",
    tags: "",
  })

  useEffect(() => {
    const competitorList = getCompetitorsFromInsights()
    setCompetitors(competitorList)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Battle card data:", formData)
    router.push("/enablement")
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleCompetitorSelect = (value: string) => {
    if (value === "custom") {
      setUseCustomCompetitor(true)
      setFormData((prev) => ({ ...prev, competitor: "", competitorWebsite: "" }))
    } else {
      setUseCustomCompetitor(false)
      const selected = competitors.find((c) => c.name === value)
      setFormData((prev) => ({
        ...prev,
        competitor: value,
        competitorWebsite: selected?.website || "",
        title: prev.title || `Competing Against ${value}`,
      }))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Competitive Battle Card</h1>
        </div>
        <p className="text-muted-foreground">
          Create a battle card to help your sales team compete effectively against a specific competitor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Identify the competitor and provide an overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="competitor-select">Select Competitor</Label>
              <Select onValueChange={handleCompetitorSelect} required>
                <SelectTrigger id="competitor-select" className="bg-white">
                  <SelectValue placeholder="Choose from competitors in Insights" />
                </SelectTrigger>
                <SelectContent>
                  {competitors.map((competitor) => (
                    <SelectItem key={competitor.name} value={competitor.name}>
                      <div className="flex items-center justify-between w-full">
                        <span>{competitor.name}</span>
                        {competitor.website && <ExternalLink className="h-3 w-3 ml-2 text-muted-foreground" />}
                      </div>
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">+ Add Custom Competitor</SelectItem>
                </SelectContent>
              </Select>
              {competitors.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {competitors.length} competitor{competitors.length !== 1 ? "s" : ""} found from your Insights
                </p>
              )}
            </div>

            {useCustomCompetitor && (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="custom-competitor">Competitor Name</Label>
                  <Input
                    id="custom-competitor"
                    placeholder="e.g., Acme Corp"
                    value={formData.competitor}
                    onChange={handleChange("competitor")}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="competitor-website">Competitor Website (Optional)</Label>
                  <Input
                    id="competitor-website"
                    type="url"
                    placeholder="https://competitor.com"
                    value={formData.competitorWebsite}
                    onChange={handleChange("competitorWebsite")}
                  />
                </div>
              </>
            )}

            {formData.competitorWebsite && !useCustomCompetitor && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-1">Competitor Website</p>
                <a
                  href={formData.competitorWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-medium"
                >
                  {formData.competitorWebsite}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            <div className="grid gap-3">
              <Label htmlFor="title">Battle Card Title</Label>
              <Input
                id="title"
                placeholder="e.g., Competing Against [Competitor Name]"
                value={formData.title}
                onChange={handleChange("title")}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Overview</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of the competitor, their market position, and typical deal scenarios..."
                value={formData.description}
                onChange={handleChange("description")}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitive Analysis</CardTitle>
            <CardDescription>Highlight your strengths and their weaknesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="ourStrengths">Our Strengths</Label>
              <Textarea
                id="ourStrengths"
                placeholder="List your key advantages and strengths when competing against this competitor..."
                value={formData.ourStrengths}
                onChange={handleChange("ourStrengths")}
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">What makes your solution better?</p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="theirWeaknesses">Their Weaknesses</Label>
              <Textarea
                id="theirWeaknesses"
                placeholder="List the competitor's known weaknesses, gaps, and pain points..."
                value={formData.theirWeaknesses}
                onChange={handleChange("theirWeaknesses")}
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">Where do they fall short?</p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="keyDifferentiators">Key Differentiators</Label>
              <Textarea
                id="keyDifferentiators"
                placeholder="What sets you apart? List unique features, capabilities, or value propositions..."
                value={formData.keyDifferentiators}
                onChange={handleChange("keyDifferentiators")}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Guidance</CardTitle>
            <CardDescription>Help your team handle objections and win deals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="commonObjections">Common Objections</Label>
              <Textarea
                id="commonObjections"
                placeholder="List common objections sales reps hear when competing against this competitor and how to address them..."
                value={formData.commonObjections}
                onChange={handleChange("commonObjections")}
                rows={5}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="winStrategy">Win Strategy</Label>
              <Textarea
                id="winStrategy"
                placeholder="Provide tactical guidance on how to win deals against this competitor..."
                value={formData.winStrategy}
                onChange={handleChange("winStrategy")}
                rows={5}
                required
              />
              <p className="text-xs text-muted-foreground">
                Include discovery questions, positioning tips, and proof points
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Source & Tags</CardTitle>
            <CardDescription>Link to source document and add tags for organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="sourceUrl" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Source of Truth URL
              </Label>
              <Input
                id="sourceUrl"
                type="url"
                placeholder="https://docs.google.com/document/d/..."
                value={formData.sourceUrl}
                onChange={handleChange("sourceUrl")}
                required
              />
              <p className="text-xs text-muted-foreground">
                Link to the master document where this battle card is maintained
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="tags" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="e.g., competitive, sales, enterprise"
                value={formData.tags}
                onChange={handleChange("tags")}
              />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => router.push("/enablement/new")}>
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button type="submit" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Create Asset</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
