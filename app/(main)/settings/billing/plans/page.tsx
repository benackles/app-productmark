"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { mockPlans } from "@/lib/mock-billing"
import { useState } from "react"

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual")

  const currentPlan = mockPlans.find((plan) => plan.isCurrent)
  const currentPlanIndex = mockPlans.findIndex((plan) => plan.isCurrent)

  const getButtonText = (plan: (typeof mockPlans)[0], planIndex: number) => {
    if (plan.isCurrent) return "Current Plan"
    if (currentPlanIndex === -1) {
      // No current plan, show default marketing CTAs
      return plan.annualPrice === 0 ? "Get Started Free →" : "Start Free Trial →"
    }
    // User has a plan, show contextual CTAs
    if (planIndex < currentPlanIndex) return "Downgrade"
    if (planIndex > currentPlanIndex) return "Upgrade"
    return "Change Plan"
  }

  const getPrice = (plan: (typeof mockPlans)[0]) => {
    return billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-16">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="bg-transparent">
          <Link href="/settings/billing">← Back to Billing</Link>
        </Button>
      </div>

      <div className="text-center space-y-3">
        <h1 className="font-bold tracking-tight text-4xl">Build a plan for every go-to-market.</h1>
        <p className="text-muted-foreground text-lg">Start free, then scale your strategy as your team grows.</p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <span className={billingCycle === "monthly" ? "font-medium text-foreground" : "text-muted-foreground"}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === "annual" ? "monthly" : "annual")}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: billingCycle === "annual" ? "#6b8f71" : "#e5e7eb" }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              billingCycle === "annual" ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className={billingCycle === "annual" ? "font-medium text-foreground" : "text-muted-foreground"}>
          Annual
        </span>
        {billingCycle === "annual" && (
          <Badge variant="secondary" className="bg-[#6b8f71]/10 text-[#6b8f71]">
            Save 25%
          </Badge>
        )}
        {billingCycle === "monthly" && (
          <Badge variant="secondary" className="bg-[#6b8f71]/10 text-[#6b8f71]">
            Save 25%
          </Badge>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {mockPlans.map((plan, index) => (
          <Card
            key={plan.id}
            className={
              plan.isPopular
                ? "relative border-[#6b8f71] shadow-md"
                : plan.isCurrent
                  ? "border-[#6b8f71]"
                  : "border-border"
            }
          >
            <CardHeader className="space-y-4">
              <div className="space-y-1">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {plan.isCurrent && (
                  <Badge variant="secondary" className="w-fit">
                    Current Plan
                  </Badge>
                )}
              </div>

              <div>
                <span className="font-bold text-5xl">${getPrice(plan)}</span>
                <span className="text-muted-foreground text-sm"> per month</span>
                {billingCycle === "annual" && plan.annualPrice > 0 && (
                  <div className="text-muted-foreground text-xs mt-1">Billed annually at ${plan.annualPrice * 12}</div>
                )}
              </div>

              <p className="text-muted-foreground text-sm">{plan.description}</p>

              <Button
                className={plan.isCurrent ? "w-full" : "w-full bg-[#6b8f71] hover:bg-[#6b8f71]/90"}
                variant={plan.isCurrent ? "outline" : "default"}
                disabled={plan.isCurrent}
              >
                {getButtonText(plan, index)}
              </Button>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <p className="font-semibold text-sm">
                  {plan.id === "solo"
                    ? "Includes:"
                    : `Everything in ${plan.id === "assist" ? "Solo" : "Assist"}, plus:`}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6b8f71]" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border bg-muted/30 p-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="font-bold text-2xl">Need enterprise-grade features?</h2>
          <p className="text-muted-foreground">
            Our Scale plan offers advanced security, dedicated support, and custom integrations for large organizations.
          </p>
          <Button variant="outline" size="lg" className="bg-background">
            Contact Sales →
          </Button>
        </div>
      </div>
    </div>
  )
}
