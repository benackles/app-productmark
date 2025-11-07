import { BookOpen } from "lucide-react"
import { PageLayout } from "@/components/ui/page-layout"
import { GTMPlaybookForm } from "@/components/forms/gtm-playbook-form"

export default function GTMPlaybookPage() {
  return (
    <PageLayout
      icon={BookOpen}
      title="Create GTM Playbook"
      description="Create a comprehensive go-to-market playbook with positioning, competitive analysis, pricing, sales enablement, and launch planning."
    >
      <GTMPlaybookForm />
    </PageLayout>
  )
}
