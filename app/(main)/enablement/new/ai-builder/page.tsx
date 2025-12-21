import type { Metadata } from "next"
import { AIAssetBuilderClient } from "./ai-builder-client"

export const metadata: Metadata = {
  title: "AI Asset Builder - ProductMark",
  description: "Generate enablement assets from strategic frameworks using AI",
}

export default function AIAssetBuilderPage() {
  return <AIAssetBuilderClient />
}
