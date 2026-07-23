"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SearchIcon, XIcon, SlidersHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  categories,
  conditions,
  sizes,
  priceRanges,
} from "@/lib/mock-data"

const brands = ["Adidas", "Asics", "Converse", "New Balance", "Nike", "Puma", "Reebok", "Vans"]

interface Filters {
  search: string
  category: string
  brand: string
  size: string
  priceRange: string
  condition: string
}

export function FilterSidebar({
  filters,
  onFilterChange,
}: {
  filters: Filters
  onFilterChange: (key: keyof Filters, value: string) => void
}) {
  const hasActiveFilters =
    filters.category ||
    filters.brand ||
    filters.size ||
    filters.priceRange ||
    filters.condition

  const activeCount = [
    filters.category,
    filters.brand,
    filters.size,
    filters.priceRange,
    filters.condition,
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontalIcon className="size-4 text-foreground" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Filters
          </h2>
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onFilterChange("search", "")
              onFilterChange("category", "")
              onFilterChange("brand", "")
              onFilterChange("size", "")
              onFilterChange("priceRange", "")
              onFilterChange("condition", "")
            }}
            className="text-xs font-medium text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search shoes..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                onFilterChange("category", filters.category === cat ? "" : cat)
              }
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-all",
                filters.category === cat
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{cat}</span>
              {filters.category === cat && (
                <XIcon className="size-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Brand
        </h3>
        <div className="space-y-1">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() =>
                onFilterChange("brand", filters.brand === brand ? "" : brand)
              }
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-all",
                filters.brand === brand
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{brand}</span>
              {filters.brand === brand && (
                <XIcon className="size-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Size
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                onFilterChange("size", filters.size === size ? "" : size)
              }
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-xl text-xs font-medium transition-all",
                filters.size === size
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "border bg-white text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Price Range
        </h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() =>
                onFilterChange(
                  "priceRange",
                  filters.priceRange === range.label ? "" : range.label
                )
              }
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-all",
                filters.priceRange === range.label
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{range.label}</span>
              {filters.priceRange === range.label && (
                <XIcon className="size-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Condition
        </h3>
        <div className="space-y-1">
          {conditions.map((cond) => (
            <button
              key={cond}
              onClick={() =>
                onFilterChange("condition", filters.condition === cond ? "" : cond)
              }
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-all",
                filters.condition === cond
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{cond}</span>
              {filters.condition === cond && (
                <XIcon className="size-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full rounded-xl border-dashed"
          onClick={() => {
            onFilterChange("search", "")
            onFilterChange("category", "")
            onFilterChange("brand", "")
            onFilterChange("size", "")
            onFilterChange("priceRange", "")
            onFilterChange("condition", "")
          }}
        >
          <XIcon className="mr-1.5 size-3.5" />
          Clear All Filters
        </Button>
      )}
    </div>
  )
}
