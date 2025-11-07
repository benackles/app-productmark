import type { Metadata } from "next"
import CampaignClient from "./campaign-client"

export const metadata: Metadata = {
  title: "Campaign Framework",
  description: "Plan and execute a marketing campaign.",
}

export default function CampaignFrameworkPage() {
  return <CampaignClient />
}
