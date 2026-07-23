"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { MenuIcon, XIcon, ShoppingBagIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-white/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
          : "bg-white"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
            <ShoppingBagIcon className="size-4.5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Vintsole
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative size-4">
            <MenuIcon
              className={cn(
                "absolute inset-0 size-4 transition-all",
                mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              )}
            />
            <XIcon
              className={cn(
                "absolute inset-0 size-4 transition-all",
                mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              )}
            />
          </div>
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 border-t bg-white px-4 pb-4 pt-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
