"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2, BookOpen, Maximize2, Minimize2, AlertCircle, RefreshCw } from "lucide-react"
import { getReaderMode } from "@/app/actions/reader-mode"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ReaderModeViewProps {
  url: string
  trigger?: React.ReactNode
}

export function ReaderModeView({ url, trigger }: ReaderModeViewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const loadContent = async () => {
    setLoading(true)
    setError(null)
    setContent(null)

    try {
      const result = await getReaderMode(url)

      if (result.success && result.content) {
        setContent(result.content)
      } else {
        setError(result.error || "Failed to load content")
      }
    } catch (err) {
      console.error("Error loading reader mode:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (!content && !loading && !error) {
      loadContent()
    }
  }

  const handleRetry = () => {
    setError(null)
    loadContent()
  }

  const estimatedReadTime = content ? Math.max(1, Math.ceil(content.length / 1000)) : 0

  return (
    <>
      {trigger ? (
        <div onClick={handleOpen} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <Button onClick={handleOpen} variant="outline" className="gap-2 bg-transparent">
          <BookOpen className="h-4 w-4" />
          Reader Mode
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={isFullscreen ? "max-w-full h-screen m-0 rounded-none" : "max-w-4xl max-h-[90vh]"}>
          <DialogHeader className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                  </div>
                ) : content ? (
                  <>
                    <DialogTitle className="text-2xl leading-tight break-words">{content.title}</DialogTitle>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
                      {content.byline && <span className="truncate">{content.byline}</span>}
                      {content.byline && estimatedReadTime > 0 && <span>•</span>}
                      {estimatedReadTime > 0 && <span>{estimatedReadTime} min read</span>}
                      {content.siteName && (
                        <>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            {content.siteName}
                          </Badge>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <DialogTitle className="text-2xl leading-tight">Reader Mode</DialogTitle>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!loading && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="rounded-full"
                    >
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 -mx-6 px-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <div className="text-center space-y-2">
                  <p className="text-base font-medium">Loading article...</p>
                  <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="my-6">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="text-base font-semibold">Unable to load article</AlertTitle>
                <AlertDescription className="space-y-4 mt-2">
                  <p className="text-sm">{error}</p>
                  <p className="text-sm text-muted-foreground">
                    Some websites may not be compatible with Reader Mode due to technical restrictions or security
                    settings.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleRetry} size="sm" variant="outline" className="gap-2 bg-transparent">
                      <RefreshCw className="h-3 w-3" />
                      Try Again
                    </Button>
                    <Button asChild size="sm" variant="default">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="gap-2">
                        Open Original Page
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {content && !loading && !error && (
              <article className="prose prose-gray dark:prose-invert max-w-none py-6">
                {content.excerpt && (
                  <div className="text-lg text-muted-foreground mb-8 pb-6 border-b italic leading-relaxed">
                    {content.excerpt}
                  </div>
                )}
                <div
                  className="reader-content"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                  }}
                />
              </article>
            )}
          </ScrollArea>

          {content && !error && (
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground text-center">
                Source:{" "}
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                  {new URL(url).hostname}
                </a>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
