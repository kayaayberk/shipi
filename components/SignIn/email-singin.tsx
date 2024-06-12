'use client'

import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { login } from '@/app/login/actions'

export const formSchema = z.object({
  email: z.string().email().min(3).max(64)
})

const formFields = [{ label: 'Email', name: 'email', type: 'text', placeholder: 'Enter email...' }]

export default function EmailSignin() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  async function onSubmit(payload: z.infer<typeof formSchema>) {
    const { email } = payload
    if (!email) {
      throw new Error('Email is required')
    }

    await login(email)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='example@email.com' {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className='w-full' type='submit'>
          Sign In
        </Button>
      </form>
    </Form>
  )
}
