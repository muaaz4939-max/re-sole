import { Badge } from "@/components/ui/badge"
import { type Condition } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

const conditionStyles: Record<Condition, { badge: string; dot: string }> = {
  "Like New": {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    dot: "bg-emerald-500",
  },
  Good: {
    badge: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
    dot: "bg-amber-500",
  },
  Fair: {
    badge: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50",
    dot: "bg-orange-500",
  },
}

export function ConditionBadge({
  condition,
  className,
}: {
  condition: Condition
  className?: string
}) {
  const styles = conditionStyles[condition]

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 text-[11px] font-bold uppercase tracking-wider",
        styles.badge,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", styles.dot)} />
      {condition}
    </Badge>
  )
}
