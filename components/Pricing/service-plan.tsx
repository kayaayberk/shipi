import Link from 'next/link'
import { Button } from '../ui/button'
import { servicePlan } from '@/lib/constants'
import Separator from '../Seperator/seperator'
import BuyButton from '../BuyButton/buy-button'
import { ArrowRight, Check } from 'lucide-react'

export default function ServicePlan() {
  return (
    <div className='animate-slide-to-right relative flex flex-col gap-10 rounded-xl border bg-neutral-700/10 p-10'>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-semibold text-brand'>Custom Plan</h1>
        <p className='space-x-1 text-neutral-400'>
          Starting from <span className='text-5xl font-extrabold text-white/90'>$999</span>
          <span className='text-xs'>USD</span>
        </p>
      </div>
      <hr />
      <div className='flex flex-col justify-between gap-10 lg:flex-row'>
        <ul className='flex w-full flex-col gap-2'>
          {servicePlan.options.map((option) => (
            <li className='flex items-center gap-2 text-neutral-500' key={option}>
              <Check size={16} className='text-brand' /> {option}
            </li>
          ))}
        </ul>
        <div className='w-full space-y-4 text-xs text-neutral-400'>
          <span className='text-sm font-semibold'>Important notes</span>
          <ol className='list-disc space-y-4'>
            <li>This plan is designed for those who seek for a development service</li>
            <li className=''>
              Specified plan details only apply for exact design of the Shopify store that you can
              check out
              <Link
                className='mx-1 inline-flex w-min items-center underline'
                href='https://nextjs-commerce-boilerplate-alpha.vercel.app'
                target='_blank'
              >
                here <ArrowRight size={16} className='-rotate-45' />
              </Link>
              Please ask for a quote if you have something different in mind.
            </li>
            <li>Customized Shopify stores might add additional fees.</li>
          </ol>
        </div>
      </div>
      <div className='flex w-full flex-col lg:w-1/2'>
        <Button className='mx-auto w-full rounded-xl py-5' variant='outline' size='lg' asChild>
          <Link href='#'>Book a call</Link>
        </Button>
        <Separator text='or' />
        <BuyButton
          className='w-full'
          paymentLink='https://buy.stripe.com/test_8wMcQP3n2gQ3g3S3cc'
        />
      </div>
    </div>
  )
}
