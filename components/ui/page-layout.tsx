import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

interface PageLayoutProps {
  icon: LucideIcon
  title: string
  description: string
  children: ReactNode
}

export function PageLayout({ icon: Icon, title, description, children }: PageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-green-100 p-3">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
