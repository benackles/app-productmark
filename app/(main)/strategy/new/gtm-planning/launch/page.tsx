import type { Metadata } from "next"
import LaunchClient from "./launch-client"

export const metadata: Metadata = {
  title: "Tiered Launch Framework",
  description: "Plan and execute a product launch.",
}

export default function LaunchFrameworkPage() {
  return <LaunchClient />
}
