"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product/product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, Loader2Icon } from "lucide-react"
import type { Product } from "@/lib/types"

export function FeaturedGrid() {
  const [featured, setFeatured] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await fetch("/api/products?featured=true&limit=4")
      const data = await res.json()
      setFeatured(data)
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <div className="mx-auto h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="mx-auto mt-3 h-8 w-48 animate-pulse rounded bg-muted" />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border bg-card"
              >
                <div className="aspect-square bg-muted" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-16 rounded-lg bg-muted-foreground/20" />
                  <div className="h-4 w-32 rounded-lg bg-muted-foreground/20" />
                  <div className="h-5 w-20 rounded-lg bg-muted-foreground/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (featured.length === 0) return null

  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Handpicked for You
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Featured Picks
            </h2>
            <p className="mt-2 text-muted-foreground">
              Like-new condition, unbeatable prices
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 border-primary/20 text-primary hover:bg-primary hover:text-white"
            render={<Link href="/shop" />}
            nativeButton={false}
          >
            View All
            <ArrowRightIcon className="ml-1 size-3.5" />
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
