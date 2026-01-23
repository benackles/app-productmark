import { Suspense } from "react"
import { StrategyBuilderClient } from "./strategy-builder-client"

export default function StrategyBuildPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading framework...</div>
        </div>
      }
    >
      <StrategyBuilderClient />
    </Suspense>
  )
}
