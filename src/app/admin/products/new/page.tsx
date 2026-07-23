"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftIcon, Loader2Icon, UploadIcon, XIcon, ImageIcon } from "lucide-react"
import Link from "next/link"

const categories = ["Men", "Women", "Kids"]
const types = ["Sneakers", "Formal", "Sports"]
const conditions = ["Like New", "Good", "Fair"]

export default function AdminNewProductPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "Men",
    type: "Sneakers",
    size: "",
    price: "",
    condition: "Like New",
    description: "",
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: string[] = []

    for (const file of Array.from(files)) {
      const dataUrl = await fileToBase64(file)
      newImages.push(dataUrl)
    }

    setImages((prev) => [...prev, ...newImages])
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (images.length === 0) {
      setError("Please upload at least one image")
      setLoading(false)
      return
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        images,
        sold: false,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Failed to create product")
      setLoading(false)
      return
    }

    router.push("/admin/dashboard")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-foreground">Add New Product</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the details to list a new shoe
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
            Basic Info
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                required
                placeholder="e.g. Air Max 90"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                required
                placeholder="e.g. Nike"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="size">Size *</Label>
              <Input
                id="size"
                required
                placeholder="e.g. 10"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1.5 flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Type *</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="mt-1.5 flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Condition *</Label>
              <select
                value={form.condition}
                onChange={(e) =>
                  setForm({ ...form, condition: e.target.value })
                }
                className="mt-1.5 flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              >
                {conditions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="price">Price (PKR) *</Label>
              <Input
                id="price"
                type="number"
                required
                placeholder="e.g. 18000"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
            Description
          </h2>
          <Textarea
            placeholder="Describe the shoe's condition, wear history, what's included..."
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
            Images
          </h2>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            {uploading ? (
              <Loader2Icon className="size-8 animate-spin text-primary" />
            ) : (
              <UploadIcon className="size-8 text-muted-foreground" />
            )}
            <p className="text-sm font-medium text-foreground">
              {uploading ? "Uploading..." : "Click to upload images"}
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WebP — up to 5MB each
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.map((src, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-xl border">
                  <img
                    src={src}
                    alt={`Upload ${idx + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <XIcon className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Upload photos of the shoe — at least 1 image required
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-cyan-500 text-white"
          disabled={loading}
        >
          {loading ? <Loader2Icon className="mr-2 size-4 animate-spin" /> : null}
          Create Product
        </Button>
      </form>
    </div>
  )
}
