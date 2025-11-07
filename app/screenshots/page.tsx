"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Users, Target, TrendingUp, FileText, CheckCircle2, Clock, AlertCircle, Download } from "lucide-react"

type ScreenshotTheme = "insights" | "strategy" | "enablement" | "collaboration"

export default function ScreenshotsPage() {
  const [activeTheme, setActiveTheme] = useState<ScreenshotTheme>("insights")
  const [isDownloading, setIsDownloading] = useState(false)
  const screenshotRef = useRef<HTMLDivElement>(null)

  const themes = [
    { id: "insights" as const, label: "Capture Insights", color: "bg-primary" },
    { id: "strategy" as const, label: "Build Strategy", color: "bg-secondary" },
    { id: "enablement" as const, label: "Share Enablement", color: "bg-accent" },
    { id: "collaboration" as const, label: "Stay in Lockstep", color: "bg-muted" },
  ]

  const handleDownload = async () => {
    console.log("[v0] Download button clicked")
    setIsDownloading(true)

    try {
      const element = screenshotRef.current
      if (!element) {
        console.error("[v0] Screenshot element not found")
        alert("Screenshot element not found. Please try again.")
        setIsDownloading(false)
        return
      }

      // Hide focal guide before capture
      const focalGuide = element.querySelector(".focal-guide") as HTMLElement
      if (focalGuide) {
        console.log("[v0] Hiding focal guide")
        focalGuide.style.display = "none"
      }

      console.log("[v0] Loading html-to-image...")
      const { toPng } = await import("html-to-image")
      console.log("[v0] html-to-image loaded successfully")

      console.log("[v0] Starting screenshot capture...")
      const dataUrl = await toPng(element, {
        width: 1200,
        height: 1200,
        pixelRatio: 2,
        backgroundColor: null,
      })
      console.log("[v0] Screenshot captured successfully")

      // Show focal guide again
      if (focalGuide) {
        focalGuide.style.display = "block"
      }

      console.log("[v0] Creating download link...")
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `productmark-${activeTheme}-screenshot.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log("[v0] Download triggered successfully")
      setIsDownloading(false)
    } catch (error) {
      console.error("[v0] Error downloading screenshot:", error)
      alert(`Failed to download screenshot: ${error instanceof Error ? error.message : "Unknown error"}`)
      setIsDownloading(false)

      // Show focal guide again in case of error
      const focalGuide = screenshotRef.current?.querySelector(".focal-guide") as HTMLElement
      if (focalGuide) {
        focalGuide.style.display = "block"
      }
    }
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "linear-gradient(135deg, rgb(250, 248, 244) 0%, rgb(250, 248, 244) 100%)" }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketing Screenshots</h1>
            <p className="text-muted-foreground">1200x1200px (1:1) with 750x1200px (5:8) focal point</p>
          </div>
          <div className="flex gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant={activeTheme === theme.id ? "default" : "outline"}
                onClick={() => setActiveTheme(theme.id)}
                className="gap-2"
              >
                <div className={`h-2 w-2 rounded-full ${theme.color}`} />
                {theme.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Screenshot Container - 1200x1200 with centered 750px content area */}
        <div className="flex justify-center">
          <div
            ref={screenshotRef}
            className="relative rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: "1200px",
              height: "1200px",
            }}
          >
            {/* Focal Point Guide (5:8 ratio = 750x1200) - centered */}
            <div
              className="focal-guide absolute top-0 left-1/2 -translate-x-1/2 border-2 border-dashed border-primary/30 pointer-events-none z-50 opacity-30"
              style={{ width: "750px", height: "1200px" }}
            />

            <div className="relative w-full h-full flex items-center justify-center">
              <div style={{ width: "750px", maxHeight: "1200px" }} className="overflow-hidden">
                {activeTheme === "insights" && <InsightsScreenshot />}
                {activeTheme === "strategy" && <StrategyScreenshot />}
                {activeTheme === "enablement" && <EnablementScreenshot />}
                {activeTheme === "collaboration" && <CollaborationScreenshot />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleDownload} disabled={isDownloading} size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            {isDownloading ? "Downloading..." : "Download Screenshot"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Screenshot 1: Capture Insights That Matter
function InsightsScreenshot() {
  return (
    <div className="w-full p-6 flex flex-col">
      {/* Mock Insights Interface */}
      <div className="w-full space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search insights..."
            className="pl-10 h-12 text-base bg-white shadow-lg border-2"
            readOnly
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 border-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Customer</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-4 border-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Competitive</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </Card>
          <Card className="p-4 border-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Market</p>
                <p className="text-2xl font-bold">31</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Sample Insight Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-2 hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-primary">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <Badge className="bg-primary/10 text-primary px-3 py-1.5 rounded-full">Customer</Badge>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1.5">Enterprise customers need SSO within 48 hours</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Security teams at Fortune 500 companies require SSO as non-negotiable...
                </p>
              </div>
              <div className="flex gap-1.5">
                <Badge variant="outline" className="text-xs">
                  enterprise
                </Badge>
                <Badge variant="outline" className="text-xs">
                  security
                </Badge>
                <Badge variant="outline" className="text-xs">
                  blocker
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-2 hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-red-500">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <Badge className="bg-red-100 text-red-700 text-xs">Competitive</Badge>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1.5">Adobe launched AI analytics at $49/month</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Their features are comparable but significantly cheaper, creating pricing pressure...
                </p>
              </div>
              <div className="flex gap-1.5">
                <Badge variant="outline" className="text-xs">
                  pricing
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ai
                </Badge>
                <Badge variant="outline" className="text-xs">
                  threat
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Screenshot 2: Build Strategy That Sticks
function StrategyScreenshot() {
  return (
    <div className="w-full p-6 flex flex-col">
      {/* Mock Kanban Board */}
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-1.5">Q1 Enterprise Launch</h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
              <span>12 of 24 tasks complete</span>
            </div>
            <Badge variant="outline" className="text-xs">
              Launch
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2.5">
          {/* Backlog */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xs">Backlog</h3>
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                3
              </Badge>
            </div>
            <Card className="p-3 border-2">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-medium text-xs leading-tight">Create demo video</h4>
                  <Badge className="bg-yellow-100 text-yellow-700 text-xs h-4 px-1.5 shrink-0">Med</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Product Marketing</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>8h</span>
                </div>
              </div>
            </Card>
          </div>

          {/* To Do */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xs">To Do</h3>
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                5
              </Badge>
            </div>
            <Card className="p-3 border-2">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-medium text-xs leading-tight">Update pricing page</h4>
                  <Badge className="bg-red-100 text-red-700 text-xs h-4 px-1.5 shrink-0">High</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Marketing</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>4h</span>
                </div>
              </div>
            </Card>
            <Card className="p-3 border-2">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-medium text-xs leading-tight">Sales training deck</h4>
                  <Badge className="bg-yellow-100 text-yellow-700 text-xs h-4 px-1.5 shrink-0">Med</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Sales Enablement</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>6h</span>
                </div>
              </div>
            </Card>
          </div>

          {/* In Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xs">In Progress</h3>
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                4
              </Badge>
            </div>
            <Card className="p-3 border-2 border-secondary/20 bg-secondary/10">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-medium text-xs leading-tight">Launch blog post</h4>
                  <Badge className="bg-red-100 text-red-700 text-xs h-4 px-1.5 shrink-0">High</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Content</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>5h</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Review */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xs">Review</h3>
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                2
              </Badge>
            </div>
            <Card className="p-3 border-2">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-medium text-xs leading-tight">Battle cards</h4>
                  <Badge className="bg-yellow-100 text-yellow-700 text-xs h-4 px-1.5 shrink-0">Med</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Product Marketing</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>3h</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Done */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xs">Done</h3>
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                12
              </Badge>
            </div>
            <Card className="p-3 border-2 bg-slate-50">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                  <h4 className="font-medium text-xs">Positioning doc</h4>
                </div>
                <p className="text-xs text-muted-foreground">Strategy</p>
              </div>
            </Card>
            <Card className="p-3 border-2 bg-slate-50">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                  <h4 className="font-medium text-xs">Buyer personas</h4>
                </div>
                <p className="text-xs text-muted-foreground">Research</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Screenshot 3: Share Enablement That Sells
function EnablementScreenshot() {
  return (
    <div className="w-full p-6 flex flex-col">
      {/* Mock Enablement Assets */}
      <div className="w-full space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="p-3.5 border-2">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Total Assets</p>
              <p className="text-2xl font-bold">47</p>
            </div>
          </Card>
          <Card className="p-3.5 border-2">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Battle Cards</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </Card>
          <Card className="p-3.5 border-2">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Sales Decks</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </Card>
          <Card className="p-3.5 border-2">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Playbooks</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </Card>
        </div>

        {/* Asset Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-2 hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="text-2xl">⚔️</div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Enterprise Security Battle Card</h3>
                    <p className="text-xs text-muted-foreground">Competitive Battle Card</p>
                  </div>
                </div>
                <Badge className="bg-accent/10 text-accent px-3 py-1.5 rounded-full">Delivered</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Complete competitive analysis and positioning against enterprise security vendors
              </p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-primary">SJ</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-secondary">MC</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-accent">AR</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-xs text-muted-foreground">3 stakeholders</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  5 Insights
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-2 hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Q1 Sales Pitch Deck</h3>
                    <p className="text-xs text-muted-foreground">Sales Pitch Deck</p>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary px-3 py-1.5 rounded-full">Approved</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Updated pitch deck with new positioning, customer stories, and ROI calculator
              </p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-secondary">EW</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-accent">TK</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-xs text-muted-foreground">2 stakeholders</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  8 Insights
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-2 hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="text-2xl">💬</div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Value Proposition Framework</h3>
                    <p className="text-xs text-muted-foreground">Messaging Document</p>
                  </div>
                </div>
                <Badge className="bg-accent/10 text-accent px-3 py-1.5 rounded-full">In Review</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Core messaging framework with value props for each buyer persona
              </p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-accent">LM</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-xs text-muted-foreground">1 stakeholder</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  12 Insights
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-2 hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="text-2xl">🛡️</div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Objection Handling Guide</h3>
                    <p className="text-xs text-muted-foreground">Objection Handling Guide</p>
                  </div>
                </div>
                <Badge className="bg-accent/10 text-accent px-3 py-1.5 rounded-full">Delivered</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Responses to top 15 objections with supporting data and customer proof points
              </p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-primary">DH</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="text-xs bg-secondary">RP</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-xs text-muted-foreground">2 stakeholders</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  6 Insights
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Screenshot 4: Keep Everyone in Lockstep
function CollaborationScreenshot() {
  return (
    <div className="w-full p-6 flex flex-col">
      {/* Mock Dashboard with Activity Feed */}
      <div className="w-full">
        <div className="grid grid-cols-3 gap-4">
          {/* Left: Quick Stats */}
          <div className="col-span-2 space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-3">Team Dashboard</h2>
              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 border-2">
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">Active Insights</p>
                    <p className="text-2xl font-bold">73</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12 this week
                    </p>
                  </div>
                </Card>
                <Card className="p-4 border-2">
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">GTM Plans</p>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-blue-600">2 launching soon</p>
                  </div>
                </Card>
                <Card className="p-4 border-2">
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">Assets</p>
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-xs text-purple-600">8 in review</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <h3 className="font-semibold text-base mb-3">Upcoming Tasks</h3>
              <div className="space-y-2.5">
                <Card className="p-3 border-2 border-l-4 border-l-red-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Badge className="bg-red-100 text-red-700 text-xs h-4 px-1.5">High</Badge>
                        <span className="text-xs text-muted-foreground">Q1 Enterprise Launch</span>
                      </div>
                      <h4 className="font-medium text-sm">Update pricing page copy</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Marketing • Due in 2 days</p>
                    </div>
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs bg-primary">SJ</AvatarFallback>
                    </Avatar>
                  </div>
                </Card>

                <Card className="p-3 border-2 border-l-4 border-l-yellow-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Badge className="bg-yellow-100 text-yellow-700 text-xs h-4 px-1.5">Med</Badge>
                        <span className="text-xs text-muted-foreground">Partner Campaign</span>
                      </div>
                      <h4 className="font-medium text-sm">Create co-marketing deck</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Product Marketing • Due in 5 days</p>
                    </div>
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs bg-secondary">MC</AvatarFallback>
                    </Avatar>
                  </div>
                </Card>

                <Card className="p-3 border-2 border-l-4 border-l-blue-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Badge className="bg-blue-100 text-blue-700 text-xs h-4 px-1.5">Low</Badge>
                        <span className="text-xs text-muted-foreground">Q1 Enterprise Launch</span>
                      </div>
                      <h4 className="font-medium text-sm">Review battle card updates</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Sales Enablement • Due in 1 week</p>
                    </div>
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs bg-accent">AR</AvatarFallback>
                    </Avatar>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Right: Recent Activity Feed */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Recent Activity</h3>
            <div className="space-y-2.5">
              <Card className="p-3 border-2">
                <div className="flex gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">New customer insight</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Enterprise customers need SSO within 48 hours
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Sarah • 2h ago</p>
                  </div>
                </div>
              </Card>

              <Card className="p-3 border-2">
                <div className="flex gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Task completed</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">Positioning document finalized</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Mike • 4h ago</p>
                  </div>
                </div>
              </Card>

              <Card className="p-3 border-2">
                <div className="flex gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Asset updated</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">Battle card moved to review</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Alex • 5h ago</p>
                  </div>
                </div>
              </Card>

              <Card className="p-3 border-2">
                <div className="flex gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-muted/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Deadline approaching</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">Launch blog post due in 2 days</p>
                    <p className="text-xs text-muted-foreground mt-0.5">System • 6h ago</p>
                  </div>
                </div>
              </Card>

              <Card className="p-3 border-2">
                <div className="flex gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Target className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">Competitive insight</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">Adobe launched new pricing tier</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Emma • 1d ago</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
