import type { Metadata } from "next"
import AIGuidedStrategyClient from "./ai-guided-client"

export const metadata: Metadata = {
  title: "AI-Guided Strategy Builder",
  description: "Create strategic frameworks through AI-guided conversations.",
}

export default function AIGuidedStrategyPage() {
  return <AIGuidedStrategyClient />
}
