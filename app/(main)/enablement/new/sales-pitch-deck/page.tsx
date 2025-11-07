"use client"

import { Presentation, FileText, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SalesPitchDeckPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-purple-100 p-3">
          <Presentation className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create Sales Pitch Deck</h1>
          <p className="text-muted-foreground mt-1">
            Create a compelling sales pitch deck to help your team close deals and win customers.
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Deck Title*</Label>
            <Input id="title" placeholder="e.g., Enterprise Sales Pitch 2024" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience*</Label>
              <Select>
                <SelectTrigger id="audience">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="mid-market">Mid-Market</SelectItem>
                  <SelectItem value="smb">Small Business</SelectItem>
                  <SelectItem value="technical">Technical Buyers</SelectItem>
                  <SelectItem value="executives">C-Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deck-type">Deck Type*</Label>
              <Select>
                <SelectTrigger id="deck-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discovery">Discovery Call</SelectItem>
                  <SelectItem value="demo">Product Demo</SelectItem>
                  <SelectItem value="proposal">Proposal/Pitch</SelectItem>
                  <SelectItem value="executive">Executive Briefing</SelectItem>
                  <SelectItem value="general">General Pitch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Deck Overview*</Label>
            <Textarea id="overview" placeholder="Provide a brief description of this pitch deck..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Slide Structure */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Slide Structure & Content</h3>

          <div className="space-y-2">
            <Label htmlFor="opening">Opening (Problem/Hook)</Label>
            <Textarea id="opening" placeholder="What problem are you solving? What's the hook?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Solution Overview</Label>
            <Textarea id="solution" placeholder="Describe your solution at a high level..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value-prop">Value Proposition</Label>
            <Textarea id="value-prop" placeholder="What's the core value you deliver?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Key Features & Benefits</Label>
            <Textarea id="features" placeholder="List 3-5 key features and their benefits..." rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Social Proof */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Social Proof & Credibility</h3>

          <div className="space-y-2">
            <Label htmlFor="customers">Customer Logos/References</Label>
            <Textarea id="customers" placeholder="List notable customers or logos to include..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stats">Key Stats & Metrics</Label>
            <Textarea
              id="stats"
              placeholder="List important statistics (e.g., '500+ customers', '99.9% uptime')..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonials">Testimonials/Case Studies</Label>
            <Textarea
              id="testimonials"
              placeholder="Include customer testimonials or brief case study highlights..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Closing */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Closing & Next Steps</h3>

          <div className="space-y-2">
            <Label htmlFor="pricing">Pricing Overview</Label>
            <Textarea id="pricing" placeholder="High-level pricing or investment overview..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta">Call to Action</Label>
            <Textarea id="cta" placeholder="What should the prospect do next?" rows={2} />
          </div>
        </CardContent>
      </Card>

      {/* Source & Tags */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Source & Tags</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source Document (Optional)</Label>
            <Input id="source" type="url" placeholder="Link to Google Slides, PowerPoint, or file..." />
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
        <Button>Create Asset</Button>
      </div>
    </div>
  )
}
