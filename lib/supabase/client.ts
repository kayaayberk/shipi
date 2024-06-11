import { env } from '@/env'
import { Database } from '@/types_db'
import { createBrowserClient } from '@supabase/ssr'

// This seperation of unusual client creation is just to pass
// supabaseAccessToken to the client without exporting an async function.

// Define a function to create a Supabase client for client-side operations
export const createClient = () =>
  createBrowserClient<Database>(
    // Pass Supabase URL and anonymous key from the environment to the client
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
