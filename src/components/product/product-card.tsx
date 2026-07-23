import Link from "next/link"
import Image from "next/image"
import { ConditionBadge } from "./condition-badge"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { EyeIcon } from "lucide-react"

type ProductCardProduct = Omit<Product, "description">

export function ProductCard({ product }: { product: ProductCardProduct }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="card-hover overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute left-3 top-3">
            <ConditionBadge condition={product.condition} />
          </div>
          <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
              <EyeIcon className="size-4 text-foreground" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                {product.brand}
              </p>
              <h3 className="mt-1 truncate text-[15px] font-semibold text-foreground">
                {product.title}
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="rounded-md bg-muted px-1.5 py-0.5 font-medium">
                {product.size}
              </span>
              <span className="rounded-md bg-muted px-1.5 py-0.5 font-medium">
                {product.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
