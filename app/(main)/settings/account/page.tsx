import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next" // Import Metadata type

export const metadata: Metadata = {
  title: "Account Settings", // Removed "| ProdMark"
  description: "Manage your account settings and preferences.",
}

export default function AccountPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your account preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Account settings content goes here.</p>
      </CardContent>
    </Card>
  )
}
