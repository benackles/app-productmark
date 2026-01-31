import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, User, Target, MessageSquare, Rocket, Megaphone, Mic2 } from "lucide-react"
import Link from "next/link"

const frameworks = [
  {
    id: "icp",
    name: "Ideal Customer Profile",
    description: "Define the companies that are the best fit for your product",
    category: "Target Audience",
    icon: Building2,
    href: "/strategy/new/build?framework=icp",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "persona",
    name: "Buyer Persona",
    description: "Document the individuals who buy and use your product",
    category: "Target Audience",
    icon: User,
    href: "/strategy/new/build?framework=persona",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "positioning",
    name: "Positioning Canvas",
    description: "Capture what makes your product different and why it matters",
    category: "Positioning",
    icon: Target,
    href: "/strategy/new/build?framework=positioning",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "messaging-house",
    name: "Messaging House",
    description: "Build a hierarchy of value, benefit, and feature messages",
    category: "Messaging",
    icon: MessageSquare,
    href: "/strategy/new/build?framework=messaging-house",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "sales-pitch",
    name: "Sales Pitch Narrative",
    description: "Craft a compelling story that moves prospects to action",
    category: "Messaging",
    icon: Mic2,
    href: "/strategy/new/build?framework=sales-pitch",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "launch",
    name: "Launch Framework",
    description: "Plan and execute a product or feature launch",
    category: "GTM Planning",
    icon: Rocket,
    href: "/strategy/new/build?framework=launch",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "campaign",
    name: "Campaign Plan",
    description: "Structure a marketing campaign with clear goals and tactics",
    category: "GTM Planning",
    icon: Megaphone,
    href: "/strategy/new/build?framework=campaign",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const categories = ["Target Audience", "Positioning", "Messaging", "GTM Planning"]

export default function NewStrategyPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Build a Strategic Framework</h1>
        <p className="text-muted-foreground max-w-2xl text-balance">
          Select a framework to start a guided conversation. Answer questions, capture reasoning, and progressively lock
          in decisions that shape your strategy.
        </p>
      </div>

      {categories.map((category) => {
        const categoryFrameworks = frameworks.filter((f) => f.category === category)
        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{category}</h2>
              <Badge variant="secondary" className="text-xs">
                {categoryFrameworks.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryFrameworks.map((framework) => {
                const Icon = framework.icon
                return (
                  <Link key={framework.id} href={framework.href}>
                    <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${framework.bgColor} group-hover:scale-105 transition-transform`}>
                            <Icon className={`h-5 w-5 ${framework.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base">{framework.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-sm">{framework.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
