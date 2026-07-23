import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*, products(title, brand, price, images)")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("title, brand, price")
    .eq("id", body.product_id)
    .single()

  if (productError) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      product_id: body.product_id,
      customer_name: body.customer_name,
      phone: body.phone,
      address: body.address,
      size: body.size,
      quantity: body.quantity,
      notes: body.notes || null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // WhatsApp integration placeholder
  // When CallMeBot is configured, send WhatsApp message here:
  // const phone = process.env.CALLMEBOT_PHONE
  // const apikey = process.env.CALLMEBOT_APIKEY
  // const message = `🛒 *New Order — Re-Sole*\n\n*Product:* ${product.title} (${product.brand})\n*Size:* ${body.size}\n*Price:* Rs. ${product.price}\n\n*Customer:* ${body.customer_name}\n*Phone:* ${body.phone}\n*Address:* ${body.address}\n*Qty:* ${body.quantity}\n*Notes:* ${body.notes || "None"}`
  // await fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apikey}`)

  return NextResponse.json(data, { status: 201 })
}
