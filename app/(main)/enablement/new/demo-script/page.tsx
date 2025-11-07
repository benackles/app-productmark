"use client"

import { Monitor, FileText, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DemoScriptPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-indigo-100 p-3">
          <Monitor className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create Demo Script</h1>
          <p className="text-muted-foreground mt-1">
            Create a structured demo script to help your team deliver consistent, compelling product demonstrations.
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Script Title*</Label>
            <Input id="title" placeholder="e.g., Enterprise Product Demo Script" />
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
                  <SelectItem value="technical">Technical Users</SelectItem>
                  <SelectItem value="executives">Executives</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Demo Duration*</Label>
              <Select>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Demo Overview*</Label>
            <Textarea id="overview" placeholder="Provide a brief description of this demo script..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Introduction (2-3 minutes)</h3>

          <div className="space-y-2">
            <Label htmlFor="opening">Opening Statement</Label>
            <Textarea id="opening" placeholder="How do you open the demo? Set expectations and agenda..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discovery">Discovery Questions</Label>
            <Textarea id="discovery" placeholder="Key questions to ask before diving into the demo..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Demo Flow */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Demo Flow & Features</h3>

          <div className="space-y-2">
            <Label htmlFor="feature-1">Feature 1 Demo*</Label>
            <Input id="feature-1-name" placeholder="Feature name" className="mb-2" />
            <Textarea
              id="feature-1"
              placeholder="Script for demonstrating this feature, key points to highlight, and value prop..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feature-2">Feature 2 Demo</Label>
            <Input id="feature-2-name" placeholder="Feature name" className="mb-2" />
            <Textarea id="feature-2" placeholder="Script for demonstrating this feature..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feature-3">Feature 3 Demo</Label>
            <Input id="feature-3-name" placeholder="Feature name" className="mb-2" />
            <Textarea id="feature-3" placeholder="Script for demonstrating this feature..." rows={4} />
          </div>

          <Button variant="outline" size="sm">
            + Add Another Feature
          </Button>
        </CardContent>
      </Card>

      {/* Transitions & Handling */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Transitions & Objection Handling</h3>

          <div className="space-y-2">
            <Label htmlFor="transitions">Transition Statements</Label>
            <Textarea id="transitions" placeholder="Key phrases to move between features and sections..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objections">Common Questions & Objections</Label>
            <Textarea
              id="objections"
              placeholder="List common questions/objections and how to address them during the demo..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Closing */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Closing & Next Steps</h3>

          <div className="space-y-2">
            <Label htmlFor="summary">Demo Summary</Label>
            <Textarea id="summary" placeholder="How do you summarize and reinforce key points?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta">Call to Action & Next Steps</Label>
            <Textarea id="cta" placeholder="What should happen after the demo? How do you close?" rows={3} />
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
