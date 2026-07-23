"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ConditionBadge } from "@/components/product/condition-badge"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Loader2Icon,
  PackageIcon,
} from "lucide-react"

interface Product {
  id: string
  title: string
  brand: string
  category: string
  type: string
  size: string
  price: number
  condition: string
  images: string[]
  sold: boolean
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return
    setDeleting(id)
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    setProducts(products.filter((p) => p.id !== id))
    setDeleting(null)
  }

  const toggleSold = async (id: string, sold: boolean) => {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sold: !sold }),
    })
    setProducts(
      products.map((p) => (p.id === id ? { ...p, sold: !sold } : p))
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Product Inventory
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-primary to-cyan-500 text-white"
          render={<Link href="/admin/products/new" />}
          nativeButton={false}
        >
          <PlusIcon className="mr-1.5 size-4" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed bg-white py-20 text-center">
          <PackageIcon className="size-12 text-muted-foreground" />
          <p className="mt-4 font-medium text-foreground">No products yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first shoe listing to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex items-center gap-4 rounded-2xl border bg-white p-4 transition-all ${
                product.sold ? "opacity-60" : ""
              }`}
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.images[0] || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase text-primary">
                    {product.brand}
                  </p>
                  {product.sold && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                      SOLD
                    </span>
                  )}
                </div>
                <h3 className="truncate font-semibold text-foreground">
                  {product.title}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · Size {product.size}
                  </span>
                  <ConditionBadge
                    condition={product.condition as "Like New" | "Good" | "Fair"}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSold(product.id, product.sold)}
                >
                  {product.sold ? "Mark Available" : "Mark Sold"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  render={
                    <Link href={`/admin/products/${product.id}/edit`} />
                  }
                  nativeButton={false}
                >
                  <PencilIcon className="size-3.5" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  disabled={deleting === product.id}
                >
                  {deleting === product.id ? (
                    <Loader2Icon className="size-3.5 animate-spin" />
                  ) : (
                    <TrashIcon className="size-3.5" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
