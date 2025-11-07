import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href: string
  label?: string
  className?: string
}

export function BackButton({ href, label, className }: BackButtonProps) {
  if (label) {
    return (
      <Button variant="ghost" size="sm" asChild className={className}>
        <Link href={href}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {label}
        </Link>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" asChild className={className}>
      <Link href={href}>
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Go back</span>
      </Link>
    </Button>
  )
}
