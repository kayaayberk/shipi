// ref: https://github.com/vercel/next.js/blob/canary/examples/with-supabase/app/auth/callback/route.ts

import { getURL } from '@/lib/helpers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get('code')

  const next = searchParams.get('next') ?? '/docs'

  if (code) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) { return NextResponse.redirect(`${origin}${next}`) }

    const { data: { user } } = await supabase.auth.getUser()
  }

  return NextResponse.redirect(`${origin}/login?message=Error logging in. Please try again.`)
}
