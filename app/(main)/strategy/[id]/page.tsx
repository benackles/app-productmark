import { notFound } from "next/navigation"
import { mockGTMFrameworks } from "@/lib/mock-gtm-frameworks"
import { mockStrategyFrameworks } from "@/lib/mock-strategy-frameworks"
import GTMFrameworkClient from "./gtm-framework-client"
import StrategyFrameworkClient from "./strategy-framework-client"

export default async function StrategyFrameworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Check GTM frameworks first
  const gtmFramework = mockGTMFrameworks.find((f) => f.id === id)
  if (gtmFramework) {
    return <GTMFrameworkClient framework={gtmFramework} />
  }

  // Combine all other frameworks
  const allOtherFrameworks = [
    ...mockStrategyFrameworks.icps.map((f) => ({ ...f, type: "icp" as const })),
    ...mockStrategyFrameworks.personas.map((f) => ({ ...f, type: "persona" as const })),
    ...mockStrategyFrameworks.marketOpportunities.map((f) => ({ ...f, type: "market-opportunity" as const })),
    ...mockStrategyFrameworks.positioningCanvases.map((f) => ({ ...f, type: "positioning" as const })),
    ...mockStrategyFrameworks.messagingHouses.map((f) => ({ ...f, type: "messaging-house" as const })),
    ...mockStrategyFrameworks.salesPitches.map((f) => ({ ...f, type: "sales-pitch" as const })),
  ]

  const framework = allOtherFrameworks.find((f) => f.id === id)

  if (!framework) {
    notFound()
  }

  return <StrategyFrameworkClient framework={framework} />
}
