import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-1.5 text-xs font-medium transition-colors transition-shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary hover:shadow",
        tertiary:
          "border-muted-foreground text-muted-foreground hover:shadow",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
