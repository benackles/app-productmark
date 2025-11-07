import type { Metadata } from "next"
import SalesPitchClient from "./sales-pitch-client"

export const metadata: Metadata = {
  title: "Sales Pitch Narrative",
  description: "Create a structured sales pitch that guides prospects through a buying decision.",
}

export default function SalesPitchPage() {
  return <SalesPitchClient />
}
