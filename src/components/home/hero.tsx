import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, StarIcon } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#06b6d4_0%,transparent_50%)] opacity-10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
              <span className="flex size-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Quality Pre-Owned Footwear
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Step Into{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Sustainable
              </span>{" "}
              Style
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-400">
              Premium used shoes, inspected and graded for quality. Save money,
              reduce waste, and look incredible doing it.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary px-6 text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40"
                render={<Link href="/shop" />}
                nativeButton={false}
              >
                Browse Collection
                <ArrowRightIcon className="ml-1 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                render={<Link href="/about" />}
                nativeButton={false}
              >
                How It Works
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="size-9 rounded-full border-2 border-slate-900 bg-gradient-to-br from-primary/80 to-primary"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                      key={i}
                      className="size-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-0.5 text-sm text-gray-400">
                  Trusted by <span className="font-semibold text-white">500+</span> happy customers
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-cyan-500/20 blur-3xl" />
            <div className="relative animate-float">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=700&fit=crop"
                alt="Featured Nike shoe"
                width={600}
                height={600}
                className="rounded-3xl object-cover shadow-2xl"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md animate-fade-in-up animate-delay-300">
              <p className="text-sm font-semibold text-white">Up to 70% Off</p>
              <p className="text-xs text-gray-400">vs. retail price</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
