"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function PositioningCanvasClient() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    competitiveAlternatives: "",
    uniqueAttributes: "",
    value: "",
    proof: "",
    targetMarket: "",
    marketCategory: "",
    relevantTrends: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Saving positioning canvas:", formData)
    // TODO: Implement save functionality
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Positioning Canvas</h1>
        <p className="text-muted-foreground">Capture key elements of your positioning in a clear, structured format</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Start with a name and description for this positioning canvas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Canvas Name</Label>
            <Input
              id="name"
              placeholder="e.g., Enterprise Platform Positioning"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief overview of what this positioning canvas covers..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competitive Alternatives</CardTitle>
          <CardDescription>What customers would use instead of your product</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="List the alternatives customers consider, including competitors, substitutes, and the status quo..."
            value={formData.competitiveAlternatives}
            onChange={(e) => handleChange("competitiveAlternatives", e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unique Attributes</CardTitle>
          <CardDescription>Features or capabilities that set you apart</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe the specific features, capabilities, or characteristics that make your product different..."
            value={formData.uniqueAttributes}
            onChange={(e) => handleChange("uniqueAttributes", e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Value & Proof</CardTitle>
          <CardDescription>The benefits those attributes create and evidence to support them</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Textarea
              id="value"
              placeholder="Explain the business outcomes and benefits customers get from your unique attributes..."
              value={formData.value}
              onChange={(e) => handleChange("value", e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proof">Proof Points</Label>
            <Textarea
              id="proof"
              placeholder="Provide evidence like case studies, metrics, testimonials, or data that support your value claims..."
              value={formData.proof}
              onChange={(e) => handleChange("proof", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Target Market Characteristics</CardTitle>
          <CardDescription>Who cares most about that value</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe the specific segments, industries, company sizes, or buyer personas who find your value most compelling..."
            value={formData.targetMarket}
            onChange={(e) => handleChange("targetMarket", e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Category</CardTitle>
          <CardDescription>The context that best highlights your strengths</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Define how you want to be categorized in the market to maximize your competitive advantage..."
            value={formData.marketCategory}
            onChange={(e) => handleChange("marketCategory", e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relevant Trends</CardTitle>
          <CardDescription>Shifts in the market that make your product timely and important</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Identify market trends, technological shifts, or changes in buyer behavior that create urgency for your solution..."
            value={formData.relevantTrends}
            onChange={(e) => handleChange("relevantTrends", e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="sticky bottom-0 bg-background border-t pt-4 pb-6">
        <div className="flex justify-end gap-4">
          <Link href="/strategy">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave}>Create Framework</Button>
        </div>
      </div>
    </div>
  )
}
