'use client'

import PricingCards from '@/components/Pricing/pricing-cards'

export default function PricingSection() {
  return (
    <div id='pricing' className='space-y-10 mx-auto mt-20 w-full max-w-container-md'>
      <div className='flex flex-col items-center max-w-container-xs mx-auto gap-5'>
        <h2 className='text-xl text-brand'>Pricing</h2>
        <h1 className='text-5xl font-bold text-center'>Ship <span className='text-brand'>Shopify</span> stores faster with latest technologies!</h1>
      </div>
      <PricingCards />
    </div>
  )
}
