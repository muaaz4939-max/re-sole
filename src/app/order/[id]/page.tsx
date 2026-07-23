"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import {
  CheckCircleIcon,
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  RulerIcon,
  HashIcon,
  MessageSquareIcon,
  ShoppingBagIcon,
  SparklesIcon,
  Loader2Icon,
} from "lucide-react"
import { type Condition } from "@/lib/types"
import { ConditionBadge } from "@/components/product/condition-badge"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  brand: string
  category: string
  type: string
  size: string
  price: number
  condition: Condition
  images: string[]
}

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    size: "",
    quantity: "1",
    notes: "",
  })

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`)
      if (res.ok) {
        const data = await res.json()
        setProduct(data)
        setForm((prev) => ({ ...prev, size: data.size }))
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return
    setSubmitting(true)

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        size: form.size,
        quantity: Number(form.quantity),
        notes: form.notes || null,
      }),
    })

    if (res.ok) {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBagIcon className="size-8 text-muted-foreground" />
        </div>
        <p className="mt-6 text-lg font-medium text-foreground">
          Product not found
        </p>
        <Button
          variant="outline"
          className="mt-4"
          render={<Link href="/shop" />}
          nativeButton={false}
        >
          <ArrowLeftIcon className="mr-1.5 size-3.5" />
          Back to Shop
        </Button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="relative mx-auto">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/25">
            <CheckCircleIcon className="size-10 text-white" />
          </div>
          <div className="absolute -right-1 -top-1">
            <SparklesIcon className="size-6 text-amber-400 animate-pulse-soft" />
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold text-foreground">
          Order Received!
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-muted-foreground">
          We&apos;ll contact you on WhatsApp shortly to confirm your order and
          arrange delivery. Sit tight!
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            className="bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/25"
            render={<Link href="/shop" />}
            nativeButton={false}
          >
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            render={<Link href="/" />}
            nativeButton={false}
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const formFields = [
    { id: "name", label: "Full Name", icon: UserIcon, type: "text", placeholder: "John Doe", required: true },
    { id: "phone", label: "Phone Number", icon: PhoneIcon, type: "tel", placeholder: "+92 300 1234567", required: true },
    { id: "address", label: "Address / City", icon: MapPinIcon, type: "text", placeholder: "123 Main St, Lahore", required: true },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href={`/product/${product.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Product
      </Link>

      <h1 className="text-3xl font-bold text-foreground">Place Your Order</h1>
      <p className="mt-2 text-muted-foreground">
        Fill in your details and we&apos;ll get back to you on WhatsApp.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="relative h-32 overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase text-gray-300">
                  {product.brand}
                </p>
                <p className="text-lg font-bold text-white">{product.title}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{formatPrice(product.price)}</p>
                <ConditionBadge condition={product.condition} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground">
            Your Details
          </h2>
          <div className="space-y-4">
            {formFields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label} {field.required && "*"}
                </Label>
                <div className="relative mt-1.5">
                  <field.icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.id}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={(form as Record<string, string>)[field.id]}
                    onChange={(e) =>
                      setForm({ ...form, [field.id]: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground">
            Order Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="size" className="text-sm font-medium">
                Confirm Size *
              </Label>
              <div className="relative mt-1.5">
                <RulerIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="size"
                  required
                  placeholder="e.g. 10"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="quantity" className="text-sm font-medium">
                Quantity *
              </Label>
              <div className="relative mt-1.5">
                <HashIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  required
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (optional)
            </Label>
            <div className="relative mt-1.5">
              <MessageSquareIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Textarea
                id="notes"
                placeholder="Any special requests or questions..."
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="pl-10 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-cyan-500/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(product.price * Number(form.quantity || 1))}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2Icon className="mr-2 size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <MessageSquareIcon className="mr-2 size-4" />
              Submit Order
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree to be contacted via WhatsApp regarding this
          order.
        </p>
      </form>
    </div>
  )
}
