import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Docs() {
  const {
    data: { user }
  } = await createClient().auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return <div>{user.email}</div>
}
