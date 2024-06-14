import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

// prettier-ignore
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const token_hash = searchParams.get('token_hash')

  const type = searchParams.get('type') as EmailOtpType | null

  const email = searchParams.get('email') as string

  const next = searchParams.get('next') ?? '/docs'


  
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')
  redirectTo.searchParams.delete('email')


  if (token_hash && type) {

    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({ type, token_hash })

    if (!error) {

      // Give user access to the product once the email link is clicked/verified
      const { error: updateError } = await supabaseAdmin.from('users').update({ has_access: true }).eq('email', email)

      if (updateError) {
        return NextResponse.redirect('/login?message=Could not update product Access. Please try again.')
      }

      redirectTo.searchParams.delete('next')

      return NextResponse.redirect(redirectTo)

    }

  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/login?message=Could not verify your OTP. Please try again.'
  return NextResponse.redirect(redirectTo)
}
