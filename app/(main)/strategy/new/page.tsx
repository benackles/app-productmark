import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, MessageSquare, Rocket, Sparkles } from "lucide-react"
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

      <Link href="/strategy/new/ai-guided">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Guided Strategy Builder
              <span className="ml-auto text-xs font-normal bg-primary/20 text-primary px-2 py-1 rounded-full">
                Recommended
              </span>
            </CardTitle>
            <CardDescription>An AI-assisted conversation that guides you through the right questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Turn structured conversations into clear, actionable strategy for audience, positioning, messaging, and
              GTM.
            </p>
          </CardContent>
        </Card>
      </Link>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Or choose a specific framework</h2>
        <p className="text-xs text-muted-foreground">Start with a template if you prefer a structured form</p>
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
