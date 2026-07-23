import {
  ShieldCheckIcon,
  TruckIcon,
  RefreshCcwIcon,
  SearchIcon,
} from "lucide-react"

const badges = [
  {
    icon: ShieldCheckIcon,
    title: "Quality Checked",
    description: "Every pair inspected for quality and comfort",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Quick shipping to your doorstep",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
  },
  {
    icon: RefreshCcwIcon,
    title: "Easy Returns",
    description: "Not satisfied? Return within 7 days",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    icon: SearchIcon,
    title: "Transparent Grading",
    description: "Honest condition ratings on every listing",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
  },
]

export function TrustBadges() {
  return (
    <section className="border-t bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-16 md:grid-cols-4 md:gap-6">
        {badges.map((badge, idx) => (
          <div
            key={badge.title}
            className="group flex flex-col items-center rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div
              className={`flex size-14 items-center justify-center rounded-2xl ${badge.bg} transition-transform duration-300 group-hover:scale-110`}
            >
              <badge.icon className="size-7 text-foreground/70" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-foreground">
              {badge.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
