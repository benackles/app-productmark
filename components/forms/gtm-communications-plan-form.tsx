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
import { CalendarIcon, Tag, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CommunicationTactic {
  id: string
  channel: string
  contentType: string
  audience: string
  timing: string
  owner: string
}

export function GTMCommunicationsPlanForm() {
  const [launchDate, setLaunchDate] = useState<Date>()
  const [tactics, setTactics] = useState<CommunicationTactic[]>([
    { id: "1", channel: "", contentType: "", audience: "", timing: "", owner: "" },
  ])

  const addTactic = () => {
    setTactics([
      ...tactics,
      { id: Date.now().toString(), channel: "", contentType: "", audience: "", timing: "", owner: "" },
    ])
  }

  const removeTactic = (id: string) => {
    if (tactics.length > 1) {
      setTactics(tactics.filter((t) => t.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>Define the campaign you're launching and link to foundational strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Communications Plan Title*</Label>
            <Input id="title" placeholder="e.g., Q2 Product Launch Communications Plan" />
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
                  <SelectItem value="company-announcement">Company Announcement</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="campaign">Marketing Campaign</SelectItem>
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
            <Label htmlFor="overview">Campaign Overview*</Label>
            <Textarea id="overview" placeholder="Brief description of what you're launching..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gtm-brief-link">Link to GTM Brief/Strategy</Label>
            <Input id="gtm-brief-link" type="url" placeholder="Link to your GTM Brief or Strategy document..." />
          </div>
        </CardContent>
      </Card>

      {/* Core Messaging */}
      <Card>
        <CardHeader>
          <CardTitle>Core Messaging</CardTitle>
          <CardDescription>Reference your messaging framework and define key narratives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="messaging-framework-link">Link to Messaging Framework</Label>
            <Input
              id="messaging-framework-link"
              type="url"
              placeholder="Link to Messaging House, Tone of Voice Guide, etc..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Primary Launch Headline*</Label>
            <Input id="headline" placeholder="e.g., Introducing AI-Powered Insights for Enterprise Teams" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key-messages">Key Messages (3-5)*</Label>
            <Textarea
              id="key-messages"
              placeholder="List the core messages that should appear across all communications..."
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="narrative">Narrative Arc</Label>
            <Textarea
              id="narrative"
              placeholder="Describe the story you're telling: problem, solution, outcome..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Target Audiences */}
      <Card>
        <CardHeader>
          <CardTitle>Target Audiences</CardTitle>
          <CardDescription>Define who you're communicating with and tailor messaging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="internal-audiences">Internal Audiences*</Label>
            <Textarea
              id="internal-audiences"
              placeholder="List internal stakeholders (e.g., Sales, CS, Engineering, Executives)..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="external-audiences">External Audiences*</Label>
            <Textarea
              id="external-audiences"
              placeholder="List external audiences (e.g., Customers, Prospects, Press, Partners)..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience-segmentation">Audience-Specific Messaging</Label>
            <Textarea
              id="audience-segmentation"
              placeholder="How does messaging differ for each audience segment?"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Channels</CardTitle>
          <CardDescription>Identify all channels you'll use to reach your audiences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="internal-channels">Internal Channels*</Label>
            <Textarea
              id="internal-channels"
              placeholder="e.g., All-hands meeting, Slack announcement, Email, Internal blog..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="external-channels">External Channels*</Label>
            <Textarea
              id="external-channels"
              placeholder="e.g., Email campaign, Blog post, Social media, Press release, Webinar..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paid-channels">Paid/Amplification Channels</Label>
            <Textarea
              id="paid-channels"
              placeholder="e.g., LinkedIn ads, Google Ads, Sponsored content, Influencer partnerships..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content & Tactics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content & Tactics</CardTitle>
              <CardDescription>Map out specific content pieces and communication tactics</CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addTactic}>
              <Plus className="h-4 w-4 mr-2" />
              Add Tactic
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {tactics.map((tactic, index) => (
            <div key={tactic.id} className="p-4 border rounded-lg space-y-4 relative">
              {tactics.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removeTactic(tactic.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              <div className="font-medium text-sm text-muted-foreground">Tactic {index + 1}</div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <Input placeholder="e.g., Email, Blog, Social, Press" />
                </div>

                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Input placeholder="e.g., Announcement, Tutorial, Case Study" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Input placeholder="e.g., Enterprise customers" />
                </div>

                <div className="space-y-2">
                  <Label>Timing</Label>
                  <Input placeholder="e.g., L-7 days, Launch day" />
                </div>

                <div className="space-y-2">
                  <Label>Owner</Label>
                  <Input placeholder="e.g., PMM, Comms" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Timeline & Sequencing */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline & Sequencing</CardTitle>
          <CardDescription>Define the communication timeline and critical milestones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pre-launch">Pre-Launch Activities (L-30 to L-1)</Label>
            <Textarea
              id="pre-launch"
              placeholder="Internal prep, teaser campaigns, media briefings, beta communications..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="launch-day">Launch Day Activities</Label>
            <Textarea
              id="launch-day"
              placeholder="Press release, blog post, email blast, social posts, all-hands announcement..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-launch">Post-Launch Activities (L+1 to L+30)</Label>
            <Textarea
              id="post-launch"
              placeholder="Follow-up content, customer stories, webinars, ongoing promotion..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stakeholder Management */}
      <Card>
        <CardHeader>
          <CardTitle>Stakeholder Management</CardTitle>
          <CardDescription>Coordinate approvals and communication with key stakeholders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="approval-chain">Approval Chain*</Label>
            <Textarea
              id="approval-chain"
              placeholder="Who needs to approve what? (e.g., Legal for press release, CEO for investor comms)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key-stakeholders">Key Stakeholders</Label>
            <Textarea
              id="key-stakeholders"
              placeholder="List stakeholders who need to be informed or consulted..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="executive-talking-points">Executive Talking Points</Label>
            <Textarea
              id="executive-talking-points"
              placeholder="Key talking points for executives and spokespeople..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Measurement & Success */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement & Success Criteria</CardTitle>
          <CardDescription>Define how you'll measure the success of your communications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kpis">Key Performance Indicators*</Label>
            <Textarea
              id="kpis"
              placeholder="e.g., Media mentions, email open rates, social engagement, website traffic..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="success-metrics">Success Metrics & Targets</Label>
            <Textarea
              id="success-metrics"
              placeholder="Specific targets for each KPI (e.g., 50 media mentions, 40% email open rate)..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reporting-plan">Reporting Plan</Label>
            <Textarea
              id="reporting-plan"
              placeholder="How and when will you report on results? Who receives updates?"
              rows={3}
            />
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
        <Button>Create Communications Plan</Button>
      </div>
    </div>
  )
}
