import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/20 text-primary hover:scale-105",
        secondary: "border-transparent bg-secondary/20 text-secondary hover:scale-105",
        accent: "border-transparent bg-accent/20 text-accent-foreground hover:scale-105",
        destructive: "border-transparent bg-destructive/20 text-destructive hover:scale-105",
        outline: "text-foreground border-border bg-background/80 backdrop-blur-sm hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} style={{ boxShadow: "var(--shadow-soft)" }} {...props} />
  )
}

export { Badge, badgeVariants }
