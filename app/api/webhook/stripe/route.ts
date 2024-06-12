import { webhookEmailUserCreate } from '@/app/login/actions'
import { env } from '@/env'
import { stripe } from '@/lib/stripe/config'
import {
  deletePriceRecord,
  deleteProductRecord,
  signInWithMagicLink,
  supabaseAdmin,
  upsertPriceRecord,
  upsertProductRecord
} from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/types_db'
import Error from 'next/error'
import Stripe from 'stripe'

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'product.deleted',
  'price.created',
  'price.updated',
  'price.deleted',
  'checkout.session.completed'
])
type Profiles = Tables<'users'>

export async function POST(req: Request) {
  const body = await req.text()

  const signature = req.headers.get('stripe-signature') ?? ''

  const webhookSecret = env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  const supabase = createClient()

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    console.log(`🔔  Webhook received: ${event.type}`)
  } catch (err: Error | any) {
    console.error(`❌ Error message: ${err.message}`)

    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(event.data.object as Stripe.Product)
          break
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(event.data.object as Stripe.Price)
          break
        case 'price.deleted':
          await deletePriceRecord(event.data.object as Stripe.Price)
          break
        case 'product.deleted':
          await deleteProductRecord(event.data.object as Stripe.Product)
          break
        case 'checkout.session.completed':
          let user: Profiles

          const session = (await stripe.checkout.sessions.retrieve(event.data.object.id, {
            expand: ['line_items', 'customer']
          })) as Stripe.Checkout.Session

          const customerRetrieve = session.customer as Stripe.Customer

          const customerId = customerRetrieve.id

          const customer = session.customer as Stripe.Customer

          const customerEmail = customer.email as string

          const priceId = session.line_items?.data[0].price?.id

          if (!customer.email) return new Response('No customer email found', { status: 400 })

          // send and email to the customer with a magic link to sign in
          // this does not assign customer properties only authenticates them
          await webhookEmailUserCreate(customerEmail, customer.name ?? '')

          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', customerEmail)
            .maybeSingle()

          if (!userData || userError) {
            return new Response('User not found', { status: 400 })
          }
          console.log('User data:', userData)

          const { data, error } = await supabase
            .from('users')
            .update({
              stripe_customer_id: customerId,
              full_name: customer.name,
              has_access: false,
              price_id: priceId
            })
            .eq('æd', userData.id)

          console.log('User updated:', data, 'Error from updating', error)

          if (error) {
            return new Response('Error fetching user', { status: 400 })
          }

          break
        default:
          console.warn(`Unhandled event type: ${event.type}`)
      }
    } catch (error) {
      console.log(error)
      return new Response('Webhook handler failed. View your Next.js function logs.', {
        status: 400
      })
    }
  } else {
    return new Response(`Unsupported event type:`, {
      status: 400
    })
  }
  return new Response(null, { status: 200 })
}
