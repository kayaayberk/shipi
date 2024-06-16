import { env } from '@/env'
import Stripe from 'stripe'
import { stripe } from '../stripe/config'
import type { Database, Tables } from '@/types_db'
import { createClient } from '@supabase/supabase-js'
import { createClient as createCheckerClient } from '@/lib/supabase/server'

type Product = Tables<'products'>
type Price = Tables<'prices'>

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
export const supabaseAdmin = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL || '',
  env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null
  }

  const { error: upsertError } = await supabaseAdmin.from('products').upsert(productData)

  if (upsertError) {
    throw new Error(`Product insert/update failed: ${upsertError.message}`)
  }
  console.log(`Product inserted/updated succesfully: ${product.id}`)
}

const upsertPriceRecord = async (price: Stripe.Price, retryCount = 0, maxRetries = 3) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    type: 'one_time',
    unit_amount: price.unit_amount ?? null,
    description: price.nickname ?? null
  }

  const { error: upsertError } = await supabaseAdmin.from('prices').upsert([priceData])

  if (upsertError?.message.includes('foreign key constraint')) {
    if (retryCount < maxRetries) {
      console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await upsertPriceRecord(price, retryCount + 1, maxRetries)
    } else {
      throw new Error(
        `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`
      )
    }
  } else if (upsertError) {
    throw new Error(`Price insert/update failed: ${upsertError.message}`)
  } else {
    console.log(`Price inserted/updated: ${price.id}`)
  }
}

const deleteProductRecord = async (product: Stripe.Product) => {
  const { error: deletionError } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', product.id)
  if (deletionError) throw new Error(`Product deletion failed: ${deletionError.message}`)
  console.log(`Product deleted: ${product.id}`)
}

const deletePriceRecord = async (price: Stripe.Price) => {
  const { error: deletionError } = await supabaseAdmin.from('prices').delete().eq('id', price.id)
  if (deletionError) throw new Error(`Price deletion failed: ${deletionError.message}`)
  console.log(`Price deleted: ${price.id}`)
}

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin
    .from('users')
    .upsert([{ id: uuid, customer_id: customerId }])

  if (upsertError)
    throw new Error(`Supabase customer record creation failed: ${upsertError.message}`)

  return customerId
}

const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email }
  const newCustomer = await stripe.customers.create(customerData)
  if (!newCustomer) throw new Error('Stripe customer creation failed.')

  return newCustomer.id
}

const signInWithMagicLink = async (email: string) => {
  if (!email) throw new Error('Email required for magic link sign-in.')

  const { data, error } = await supabaseAdmin.auth.signInWithOtp({
    email: email
    // options: {
    //   shouldCreateUser: true,
    //   emailRedirectTo: 'http://localhost:3000/'
    // }
  })

  if (error) {
    console.error('Magic link sign-in failed:', error)
    throw new Error(`Magic link sign-in failed: ${error.message}`)
  }

  console.log(`Magic link sent to: ${email}`)
  return data || error
}

export async function hasAccess(email: string | undefined): Promise<boolean> {
  const supabase = createCheckerClient()
  if (!email) return false

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabaseAdmin.from('users').select('*').eq('email', email).maybeSingle()

  if (error) {
    console.error('Error fetching user data:', error)
    return false
  }

  if (data?.has_access === true) return true

  return false
}

export {
  signInWithMagicLink,
  upsertProductRecord,
  upsertPriceRecord,
  deleteProductRecord,
  deletePriceRecord,
  upsertCustomerToSupabase,
  createCustomerInStripe
}
