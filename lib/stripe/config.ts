import { env } from '@/env'
import Stripe from 'stripe'

export const stripe = new Stripe(
  process.env.NODE_ENV === 'development'
    ? env.STRIPE_SECRET_KEY ?? ''
    : env.STRIPE_SECRET_KEY_LIVE ?? '',
  {
    apiVersion: '2024-04-10'
  }
)
