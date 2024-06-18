'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import React, { useCallback, useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { DETAILS } from '@/lib/constants'
import { Check } from 'lucide-react'

interface ImageCarouselnProps {
  className?: string
  children?: React.ReactNode
}

export default function DetailCarousel({ className, children }: ImageCarouselnProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api || !thumbsApi) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
      thumbsApi.scrollTo(api.selectedScrollSnap())
    })
  }, [api, thumbsApi])

  const onThumbClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <div className={cn('relative mx-auto flex max-w-full flex-col py-5', className)}>
      <Carousel setApi={setThumbsApi} opts={{ skipSnaps: true }} className='mx-auto'>
        <CarouselContent className='ml-0 h-[100px] w-full justify-start gap-6'>
          {DETAILS.map((detail, index) => (
            <div
              key={'thumbnail_' + detail.name}
              onClick={() => onThumbClick(index)}
              className={cn(
                'flex w-32 cursor-pointer flex-col items-center justify-start gap-4 text-center text-sm font-semibold text-neutral-400',
                { 'text-brand': index === current - 1 }
              )}
            >
              <detail.icon className='h-8 w-8' />
              <span>{detail.name}</span>
            </div>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel
        setApi={setApi}
        className='relative flex w-full items-center justify-center border-t pt-5'
      >
        <CarouselContent className='m-0 rounded-xl max-w-container-sm'>
          {DETAILS.map((detail, index) => (
            <CarouselItem className='flex items-start justify-center gap-4' key={detail.name}>
              <div className='space-y-4 basis-1/2'>
                <h1 className='text-lg font-semibold text-neutral-400'>{detail.name}</h1>
                <ul className='flex flex-col gap-2'>
                  {detail.options.map((option, index) => (
                    <li
                      key={option}
                      className='flex items-center gap-1 tracking-wide text-neutral-400'
                    >
                      <Check className='text-brand' />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='space-y-5 basis-1/4'>
                <Image src={detail.image} alt={detail.name} width={100} height={100} />
                <p className='text-sm w-full text-neutral-400'>{detail.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {children}
    </div>
  )
}
