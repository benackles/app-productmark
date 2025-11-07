"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Presentation } from "lucide-react"
import Link from "next/link"

export default function SalesPitchClient() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [setTheScene, setSetTheScene] = useState("")
  const [introduceTheShift, setIntroduceTheShift] = useState("")
  const [nameTheWinningStrategy, setNameTheWinningStrategy] = useState("")
  const [showTheValue, setShowTheValue] = useState("")
  const [proveIt, setProveIt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sales Pitch Narrative Data:", {
      name,
      description,
      setTheScene,
      introduceTheShift,
      nameTheWinningStrategy,
      showTheValue,
      proveIt,
    })
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-50">
          <Presentation className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Pitch Narrative</h1>
          <p className="text-muted-foreground">Guide prospects through why they should change, why now, and why you</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name and describe this sales pitch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Pitch Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Enterprise Sales Pitch"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of this sales pitch narrative..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Set the Scene */}
        <Card>
          <CardHeader>
            <CardTitle>1. Set the Scene</CardTitle>
            <CardDescription>Establish the customer's world and what's changing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="setTheScene">Customer's Current Reality</Label>
              <Textarea
                id="setTheScene"
                placeholder="Paint a picture of your customer's current situation. What does their world look like today? What's their status quo?"
                value={setTheScene}
                onChange={(e) => setSetTheScene(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Help them see themselves in the story. Make it relatable and specific.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Introduce the Shift */}
        <Card>
          <CardHeader>
            <CardTitle>2. Introduce the Shift</CardTitle>
            <CardDescription>Explain the new reality creating pressure to act</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="introduceTheShift">The Change That Matters</Label>
              <Textarea
                id="introduceTheShift"
                placeholder="What's changing in the market, technology, or customer expectations? Why does the status quo no longer work? What creates urgency?"
                value={introduceTheShift}
                onChange={(e) => setIntroduceTheShift(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Build the case for why doing nothing is risky. Create a sense of "why now?"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Name the Winning Strategy */}
        <Card>
          <CardHeader>
            <CardTitle>3. Name the Winning Strategy</CardTitle>
            <CardDescription>Define the best way to adapt to that shift</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="nameTheWinningStrategy">The Path Forward</Label>
              <Textarea
                id="nameTheWinningStrategy"
                placeholder="What approach or strategy will help them win in this new reality? Don't mention your product yet—focus on the strategic direction."
                value={nameTheWinningStrategy}
                onChange={(e) => setNameTheWinningStrategy(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Frame the solution conceptually first. What needs to change in how they operate?
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Show the Value */}
        <Card>
          <CardHeader>
            <CardTitle>4. Show the Value</CardTitle>
            <CardDescription>Position your solution as the clearest path to that success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="showTheValue">Your Solution</Label>
              <Textarea
                id="showTheValue"
                placeholder="Now introduce your product as the best way to execute that winning strategy. How does it enable their success? What value does it deliver?"
                value={showTheValue}
                onChange={(e) => setShowTheValue(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Connect your solution directly to the strategy you just outlined. Make it feel inevitable.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Prove It */}
        <Card>
          <CardHeader>
            <CardTitle>5. Prove It</CardTitle>
            <CardDescription>Back it up with evidence, examples, or customer stories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="proveIt">Evidence & Social Proof</Label>
              <Textarea
                id="proveIt"
                placeholder="Share customer success stories, metrics, case studies, or data that validates your claims. Show that others have successfully followed this path."
                value={proveIt}
                onChange={(e) => setProveIt(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Use concrete examples and numbers. Make it real and believable.
              </p>
            </div>
          </CardContent>
        </Card>

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
