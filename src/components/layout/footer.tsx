import Link from "next/link"
import { ShoppingBagIcon, HeartIcon } from "lucide-react"

const footerCategories = [
  { href: "/shop?category=Men", label: "Men" },
  { href: "/shop?category=Women", label: "Women" },
  { href: "/shop?category=Kids", label: "Kids" },
]

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "All Shoes" },
]

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-500">
                <ShoppingBagIcon className="size-4.5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Re-Sole</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Quality used shoes at affordable prices. Every pair inspected,
              every purchase trusted. Step into sustainable style.
            </p>
            <div className="mt-6 flex gap-3">
              {["Twitter", "Instagram", "Facebook"].map((social) => (
                <div
                  key={social}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-gray-400 transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-white cursor-pointer"
                >
                  {social[0]}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerCategories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {cat.label}&apos;s Shoes
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; 2026 Re-Sole. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            Made with <HeartIcon className="size-3 fill-red-500 text-red-500" /> for shoe lovers
          </p>
        </div>
      </div>
    </footer>
  )
}
