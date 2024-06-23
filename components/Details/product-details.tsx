'use client'

import DetailCarousel from './carousel'

export default function ProductDetails() {
  return (
    <div className='mt-20 flex w-full flex-col items-center justify-center gap-4'>
      <h1 className='text-5xl font-semibold'>Deep dive into what&apos;s possible with</h1>
      <span className='text-6xl font-bold text-brand'>Shipi</span>
      <DetailCarousel />
    </div>
  )
}
