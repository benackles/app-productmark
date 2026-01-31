"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { EnablementAsset } from "@/lib/mock-enablement"
import { assetTypeLabels } from "@/lib/mock-enablement"
import { ExternalLink, FileText, Users, LinkIcon } from "lucide-react"
import Link from "next/link"

interface EnablementAssetCardProps {
  asset: EnablementAsset
}

function getAssetIcon(type: EnablementAsset["type"]) {
  switch (type) {
    case "competitive-battle-card":
      return "⚔️"
    case "messaging-document":
      return "💬"
    case "website-copy":
      return "🌐"
    case "sales-pitch-deck":
      return "📊"
    case "gtm-brief":
      return "🚀"
    case "case-study":
      return "📖"
    case "demo-script":
      return "🎬"
    case "objection-handling":
      return "🛡️"
    default:
      return "📄"
  }
}

function getStatusColor(status: EnablementAsset["status"]) {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground"
    case "in-review":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
    case "delivered":
      return "bg-accent/10 text-accent dark:text-accent"
    case "approved":
      return "bg-primary/10 text-primary dark:text-blue-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function formatStatus(status: string): string {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function EnablementAssetCard({ asset }: EnablementAssetCardProps) {
  const lastUpdated = new Date(asset.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="text-2xl flex-shrink-0">{getAssetIcon(asset.type)}</div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg mb-1">
                <Link href={`/enablement/${asset.id}`} className="hover:text-primary">
                  {asset.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm">{assetTypeLabels[asset.type]}</CardDescription>
            </div>
          </div>
          <Badge className={`${getStatusColor(asset.status)} whitespace-nowrap`} variant="secondary">
            {formatStatus(asset.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{asset.description}</p>

        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Last updated {lastUpdated}</span>
        </div>

        <div className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-muted-foreground" />
          <Badge variant="outline" className="text-xs">
            {asset.relatedInsightIds?.length || 0} Insight{(asset.relatedInsightIds?.length || 0) !== 1 ? "s" : ""}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {asset.stakeholders.slice(0, 3).map((stakeholder, idx) => (
                <Avatar key={idx} className="h-6 w-6 border-2 border-white dark:border-slate-800">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary dark:text-blue-300">
                    {getInitials(stakeholder.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {asset.stakeholders.length} stakeholder{asset.stakeholders.length !== 1 ? "s" : ""}
            </span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/enablement/${asset.id}`}>
              View
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>

        {asset.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {asset.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {asset.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{asset.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
