import { Separator } from "@/components/ui/separator"
import {
  ShieldCheckIcon,
  SearchIcon,
  TruckIcon,
  RefreshCcwIcon,
  MessageCircleIcon,
  SparklesIcon,
  HeartIcon,
  LeafIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const gradingSteps = [
  {
    icon: SearchIcon,
    title: "Inspection",
    description:
      "Every pair is carefully inspected for structural integrity, sole wear, upper condition, and overall aesthetics.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    icon: ShieldCheckIcon,
    title: "Grading",
    description:
      "We assign a condition grade: Like New (worn 0-2 times), Good (light signs of wear), or Fair (visible but still functional).",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: SparklesIcon,
    title: "Cleaning",
    description:
      "Each pair is professionally cleaned and sanitized before listing. What you receive looks and feels fresh.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
  },
]

const policies = [
  {
    icon: RefreshCcwIcon,
    title: "7-Day Returns",
    description:
      "If the shoes don't match the listing description or don't fit, return them within 7 days for a full refund.",
  },
  {
    icon: MessageCircleIcon,
    title: "Direct Communication",
    description:
      "Questions about a listing? Message us directly on WhatsApp for real-time responses and additional photos.",
  },
]

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "100%", label: "Quality Inspected" },
  { value: "70%", label: "Avg. Savings" },
  { value: "4.9", label: "Customer Rating" },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,transparent_50%)] opacity-15" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            About <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Vintsole</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We believe great shoes deserve a second life. Every pair we sell is
            inspected, graded, and cleaned so you get quality footwear at a
            fraction of the retail price.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="rounded-2xl border bg-card p-6 text-center shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Process
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
              How We Grade Our Shoes
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Transparent condition ratings you can trust
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {gradingSteps.map((step, idx) => (
              <div
                key={step.title}
                className="group relative rounded-3xl border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                </div>
                <div className={`mx-auto flex size-16 items-center justify-center rounded-2xl ${step.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <step.icon className="size-8 text-foreground/70" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Promise
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            Why Shop With Us
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {policies.map((policy, idx) => (
            <div
              key={policy.title}
              className="flex gap-5 rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <policy.icon className="size-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {policy.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {policy.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Find Your Pair?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-400">
            Browse our collection of quality pre-owned shoes
          </p>
          <Button
            size="lg"
            className="mt-8 bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/25"
            render={<Link href="/shop" />}
            nativeButton={false}
          >
            Shop Now
          </Button>
        </div>
      </section>
    </>
  )
}
