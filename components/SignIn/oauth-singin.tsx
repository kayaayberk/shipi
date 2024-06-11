'use client'

import { useState } from 'react'
import { Icons } from '../Icons/icons'
import { type Provider } from '@supabase/supabase-js'
import { signInWithOAuth } from '@/app/login/actions'
import { Button } from '../ui/button'

type OAuthProviders = {
  name: Provider
  displayName: string
  icon: JSX.Element
}

export default function OauthSignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const oAuthProviders: OAuthProviders[] = [
    {
      name: 'google',
      displayName: 'Google',
      icon: <Icons.Google className='h-5 w-5' />
    }
  ]

  return (
    <div className='mt-8'>
      {oAuthProviders.map((provider) => (
        <Button
          onClick={async () => {
            setIsSubmitting(true)
            await signInWithOAuth(provider.name)
            setIsSubmitting(false)
          }}
          key={provider.name}
          variant='default'
          type='submit'
          className='w-full'
          disabled={isSubmitting}
        >
          <span className='mr-2'>{provider.icon}</span>
          <span>{provider.displayName}</span>
        </Button>
      ))}
    </div>
  )
}
