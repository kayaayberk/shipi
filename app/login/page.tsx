import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SigninSection from '@/views/SigninView/signin-section'

export default async function Login() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/')

  return (
    <div className='flex justify-center h-[calc(100vh-80px)] max-w-md mx-auto'>
      <SigninSection />
    </div>
  )
}
