"use client"

import { useState, useMemo } from "react"
import { Search, Plus, Filter, Calendar, Tag, TrendingUp, Users, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { InsightCard } from "@/components/insight-card"
import { mockInsights } from "@/lib/mock-insights"

type InsightType = "all" | "customer" | "competitive" | "market"
type SortOption = "newest" | "oldest" | "priority"

export default function InsightsClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<InsightType>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("newest")

  const insights = mockInsights || []

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    insights.forEach((insight) => {
      insight.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [insights])

  const filteredInsights = useMemo(() => {
    const filtered = insights.filter((insight) => {
      const matchesSearch =
        searchQuery === "" ||
        insight.observation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = selectedType === "all" || insight.type === selectedType

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => insight.tags?.includes(tag))

      return matchesSearch && matchesType && matchesTags
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [insights, searchQuery, selectedType, selectedTags, sortBy])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedType("all")
    setSelectedTags([])
    setSortBy("newest")
  }

  const hasActiveFilters = searchQuery !== "" || selectedType !== "all" || selectedTags.length > 0

  const typeCounts = useMemo(() => {
    return {
      all: insights.length,
      customer: insights.filter((i) => i.type === "customer").length,
      competitive: insights.filter((i) => i.type === "competitive").length,
      market: insights.filter((i) => i.type === "market").length,
    }
  }, [insights])

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold tracking-tight mb-2 text-4xl">Insights</h1>
          <p className="text-muted-foreground">
            Capture and analyze customer feedback, competitor moves, and market trends.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/insights/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Insight
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setSelectedType("all")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "all" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Insights</p>
              <p className="text-2xl font-bold">{typeCounts.all}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType("customer")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "customer" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="text-2xl font-bold">{typeCounts.customer}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType("competitive")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "competitive" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Competitive</p>
              <p className="text-2xl font-bold">{typeCounts.competitive}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </button>
        <button
          onClick={() => setSelectedType("market")}
          className={`p-4 rounded-xl border bg-card hover:border-primary/40 transition-colors cursor-pointer text-left ${
            selectedType === "market" ? "border-primary/30" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Market</p>
              <p className="text-2xl font-bold">{typeCounts.market}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Type: {selectedType === "all" ? "All" : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedType("all")}>All Types ({typeCounts.all})</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("customer")}>
              Customer ({typeCounts.customer})
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("competitive")}>
              Competitive ({typeCounts.competitive})
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType("market")}>Market ({typeCounts.market})</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Tag className="mr-2 h-4 w-4" />
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 max-h-96 overflow-y-auto">
            <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allTags.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">No tags available</div>
            ) : (
              allTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Sort: {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "Priority"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest First</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("priority")}>Priority</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedType !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Type: {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              <button onClick={() => setSelectedType("all")} className="ml-1 hover:text-destructive">
                ×
              </button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button onClick={() => toggleTag(tag)} className="ml-1 hover:text-destructive">
                ×
              </button>
            </Badge>
          ))}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
              Clear all
            </Button>
          )}
        </div>
      )}

      {filteredInsights.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {hasActiveFilters ? "No insights match your filters" : "No insights yet"}
          </p>
          <Button asChild variant="outline">
            <Link href="/insights/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Insight
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </>
  )
}
