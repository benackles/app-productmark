"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Tag, Calendar, FileText, Presentation, BookOpen, Target } from "lucide-react"
import { mockEnablementAssets, assetTypeLabels } from "@/lib/mock-enablement"
import { EnablementAssetCard } from "@/components/enablement-asset-card"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc" | "status"

export default function EnablementPage() {
  const [assets] = useState(mockEnablementAssets)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>("newest")

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    assets.forEach((asset) => {
      asset.tags.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  }, [assets])

  const typeCounts = useMemo(() => {
    return {
      all: assets.length,
      "messaging-document": assets.filter((a) => a.type === "messaging-document").length,
      "case-study": assets.filter((a) => a.type === "case-study").length,
      "competitive-battle-card": assets.filter((a) => a.type === "competitive-battle-card").length,
      "sales-pitch-deck": assets.filter((a) => a.type === "sales-pitch-deck").length,
    }
  }, [assets])

  const filteredAssets = useMemo(() => {
    let filtered = assets

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (asset) =>
          asset.title.toLowerCase().includes(query) ||
          asset.description.toLowerCase().includes(query) ||
          asset.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((asset) => asset.type === selectedType)
    }

    if (selectedTag !== "all") {
      filtered = filtered.filter((asset) => asset.tags.includes(selectedTag))
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        case "oldest":
          return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "status": {
          const statusOrder: Record<string, number> = { delivered: 0, approved: 1, "in-review": 2, draft: 3 }
          return (statusOrder[a.status] || 999) - (statusOrder[b.status] || 999)
        }
        default:
          return 0
      }
    })

    return sorted
  }, [assets, searchQuery, selectedType, selectedTag, sortBy])

  const getTypeDisplayText = () => {
    if (selectedType === "all") return "Type: All"
    return `Type: ${assetTypeLabels[selectedType as keyof typeof assetTypeLabels]}`
  }

  const getTagDisplayText = () => {
    if (selectedTag === "all") return "Tags"
    return selectedTag
  }

  const getSortDisplayText = () => {
    const sortLabels: Record<SortOption, string> = {
      newest: "Newest",
      oldest: "Oldest",
      "title-asc": "A-Z",
      "title-desc": "Z-A",
      status: "Status",
    }
    return `Sort: ${sortLabels[sortBy]}`
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold tracking-tight text-4xl">Enablement</h1>
          <p className="text-muted-foreground">Centralize and share sales and campaign assets.</p>
        </div>
        <Button className="bg-[#6B9B7C] hover:bg-[#5a8669] md:shrink-0" asChild>
          <Link href="/enablement/new">
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedType("all")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "all" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Assets</p>
              <p className="text-2xl font-bold">{typeCounts.all}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType("messaging-document")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "messaging-document" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Messaging Docs</p>
              <p className="text-2xl font-bold">{typeCounts["messaging-document"]}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType("sales-pitch-deck")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "sales-pitch-deck" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sales Decks</p>
              <p className="text-2xl font-bold">{typeCounts["sales-pitch-deck"]}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Presentation className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType("competitive-battle-card")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "competitive-battle-card" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Battle Cards</p>
              <p className="text-2xl font-bold">{typeCounts["competitive-battle-card"]}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </button>
      </div>

      {assets.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 w-full bg-white"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 h-10 bg-transparent w-full md:w-auto justify-center">
                    <Filter className="h-4 w-4 shrink-0" />
                    <span className="truncate">{getTypeDisplayText()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSelectedType("all")}>Type: All</DropdownMenuItem>
                  {Object.entries(assetTypeLabels).map(([value, label]) => (
                    <DropdownMenuItem key={value} onClick={() => setSelectedType(value)}>
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 h-10 bg-transparent w-full md:w-auto justify-center">
                    <Tag className="h-4 w-4 shrink-0" />
                    <span className="truncate">{getTagDisplayText()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSelectedTag("all")}>All Tags</DropdownMenuItem>
                  {allTags.map((tag) => (
                    <DropdownMenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                      {tag}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 h-10 bg-transparent w-full md:w-auto justify-center">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span className="truncate">{getSortDisplayText()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Sort: Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>Sort: Oldest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title-asc")}>Sort: A-Z</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title-desc")}>Sort: Z-A</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("status")}>Sort: Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}

      {assets.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
          <div className="flex flex-col items-center gap-1 text-center px-4">
            <h3 className="text-2xl font-bold tracking-tight">You have no assets yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Start by adding your first enablement asset.</p>
            <Button asChild>
              <Link href="/enablement/new">
                <Plus className="mr-2 h-4 w-4" /> Add Asset
              </Link>
            </Button>
          </div>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
          <div className="flex flex-col items-center gap-1 text-center px-4">
            <h3 className="text-2xl font-bold tracking-tight">No assets found</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedType("all")
                setSelectedTag("all")
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <EnablementAssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  )
}
