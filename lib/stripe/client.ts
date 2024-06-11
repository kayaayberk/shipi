import { env } from '@/env'
import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NODE_ENV === 'development'
        ? env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST ?? ''
        : env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ?? ''
    )
  }
  return stripePromise
}


