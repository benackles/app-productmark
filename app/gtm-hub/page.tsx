"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ExternalLink, FileText, Download, Filter, User, Edit, LogOut } from "lucide-react"
import { mockEnablementAssets, assetTypeLabels } from "@/lib/mock-enablement"
import type { EnablementAsset } from "@/lib/mock-enablement"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

export default function GTMHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  // Only show delivered assets in the hub
  const deliveredAssets = mockEnablementAssets.filter((asset) => asset.status === "delivered")

  const filteredAssets = useMemo(() => {
    let filtered = deliveredAssets

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (asset) =>
          asset.title.toLowerCase().includes(query) ||
          asset.description.toLowerCase().includes(query) ||
          asset.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          assetTypeLabels[asset.type].toLowerCase().includes(query),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((asset) => asset.type === selectedType)
    }

    return filtered
  }, [deliveredAssets, searchQuery, selectedType])

  const assetTypes = useMemo(() => {
    const types = new Set(deliveredAssets.map((asset) => asset.type))
    return Array.from(types).sort()
  }, [deliveredAssets])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">GTM Hub</h1>
                <p className="text-sm text-muted-foreground">ProductMark Resources</p>
              </div>
            </div>
            {/* User Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#6b8f71]/10">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 border-gray-100">
                <div className="px-4 py-3">
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/settings/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[#6b8f71]/10 focus:bg-[#6b8f71]/10 text-sm"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-gray-100 my-1" />
                <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-red-600 focus:text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer text-sm">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need to win</h2>
            <p className="text-lg text-muted-foreground">
              Access the latest enablement assets, battle cards, and resources to help you close deals faster.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="border-b bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assets, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 h-11 bg-background">
                  <Filter className="h-4 w-4" />
                  {selectedType === "all" ? "All Types" : assetTypeLabels[selectedType as keyof typeof assetTypeLabels]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[250px]">
                <DropdownMenuItem onClick={() => setSelectedType("all")}>All Types</DropdownMenuItem>
                {assetTypes.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setSelectedType(type)}>
                    {assetTypeLabels[type as keyof typeof assetTypeLabels]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Assets Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAssets.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No assets found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="hover:shadow-lg transition-all duration-200 group">
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="text-3xl">{getAssetIcon(asset.type)}</div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                          {asset.title}
                        </CardTitle>
                        <CardDescription className="text-sm">{assetTypeLabels[asset.type]}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{asset.description}</p>

                    {asset.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {asset.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {asset.tags.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{asset.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="default" size="sm" className="flex-1" asChild>
                        <Link href={asset.sourceOfTruth.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 mr-2" />
                          Open
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={asset.sourceOfTruth.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 ProductMark. All rights reserved.</p>
            <p className="mt-2">Need help? Contact your enablement team.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
