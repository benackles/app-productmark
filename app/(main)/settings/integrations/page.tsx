import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next" // Import Metadata type

export const metadata: Metadata = {
  title: "Integrations Settings", // Removed "| ProdMark"
  description: "Connect ProductMark with your favorite tools.",
}

export default function IntegrationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect ProductMark with your favorite tools.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Integrations settings content goes here.</p>
      </CardContent>
    </Card>
  )
}
