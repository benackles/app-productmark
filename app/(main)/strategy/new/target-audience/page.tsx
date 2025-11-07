import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, User, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function TargetAudiencePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Target Audience</h1>
        <p className="text-muted-foreground">Choose the type of target audience framework to create</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/strategy/new/target-audience/market-opportunity">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Market Opportunity
              </CardTitle>
              <CardDescription>Define TAM, SAM, and SOM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analyze the total addressable market, serviceable available market, and serviceable obtainable market to
                understand your growth potential.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/target-audience/icp">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Ideal Customer Profile (ICP)
              </CardTitle>
              <CardDescription>Define the right kind of company</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Document the characteristics of companies that are the best fit for your product, including
                firmographics, tech stack, and business model.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/target-audience/persona">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Persona
              </CardTitle>
              <CardDescription>Define the right person within that company</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create detailed profiles of the individuals who make or influence buying decisions, including their
                goals, challenges, and preferences.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
