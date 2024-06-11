'use server'

import { getURL } from '@/lib/helpers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { type Provider } from '@supabase/supabase-js'

export async function login(email: string) {
  const supabase = createClient()
  console.log('supabase', supabase)

  const { error } = await supabase.auth.signInWithOtp({ email: email })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithOAuth(provider: Provider) {
  if (!provider) {
    return redirect('/login?message=Please select a provider')
  }

  const supabase = createClient()

  const redirectURL = getURL('/auth/callback')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectURL
    }
  })

  if (error) {
    return redirect('/login?message=Please select a provider')
  }

  return redirect(data.url)
}
