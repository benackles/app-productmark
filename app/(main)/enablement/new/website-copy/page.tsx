"use client"

import { Globe, FileText, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WebsiteCopyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-cyan-100 p-3">
          <Globe className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          {/* Updated heading to match new asset type name */}
          <h1 className="text-3xl font-bold">Create Website Copy Document</h1>
          {/* Updated description to align with messaging framework focus */}
          <p className="text-muted-foreground mt-1">
            Create clear, persuasive website content aligned to your messaging framework—covering landing pages, product
            pages, and key marketing sections.
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title*</Label>
            <Input id="title" placeholder="e.g., Homepage Copy - Q1 2024" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="page-type">Page Type*</Label>
            <Select>
              <SelectTrigger id="page-type">
                <SelectValue placeholder="Select page type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homepage">Homepage</SelectItem>
                <SelectItem value="product">Product Page</SelectItem>
                <SelectItem value="landing">Landing Page</SelectItem>
                <SelectItem value="about">About Us</SelectItem>
                <SelectItem value="pricing">Pricing</SelectItem>
                <SelectItem value="blog">Blog Post</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Page Overview*</Label>
            <Textarea id="overview" placeholder="Describe the purpose and goal of this page..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Hero Section</h3>

          <div className="space-y-2">
            <Label htmlFor="headline">Main Headline*</Label>
            <Input id="headline" placeholder="e.g., Transform Your Business with AI-Powered Solutions" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subheadline">Subheadline</Label>
            <Textarea id="subheadline" placeholder="Supporting text that elaborates on the headline..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-primary">Primary CTA</Label>
            <Input id="cta-primary" placeholder="e.g., Start Free Trial, Get a Demo" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-secondary">Secondary CTA (Optional)</Label>
            <Input id="cta-secondary" placeholder="e.g., Learn More, Watch Video" />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Sections */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Main Content Sections</h3>

          <div className="space-y-4 border rounded-lg p-4">
            <h4 className="font-medium">Section 1</h4>
            <div className="space-y-2">
              <Label htmlFor="section-1-title">Section Title*</Label>
              <Input id="section-1-title" placeholder="e.g., Why Choose Us?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-1-copy">Section Copy*</Label>
              <Textarea id="section-1-copy" placeholder="Write the copy for this section..." rows={5} />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <h4 className="font-medium">Section 2</h4>
            <div className="space-y-2">
              <Label htmlFor="section-2-title">Section Title</Label>
              <Input id="section-2-title" placeholder="e.g., Key Features" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-2-copy">Section Copy</Label>
              <Textarea id="section-2-copy" placeholder="Write the copy for this section..." rows={5} />
            </div>
          </div>

          <Button variant="outline" size="sm">
            + Add Another Section
          </Button>
        </CardContent>
      </Card>

      {/* Features/Benefits */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Features/Benefits Copy</h3>

          <div className="space-y-2">
            <Label htmlFor="features">Feature List</Label>
            <Textarea
              id="features"
              placeholder="List key features or benefits (one per line or as bullet points)..."
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Proof */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Social Proof & Trust</h3>

          <div className="space-y-2">
            <Label htmlFor="testimonials">Testimonials/Quotes</Label>
            <Textarea id="testimonials" placeholder="Include customer testimonials or reviews..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stats">Stats/Numbers</Label>
            <Textarea
              id="stats"
              placeholder="Key statistics to highlight (e.g., '10,000+ customers', '99% satisfaction')..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Final CTA */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Final CTA Section</h3>

          <div className="space-y-2">
            <Label htmlFor="cta-headline">CTA Headline</Label>
            <Input id="cta-headline" placeholder="e.g., Ready to Get Started?" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-copy">CTA Copy</Label>
            <Textarea id="cta-copy" placeholder="Supporting copy for the final call-to-action..." rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-button">CTA Button Text</Label>
            <Input id="cta-button" placeholder="e.g., Get Started Now" />
          </div>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">SEO & Metadata</h3>

          <div className="space-y-2">
            <Label htmlFor="meta-title">Meta Title</Label>
            <Input id="meta-title" placeholder="SEO-optimized page title (60 characters max)" maxLength={60} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              placeholder="SEO-optimized page description (160 characters max)"
              maxLength={160}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Target Keywords</Label>
            <Input id="keywords" placeholder="Enter target keywords (comma separated)" />
          </div>
        </CardContent>
      </Card>

      {/* Source & Tags */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Source & Tags</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source Document (Optional)</Label>
            <Input id="source" type="url" placeholder="Link to Google Doc, Figma, or file..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Tag className="h-4 w-4 mt-2.5 text-muted-foreground" />
              <Input id="tags" placeholder="Add tags (comma separated)" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Save as Draft</Button>
        <Button>Create Asset</Button>
      </div>
    </div>
  )
}
