"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product/product-card"
import { FilterSidebar } from "@/components/product/filter-sidebar"
import { priceRanges } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { SlidersHorizontalIcon, SearchIcon, XIcon, Loader2Icon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

function ShopContent() {
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    search: "",
    category: searchParams.get("category") || "",
    brand: "",
    size: "",
    priceRange: "",
    condition: "",
  })

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredProducts = products.filter((product) => {
    if (
      filters.search &&
      !product.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !product.brand.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false

    if (filters.category && product.category !== filters.category)
      return false

    if (filters.brand && product.brand !== filters.brand) return false

    if (filters.size && product.size !== filters.size) return false

    if (filters.condition && product.condition !== filters.condition)
      return false

    if (filters.priceRange) {
      const range = priceRanges.find((r) => r.label === filters.priceRange)
      if (range && (product.price < range.min || product.price >= range.max))
        return false
    }

    return true
  })

  const activeFilters = [
    filters.category,
    filters.brand,
    filters.size,
    filters.priceRange,
    filters.condition,
  ].filter(Boolean)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Shop All Shoes
        </h1>
        <p className="mt-2 text-muted-foreground">
          {loading ? (
            <span className="inline-flex items-center gap-1">
              <Loader2Icon className="size-3 animate-spin" /> Loading...
            </span>
          ) : (
            <>
              {filteredProducts.length} pair
              {filteredProducts.length !== 1 ? "s" : ""} found
            </>
          )}
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or brand..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>

            <div className="flex items-center gap-3">
              {activeFilters.length > 0 && (
                <div className="hidden items-center gap-2 sm:flex">
                  {activeFilters.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {f}
                      <XIcon
                        className="size-3 cursor-pointer"
                        onClick={() => {
                          if (filters.category === f)
                            handleFilterChange("category", "")
                          if (filters.brand === f)
                            handleFilterChange("brand", "")
                          if (filters.size === f)
                            handleFilterChange("size", "")
                          if (filters.priceRange === f)
                            handleFilterChange("priceRange", "")
                          if (filters.condition === f)
                            handleFilterChange("condition", "")
                        }}
                      />
                    </span>
                  ))}
                </div>
              )}

              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger
                  render={
                    <Button variant="outline" size="sm" className="rounded-xl lg:hidden" />
                  }
                >
                  <SlidersHorizontalIcon className="mr-1.5 size-3.5" />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="ml-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                      {activeFilters.length}
                    </span>
                  )}
                </SheetTrigger>
                <SheetContent side="left" className="w-72 overflow-y-auto">
                  <div className="mt-6">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
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
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/30 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <SearchIcon className="size-8 text-muted-foreground" />
              </div>
              <p className="mt-6 text-lg font-medium text-foreground">
                No shoes found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters or search term
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setFilters({
                    search: "",
                    category: "",
                    brand: "",
                    size: "",
                    priceRange: "",
                    condition: "",
                  })
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded-xl bg-muted" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded-xl bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
      }
    >
      <ShopContent />
    </Suspense>
  )
}
