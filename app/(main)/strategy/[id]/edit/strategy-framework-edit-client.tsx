"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { BackButton } from "@/components/back-button"

interface StrategyFrameworkEditClientProps {
  framework: any
}

export default function StrategyFrameworkEditClient({ framework }: StrategyFrameworkEditClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // Determine framework type
  const frameworkType = framework.type || "gtm"

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Framework updated",
      description: "Your strategy framework has been successfully updated.",
    })

    setIsSaving(false)
    router.push(`/strategy/${framework.id}`)
  }

  // Render appropriate edit form based on framework type
  if (frameworkType === "icp") {
    return <ICPEditForm framework={framework} onSave={handleSave} isSaving={isSaving} />
  } else if (frameworkType === "persona") {
    return <PersonaEditForm framework={framework} onSave={handleSave} isSaving={isSaving} />
  } else if (frameworkType === "market-opportunity") {
    return <MarketOpportunityEditForm framework={framework} onSave={handleSave} isSaving={isSaving} />
  } else if (frameworkType === "positioning-canvas") {
    return <PositioningCanvasEditForm framework={framework} onSave={handleSave} isSaving={isSaving} />
  } else if (frameworkType === "messaging-house") {
    return <MessagingHouseEditForm framework={framework} onSave={handleSave} isSaving={isSaving} />
  } else if (frameworkType === "sales-pitch") {
    return <SalesPitchEditForm framework={framework} onSave={handleSave} isSaving={isSaving} />
  } else {
    return <GTMEditForm framework={framework} onSave={handleSave} isSaving={isSaving} />
  }
}

