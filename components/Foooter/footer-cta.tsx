'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { callToAction } from '@/app/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

export const formSchema = z.object({
  email: z.string().email().min(3).max(64)
})

const formFields = [
  { label: 'Email', name: 'email', type: 'text', placeholder: 'Enter your email...' }
]

export default function CallToAction() {
  async function onSubmit(payload: z.infer<typeof formSchema>) {
    const { email } = payload
    if (!email) {
      throw new Error('Email is required')
    }

    try {
      await callToAction(email)
      toast.success('You have successfully subscribed!')
      form.reset()
    } catch (error: any) {
      toast.error(error.message)
      form.reset()
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full space-y-4'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold leading-none text-neutral-200'>Join our mail list</h1>
          <p className='text-sm font-light tracking-wide text-neutral-500 whitespace-nowrap'>
            Get updates on new products, features, and more.
          </p>
        </div>
        <Form {...form}>
          <div className='relative rounded-lg border border-brand p-1'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='relative flex items-center'>
              {formFields.map((singleField) => (
                <FormField
                  key={singleField.name}
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={singleField.placeholder}
                          {...field}
                          className='w-fit border-transparent focus-visible:ring-0'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button className='absolute right-0 bg-brand' type='submit' size='sm'>
                Subscribe
              </Button>
            </form>
          </div>
        </Form>
      </div>
    </div>
  )
}
