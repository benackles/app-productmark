"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ExternalLink,
  Edit,
  FileText,
  Users,
  Calendar,
  Tag,
  LinkIcon,
  Brain,
  Target,
  CheckCircle2,
  Clock,
  FileCheck,
  Send,
  FileSpreadsheet,
  Presentation,
  FileType,
  Globe,
  ArrowRight,
} from "lucide-react"
import { mockEnablementAssets, assetTypeLabels, stakeholderTypeLabels } from "@/lib/mock-enablement"
import type { EnablementAsset } from "@/lib/mock-enablement"
import { BackButton } from "@/components/back-button"

function formatStatus(status: string): string {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
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

function getSourceOfTruthIcon(type: EnablementAsset["sourceOfTruth"]["type"]) {
  switch (type) {
    case "document":
      return FileText
    case "spreadsheet":
      return FileSpreadsheet
    case "presentation":
      return Presentation
    case "pdf":
      return FileType
    case "url":
      return Globe
    default:
      return FileText
  }
}

function getStatusColor(status: EnablementAsset["status"]) {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-700"
    case "in-review":
      return "bg-yellow-100 text-yellow-700"
    case "approved":
      return "bg-blue-100 text-blue-700"
    case "delivered":
      return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

function getStatusIcon(status: EnablementAsset["status"]) {
  switch (status) {
    case "draft":
      return Edit
    case "in-review":
      return Clock
    case "approved":
      return FileCheck
    case "delivered":
      return Send
    default:
      return FileText
  }
}

export default function EnablementAssetDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [status, setStatus] = useState<EnablementAsset["status"]>("draft")
  const [feedback, setFeedback] = useState("")

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
      title: "Website Copy",
      description: "Generate compelling copy for landing pages, product pages, and marketing websites",
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
    {
      id: "gtm-brief",
      title: "GTM Brief",
      description: "Comprehensive go-to-market brief covering strategy, messaging, and execution plan",
      icon: "🚀",
      href: "/enablement/new/gtm-brief",
    },
  ]

  if (params.id === "new") {
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

  const asset = mockEnablementAssets.find((a) => a.id === params.id)

  const handleStatusChange = (newStatus: EnablementAsset["status"]) => {
    setStatus(newStatus)
    console.log("Status updated to:", newStatus)
  }

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedback)
    setFeedback("")
  }

  const SourceIcon = asset ? getSourceOfTruthIcon(asset.sourceOfTruth.type) : FileText

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-bold">Asset not found</h2>
        <BackButton href="/enablement" label="Back to Enablement" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton href="/enablement" label="Back to Enablement" />
      </div>

      {/* Title and Actions */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="text-4xl">{getAssetIcon(asset.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight">{asset.title}</h1>
              <Badge className={`${getStatusColor(status)} whitespace-nowrap flex-shrink-0`} variant="secondary">
                {formatStatus(status)}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{assetTypeLabels[asset.type]}</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/enablement/${asset.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Asset
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{asset.description}</p>
            </CardContent>
          </Card>

          {/* Source of Truth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SourceIcon className="h-5 w-5" />
                Source of Truth
              </CardTitle>
              <CardDescription>The primary document or file for this asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <SourceIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{asset.sourceOfTruth.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{asset.sourceOfTruth.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-white border-gray-300 text-gray-700">
                    Can {asset.sourceOfTruth.permissions}
                  </Badge>
                  <Button size="sm" asChild>
                    <a href={asset.sourceOfTruth.url} target="_blank" rel="noopener noreferrer">
                      Open
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stakeholder Collaboration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stakeholder Feedback
              </CardTitle>
              <CardDescription>Feedback and approvals from team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {asset.stakeholders.map((stakeholder) => (
                <div key={stakeholder.id} className="space-y-3 pb-6 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {stakeholder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900">{stakeholder.name}</p>
                        <Badge variant="outline" className="bg-white border-gray-300 text-gray-700 font-medium">
                          {stakeholderTypeLabels[stakeholder.role]}
                        </Badge>
                        {stakeholder.status === "approved" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{stakeholder.email}</p>
                      {stakeholder.feedback && (
                        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-gray-800 font-medium">{stakeholder.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              {/* Add Your Feedback */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-gray-900">Add Your Feedback</label>
                <Textarea
                  placeholder="Share your thoughts, suggestions, or approval..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-600"
                />
                <Button onClick={handleSubmitFeedback} disabled={!feedback.trim()}>
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Content */}
          {(asset.relatedInsightIds || asset.relatedStrategyIds) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Related Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {asset.relatedInsightIds && asset.relatedInsightIds.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-gray-900">Linked Insights</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {asset.relatedInsightIds.map((id) => (
                        <Button key={id} variant="outline" size="sm" asChild>
                          <Link href={`/insights/details/${id}`}>
                            Insight #{id}
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {asset.relatedStrategyIds && asset.relatedStrategyIds.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-gray-900">Linked Strategies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {asset.relatedStrategyIds.map((id) => (
                        <Button key={id} variant="outline" size="sm" asChild>
                          <Link href={`/strategy/${id}`}>
                            Strategy {id}
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
              <CardDescription className="text-sm">Update the asset status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      <span>Draft</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="in-review">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>In Review</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="approved">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4" />
                      <span>Approved</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="delivered">
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      <span>Delivered</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {status === "draft" && "Still being worked on"}
                {status === "in-review" && "Being reviewed by stakeholders"}
                {status === "approved" && "Approved and ready to publish"}
                {status === "delivered" && "Live and available to sales team"}
              </p>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium text-gray-900">{asset.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-gray-900">{asset.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Stakeholders</p>
                  <p className="font-medium text-gray-900">{asset.stakeholders.length} team members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
