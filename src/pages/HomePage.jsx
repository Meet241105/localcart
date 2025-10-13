import { Navbar } from "../components/layout/Navbar"
import { HeroSection } from "../components/layout/HeroSection"
import { Footer } from "../components/layout/Footer"
import { Categories } from "../components/home/Categories"
import { FeaturedProducts } from "../components/home/FeaturedProducts"
import { Testimonials } from "../components/home/Testimonials"
import { CTASection } from "../components/home/CTASection"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  )
}
