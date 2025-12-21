"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function GTMCommunicationsPlanForm() {
  const [primaryGoal, setPrimaryGoal] = useState<string>("")

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

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Save as Draft</Button>
        <Button>Create Communications Plan</Button>
      </div>
    </div>
  )
}
