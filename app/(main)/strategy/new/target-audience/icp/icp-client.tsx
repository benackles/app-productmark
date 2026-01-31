"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function ICPClientPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [revenue, setRevenue] = useState("")
  const [industries, setIndustries] = useState("")
  const [geography, setGeography] = useState("")
  const [businessModel, setBusinessModel] = useState("")
  const [techStack, setTechStack] = useState("")
  const [maturity, setMaturity] = useState("")
  const [painPoints, setPainPoints] = useState("")
  const [needs, setNeeds] = useState("")
  const [disqualifiers, setDisqualifiers] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement save logic
    console.log("ICP Data:", {
      name,
      description,
      companySize,
      revenue,
      industries,
      geography,
      businessModel,
      techStack,
      maturity,
      painPoints,
      needs,
      disqualifiers,
    })
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ideal Customer Profile</h1>
          <p className="text-muted-foreground">Define the right kind of company for your product</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name and describe this ICP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">ICP Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Mid-Market SaaS Companies"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of this ideal customer profile..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Characteristics */}
        <Card>
          <CardHeader>
            <CardTitle>Company Characteristics</CardTitle>
            <CardDescription>Firmographic details about your ideal companies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input
                id="companySize"
                placeholder="e.g., 50-500 employees"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue</Label>
              <Input
                id="revenue"
                placeholder="e.g., $10M-$100M ARR"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industries">Industries/Verticals</Label>
              <Textarea
                id="industries"
                placeholder="List the primary industries or verticals this ICP operates in..."
                value={industries}
                onChange={(e) => setIndustries(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geography">Geography</Label>
              <Input
                id="geography"
                placeholder="e.g., North America, EMEA"
                value={geography}
                onChange={(e) => setGeography(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Characteristics */}
        <Card>
          <CardHeader>
            <CardTitle>Business Characteristics</CardTitle>
            <CardDescription>How these companies operate and what they use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessModel">Business Model</Label>
              <Textarea
                id="businessModel"
                placeholder="e.g., B2B SaaS, subscription-based, enterprise sales..."
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Technology Stack</Label>
              <Textarea
                id="techStack"
                placeholder="What technologies or platforms do they typically use?"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maturity">Company Maturity Stage</Label>
              <Input
                id="maturity"
                placeholder="e.g., Growth stage, Series B-C"
                value={maturity}
                onChange={(e) => setMaturity(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pain Points & Needs */}
        <Card>
          <CardHeader>
            <CardTitle>Pain Points & Needs</CardTitle>
            <CardDescription>What problems does this ICP face?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="painPoints">Key Pain Points</Label>
              <Textarea
                id="painPoints"
                placeholder="What are the primary challenges or problems these companies experience?"
                value={painPoints}
                onChange={(e) => setPainPoints(e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="needs">Business Needs</Label>
              <Textarea
                id="needs"
                placeholder="What are they trying to achieve or improve?"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Disqualifiers */}
        <Card>
          <CardHeader>
            <CardTitle>Disqualifiers</CardTitle>
            <CardDescription>What makes a company NOT a good fit?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="disqualifiers">Deal Breakers</Label>
              <Textarea
                id="disqualifiers"
                placeholder="List characteristics that would disqualify a company from being a good fit..."
                value={disqualifiers}
                onChange={(e) => setDisqualifiers(e.target.value)}
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
            Create Framework
          </Button>
        </div>
      </form>
    </div>
  )
}
