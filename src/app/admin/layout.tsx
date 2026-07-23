import Link from "next/link"
import { ShoppingBagIcon } from "lucide-react"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted/30">
      <div className="border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5 text-primary" />
            <span className="font-bold text-foreground">Re-Sole Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              View Store
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
    </div>
  )
}
