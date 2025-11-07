"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackNav() {
  const pathname = usePathname()
  const router = useRouter()

  const getBackInfo = () => {
    // Strategy hierarchy
    if (pathname.startsWith("/strategy/new/")) {
      // Target Audience frameworks
      if (pathname.match(/^\/strategy\/new\/target-audience\/(icp|persona|market-opportunity)/)) {
        return { path: "/strategy/new/target-audience", text: "Back to Target Audience Frameworks" }
      }
      // Messaging frameworks
      if (pathname.match(/^\/strategy\/new\/messaging\/(messaging-house|sales-pitch)/)) {
        return { path: "/strategy/new/messaging", text: "Back to Messaging Frameworks" }
      }
      // GTM Planning frameworks
      if (pathname.match(/^\/strategy\/new\/gtm-planning\/(launch|campaign)/)) {
        return { path: "/strategy/new/gtm-planning", text: "Back to GTM Planning Frameworks" }
      }
      // Positioning frameworks
      if (pathname.startsWith("/strategy/new/positioning")) {
        return { path: "/strategy/new/positioning", text: "Back to Positioning Frameworks" }
      }

      if (pathname.match(/^\/strategy\/new\/(target-audience|messaging|positioning|gtm-planning)$/)) {
        return { path: "/strategy/new", text: "Back to Strategy" }
      }
    }

    // /strategy/new page
    if (pathname === "/strategy/new") {
      return { path: "/strategy", text: "Back to Strategy" }
    }

    // Enablement hierarchy
    if (pathname.startsWith("/enablement/new/") && pathname !== "/enablement/new") {
      return { path: "/enablement/new", text: "Back to Asset Types" }
    }
    if (pathname === "/enablement/new") {
      return { path: "/enablement", text: "Back to Enablement" }
    }

    // Top-level sections (fallback for other pages)
    if (pathname.startsWith("/insights")) {
      return { path: "/insights", text: "Back to Insights" }
    } else if (pathname.startsWith("/strategy")) {
      return { path: "/strategy", text: "Back to Strategy" }
    } else if (pathname.startsWith("/enablement")) {
      return { path: "/enablement", text: "Back to Enablement" }
    } else if (pathname.startsWith("/settings")) {
      return { path: "/settings", text: "Back to Settings" }
    }

    return null
  }

  const backInfo = getBackInfo()

  if (!backInfo) {
    return null
  }

  return (
    <div className="w-full mb-4 -ml-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(backInfo.path)}
        className="text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {backInfo.text}
      </Button>
    </div>
  )
}
