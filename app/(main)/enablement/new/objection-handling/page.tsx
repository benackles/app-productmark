"use client"

import { Shield, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ObjectionHandlingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-red-100 p-3">
          <Shield className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create Objection Handling Guide</h1>
          <p className="text-muted-foreground mt-1">
            Create a comprehensive guide to help your team effectively handle common sales objections.
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Define the objection category and overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Guide Title*</Label>
            <Input id="title" placeholder="e.g., Pricing Objection Handling Guide" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Objection Category*</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pricing">Pricing</SelectItem>
                <SelectItem value="features">Features/Functionality</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
                <SelectItem value="timing">Timing/Urgency</SelectItem>
                <SelectItem value="trust">Trust/Credibility</SelectItem>
                <SelectItem value="implementation">Implementation</SelectItem>
                <SelectItem value="roi">ROI/Value</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Guide Overview*</Label>
            <Textarea
              id="overview"
              placeholder="Provide a brief description of this objection handling guide..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Common Objections */}
      <Card>
        <CardHeader>
          <CardTitle>Common Objections & Responses</CardTitle>
          <CardDescription>Document the most common objections and how to handle them</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 border rounded-lg p-4">
            <h4 className="font-medium">Objection #1</h4>
            <div className="space-y-2">
              <Label htmlFor="objection-1">The Objection*</Label>
              <Input id="objection-1" placeholder='e.g., "Your pricing is too high"' />
            </div>

            <div className="space-y-2">
              <Label htmlFor="why-1">Why They Say This</Label>
              <Textarea id="why-1" placeholder="What's the underlying concern or reason?" rows={2} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="response-1">Recommended Response*</Label>
              <Textarea
                id="response-1"
                placeholder="How should the sales rep respond? Include talking points..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof-1">Supporting Evidence/Proof Points</Label>
              <Textarea
                id="proof-1"
                placeholder="Stats, case studies, or evidence to support your response..."
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <h4 className="font-medium">Objection #2</h4>
            <div className="space-y-2">
              <Label htmlFor="objection-2">The Objection*</Label>
              <Input id="objection-2" placeholder='e.g., "We already have a solution"' />
            </div>

            <div className="space-y-2">
              <Label htmlFor="why-2">Why They Say This</Label>
              <Textarea id="why-2" placeholder="What's the underlying concern or reason?" rows={2} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="response-2">Recommended Response*</Label>
              <Textarea id="response-2" placeholder="How should the sales rep respond?" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof-2">Supporting Evidence/Proof Points</Label>
              <Textarea id="proof-2" placeholder="Stats, case studies, or evidence..." rows={2} />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <h4 className="font-medium">Objection #3</h4>
            <div className="space-y-2">
              <Label htmlFor="objection-3">The Objection*</Label>
              <Input id="objection-3" placeholder='e.g., "Not the right time"' />
            </div>

            <div className="space-y-2">
              <Label htmlFor="why-3">Why They Say This</Label>
              <Textarea id="why-3" placeholder="What's the underlying concern or reason?" rows={2} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="response-3">Recommended Response*</Label>
              <Textarea id="response-3" placeholder="How should the sales rep respond?" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof-3">Supporting Evidence/Proof Points</Label>
              <Textarea id="proof-3" placeholder="Stats, case studies, or evidence..." rows={2} />
            </div>
          </div>

          <Button variant="outline" size="sm">
            + Add Another Objection
          </Button>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices & Tips</CardTitle>
          <CardDescription>Provide guidance on what to do and what to avoid</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dos">Do's</Label>
            <Textarea id="dos" placeholder="List best practices when handling these objections..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donts">Don'ts</Label>
            <Textarea id="donts" placeholder="What should reps avoid saying or doing?" rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Source & Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Source & Tags</CardTitle>
          <CardDescription>Link to source documents and add organizational tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Source Document (Optional)</Label>
            <Input id="source" type="url" placeholder="Link to Google Doc, Notion page, or file..." />
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
