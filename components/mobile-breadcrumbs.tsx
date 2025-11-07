"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

export function MobileBreadcrumbs() {
  const pathname = usePathname()

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always start with Dashboard if not on home
    if (pathname !== "/") {
      breadcrumbs.push({ label: "Dashboard", href: "/" })
    }

    // Build breadcrumbs based on segments
    let currentPath = ""
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      currentPath += `/${segment}`

      // Skip IDs and certain segments
      if (segment.match(/^[a-f0-9-]{36}$/i) || segment === "details" || segment === "edit") {
        continue
      }

      let label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      // Special cases for better labels
      if (segment === "insights") label = "Insights"
      if (segment === "strategy") label = "Strategy"
      if (segment === "enablement") label = "Enablement"
      if (segment === "settings") label = "Settings"
      if (segment === "new") label = "New"
      if (segment === "target-audience") label = "Target Audience"
      if (segment === "messaging") label = "Messaging"
      if (segment === "gtm-planning") label = "GTM Planning"
      if (segment === "positioning") label = "Positioning"
      if (segment === "icp") label = "ICP"
      if (segment === "persona") label = "Persona"
      if (segment === "sales-pitch") label = "Sales Pitch"
      if (segment === "messaging-house") label = "Campaign Messaging House"
      if (segment === "launch") label = "Launch"
      if (segment === "campaign") label = "Campaign"
      if (segment === "competitive-battle-card") label = "Battle Card"
      if (segment === "messaging-document") label = "Messaging Doc"
      if (segment === "website-copy") label = "Website Copy"
      if (segment === "sales-pitch-deck") label = "Pitch Deck"
      if (segment === "gtm-brief") label = "GTM Brief"
      if (segment === "case-study") label = "Case Study"
      if (segment === "demo-script") label = "Demo Script"
      if (segment === "objection-handling") label = "Objections"

      breadcrumbs.push({ label, href: currentPath })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  // Don't show breadcrumbs on the home page
  if (pathname === "/") {
    return null
  }

  return (
    <nav
      className="md:hidden flex items-center gap-1 px-4 pt-3 pb-2 text-xs text-muted-foreground overflow-x-auto scrollbar-none"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1

        return (
          <div key={crumb.href} className="flex items-center gap-1 shrink-0">
            {index > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
            {isLast ? (
              <span className="font-medium text-foreground/80 truncate max-w-[120px]">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-foreground transition-colors whitespace-nowrap">
                {crumb.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
