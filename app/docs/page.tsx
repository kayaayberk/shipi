import { hasAccess } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Docs() {
  const {
    data: { user }
  } = await createClient().auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const access = await hasAccess(user.email)

  console.log('Access:', access)

  return (
    <div>
      {user.email}
      {access ? <p>Has Access ✅</p> : <p>No Access ❌</p>}
    </div>
  )
}
