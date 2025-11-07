"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, GripVertical } from "lucide-react"

interface SlideBlock {
  id: string
  type: "heading" | "text" | "bullet-list" | "image"
  content: string
  style?: {
    fontSize?: string
    fontWeight?: string
    color?: string
  }
}

interface SlideCanvasProps {
  blocks: SlideBlock[]
  onUpdateBlock: (id: string, content: string) => void
  onDeleteBlock: (id: string) => void
}

export function SlideCanvas({ blocks, onUpdateBlock, onDeleteBlock }: SlideCanvasProps) {
  return (
    <Card className="w-full aspect-[16/9] p-8 bg-white relative overflow-hidden">
      <div className="space-y-4">
        {blocks.map((block) => (
          <div key={block.id} className="group relative">
            <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 cursor-grab">
                <GripVertical className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-500 hover:text-red-600"
                onClick={() => onDeleteBlock(block.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {block.type === "heading" && (
              <input
                type="text"
                value={block.content}
                onChange={(e) => onUpdateBlock(block.id, e.target.value)}
                className="text-4xl font-bold w-full border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 -mx-2"
                placeholder="Slide Title"
              />
            )}

            {block.type === "text" && (
              <textarea
                value={block.content}
                onChange={(e) => onUpdateBlock(block.id, e.target.value)}
                className="text-lg w-full border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 -mx-2 resize-none"
                rows={3}
                placeholder="Add text..."
              />
            )}

            {block.type === "bullet-list" && (
              <ul className="list-disc list-inside space-y-2">
                {block.content
                  .split("\n")
                  .filter(Boolean)
                  .map((item, i) => (
                    <li key={i} className="text-lg">
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
