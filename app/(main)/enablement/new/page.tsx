import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const assetTypes = [
  {
    id: "competitive-battle-card",
    title: "Competitive Battle Card",
    description: "Create comprehensive battle cards to compete effectively against key competitors",
    icon: "⚔️",
    href: "/enablement/new/competitive-battle-card",
  },
  {
    id: "messaging-document",
    title: "Messaging Document",
    description: "Develop clear, consistent messaging frameworks for your product or campaign",
    icon: "💬",
    href: "/enablement/new/messaging-document",
  },
  {
    id: "website-copy",
    title: "Website Copy Document",
    description:
      "Create clear, persuasive website content aligned to your messaging framework—covering landing pages, product pages, and key marketing sections.",
    icon: "🌐",
    href: "/enablement/new/website-copy",
  },
  {
    id: "sales-pitch-deck",
    title: "Sales Pitch Deck",
    description: "Build persuasive pitch decks that close deals and win customers",
    icon: "📊",
    href: "/enablement/new/sales-pitch-deck",
  },
  {
    id: "gtm-brief",
    title: "GTM Brief",
    description: "Comprehensive go-to-market brief covering strategy, messaging, and execution plan",
    icon: "🚀",
    href: "/enablement/new/gtm-brief",
  },
  {
    id: "gtm-playbook",
    title: "GTM Playbook",
    description: "Complete playbook with positioning, competitive analysis, pricing, sales enablement, and launch plan",
    icon: "📋",
    href: "/enablement/new/gtm-playbook",
  },
  {
    id: "case-study",
    title: "Case Study",
    description: "Document customer success stories with compelling before/after narratives",
    icon: "📖",
    href: "/enablement/new/case-study",
  },
  {
    id: "demo-script",
    title: "Demo Script",
    description: "Create structured demo flows that highlight key features and value propositions",
    icon: "🎬",
    href: "/enablement/new/demo-script",
  },
  {
    id: "objection-handling",
    title: "Objection Handling Guide",
    description: "Prepare your team to address common objections with confidence and data",
    icon: "🛡️",
    href: "/enablement/new/objection-handling",
  },
]

export default function NewEnablementAssetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Enablement Asset</h1>
        <p className="text-muted-foreground mt-2">Choose the type of sales enablement asset you want to create</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assetTypes.map((type) => (
          <Link key={type.id} href={type.href}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{type.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
