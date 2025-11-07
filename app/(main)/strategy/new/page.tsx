import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, MessageSquare, Rocket } from "lucide-react"
import Link from "next/link"

export default function NewStrategyPage() {
  console.log("[v0] NewStrategyPage rendering")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Strategic Framework</h1>
        <p className="text-muted-foreground text-sm">
          Pick a framework to shape your positioning, messaging, or GTM plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/strategy/new/target-audience">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Target Audience
              </CardTitle>
              <CardDescription>Define ideal customer profiles and buyer personas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Identify and document the companies and individuals who are the best fit for your product.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/positioning">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Positioning
              </CardTitle>
              <CardDescription>Establish your unique value and competitive differentiation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use the Positioning Canvas to capture what makes your product different and why it matters.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/messaging">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Messaging
              </CardTitle>
              <CardDescription>Craft compelling narratives and value propositions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create messaging houses and sales pitch narratives that resonate with your audience.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/gtm-planning">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                GTM Planning
              </CardTitle>
              <CardDescription>Plan go-to-market strategy and execution roadmap</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build launch frameworks or campaign plans with task boards and RACI assignments.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
