import { SupabaseAdapter } from '@auth/supabase-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import jwt from 'jsonwebtoken'
import { env } from './env'
import { sendVerificationRequest } from './lib/auth-helpers/send-email-request'

const authConfig = {
  providers: [
    Google,
    Resend({
      sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
        console.log('sendVerificationRequest', 'EMAIL', email, 'URL', url, 'SERVER', server, 'FROM', from)
        return sendVerificationRequest({ identifier: email, url, provider: { server, from } })
      }
    })
  ],
  adapter: SupabaseAdapter({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    secret: env.SUPABASE_SERVICE_ROLE_KEY
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated'
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    }
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
