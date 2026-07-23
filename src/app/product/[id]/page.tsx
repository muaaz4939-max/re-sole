import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ProductGallery } from "@/components/product/product-gallery"
import { ConditionBadge } from "@/components/product/condition-badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import {
  TagIcon,
  RulerIcon,
  PackageIcon,
  ArrowLeftIcon,
  MessageCircleIcon,
} from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (!product) {
    notFound()
  }

  const specs = [
    { icon: TagIcon, label: "Brand", value: product.brand },
    { icon: RulerIcon, label: "Size (US)", value: product.size },
    { icon: PackageIcon, label: "Category", value: `${product.category} · ${product.type}` },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images || []} />

        <div className="flex flex-col animate-fade-in-up">
          <div className="flex items-center gap-3">
            <ConditionBadge condition={product.condition} />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.category} &middot; {product.type}
            </span>
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {product.title}
          </h1>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Best Price
            </span>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-3 gap-4">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col items-center rounded-2xl border bg-muted/50 p-4 text-center"
              >
                <spec.icon className="mb-2 size-5 text-muted-foreground" />
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {spec.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Description
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-8 space-y-3">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
              render={<Link href={`/order/${product.id}`} />}
              nativeButton={false}
            >
              <MessageCircleIcon className="mr-2 size-4" />
              Order Now via WhatsApp
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Fill a quick form and we&apos;ll contact you on WhatsApp within minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
