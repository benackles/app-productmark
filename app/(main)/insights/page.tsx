import type { Metadata } from "next"
import InsightsClientPage from "./InsightsClientPage"

export const metadata: Metadata = {
  title: "Insights",
  description: "Track market intelligence and customer feedback",
}

export default function InsightsPage() {
  return <InsightsClientPage />
}
