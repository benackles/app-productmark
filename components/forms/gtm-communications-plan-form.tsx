"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tag, Plus, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Audience {
  id: string
  name: string
  persona: string
  priority: number
  desiredAction: string
}

interface ChannelAsset {
  id: string
  audienceName: string
  channel: string
  assetType: string
  visibility: string
  owner: string
  status: string
}

export function GTMCommunicationsPlanForm() {
  const [primaryGoal, setPrimaryGoal] = useState<string>("")
  const [audiences, setAudiences] = useState<Audience[]>([
    { id: "1", name: "", persona: "", priority: 1, desiredAction: "" },
  ])
  const [channelAssets, setChannelAssets] = useState<ChannelAsset[]>([
    { id: "1", audienceName: "", channel: "", assetType: "", visibility: "external", owner: "", status: "planned" },
  ])

  const addAudience = () => {
    setAudiences([
      ...audiences,
      { id: Date.now().toString(), name: "", persona: "", priority: audiences.length + 1, desiredAction: "" },
    ])
  }

  const removeAudience = (id: string) => {
    if (audiences.length > 1) {
      setAudiences(audiences.filter((a) => a.id !== id))
    }
  }

  const addChannelAsset = () => {
    setChannelAssets([
      ...channelAssets,
      {
        id: Date.now().toString(),
        audienceName: "",
        channel: "",
        assetType: "",
        visibility: "external",
        owner: "",
        status: "planned",
      },
    ])
  }

  const removeChannelAsset = (id: string) => {
    if (channelAssets.length > 1) {
      setChannelAssets(channelAssets.filter((a) => a.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Launch Context (Inherited) */}
      <Card>
        <CardHeader>
          <CardTitle>Launch Context</CardTitle>
          <CardDescription>Inherited from GTM Planning (read-only)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              These fields are inherited from your GTM Planning framework and cannot be edited here.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="gtm-brief-link">Link to GTM Brief*</Label>
            <Input id="gtm-brief-link" type="url" placeholder="Select or link to your GTM Brief..." />
          </div>

          <div className="grid md:grid-cols-2 gap-4 opacity-60 pointer-events-none">
            <div className="space-y-2">
              <Label>Launch Name</Label>
              <Input value="Q2 Product Launch" disabled />
            </div>

            <div className="space-y-2">
              <Label>Product / Feature</Label>
              <Input value="AI-Powered Analytics" disabled />
            </div>

            <div className="space-y-2">
              <Label>Launch Type</Label>
              <Input value="New Product Launch" disabled />
            </div>

            <div className="space-y-2">
              <Label>GTM Motion</Label>
              <Input value="Product-Led Growth" disabled />
            </div>
          </div>

          <div className="space-y-2 opacity-60 pointer-events-none">
            <Label>Business Objective</Label>
            <Textarea value="Drive 500 qualified leads and $2M pipeline" disabled rows={2} />
          </div>
        </CardContent>
      </Card>

      {/* Primary Goal */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Goal</CardTitle>
          <CardDescription>Select ONE primary goal for this communications plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Select Your Primary Goal*</Label>
            <RadioGroup value={primaryGoal} onValueChange={setPrimaryGoal}>
              <div className="flex items-start space-x-3 space-y-0 p-3 border rounded-lg">
                <RadioGroupItem value="awareness" id="awareness" />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="awareness" className="font-medium cursor-pointer">
                    Awareness
                  </Label>
                  <p className="text-sm text-muted-foreground">Make people know this exists</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 p-3 border rounded-lg">
                <RadioGroupItem value="understanding" id="understanding" />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="understanding" className="font-medium cursor-pointer">
                    Understanding
                  </Label>
                  <p className="text-sm text-muted-foreground">Help people grasp what it does and why it matters</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 p-3 border rounded-lg">
                <RadioGroupItem value="adoption" id="adoption" />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="adoption" className="font-medium cursor-pointer">
                    Adoption
                  </Label>
                  <p className="text-sm text-muted-foreground">Drive signups, trials, purchases, or active usage</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 p-3 border rounded-lg">
                <RadioGroupItem value="enablement" id="enablement" />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="enablement" className="font-medium cursor-pointer">
                    Enablement
                  </Label>
                  <p className="text-sm text-muted-foreground">Equip internal teams to sell, support, or advocate</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="success-looks-like">Success looks like...*</Label>
            <Input id="success-looks-like" placeholder="One sentence describing what success means for this goal" />
            <p className="text-xs text-muted-foreground">
              Be specific. Example: "Sales can confidently position the new feature in discovery calls"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Target Audiences */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Target Audiences</CardTitle>
              <CardDescription>Define priority audiences and their desired actions</CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addAudience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Audience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Each audience can have only ONE desired action to maintain clarity and focus.
            </AlertDescription>
          </Alert>

          {audiences.map((audience, index) => (
            <div key={audience.id} className="p-4 border rounded-lg space-y-4 relative">
              {audiences.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removeAudience(audience.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              <div className="font-medium text-sm">Audience {index + 1}</div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Audience Name*</Label>
                  <Input placeholder="e.g., Enterprise Buyers" />
                </div>

                <div className="space-y-2">
                  <Label>Persona / Segment*</Label>
                  <Input placeholder="e.g., VP Engineering" />
                </div>

                <div className="space-y-2">
                  <Label>Priority Order*</Label>
                  <Select defaultValue={audience.priority.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {audiences.map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Desired Action (ONE only)*</Label>
                <Input placeholder="e.g., Sign up for product demo" />
                <p className="text-xs text-muted-foreground">
                  What is the single most important action for this audience?
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Core Message (Message Spine) */}
      <Card>
        <CardHeader>
          <CardTitle>Core Message (Message Spine)</CardTitle>
          <CardDescription>Define the single most important message that drives all communications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smit">Single Most Important Takeaway (SMIT)*</Label>
            <Textarea id="smit" placeholder="The one thing you want every audience to remember..." rows={2} />
            <p className="text-xs text-muted-foreground">
              This SMIT will be referenced across all downstream assets to ensure message consistency.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">2–3 Value-Led Benefits*</Label>
            <Textarea
              id="benefits"
              placeholder="List benefits before features. Focus on outcomes, not capabilities."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-cta">Primary Call-to-Action*</Label>
            <Input id="primary-cta" placeholder="e.g., Start your free trial" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof-points">Supporting Proof Points</Label>
            <Textarea
              id="proof-points"
              placeholder="Statistics, customer quotes, awards, third-party validation..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objections">Top Objections (Optional)</Label>
            <Textarea id="objections" placeholder="Common concerns or objections and how to address them..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Channel & Asset Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Channel & Asset Plan</CardTitle>
              <CardDescription>Map channels and assets to target audiences</CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addChannelAsset}>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Every asset must map to an audience and have an assigned owner before shipping.
            </AlertDescription>
          </Alert>

          {channelAssets.map((asset, index) => (
            <div key={asset.id} className="p-4 border rounded-lg space-y-4 relative">
              {channelAssets.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removeChannelAsset(asset.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              <div className="font-medium text-sm text-muted-foreground">Asset {index + 1}</div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Audience*</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise Buyers</SelectItem>
                      <SelectItem value="smb">SMB Decision Makers</SelectItem>
                      <SelectItem value="existing">Existing Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Channel*</Label>
                  <Input placeholder="e.g., Email, Blog, LinkedIn" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Asset Type*</Label>
                  <Input placeholder="e.g., Launch Email, Demo Video" />
                </div>

                <div className="space-y-2">
                  <Label>Visibility*</Label>
                  <Select defaultValue={asset.visibility}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="external">External</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status*</Label>
                  <Select defaultValue={asset.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Owner*</Label>
                <Input placeholder="Who is responsible for creating and shipping this asset?" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Timeline & Phases */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline & Phases</CardTitle>
          <CardDescription>Plan communication across pre-launch, launch, and post-launch phases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pre-launch">Pre-Launch Phase</Label>
            <Textarea
              id="pre-launch"
              placeholder="Internal prep, soft announcements, teaser campaigns, beta communications..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="launch">Launch Phase</Label>
            <Textarea
              id="launch"
              placeholder="Main announcement, press release, coordinated outreach, launch events..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-launch">Post-Launch Phase*</Label>
            <Textarea
              id="post-launch"
              placeholder="Reinforcement campaigns, customer stories, ongoing education, feedback loops..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Post-launch phase is required to ensure sustained impact and message reinforcement.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Internal Enablement Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Internal Enablement Notes</CardTitle>
          <CardDescription>Equip internal teams with clear, actionable context</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Write for frontline teams (Sales, CS, Support), not marketers.</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="sales-explanation">One-Sentence Explanation for Sales*</Label>
            <Input id="sales-explanation" placeholder="How would a sales rep explain this in 10 seconds?" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="what-changed">What Changed vs. Before</Label>
            <Textarea
              id="what-changed"
              placeholder="Help teams understand what's new, what's different, and why it matters..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="for-not-for">Who It's For / Not For</Label>
            <Textarea id="for-not-for" placeholder="Help teams quickly qualify the right fit..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="questions-go">Where Questions Go</Label>
            <Input id="questions-go" placeholder="e.g., #product-launch-q2 Slack channel" />
          </div>
        </CardContent>
      </Card>

      {/* Metrics & Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Metrics & Feedback</CardTitle>
          <CardDescription>Define how you'll measure success and gather feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primary-metric">Primary Metric (tied to your goal)*</Label>
            <Input id="primary-metric" placeholder="e.g., 500 demo requests (if goal is Adoption)" />
            <p className="text-xs text-muted-foreground">
              This metric must directly map to your selected primary goal above.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-metrics">Secondary Metrics</Label>
            <Textarea
              id="secondary-metrics"
              placeholder="Other metrics to track (e.g., email open rates, social engagement, press mentions)..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-sources">Qualitative Feedback Sources</Label>
            <Textarea
              id="feedback-sources"
              placeholder="Where will you gather qualitative feedback? (e.g., Sales calls, customer interviews, surveys)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-date">Review Date*</Label>
            <Input id="review-date" type="date" />
          </div>
        </CardContent>
      </Card>

      {/* Ownership */}
      <Card>
        <CardHeader>
          <CardTitle>Ownership</CardTitle>
          <CardDescription>Define who's responsible for the overall plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No communications plan can ship without a designated overall owner.</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="overall-owner">Overall Owner*</Label>
            <Input id="overall-owner" placeholder="Who is accountable for this communications plan?" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contributors">Contributors</Label>
            <Textarea id="contributors" placeholder="List team members contributing to execution..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewers">Reviewers / Approvers (Optional)</Label>
            <Textarea
              id="reviewers"
              placeholder="Who needs to review or approve before launch? (e.g., Legal, Exec team)"
              rows={2}
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
