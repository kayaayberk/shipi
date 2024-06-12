import { createClient } from '@/lib/supabase/server'
import HeroSection from '@/views/HeroSection/hero-section'

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()

  console.log(data, error)

  return (
    <>
      <HeroSection />
    </>
  )
}
