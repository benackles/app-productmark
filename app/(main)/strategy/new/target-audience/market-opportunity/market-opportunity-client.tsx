"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export default function MarketOpportunityClient() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    // TAM fields
    tamTotalCustomers: "",
    tamAvgRevenue: "",
    tamTotalRevenue: "",
    tamGrowthRate: "",
    tamSources: "",
    // SAM fields
    samSegments: "",
    samMarketPortion: "",
    samIcpCustomers: "",
    samRevenueOpportunity: "",
    samBarriers: "",
    // SOM fields
    somMarketShare: "",
    somCustomersYear1: "",
    somRevenue: "",
    somConstraints: "",
    somAssumptions: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Saving market opportunity framework:", formData)
    // TODO: Implement save functionality
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-50">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Market Opportunity Framework</h1>
            <p className="text-muted-foreground">
              Define your total, serviceable, and obtainable markets — how large is the overall opportunity, which
              segments can you serve, and what share can you realistically capture?
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Start with a name and description for this market opportunity analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Framework Name</Label>
            <Input
              id="name"
              placeholder="e.g., 2024 Market Opportunity Analysis"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief overview of this market opportunity analysis..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Sizing</CardTitle>
          <CardDescription>
            Define your TAM (Total Addressable Market), SAM (Serviceable Available Market), and SOM (Serviceable
            Obtainable Market)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tam" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tam">TAM</TabsTrigger>
              <TabsTrigger value="sam">SAM</TabsTrigger>
              <TabsTrigger value="som">SOM</TabsTrigger>
            </TabsList>

            {/* TAM Tab */}
            <TabsContent value="tam" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="tamTotalCustomers">What is the total number of potential customers globally?</Label>
                <Input
                  id="tamTotalCustomers"
                  placeholder="e.g., 50,000 companies"
                  value={formData.tamTotalCustomers}
                  onChange={(e) => handleChange("tamTotalCustomers", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tamAvgRevenue">What is the average annual revenue or spend per customer?</Label>
                <Input
                  id="tamAvgRevenue"
                  placeholder="e.g., $25,000 per year"
                  value={formData.tamAvgRevenue}
                  onChange={(e) => handleChange("tamAvgRevenue", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tamTotalRevenue">
                  What is the total market revenue if all customers used a similar product?
                </Label>
                <Input
                  id="tamTotalRevenue"
                  placeholder="e.g., $1.25 billion"
                  value={formData.tamTotalRevenue}
                  onChange={(e) => handleChange("tamTotalRevenue", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tamGrowthRate">What is the overall market growth rate (CAGR)?</Label>
                <Input
                  id="tamGrowthRate"
                  placeholder="e.g., 15% annually"
                  value={formData.tamGrowthRate}
                  onChange={(e) => handleChange("tamGrowthRate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tamSources">What sources or reports validate this total market size?</Label>
                <Textarea
                  id="tamSources"
                  placeholder="List market research reports, analyst firms, or data sources..."
                  value={formData.tamSources}
                  onChange={(e) => handleChange("tamSources", e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>

            {/* SAM Tab */}
            <TabsContent value="sam" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="samSegments">Which customer segments or regions fall within your target scope?</Label>
                <Textarea
                  id="samSegments"
                  placeholder="Describe the specific segments, regions, or verticals you can realistically serve..."
                  value={formData.samSegments}
                  onChange={(e) => handleChange("samSegments", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="samMarketPortion">
                  What portion of the total market aligns with your product's capabilities and business model?
                </Label>
                <Input
                  id="samMarketPortion"
                  placeholder="e.g., 40% of TAM or $500 million"
                  value={formData.samMarketPortion}
                  onChange={(e) => handleChange("samMarketPortion", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="samIcpCustomers">How many potential customers fit your ICP?</Label>
                <Input
                  id="samIcpCustomers"
                  placeholder="e.g., 20,000 companies"
                  value={formData.samIcpCustomers}
                  onChange={(e) => handleChange("samIcpCustomers", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="samRevenueOpportunity">
                  What's the estimated annual revenue opportunity for those segments?
                </Label>
                <Input
                  id="samRevenueOpportunity"
                  placeholder="e.g., $500 million annually"
                  value={formData.samRevenueOpportunity}
                  onChange={(e) => handleChange("samRevenueOpportunity", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="samBarriers">
                  What are the main barriers (geographic, regulatory, technical) that limit reach?
                </Label>
                <Textarea
                  id="samBarriers"
                  placeholder="Describe constraints that prevent you from serving the entire TAM..."
                  value={formData.samBarriers}
                  onChange={(e) => handleChange("samBarriers", e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>

            {/* SOM Tab */}
            <TabsContent value="som" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="somMarketShare">What is your realistic market share target in Year 1? Year 3?</Label>
                <Input
                  id="somMarketShare"
                  placeholder="e.g., 2% in Year 1, 5% in Year 3"
                  value={formData.somMarketShare}
                  onChange={(e) => handleChange("somMarketShare", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="somCustomersYear1">
                  How many customers can you realistically acquire in the first 12 months?
                </Label>
                <Input
                  id="somCustomersYear1"
                  placeholder="e.g., 400 customers"
                  value={formData.somCustomersYear1}
                  onChange={(e) => handleChange("somCustomersYear1", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="somRevenue">What is the expected revenue from those customers?</Label>
                <Input
                  id="somRevenue"
                  placeholder="e.g., $10 million in Year 1"
                  value={formData.somRevenue}
                  onChange={(e) => handleChange("somRevenue", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="somConstraints">
                  What are your key go-to-market constraints (sales capacity, budget, competition)?
                </Label>
                <Textarea
                  id="somConstraints"
                  placeholder="Describe the practical limitations on your ability to capture market share..."
                  value={formData.somConstraints}
                  onChange={(e) => handleChange("somConstraints", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="somAssumptions">What assumptions underpin your SOM estimate?</Label>
                <Textarea
                  id="somAssumptions"
                  placeholder="List the key assumptions about conversion rates, sales cycles, pricing, etc..."
                  value={formData.somAssumptions}
                  onChange={(e) => handleChange("somAssumptions", e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="sticky bottom-0 bg-background border-t pt-4 pb-6">
        <div className="flex justify-end gap-4">
          <Link href="/strategy/new/target-audience">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave}>Create Framework</Button>
        </div>
      </div>
    </div>
  )
}
