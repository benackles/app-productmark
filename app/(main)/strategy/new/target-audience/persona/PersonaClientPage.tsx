"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import Link from "next/link"

export default function PersonaClientPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [department, setDepartment] = useState("")
  const [seniority, setSeniority] = useState("")
  const [responsibilities, setResponsibilities] = useState("")
  const [businessGoals, setBusinessGoals] = useState("")
  const [personalGoals, setPersonalGoals] = useState("")
  const [challenges, setChallenges] = useState("")
  const [painPoints, setPainPoints] = useState("")
  const [decisionCriteria, setDecisionCriteria] = useState("")
  const [buyingRole, setBuyingRole] = useState("")
  const [objections, setObjections] = useState("")
  const [communicationPreferences, setCommunicationPreferences] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement save logic
    console.log("Persona Data:", {
      name,
      description,
      jobTitle,
      department,
      seniority,
      responsibilities,
      businessGoals,
      personalGoals,
      challenges,
      painPoints,
      decisionCriteria,
      buyingRole,
      objections,
      communicationPreferences,
    })
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-secondary/10">
          <User className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer Persona</h1>
          <p className="text-muted-foreground">Define the right person within your ideal company</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name and describe this persona</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Persona Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Marketing Director Maria"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of this buyer persona..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Profile</CardTitle>
            <CardDescription>Role and position details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Director of Marketing"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., Marketing, Sales, Product"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seniority">Seniority Level</Label>
              <Input
                id="seniority"
                placeholder="e.g., Mid-level, Director, VP, C-level"
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities</Label>
              <Textarea
                id="responsibilities"
                placeholder="What does this person do on a day-to-day basis?"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Goals & Motivations */}
        <Card>
          <CardHeader>
            <CardTitle>Goals & Motivations</CardTitle>
            <CardDescription>What drives this persona?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessGoals">Business Goals</Label>
              <Textarea
                id="businessGoals"
                placeholder="What are they trying to achieve for the company?"
                value={businessGoals}
                onChange={(e) => setBusinessGoals(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personalGoals">Personal Goals</Label>
              <Textarea
                id="personalGoals"
                placeholder="What are they trying to achieve for themselves (career advancement, recognition, etc.)?"
                value={personalGoals}
                onChange={(e) => setPersonalGoals(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Challenges & Pain Points */}
        <Card>
          <CardHeader>
            <CardTitle>Challenges & Pain Points</CardTitle>
            <CardDescription>What problems does this persona face?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="challenges">Daily Challenges</Label>
              <Textarea
                id="challenges"
                placeholder="What makes their job difficult?"
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="painPoints">Key Pain Points</Label>
              <Textarea
                id="painPoints"
                placeholder="What frustrates them the most about current solutions or processes?"
                value={painPoints}
                onChange={(e) => setPainPoints(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Buying Behavior */}
        <Card>
          <CardHeader>
            <CardTitle>Buying Behavior</CardTitle>
            <CardDescription>How does this persona make purchasing decisions?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decisionCriteria">Decision Criteria</Label>
              <Textarea
                id="decisionCriteria"
                placeholder="What factors matter most when evaluating solutions?"
                value={decisionCriteria}
                onChange={(e) => setDecisionCriteria(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyingRole">Role in Purchase Decision</Label>
              <Input
                id="buyingRole"
                placeholder="e.g., Decision maker, Influencer, Champion, Gatekeeper"
                value={buyingRole}
                onChange={(e) => setBuyingRole(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="objections">Common Objections</Label>
              <Textarea
                id="objections"
                placeholder="What concerns or objections might they raise?"
                value={objections}
                onChange={(e) => setObjections(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Communication Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Communication Preferences</CardTitle>
            <CardDescription>How to best reach and engage this persona</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="communicationPreferences">Preferred Channels & Content</Label>
              <Textarea
                id="communicationPreferences"
                placeholder="What channels do they use? What type of content resonates with them?"
                value={communicationPreferences}
                onChange={(e) => setCommunicationPreferences(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/strategy/new/target-audience">Cancel</Link>
          </Button>
          <Button type="submit" size="lg">
            Save Persona
          </Button>
        </div>
      </form>
    </div>
  )
}
