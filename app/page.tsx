import DetailsSection from '@/views/Details/details-section'
import HeroSection from '@/views/HeroSection/hero-section'
import PricingSection from '@/views/Pricing/pricing-section'

export default async function Home() {
  return (
    <>
      <HeroSection />
      <DetailsSection />
      <PricingSection />
    </>
  )
}
