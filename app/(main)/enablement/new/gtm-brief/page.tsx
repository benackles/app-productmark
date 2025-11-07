import { Megaphone } from "lucide-react"
import { PageLayout } from "@/components/ui/page-layout"
import { GTMBriefForm } from "@/components/forms/gtm-brief-form"

export default function GTMBriefPage() {
  return (
    <PageLayout
      icon={Megaphone}
      title="Create GTM Brief"
      description="Create a comprehensive go-to-market brief to align your team on strategy, messaging, and execution."
    >
      <GTMBriefForm />
    </PageLayout>
  )
}
