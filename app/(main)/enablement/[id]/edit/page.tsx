"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, LinkIcon, Tag, AlertCircle, Clock, CheckCircle2 } from "lucide-react"
import { assetTypeLabels, mockEnablementAssets } from "@/lib/mock-enablement"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"

export default function EditEnablementAssetPage() {
  const params = useParams()
  const router = useRouter()
  const asset = mockEnablementAssets.find((a) => a.id === params.id)

  const [title, setTitle] = useState(asset?.title || "")
  const [description, setDescription] = useState(asset?.description || "")
  const [sourceUrl, setSourceUrl] = useState(asset?.sourceOfTruth.url || "")
  const [tags, setTags] = useState(asset?.tags.join(", ") || "")
  const [status, setStatus] = useState(asset?.status || "draft")

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-bold">Asset not found</h2>
        <Button asChild>
          <Link href="/enablement">
            <BackButton href="/enablement" />
          </Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ title, description, sourceUrl, tags, status })
    router.push(`/enablement/${params.id}`)
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <BackButton href={`/enablement/${params.id}`} />
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Enablement Asset</h1>
        <p className="text-muted-foreground mt-2">Update your enablement asset details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Type</CardTitle>
            <CardDescription>Asset type cannot be changed after creation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">{assetTypeLabels[asset.type]}</div>
                <div className="text-sm text-muted-foreground">
                  {asset.type === "competitive-battle-card" && "Helps sales teams compete against specific competitors"}
                  {asset.type === "messaging-document" && "Defines core messaging frameworks and value propositions"}
                  {asset.type === "website-copy" && "Stores approved website copy for consistent communication"}
                  {asset.type === "sales-pitch-deck" && "Presentation decks for sales pitches and demos"}
                  {asset.type === "gtm-brief" && "Documents go-to-market strategy and execution plans"}
                  {asset.type === "case-study" && "Shares customer success stories and use cases"}
                  {asset.type === "demo-script" && "Step-by-step scripts for product demonstrations"}
                  {asset.type === "objection-handling" && "Guidance for handling common sales objections"}
                </div>
              </div>
              <Badge variant="secondary">{status.replace("-", " ")}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Provide information about your enablement asset</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Q4 2024 Product Positioning Battle Card"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what this asset covers and who it's for..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="tags" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="e.g., competitive, positioning, sales"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Source of Truth</CardTitle>
            <CardDescription>
              Link to the original file where this asset is maintained (document, spreadsheet, presentation, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="source-url" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Document URL
              </Label>
              <Input
                id="source-url"
                type="url"
                placeholder="https://docs.google.com/document/d/..."
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Supported sources: Google Docs, Sheets, Slides, Notion, Confluence, Dropbox, and more
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Set the review and publication status for this asset</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="status-select">Asset Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
                <SelectTrigger id="status-select" className="bg-white border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-gray-600" />
                      <span>Draft</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="in-review">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span>In Review</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="approved">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span>Approved</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="delivered">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Delivered</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {status === "draft" && "Asset is still being worked on and not ready for review."}
                {status === "in-review" && "Asset is being reviewed by stakeholders."}
                {status === "approved" && "Asset has been approved and is ready to publish."}
                {status === "delivered" && "Asset is live and available to the sales team."}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => router.push(`/enablement/${params.id}`)}>
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button type="submit" variant="outline" onClick={() => setStatus("draft")}>
              Save as Draft
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
