import type { Metadata } from "next"
import MarketOpportunityClient from "./market-opportunity-client"

export const metadata: Metadata = {
  title: "Market Opportunity Framework | ProductMark",
  description: "Define your total, serviceable, and obtainable markets",
}

export default function MarketOpportunityPage() {
  return <MarketOpportunityClient />
}
