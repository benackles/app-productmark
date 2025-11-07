import { mockInsights } from "./mock-insights"

export function getCompetitorsFromInsights(): Array<{ name: string; website?: string }> {
  const competitorMap = new Map<string, { name: string; website?: string }>()

  mockInsights.forEach((insight) => {
    if (insight.type === "competitive" && insight.competitor) {
      if (!competitorMap.has(insight.competitor.name)) {
        competitorMap.set(insight.competitor.name, {
          name: insight.competitor.name,
          website: insight.competitor.website,
        })
      }
    }
  })

  return Array.from(competitorMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}
