import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Presentation, Globe, Volume2 } from "lucide-react"
import Link from "next/link"

export default function MessagingPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Messaging Frameworks</h1>
        <p className="text-muted-foreground">Choose the type of messaging framework to create</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/strategy/new/messaging/tone-of-voice">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                Tone of Voice Guide
              </CardTitle>
              <CardDescription>Define your brand's unique communication style</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Define how your brand communicates — the personality, principles, and writing style that make your
                message sound unmistakably yours.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/messaging/messaging-house">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Campaign Messaging House
              </CardTitle>
              <CardDescription>Lead with value, follow with benefit, finish with feature</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build a structured messaging framework that helps customers understand why your product matters before
                explaining what it does.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/messaging/website-copy-blueprint">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Website Copy Blueprint
              </CardTitle>
              <CardDescription>Structure your website content before writing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Define the structure, messaging, and flow of your website before writing—outlining key audiences, value
                propositions, page goals, and calls to action.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/strategy/new/messaging/sales-pitch">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Presentation className="h-5 w-5 text-primary" />
                Sales Pitch Narrative
              </CardTitle>
              <CardDescription>Guide prospects through why they should change, why now, and why you</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create a structured narrative that turns your positioning into a clear, conversational story that builds
                understanding and confidence.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
