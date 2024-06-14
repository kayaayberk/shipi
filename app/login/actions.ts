'use server'

import { getURL } from '@/lib/helpers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { type Provider } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function webhookEmailUserCreate(email: string, full_name?: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      data: {
        full_name: full_name,
        logo_url: 'https://i.imghippo.com/files/fVeck1718201224.png',
        user_logo_url: 'https://i.imghippo.com/files/s4FX71718201279.png',
        arrow_url: 'https://i.imghippo.com/files/7OmS51718201306.png',
        main_logo: 'https://i.imghippo.com/files/ZoWCW1718201364.png'
      }
    }
  })

  if (error) {
    redirect('/error')
  }
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

export async function login(email: string) {
  const supabase = createClient()

  const { data } = await supabaseAdmin.from('users').select('*').eq('email', email).maybeSingle()

  if (!data) {
    throw new Error('User not found')
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
      data: {
        full_name: data.email,
        logo_url: 'https://i.imghippo.com/files/fVeck1718201224.png',
        user_logo_url: 'https://i.imghippo.com/files/s4FX71718201279.png',
        arrow_url: 'https://i.imghippo.com/files/7OmS51718201306.png',
        main_logo: 'https://i.imghippo.com/files/ZoWCW1718201364.png'
      }
    }
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return redirect('/error')
  }

  redirect('/login')
}
