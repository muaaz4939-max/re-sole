import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"

const categories = ["Men", "Women", "Kids"]

const categoryImages: Record<string, string> = {
  Men: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop",
  Women:
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=600&fit=crop",
  Kids: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=600&fit=crop",
}

const categoryCounts: Record<string, number> = {
  Men: 4,
  Women: 3,
  Kids: 2,
}

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Browse by Style
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Shop by Category
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Find the perfect pair for everyone in the family
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {categories.map((cat, idx) => (
          <Link
            key={cat}
            href={`/shop?category=${cat}`}
            className="group relative overflow-hidden rounded-3xl card-hover animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <Image
                src={categoryImages[cat]}
                alt={`${cat}'s shoes`}
                width={500}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{cat}&apos;s</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {categoryCounts[cat]} pairs available
                  </p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <ArrowRightIcon className="size-4 text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
