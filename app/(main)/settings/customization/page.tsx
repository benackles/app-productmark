import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next" // Import Metadata type

export const metadata: Metadata = {
  title: "Customization Settings", // Removed "| ProdMark"
  description: "Customize the look and feel of your workspace.",
}

export default function CustomizationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customization</CardTitle>
        <CardDescription>Customize your workspace style.
</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Customization settings content goes here.</p>
      </CardContent>
    </Card>
  )
}
