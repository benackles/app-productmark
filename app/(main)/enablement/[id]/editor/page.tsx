import { AssetContentEditor } from "@/components/enablement/asset-content-editor"
import { mockEnablementAssets } from "@/lib/mock-enablement"
import { mockGTMFrameworks } from "@/lib/mock-gtm-frameworks"
import { notFound } from "next/navigation"

export default function AssetContentEditorPage({ params }: { params: { id: string } }) {
  const asset = mockEnablementAssets.find((a) => a.id === params.id)

  if (!asset) {
    notFound()
  }

  return <AssetContentEditor asset={asset} availableStrategies={mockGTMFrameworks} />
}
