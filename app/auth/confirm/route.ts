import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/docs'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({ type, token_hash }) //=>
    //                                                        ^?
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user) {
      const { data, error: updateError } = await supabase
        .from('users')
        .update({ has_access: true })
        .eq('email', user.email as string)

      if (!updateError) {
        redirectTo.pathname = '/login?message=You now have access to the product.'
        console.log(data)
        return NextResponse.redirect(redirectTo)
      }
      console.log(updateError)
    } else {
      // return the user to an error page with some instructions
      redirectTo.pathname = '/login?message=Could not give access to the product.'
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/login?message=Could not verify your OTP. Please try again.'
  return NextResponse.redirect(redirectTo)
}
