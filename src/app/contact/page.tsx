import {
  MessageCircleIcon,
  MailIcon,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const contactMethods = [
  {
    icon: MessageCircleIcon,
    title: "WhatsApp",
    description: "Get instant responses to your questions",
    action: "Message Us",
    href: "https://wa.me/1234567890",
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
  },
  {
    icon: MailIcon,
    title: "Email",
    description: "For detailed inquiries and bulk orders",
    action: "Send Email",
    href: "mailto:hello@re-sole.com",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
  },
]

const details = [
  {
    icon: ClockIcon,
    title: "Response Time",
    description: "We typically respond within 1 hour during business hours",
  },
  {
    icon: MapPinIcon,
    title: "Location",
    description: "Serving customers nationwide with fast shipping",
  },
]

const faqs = [
  {
    q: "How are the shoes graded?",
    a: "Every pair goes through a 3-step process: inspection, grading (Like New, Good, Fair), and professional cleaning.",
  },
  {
    q: "What's the return policy?",
    a: "7-day returns on all orders. If the shoes don't match the listing or don't fit, we'll refund you in full.",
  },
  {
    q: "How do I place an order?",
    a: "Browse shoes, click 'Order Now', fill the form, and we'll contact you on WhatsApp to confirm and arrange delivery.",
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,transparent_50%)] opacity-15" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Get In <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Have a question about a shoe? Need help with sizing? Want to place a
            custom order? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {contactMethods.map((method, idx) => (
            <div
              key={method.title}
              className="group flex flex-col items-center rounded-3xl border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`flex size-16 items-center justify-center rounded-2xl ${method.bg} transition-transform duration-300 group-hover:scale-110`}>
                <method.icon className="size-8 text-foreground/70" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-foreground">
                {method.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {method.description}
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/25"
                nativeButton={false}
                render={
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {method.action}
                <ArrowRightIcon className="ml-1 size-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {details.map((detail, idx) => (
            <div
              key={detail.title}
              className="flex gap-5 rounded-2xl border bg-card p-6 shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${(idx + 2) * 100}ms` }}
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                <detail.icon className="size-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{detail.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {detail.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-card p-6 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="font-bold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Browse Our Collection
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-400">
            Find your perfect pair today
          </p>
          <Button
            size="lg"
            className="mt-8 bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/25"
            render={<Link href="/shop" />}
            nativeButton={false}
          >
            Shop Now
            <ArrowRightIcon className="ml-1 size-3.5" />
          </Button>
        </div>
      </section>
    </>
  )
}
