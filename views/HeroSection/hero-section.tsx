'use client'

import HeaderImage from '@/public/HeaderImage.png'
import Reviews from '@/components/HeroComponents/reviews'
import BuyButton from '@/components/BuyButton/buy-button'
import HeroHeader from '@/components/HeroComponents/hero-header'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className='mx-auto flex w-full justify-center bg-gradient-to-br from-[#141414] via-[#141414] to-[#B4EA51] px-10 lg:flex-row'>
      <div className='flex max-w-container-md flex-col items-center justify-between gap-5 lg:flex-row'>
        <div className='mx-auto flex flex-col items-center justify-start gap-16 py-20 lg:items-start'>
          <HeroHeader />

          <BuyButton
            className='w-max'
            paymentLink='https://buy.stripe.com/test_8wMcQP3n2gQ3g3S3cc'
          />

          <Reviews />
        </div>
        <div className='hidden lg:flex w-full gap-7 px-0 py-10 md:px-20 lg:px-0'>
          <Image
            src={HeaderImage}
            alt='Tech Stack'
            priority
            width={1500}
            height={300}
            sizes='900px'
            className='mx-auto'
          />
        </div>
      </div>
    </div>
  )
}
