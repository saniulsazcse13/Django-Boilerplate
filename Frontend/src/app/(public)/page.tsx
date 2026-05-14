import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Services } from "@/components/sections/services"
import { Testimonials } from "@/components/sections/testimonials"
import { Pricing } from "@/components/sections/pricing"
import { FAQ } from "@/components/sections/faq"
import { Newsletter } from "@/components/sections/newsletter"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Newsletter />
      <Contact />
    </>
  )
}
