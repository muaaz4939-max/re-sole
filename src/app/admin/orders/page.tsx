"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { Loader2Icon, ShoppingCartIcon } from "lucide-react"

interface Order {
  id: string
  customer_name: string
  phone: string
  address: string
  size: string
  quantity: number
  notes: string | null
  created_at: string
  products: {
    title: string
    brand: string
    price: number
    images: string[]
  } | null
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*, products(title, brand, price, images)")
      .order("created_at", { ascending: false })
    setOrders(data || [])
    setLoading(false)
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Order Log</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {orders.length} order{orders.length !== 1 ? "s" : ""} received
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed bg-white py-20 text-center">
          <ShoppingCartIcon className="size-12 text-muted-foreground" />
          <p className="mt-4 font-medium text-foreground">No orders yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Orders will appear here when customers submit them
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {new Date(order.created_at).toLocaleString("en-PK")}
                  </p>
                  <h3 className="mt-1 font-semibold text-foreground">
                    {order.customer_name}
                  </h3>
                </div>
                {order.products && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {order.products.brand}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {order.products.title}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {formatPrice(order.products.price * order.quantity)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-[11px] font-medium uppercase text-muted-foreground">
                    Phone
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {order.phone}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-[11px] font-medium uppercase text-muted-foreground">
                    Address
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {order.address}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-[11px] font-medium uppercase text-muted-foreground">
                    Size
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {order.size}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-[11px] font-medium uppercase text-muted-foreground">
                    Quantity
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {order.quantity}
                  </p>
                </div>
              </div>

              {order.notes && (
                <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm">
                  <p className="text-[11px] font-medium uppercase text-amber-600">
                    Notes
                  </p>
                  <p className="mt-0.5 text-amber-800">{order.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
