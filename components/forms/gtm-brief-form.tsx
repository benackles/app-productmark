"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Tag } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function GTMBriefForm() {
  const [launchDate, setLaunchDate] = useState<Date>()

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Define the campaign type, launch date, and executive summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Brief Title*</Label>
            <Input id="title" placeholder="e.g., Q1 2024 Product Launch Brief" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Campaign Type*</Label>
              <Select>
                <SelectTrigger id="campaign-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-launch">Product Launch</SelectItem>
                  <SelectItem value="feature-release">Feature Release</SelectItem>
                  <SelectItem value="demand-gen">Demand Generation</SelectItem>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="event">Event Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Launch Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !launchDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {launchDate ? format(launchDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={launchDate} onSelect={setLaunchDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="executive-summary">Executive Summary*</Label>
            <Textarea
              id="executive-summary"
              placeholder="Provide a high-level overview of the GTM initiative..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle>Target Audience</CardTitle>
          <CardDescription>Define the personas and market segments you're targeting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-personas">Target Personas*</Label>
            <Textarea
              id="target-personas"
              placeholder="Describe the primary personas this campaign targets..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-segments">Market Segments</Label>
            <Textarea
              id="target-segments"
              placeholder="List target market segments, industries, or verticals..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Messaging & Positioning */}
      <Card>
        <CardHeader>
          <CardTitle>Messaging & Positioning</CardTitle>
          <CardDescription>Define your value proposition and key messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value-prop">Value Proposition*</Label>
            <Textarea id="value-prop" placeholder="What is the core value proposition?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key-messages">Key Messages</Label>
            <Textarea id="key-messages" placeholder="List 3-5 key messages to communicate..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="competitive-diff">Competitive Differentiation</Label>
            <Textarea id="competitive-diff" placeholder="How does this differentiate from competitors?" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Channel Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Strategy</CardTitle>
          <CardDescription>Outline the marketing channels and tactics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channels">Marketing Channels*</Label>
            <Textarea
              id="channels"
              placeholder="List the channels to be used (e.g., email, social, events, PR)..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tactics">Key Tactics</Label>
            <Textarea id="tactics" placeholder="Describe specific tactics for each channel..." rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Goals & Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Goals & Success Metrics</CardTitle>
          <CardDescription>Define campaign goals and key performance indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">Campaign Goals*</Label>
            <Textarea
              id="goals"
              placeholder="What are the primary goals? (e.g., leads, pipeline, awareness)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kpis">Key Performance Indicators</Label>
            <Textarea
              id="kpis"
              placeholder="List specific KPIs and targets (e.g., 500 MQLs, $2M pipeline)..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline & Budget */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline & Budget</CardTitle>
          <CardDescription>Outline key milestones and budget allocation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timeline">Key Milestones</Label>
            <Textarea id="timeline" placeholder="List important dates and milestones..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Allocation</Label>
            <Textarea id="budget" placeholder="Provide budget breakdown by channel or activity..." rows={3} />
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
        <Button>Create GTM Brief</Button>
      </div>
    </div>
  )
}
