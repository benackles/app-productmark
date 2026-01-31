"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface MessagePillar {
  id: string
  value: string
  benefit: string
  feature: string
}

export default function MessagingHouseClient() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [overarchingMessage, setOverarchingMessage] = useState("")
  const [pillars, setPillars] = useState<MessagePillar[]>([{ id: "1", value: "", benefit: "", feature: "" }])

  const addPillar = () => {
    const newPillar: MessagePillar = {
      id: Date.now().toString(),
      value: "",
      benefit: "",
      feature: "",
    }
    setPillars([...pillars, newPillar])
  }

  const removePillar = (id: string) => {
    if (pillars.length > 1) {
      setPillars(pillars.filter((pillar) => pillar.id !== id))
    }
  }

  const updatePillar = (id: string, field: keyof MessagePillar, value: string) => {
    setPillars(pillars.map((pillar) => (pillar.id === id ? { ...pillar, [field]: value } : pillar)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Messaging House Data:", {
      name,
      description,
      overarchingMessage,
      pillars,
    })
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Messaging House</h1>
            <p className="text-muted-foreground">
              Always lead with value, follow with benefit, and finish with feature
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name and describe this campaign messaging house</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Messaging House Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Q1 2024 Product Messaging"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of this messaging framework..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Overarching Message */}
        <Card>
          <CardHeader>
            <CardTitle>Overarching Message</CardTitle>
            <CardDescription>The core message that sits at the top of your messaging hierarchy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="overarchingMessage">Main Message</Label>
              <Textarea
                id="overarchingMessage"
                placeholder="Your primary value statement that captures the essence of what you offer..."
                value={overarchingMessage}
                onChange={(e) => setOverarchingMessage(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Message Pillars */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Message Pillars</h3>
              <p className="text-sm text-muted-foreground">
                Build your messaging pillars using the Value-Benefit-Feature hierarchy
              </p>
            </div>
            <Button type="button" onClick={addPillar} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Pillar
            </Button>
          </div>

          {pillars.map((pillar, index) => (
            <Card key={pillar.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pillar {index + 1}</CardTitle>
                  {pillars.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePillar(pillar.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`value-${pillar.id}`}>Value</Label>
                  <Textarea
                    id={`value-${pillar.id}`}
                    placeholder="The big outcome or business result your product enables"
                    value={pillar.value}
                    onChange={(e) => updatePillar(pillar.id, "value", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Lead with the business impact or outcome</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`benefit-${pillar.id}`}>Benefit</Label>
                  <Textarea
                    id={`benefit-${pillar.id}`}
                    placeholder="How it improves the customer's day-to-day life or work"
                    value={pillar.benefit}
                    onChange={(e) => updatePillar(pillar.id, "benefit", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Describe the practical improvement to their work</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`feature-${pillar.id}`}>Feature</Label>
                  <Textarea
                    id={`feature-${pillar.id}`}
                    placeholder="The specific capability that makes it possible"
                    value={pillar.feature}
                    onChange={(e) => updatePillar(pillar.id, "feature", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">End with what the product actually does</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/strategy/new/messaging">Cancel</Link>
          </Button>
          <Button type="submit" size="lg">
            Create Framework
          </Button>
        </div>
      </form>
    </div>
  )
}
