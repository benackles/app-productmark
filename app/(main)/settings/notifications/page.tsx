import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next" // Import Metadata type

export const metadata: Metadata = {
  title: "Notifications Settings", // Removed "| ProdMark"
  description: "Configure how you receive notifications.",
}

export default function NotificationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Notification settings content goes here.</p>
      </CardContent>
    </Card>
  )
}
