'use server'

import { randomUUID } from 'crypto'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function callToAction(email: string) {
  if (!email) {
    throw new Error('Email is required')
  }

  const { data, error: selectError } = await supabaseAdmin.from('leads').select('*').eq('email', email).maybeSingle()

  if (data?.email) {
    throw new Error('You have already subscribed!')
  }
  console.log(data)

  const { error } = await supabaseAdmin
    .from('leads')
    .insert({ id: randomUUID(), email: email, created_at: new Date().toISOString() })

  if (error) {
    throw new Error('There was an error subscribing. Please try again.')
  }
}
