"use client"

import { FileText, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MessagingDocumentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-blue-100 p-3">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create Messaging Document</h1>
          <p className="text-muted-foreground mt-1">
            Create a comprehensive messaging document to align your team on value propositions and key messages.
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title*</Label>
            <Input id="title" placeholder="e.g., Q1 2024 Product Messaging" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-audience">Target Audience*</Label>
            <Select>
              <SelectTrigger id="target-audience">
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="executives">C-Level Executives</SelectItem>
                <SelectItem value="managers">Department Managers</SelectItem>
                <SelectItem value="practitioners">Practitioners</SelectItem>
                <SelectItem value="technical">Technical Buyers</SelectItem>
                <SelectItem value="general">General Audience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Overview*</Label>
            <Textarea id="overview" placeholder="Provide a brief overview of this messaging document..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Core Messaging */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Core Messaging</h3>

          <div className="space-y-2">
            <Label htmlFor="value-prop">Value Proposition*</Label>
            <Textarea id="value-prop" placeholder="What is the core value proposition?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="elevator-pitch">Elevator Pitch</Label>
            <Textarea id="elevator-pitch" placeholder="A concise 30-second pitch..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key-messages">Key Messages</Label>
            <Textarea id="key-messages" placeholder="List 3-5 key messages (one per line)..." rows={5} />
          </div>
        </CardContent>
      </Card>

      {/* Positioning */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Positioning</h3>

          <div className="space-y-2">
            <Label htmlFor="positioning">Positioning Statement</Label>
            <Textarea
              id="positioning"
              placeholder="For [target audience], who [statement of need], our [product/service] is a [product category] that [statement of benefit]..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="differentiators">Key Differentiators</Label>
            <Textarea id="differentiators" placeholder="What makes you different from competitors?" rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Supporting Points */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Supporting Points</h3>

          <div className="space-y-2">
            <Label htmlFor="proof-points">Proof Points</Label>
            <Textarea
              id="proof-points"
              placeholder="List statistics, case studies, or evidence that supports your claims..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objections">Common Objections & Responses</Label>
            <Textarea id="objections" placeholder="List common objections and how to address them..." rows={4} />
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
