import { Hero } from "@/components/home/hero"
import { CategorySection } from "@/components/home/category-section"
import { FeaturedGrid } from "@/components/home/featured-grid"
import { TrustBadges } from "@/components/home/trust-badges"

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedGrid />
      <TrustBadges />
    </>
  )
}
