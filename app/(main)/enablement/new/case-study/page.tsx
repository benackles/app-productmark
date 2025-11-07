"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LinkIcon, Tag, FileText } from "lucide-react"

export default function NewCaseStudyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    customerName: "",
    industry: "",
    companySize: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    testimonial: "",
    testimonialAuthor: "",
    testimonialRole: "",
    sourceUrl: "",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Case study data:", formData)
    router.push("/enablement")
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Case Study</h1>
        </div>
        <p className="text-muted-foreground">
          Document a customer success story showing the challenge, solution, and measurable results
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Identify the customer and provide context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Case Study Title</Label>
              <Input
                id="title"
                placeholder="e.g., How [Customer] Achieved [Result] with [Product]"
                value={formData.title}
                onChange={handleChange("title")}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                placeholder="e.g., Acme Corporation"
                value={formData.customerName}
                onChange={handleChange("customerName")}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g., SaaS, Healthcare, Finance"
                  value={formData.industry}
                  onChange={handleChange("industry")}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="companySize">Company Size</Label>
                <Input
                  id="companySize"
                  placeholder="e.g., 500-1000 employees"
                  value={formData.companySize}
                  onChange={handleChange("companySize")}
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Executive Summary</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of the customer and what this case study demonstrates..."
                value={formData.description}
                onChange={handleChange("description")}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Challenge, Solution & Results</CardTitle>
            <CardDescription>Tell the story of the customer's journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="challenge">The Challenge</Label>
              <Textarea
                id="challenge"
                placeholder="Describe the customer's pain points, challenges, and what they were trying to achieve..."
                value={formData.challenge}
                onChange={handleChange("challenge")}
                rows={5}
                required
              />
              <p className="text-xs text-muted-foreground">What problem were they trying to solve?</p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="solution">The Solution</Label>
              <Textarea
                id="solution"
                placeholder="Explain how your product/service addressed their challenges and what was implemented..."
                value={formData.solution}
                onChange={handleChange("solution")}
                rows={5}
                required
              />
              <p className="text-xs text-muted-foreground">How did you help them?</p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="results">The Results</Label>
              <Textarea
                id="results"
                placeholder="Share measurable outcomes, metrics, and the impact of your solution..."
                value={formData.results}
                onChange={handleChange("results")}
                rows={5}
                required
              />
              <p className="text-xs text-muted-foreground">
                Include specific metrics, percentages, time saved, revenue impact, etc.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testimonial (Optional)</CardTitle>
            <CardDescription>Add a quote from the customer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="testimonial">Customer Quote</Label>
              <Textarea
                id="testimonial"
                placeholder="Enter a quote from the customer about their experience..."
                value={formData.testimonial}
                onChange={handleChange("testimonial")}
                rows={4}
              />
            </div>

            {formData.testimonial && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="testimonialAuthor">Quote Author</Label>
                  <Input
                    id="testimonialAuthor"
                    placeholder="e.g., Jane Smith"
                    value={formData.testimonialAuthor}
                    onChange={handleChange("testimonialAuthor")}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="testimonialRole">Role/Title</Label>
                  <Input
                    id="testimonialRole"
                    placeholder="e.g., VP of Marketing"
                    value={formData.testimonialRole}
                    onChange={handleChange("testimonialRole")}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Source & Tags</CardTitle>
            <CardDescription>Link to source document and add tags for organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="sourceUrl" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Source of Truth URL
              </Label>
              <Input
                id="sourceUrl"
                type="url"
                placeholder="https://docs.google.com/document/d/..."
                value={formData.sourceUrl}
                onChange={handleChange("sourceUrl")}
                required
              />
              <p className="text-xs text-muted-foreground">
                Link to the master document where this case study is maintained
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="tags" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="e.g., customer-success, enterprise, saas"
                value={formData.tags}
                onChange={handleChange("tags")}
              />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => router.push("/enablement/new")}>
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button type="submit" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Create Asset</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
