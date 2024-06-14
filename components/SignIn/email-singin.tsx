'use client'

import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { login } from '@/app/login/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { toast } from 'sonner'

export const formSchema = z.object({
  email: z.string().email().min(3).max(64)
})

const formFields = [{ label: 'Email', name: 'email', type: 'text', placeholder: 'Enter your email...' }]

export default function EmailSignin() {
  async function onSubmit(payload: z.infer<typeof formSchema>) {
    const { email } = payload
    if (!email) {
      throw new Error('Email is required')
    }

    try {
      await login(email)
      toast.success('Check your email for a sign in link')
    } catch (error) {
      toast.error('There was an error signing in. Please purchase the product first.')
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        {formFields.map((singleField) => (
          <FormField
            key={singleField.name}
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=''>Email</FormLabel>
                <FormControl>
                  <Input placeholder={singleField.placeholder} {...field} />
                </FormControl>
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
