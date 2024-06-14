import {
  supabaseAdmin,
  deletePriceRecord,
  upsertPriceRecord,
  upsertProductRecord,
  deleteProductRecord
} from '@/lib/supabase/admin'
import { env } from '@/env'
import Stripe from 'stripe'
import Error from 'next/error'
import { stripe } from '@/lib/stripe/config'
import { webhookEmailUserCreate } from '@/app/login/actions'


// prettier-ignore
export async function POST(req: Request) {
  const body = await req.text()

  const signature = req.headers.get('stripe-signature') ?? ''

  const webhookSecret = env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    console.log(`Webhook received: ${event.type} -- ✅ --`)
  } catch (err: Error | any) {
    console.error(`Error message: ${err.message} -- ❌ --`)

    return new Response(`Webhook Error: ${err.message} -- ❌ --`, { status: 400 })
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

          const session = (await stripe.checkout.sessions.retrieve(event.data.object.id, {
            expand: ['line_items', 'customer']
          })) as Stripe.Checkout.Session

          const customerRetrieve = session.customer as Stripe.Customer

          const customerId = customerRetrieve.id

          const customer = session.customer as Stripe.Customer

          const customerEmail = customer.email as string

          const priceId = session.line_items?.data[0].price?.id

          if (!customer.email) {
            return new Response('No customer email found', { status: 400 })
          }

          // send an email to the customer with a magic link to sign in
          // this does not assign customer properties only authenticates them
          await webhookEmailUserCreate(customerEmail, customer.name ?? '')

          // update the user record with the stripe customer data
          const { error } = await supabaseAdmin
            .from('users')
            .update({ stripe_customer_id: customerId, full_name: customer.name, has_access: false, price_id: priceId })
            .eq('email', customerEmail)

          if (error) {
            console.error('Error updating user:', error, '-- ❌ --')

            return new Response('Error updating user -- ❌ --', { status: 400 })
          }

          console.log('User data updated -- ✅✅ --')

          break

        default:
          console.warn(`Unhandled event type: ${event.type} -- ❓ --`)

          return new Response('Unhandled relevant event! -- ❓ --', { status: 400 })
      }
    } catch (error) {

      console.log(error)

      return new Response('Webhook handler failed. View your Next.js function logs. -- ❌ --', { status: 400 })
    } finally {
        return new Response(JSON.stringify({ received: true, status: 200 }))
    }

  } else {
    return new Response(`Unsupported event type -- ❓ --`, { status: 400 })
  }

  
}
