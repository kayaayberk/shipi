import NavigationLinks from './navigation-links'
import { createClient } from '@/lib/supabase/server'

export default async function NavigationDesktop() {
  
  const { data: { user } } = await createClient().auth.getUser()

  return (
    <nav className='sticky top-0 pt-4 hidden md:block'>
      <div className='flex items-center gap-10 justify-center md:max-w-min mx-auto px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl'>
        <NavigationLinks user={user} />
      </div>
    </nav>
  )
}
