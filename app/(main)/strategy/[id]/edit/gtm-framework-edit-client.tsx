"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import Link from "next/link"
import type { GTMFramework } from "@/lib/mock-gtm-frameworks"
import { useToast } from "@/hooks/use-toast"
import { BackButton } from "@/components/back-button"

interface GTMFrameworkEditClientProps {
  framework: GTMFramework
}

export default function GTMFrameworkEditClient({ framework }: GTMFrameworkEditClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState(framework.name)
  const [description, setDescription] = useState(framework.description || "")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Strategy updated",
      description: "Your GTM strategy has been successfully updated.",
    })

    setIsSaving(false)
    router.push(`/strategy/${framework.id}`)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="space-y-1">
        <BackButton href={`/strategy/${framework.id}`} label="Back to Strategy" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Strategy</h1>
        <p className="text-muted-foreground">Update your GTM strategy details</p>
      </div>

      {/* Edit Form */}
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
            <Button onClick={handleSave} disabled={isSaving} className="bg-[#6B8F71] hover:bg-[#5a7860] text-white">
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
