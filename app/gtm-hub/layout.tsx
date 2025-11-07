import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GTM Hub | ProductMark",
  description: "Access enablement assets and resources",
}

export default function GTMHubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
