"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { SlideCanvas } from "./slide-canvas"
import { SlideToolbar } from "./slide-toolbar"

interface Slide {
  id: string
  blocks: Array<{
    id: string
    type: "heading" | "text" | "bullet-list" | "image"
    content: string
  }>
}

export function SlideDeckEditor() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "1",
      blocks: [
        { id: "b1", type: "heading", content: "Welcome to Your Presentation" },
        { id: "b2", type: "text", content: "Start editing to create your slide deck" },
      ],
    },
  ])
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const currentSlide = slides[currentSlideIndex]

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      blocks: [{ id: `b-${Date.now()}`, type: "heading", content: "New Slide" }],
    }
    setSlides([...slides, newSlide])
    setCurrentSlideIndex(slides.length)
  }

  const addBlock = (type: "heading" | "text" | "bullet-list" | "image") => {
    const newBlock = {
      id: `b-${Date.now()}`,
      type,
      content: "",
    }
    const updatedSlides = [...slides]
    updatedSlides[currentSlideIndex].blocks.push(newBlock)
    setSlides(updatedSlides)
  }

  const updateBlock = (blockId: string, content: string) => {
    const updatedSlides = [...slides]
    const block = updatedSlides[currentSlideIndex].blocks.find((b) => b.id === blockId)
    if (block) {
      block.content = content
      setSlides(updatedSlides)
    }
  }

  const deleteBlock = (blockId: string) => {
    const updatedSlides = [...slides]
    updatedSlides[currentSlideIndex].blocks = updatedSlides[currentSlideIndex].blocks.filter((b) => b.id !== blockId)
    setSlides(updatedSlides)
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-12rem)]">
      {/* Slide Thumbnails */}
      <div className="w-48 flex flex-col gap-4">
        <div className="text-sm font-medium">Slides</div>
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <Card
                key={slide.id}
                className={`p-2 cursor-pointer transition-all hover:shadow-md ${
                  index === currentSlideIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentSlideIndex(index)}
              >
                <div className="aspect-[16/9] bg-gray-50 rounded flex items-center justify-center text-xs text-muted-foreground">
                  Slide {index + 1}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button onClick={addSlide} className="w-full bg-transparent" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Slide
        </Button>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === slides.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <SlideToolbar onAddBlock={addBlock} />
        </div>

        <SlideCanvas blocks={currentSlide.blocks} onUpdateBlock={updateBlock} onDeleteBlock={deleteBlock} />
      </div>
    </div>
  )
}
