"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Plus, X, Users } from "lucide-react"
import Link from "next/link"
import { mockTeamMembers } from "@/lib/mock-billing"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Plan } from "@/lib/mock-billing"

interface CurrentPlanCardProps {
  currentPlan: Plan | undefined
}

export function CurrentPlanCard({ currentPlan }: CurrentPlanCardProps) {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [showAddMember, setShowAddMember] = useState(false)
  const [showManagePlan, setShowManagePlan] = useState(false)

  const includedMembers = teamMembers.filter((m) => m.isIncluded)
  const additionalMembers = teamMembers.filter((m) => !m.isIncluded)
  const additionalMemberCostPerMonth = currentPlan?.currentBillingCycle === "annual" ? 22 : 29
  const additionalMemberCost = additionalMembers.length * additionalMemberCostPerMonth

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== memberId))
  }

  const currentPrice =
    currentPlan?.currentBillingCycle === "annual" ? currentPlan.annualPrice : currentPlan.monthlyPrice
  const billingInterval = currentPlan?.currentBillingCycle === "annual" ? "month (billed annually)" : "month"
  const totalMonthlyCost = (currentPrice || 0) + additionalMemberCost

  if (!currentPlan) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <CardDescription>You are currently on the {currentPlan.name} plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-2xl">{currentPlan.name}</h3>
              <Badge variant="secondary">Current</Badge>
            </div>
            <p className="text-muted-foreground text-sm">{currentPlan.description}</p>

            <div className="mt-4 rounded-lg border bg-muted/30 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Base plan</span>
                  <span className="font-medium">
                    ${currentPrice}/{billingInterval}
                  </span>
                </div>
                {additionalMembers.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Additional members ({additionalMembers.length})</span>
                    <span className="font-medium">${additionalMemberCost}/month</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-2xl">${totalMonthlyCost}/month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dialog open={showManagePlan} onOpenChange={setShowManagePlan}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                Manage Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Manage Your Plan</DialogTitle>
                <DialogDescription>Make changes to your {currentPlan.name} subscription</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Change Plan */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Change Plan</h4>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/settings/billing/plans">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View All Plans
                    </Link>
                  </Button>
                </div>

                {/* Billing Cycle */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Billing Cycle</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={currentPlan.currentBillingCycle === "monthly" ? "default" : "outline"}
                      className="flex-1"
                      disabled={currentPlan.currentBillingCycle === "monthly"}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={currentPlan.currentBillingCycle === "annual" ? "default" : "outline"}
                      className="flex-1"
                      disabled={currentPlan.currentBillingCycle === "annual"}
                    >
                      Annual
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Save 25%
                      </Badge>
                    </Button>
                  </div>
                </div>

                {/* Next Billing Date */}
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Next billing date</p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="font-semibold">${totalMonthlyCost}</p>
                  </div>
                </div>

                {/* Cancel Subscription */}
                <div className="border-t pt-4">
                  <Button
                    variant="ghost"
                    className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {currentPlan.id === "team" && (
          <div className="border-t pt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium text-sm">Team Members</p>
                <Badge variant="outline" className="text-xs">
                  {teamMembers.length} total
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent"
                onClick={() => setShowAddMember(!showAddMember)}
              >
                <Plus className="mr-1 h-3 w-3" />
                Add Member
              </Button>
            </div>

            {/* Included members */}
            <div className="mb-3 space-y-2">
              <p className="text-muted-foreground text-xs">Included in plan (2 members)</p>
              {includedMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6b8f71] text-white text-xs font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-muted-foreground text-xs">{member.email}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {member.role === "team_leader" ? "Team Leader" : "Team Member"}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Additional members */}
            {additionalMembers.length > 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs">
                  Additional members (+${additionalMemberCostPerMonth}/member/month)
                </p>
                {additionalMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6b8f71] text-white text-xs font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-muted-foreground text-xs">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">${additionalMemberCostPerMonth}/mo</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add member form */}
            {showAddMember && (
              <div className="mt-3 rounded-lg border bg-muted/30 p-4">
                <p className="mb-3 font-medium text-sm">Add Team Member</p>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-sm">Email</label>
                    <input
                      type="email"
                      placeholder="colleague@company.com"
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border bg-background p-3">
                    <div>
                      <p className="font-medium text-sm">Additional team member</p>
                      <p className="text-muted-foreground text-xs">Billed monthly with your subscription</p>
                    </div>
                    <p className="font-semibold">${additionalMemberCostPerMonth}/mo</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-[#6b8f71] hover:bg-[#5a7860]">
                      Send Invitation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={() => setShowAddMember(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="border-t pt-4">
          <p className="mb-2 font-medium text-sm">Plan includes:</p>
          <ul className="space-y-1 text-muted-foreground text-sm">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-[#6b8f71]">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
