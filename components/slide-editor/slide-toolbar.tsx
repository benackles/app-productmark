"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Type, List, ImageIcon, AlignLeft } from "lucide-react"

interface SlideToolbarProps {
  onAddBlock: (type: "heading" | "text" | "bullet-list" | "image") => void
}

export function SlideToolbar({ onAddBlock }: SlideToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg bg-white">
      <div className="text-sm font-medium text-muted-foreground px-2">Add Block:</div>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="ghost" size="sm" onClick={() => onAddBlock("heading")} className="gap-2">
        <Type className="h-4 w-4" />
        Heading
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onAddBlock("text")} className="gap-2">
        <AlignLeft className="h-4 w-4" />
        Text
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onAddBlock("bullet-list")} className="gap-2">
        <List className="h-4 w-4" />
        Bullets
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onAddBlock("image")} className="gap-2">
        <ImageIcon className="h-4 w-4" />
        Image
      </Button>
    </div>
  )
}
