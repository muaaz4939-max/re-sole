"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBagIcon, Loader2Icon } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/admin/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500 shadow-lg shadow-primary/25">
            <ShoppingBagIcon className="size-7 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-foreground">
            {isSignUp ? "Create Admin Account" : "Admin Login"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignUp
              ? "Set up your admin account"
              : "Sign in to manage your store"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="admin@vintsole.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-cyan-500 text-white"
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            ) : null}
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {isSignUp ? "Already have an account?" : "First time here?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError("")
            }}
            className="font-medium text-primary hover:underline"
          >
            {isSignUp ? "Sign in" : "Create admin account"}
          </button>
        </p>
      </div>
    </div>
  )
}
