import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Megaphone } from "lucide-react"
import Link from "next/link"

export default function GTMPlanningPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">GTM Planning</h1>
        <p className="text-muted-foreground">Choose the type of GTM framework to create</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/strategy/new/gtm-planning/launch">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Tiered Launch Framework
              </CardTitle>
              <CardDescription>Plan and execute product launches with phased rollout</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create a comprehensive launch plan with multiple phases, objectives, tactics, and deliverables for
                bringing new products to market.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/gtm-planning/campaign">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Campaign Framework
              </CardTitle>
              <CardDescription>Design and manage marketing campaigns with task tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build campaign plans with objectives, budgets, tactics, and timelines to drive demand generation and
                customer engagement.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
