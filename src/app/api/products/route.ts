import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  let query = supabase
    .from("products")
    .select("*")
    .eq("sold", false)
    .order("created_at", { ascending: false })

  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const size = searchParams.get("size")
  const condition = searchParams.get("condition")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const search = searchParams.get("search")
  const limit = searchParams.get("limit")
  const featured = searchParams.get("featured")

  if (category) query = query.eq("category", category)
  if (brand) query = query.eq("brand", brand)
  if (size) query = query.eq("size", size)
  if (condition) query = query.eq("condition", condition)
  if (minPrice) query = query.gte("price", Number(minPrice))
  if (maxPrice) query = query.lt("price", Number(maxPrice))
  if (search) {
    query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%`)
  }
  if (featured === "true") {
    query = query.eq("condition", "Like New").limit(Number(limit) || 4)
  } else if (limit) {
    query = query.limit(Number(limit))
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { data, error } = await supabase
    .from("products")
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
