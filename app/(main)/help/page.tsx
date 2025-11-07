import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help & Support", // Removed "| ProdMark"
  description: "Find help and support for ProductMark.",
}

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to your questions and get assistance.</p>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Need Assistance?</h3>
          <p className="text-sm text-muted-foreground">
            Our support team is here to help. Please reach out if you have any questions.
          </p>
        </div>
      </div>
    </div>
  )
}
