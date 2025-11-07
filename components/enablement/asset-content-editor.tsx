"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Eye, FileText, Target, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { EnablementAsset } from "@/lib/mock-enablement"
import type { GTMFramework } from "@/lib/mock-gtm-frameworks"

interface AssetContentEditorProps {
  asset: EnablementAsset
  availableStrategies: GTMFramework[]
}

export function AssetContentEditor({ asset, availableStrategies }: AssetContentEditorProps) {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(asset.relatedStrategyIds?.[0] || null)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState(asset.title)

  const selectedStrategy = availableStrategies.find((s) => s.id === selectedStrategyId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/enablement/${asset.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Editor</h1>
            <p className="text-muted-foreground">Generate content from strategy data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[400px_1fr] gap-6 h-[calc(100vh-16rem)]">
        {/* Left Column: Strategy Selection & Preview */}
        <Card className="p-6 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div>
              <h2 className="text-lg font-semibold mb-2">Apply Strategy</h2>
              <p className="text-sm text-muted-foreground">
                Select a strategy to populate your content with structured data
              </p>
            </div>

            {/* Strategy Selector */}
            <ScrollArea className="flex-1">
              <div className="space-y-2">
                {availableStrategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedStrategyId === strategy.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedStrategyId(strategy.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1">{strategy.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{strategy.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {strategy.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{strategy.tasks.length} tasks</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {/* Strategy Preview */}
            {selectedStrategy && (
              <div className="border-t pt-4 space-y-3">
                <h3 className="text-sm font-semibold">Strategy Details</h3>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview" className="text-xs">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="text-xs">
                      Tasks
                    </TabsTrigger>
                    <TabsTrigger value="data" className="text-xs">
                      Data
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-2">
                    <div className="text-xs space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium capitalize">{selectedStrategy.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {selectedStrategy.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Tasks:</span>
                        <span className="font-medium">{selectedStrategy.tasks.length}</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="tasks" className="space-y-2">
                    <ScrollArea className="h-32">
                      <div className="space-y-2">
                        {selectedStrategy.tasks.slice(0, 5).map((task) => (
                          <div key={task.id} className="text-xs p-2 rounded-lg bg-muted/50">
                            <div className="font-medium mb-1">{task.name}</div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  task.priority === "high"
                                    ? "destructive"
                                    : task.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {task.priority}
                              </Badge>
                              <span className="text-muted-foreground capitalize">{task.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="data" className="space-y-2">
                    <div className="text-xs space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start bg-transparent"
                        onClick={() => setContent((prev) => prev + `\n\n## ${selectedStrategy.name}\n`)}
                      >
                        Insert Strategy Name
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start bg-transparent"
                        onClick={() => setContent((prev) => prev + `\n${selectedStrategy.description}\n`)}
                      >
                        Insert Description
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start bg-transparent"
                        onClick={() => {
                          const taskList = selectedStrategy.tasks
                            .map((task) => `- ${task.name} (${task.status})`)
                            .join("\n")
                          setContent((prev) => prev + `\n\n### Tasks\n${taskList}\n`)
                        }}
                      >
                        Insert Task List
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start bg-transparent"
                        onClick={() => {
                          const timeline = `Created: ${selectedStrategy.createdAt}\nLast Modified: ${selectedStrategy.lastModified}`
                          setContent((prev) => prev + `\n\n### Timeline\n${timeline}\n`)
                        }}
                      >
                        Insert Timeline
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </Card>

        {/* Right Column: Content Editor */}
        <Card className="p-6 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div>
              <h2 className="text-lg font-semibold mb-2">Document Content</h2>
              <p className="text-sm text-muted-foreground">Edit your document or slide content</p>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter asset title..."
                className="text-lg font-semibold"
              />
            </div>

            {/* Content Editor */}
            <div className="flex-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Content</label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Bold
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Italic
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    List
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Link
                  </Button>
                </div>
              </div>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing or insert data from the selected strategy..."
                className="flex-1 resize-none font-mono text-sm"
              />
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setContent("")}>
                    Clear
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate with AI
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
