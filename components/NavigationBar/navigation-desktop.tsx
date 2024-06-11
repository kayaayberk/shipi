import NavigationLinks from './navigation-links'
import { createClient } from '@/lib/supabase/server'

export default async function NavigationDesktop() {
  const {
    data: { user }
  } = await createClient().auth.getUser()

  return (
    <nav className='sticky top-0 pt-4 hidden md:block'>
      <div className='flex items-center gap-2 justify-center md:max-w-min mx-auto px-4 py-2 rounded-2xl bg-black/20 dark:bg-white/5 backdrop-blur-md'>
        <NavigationLinks user={user} />
      </div>
    </nav>
  )
}
