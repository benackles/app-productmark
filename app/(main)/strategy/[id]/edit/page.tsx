import { notFound } from "next/navigation"
import { mockGTMFrameworks } from "@/lib/mock-gtm-frameworks"
import { mockStrategyFrameworks } from "@/lib/mock-strategy-frameworks"
import StrategyFrameworkEditClient from "./strategy-framework-edit-client"

export default async function StrategyEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const allFrameworks = [
    ...mockGTMFrameworks,
    ...mockStrategyFrameworks.icps,
    ...mockStrategyFrameworks.personas,
    ...mockStrategyFrameworks.marketOpportunities,
    ...mockStrategyFrameworks.positioningCanvases,
    ...mockStrategyFrameworks.messagingHouses,
    ...mockStrategyFrameworks.salesPitches,
  ]

  const framework = allFrameworks.find((f) => f.id === id)

  if (!framework) {
    notFound()
  }

  return <StrategyFrameworkEditClient framework={framework} />
}
