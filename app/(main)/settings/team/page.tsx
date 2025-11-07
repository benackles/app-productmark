import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next" // Import Metadata type

export const metadata: Metadata = {
  title: "Team Settings", // Removed "| ProdMark"
  description: "Manage your team members and their roles.",
}

export default function TeamPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>Add team members and set permissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Team settings content goes here.</p>
      </CardContent>
    </Card>
  )
}