// ICP Edit Form
function ICPEditForm({ framework, onSave, isSaving }: any) {
  const [formData, setFormData] = useState({
    name: framework.name || "",
    description: framework.description || "",
    companySize: framework.companySize || "",
    revenue: framework.revenue || "",
    industries: framework.industries || "",
    geography: framework.geography || "",
    businessModel: framework.businessModel || "",
    techStack: framework.techStack || "",
    maturity: framework.maturity || "",
    painPoints: framework.painPoints || "",
    needs: framework.needs || "",
    disqualifiers: framework.disqualifiers || "",
  })

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Framework" />
        <h1 className="text-3xl font-bold tracking-tight">Edit ICP</h1>
        <p className="text-muted-foreground">Update your ideal customer profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ICP Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Input
              id="companySize"
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="revenue">Annual Revenue</Label>
            <Input
              id="revenue"
              value={formData.revenue}
              onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industries">Industries/Verticals</Label>
            <Textarea
              id="industries"
              value={formData.industries}
              onChange={(e) => setFormData({ ...formData, industries: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="geography">Geography</Label>
            <Input
              id="geography"
              value={formData.geography}
              onChange={(e) => setFormData({ ...formData, geography: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessModel">Business Model</Label>
            <Textarea
              id="businessModel"
              value={formData.businessModel}
              onChange={(e) => setFormData({ ...formData, businessModel: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="techStack">Technology Stack</Label>
            <Textarea
              id="techStack"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maturity">Company Maturity Stage</Label>
            <Input
              id="maturity"
              value={formData.maturity}
              onChange={(e) => setFormData({ ...formData, maturity: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pain Points & Needs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="painPoints">Key Pain Points</Label>
            <Textarea
              id="painPoints"
              value={formData.painPoints}
              onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="needs">Business Needs</Label>
            <Textarea
              id="needs"
              value={formData.needs}
              onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disqualifiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="disqualifiers">Deal Breakers</Label>
            <Textarea
              id="disqualifiers"
              value={formData.disqualifiers}
              onChange={(e) => setFormData({ ...formData, disqualifiers: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Link href={`/strategy/${framework.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </div>
  )
}

// Persona Edit Form
function PersonaEditForm({ framework, onSave, isSaving }: any) {
  const [formData, setFormData] = useState({
    name: framework.name || "",
    description: framework.description || "",
    jobTitle: framework.jobTitle || "",
    department: framework.department || "",
    seniority: framework.seniority || "",
    responsibilities: framework.responsibilities || "",
    businessGoals: framework.businessGoals || "",
    personalGoals: framework.personalGoals || "",
    challenges: framework.challenges || "",
    painPoints: framework.painPoints || "",
    decisionCriteria: framework.decisionCriteria || "",
    buyingRole: framework.buyingRole || "",
    objections: framework.objections || "",
    communicationPreferences: framework.communicationPreferences || "",
  })

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Framework" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Persona</h1>
        <p className="text-muted-foreground">Update your buyer persona</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Persona Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seniority">Seniority Level</Label>
            <Input
              id="seniority"
              value={formData.seniority}
              onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsibilities">Key Responsibilities</Label>
            <Textarea
              id="responsibilities"
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Goals & Motivations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessGoals">Business Goals</Label>
            <Textarea
              id="businessGoals"
              value={formData.businessGoals}
              onChange={(e) => setFormData({ ...formData, businessGoals: e.target.value })}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalGoals">Personal Goals</Label>
            <Textarea
              id="personalGoals"
              value={formData.personalGoals}
              onChange={(e) => setFormData({ ...formData, personalGoals: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Challenges & Pain Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="challenges">Daily Challenges</Label>
            <Textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="painPoints">Key Pain Points</Label>
            <Textarea
              id="painPoints"
              value={formData.painPoints}
              onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buying Behavior</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="decisionCriteria">Decision Criteria</Label>
            <Textarea
              id="decisionCriteria"
              value={formData.decisionCriteria}
              onChange={(e) => setFormData({ ...formData, decisionCriteria: e.target.value })}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyingRole">Role in Purchase Decision</Label>
            <Input
              id="buyingRole"
              value={formData.buyingRole}
              onChange={(e) => setFormData({ ...formData, buyingRole: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="objections">Common Objections</Label>
            <Textarea
              id="objections"
              value={formData.objections}
              onChange={(e) => setFormData({ ...formData, objections: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="communicationPreferences">Preferred Channels & Content</Label>
            <Textarea
              id="communicationPreferences"
              value={formData.communicationPreferences}
              onChange={(e) => setFormData({ ...formData, communicationPreferences: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Link href={`/strategy/${framework.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </div>
  )
}

// Market Opportunity Edit Form
function MarketOpportunityEditForm({ framework, onSave, isSaving }: any) {
  const [formData, setFormData] = useState({
    name: framework.name || "",
    description: framework.description || "",
    tam: framework.tam || "",
    tamDescription: framework.tamDescription || "",
    sam: framework.sam || "",
    samDescription: framework.samDescription || "",
    som: framework.som || "",
    somDescription: framework.somDescription || "",
    marketTrends: framework.marketTrends || "",
    growthDrivers: framework.growthDrivers || "",
  })

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Framework" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Market Opportunity</h1>
        <p className="text-muted-foreground">Update your market sizing analysis</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Analysis Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TAM (Total Addressable Market)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tam">Market Size</Label>
            <Input
              id="tam"
              value={formData.tam}
              onChange={(e) => setFormData({ ...formData, tam: e.target.value })}
              placeholder="e.g., $50B"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tamDescription">Description</Label>
            <Textarea
              id="tamDescription"
              value={formData.tamDescription}
              onChange={(e) => setFormData({ ...formData, tamDescription: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SAM (Serviceable Addressable Market)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sam">Market Size</Label>
            <Input
              id="sam"
              value={formData.sam}
              onChange={(e) => setFormData({ ...formData, sam: e.target.value })}
              placeholder="e.g., $15B"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="samDescription">Description</Label>
            <Textarea
              id="samDescription"
              value={formData.samDescription}
              onChange={(e) => setFormData({ ...formData, samDescription: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SOM (Serviceable Obtainable Market)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="som">Market Size</Label>
            <Input
              id="som"
              value={formData.som}
              onChange={(e) => setFormData({ ...formData, som: e.target.value })}
              placeholder="e.g., $500M"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="somDescription">Description</Label>
            <Textarea
              id="somDescription"
              value={formData.somDescription}
              onChange={(e) => setFormData({ ...formData, somDescription: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Dynamics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="marketTrends">Market Trends</Label>
            <Textarea
              id="marketTrends"
              value={formData.marketTrends}
              onChange={(e) => setFormData({ ...formData, marketTrends: e.target.value })}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="growthDrivers">Growth Drivers</Label>
            <Textarea
              id="growthDrivers"
              value={formData.growthDrivers}
              onChange={(e) => setFormData({ ...formData, growthDrivers: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Link href={`/strategy/${framework.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </div>
  )
}

// Positioning Canvas Edit Form
function PositioningCanvasEditForm({ framework, onSave, isSaving }: any) {
  const [formData, setFormData] = useState({
    name: framework.name || "",
    description: framework.description || "",
    competitiveAlternatives: framework.competitiveAlternatives || "",
    uniqueAttributes: framework.uniqueAttributes || "",
    value: framework.value || "",
    proof: framework.proof || "",
    targetMarket: framework.targetMarket || "",
    marketCategory: framework.marketCategory || "",
    relevantTrends: framework.relevantTrends || "",
  })

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Framework" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Positioning Canvas</h1>
        <p className="text-muted-foreground">Update your positioning framework</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Canvas Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competitive Alternatives</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.competitiveAlternatives}
            onChange={(e) => setFormData({ ...formData, competitiveAlternatives: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unique Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.uniqueAttributes}
            onChange={(e) => setFormData({ ...formData, uniqueAttributes: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Value & Proof</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Textarea
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proof">Proof Points</Label>
            <Textarea
              id="proof"
              value={formData.proof}
              onChange={(e) => setFormData({ ...formData, proof: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Target Market Characteristics</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.targetMarket}
            onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.marketCategory}
            onChange={(e) => setFormData({ ...formData, marketCategory: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relevant Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.relevantTrends}
            onChange={(e) => setFormData({ ...formData, relevantTrends: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Link href={`/strategy/${framework.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </div>
  )
}

// Messaging House Edit Form
function MessagingHouseEditForm({ framework, onSave, isSaving }: any) {
  const [formData, setFormData] = useState({
    name: framework.name || "",
    description: framework.description || "",
    overarchingMessage: framework.overarchingMessage || "",
  })

  const [pillars, setPillars] = useState(framework.pillars || [{ id: "1", value: "", benefit: "", feature: "" }])

  const addPillar = () => {
    setPillars([...pillars, { id: Date.now().toString(), value: "", benefit: "", feature: "" }])
  }

  const removePillar = (id: string) => {
    if (pillars.length > 1) {
      setPillars(pillars.filter((p: any) => p.id !== id))
    }
  }

  const updatePillar = (id: string, field: string, value: string) => {
    setPillars(pillars.map((p: any) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Framework" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Campaign Messaging House</h1>
        <p className="text-muted-foreground">Update your messaging framework</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Messaging House Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overarching Message</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.overarchingMessage}
            onChange={(e) => setFormData({ ...formData, overarchingMessage: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Message Pillars</h3>
            <p className="text-sm text-muted-foreground">Value-Benefit-Feature hierarchy</p>
          </div>
          <Button type="button" onClick={addPillar} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Pillar
          </Button>
        </div>

        {pillars.map((pillar: any, index: number) => (
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
                <Label>Value</Label>
                <Textarea
                  value={pillar.value}
                  onChange={(e) => updatePillar(pillar.id, "value", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Benefit</Label>
                <Textarea
                  value={pillar.benefit}
                  onChange={(e) => updatePillar(pillar.id, "benefit", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Feature</Label>
                <Textarea
                  value={pillar.feature}
                  onChange={(e) => updatePillar(pillar.id, "feature", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Link href={`/strategy/${framework.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </div>
  )
}

// Sales Pitch Edit Form
function SalesPitchEditForm({ framework, onSave, isSaving }: any) {
  const [formData, setFormData] = useState({
    name: framework.name || "",
    description: framework.description || "",
    hook: framework.hook || "",
    problem: framework.problem || "",
    solution: framework.solution || "",
    proof: framework.proof || "",
    cta: framework.cta || "",
  })

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Framework" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Sales Pitch</h1>
        <p className="text-muted-foreground">Update your sales narrative</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pitch Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hook</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.hook}
            onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Problem</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.problem}
            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
            rows={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            rows={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proof</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.proof}
            onChange={(e) => setFormData({ ...formData, proof: e.target.value })}
            rows={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call to Action</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea value={formData.cta} onChange={(e) => setFormData({ ...formData, cta: e.target.value })} rows={3} />
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button onClick={onSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Link href={`/strategy/${framework.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </div>
  )
}

// GTM Edit Form (for Launch and Campaign frameworks)
function GTMEditForm({ framework, onSave, isSaving }: any) {
  const [name, setName] = useState(framework.name || "")
  const [description, setDescription] = useState(framework.description || "")

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Strategy" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Strategy</h1>
        <p className="text-muted-foreground">Update your GTM strategy details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Details</CardTitle>
          <CardDescription>Update the name and description of your GTM strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Strategy Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter strategy name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter strategy description"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Link href={`/strategy/${framework.id}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
