import { Radio } from "lucide-react"
import { PageLayout } from "@/components/ui/page-layout"
import { GTMCommunicationsPlanForm } from "@/components/forms/gtm-communications-plan-form"

export default function GTMCommunicationsPlanPage() {
  return (
    <PageLayout
      icon={Radio}
      title="Create GTM Comms Plan"
      description="Build a strategic communications plan to coordinate messaging, channels, and timing across all launch activities."
    >
      <GTMCommunicationsPlanForm />
    </PageLayout>
  )
}
