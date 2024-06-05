import { createEnv } from '@t3-oss/env-nextjs'
import z from 'zod'

export const env = createEnv({
  skipValidation:
    process.env.NODE_ENV !== 'production' || process.env.SKIP_ENV_VALIDATION === 'true',
  server: {
    STRIPE_SECRET_KEY_LIVE: z.string(),
    STRIPE_SECRET_KEY: z.string(),

    STRIPE_WEBHOOK_SECRET: z.string(),

    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
    POSTGRES_URL: z.string(),
    POSTGRES_PRISMA_URL: z.string(),
    POSTGRES_URL_NON_POOLING: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),

    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    SUPABASE_JWT_SECRET: z.string(),

    AUTH_SECRET: z.string(),

    RESEND_API_KEY: z.string(),
    RESEND_FROM: z.string()
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string()
  },
  runtimeEnv: {
    STRIPE_SECRET_KEY_LIVE: process.env.STRIPE_SECRET_KEY_LIVE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,

    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,

    AUTH_SECRET: process.env.AUTH_SECRET,

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM
  }
})
