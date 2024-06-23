import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { DETAILS } from '@/lib/constants'
import Autoplay from 'embla-carousel-autoplay'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'

interface ImageCarouselnProps {
  className?: string
  children?: React.ReactNode
}

export default function DetailCarousel({ className, children }: ImageCarouselnProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }))

  useEffect(() => {
    if (!api || !thumbsApi) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

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
    <div className={cn('relative mx-auto flex w-full flex-col gap-5 py-10', className)}>
      <Carousel setApi={setThumbsApi} className='mx-auto'>
        <CarouselContent className='ml-0 w-full justify-start gap-2'>
          {DETAILS.map((detail, index) => (
            <div
              key={'thumbnail_' + detail.name}
              onClick={() => onThumbClick(index)}
              className={cn(
                'flex w-28 cursor-pointer flex-col items-center justify-start gap-4 text-center text-sm font-semibold text-neutral-400',
                { 'text-brand': index === current - 1 }
              )}
            >
              <detail.icon className='h-6 w-6' />
              <span className='text-xs'>{detail.name}</span>
            </div>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel
        setApi={setApi}
        // plugins={[plugin.current]}
        className='relative flex w-full items-center justify-center border-y px-10 py-10 lg:px-0'
      >
        <CarouselContent className='max-w-container-xs'>
          {DETAILS.map((detail, index) => (
            <CarouselItem
              className='flex items-center justify-between gap-10 md:justify-center md:gap-60'
              key={detail.name}
            >
              <div className='space-y-4'>
                <h1 className='text-lg font-semibold text-neutral-400'>{detail.name}</h1>
                <ul className='flex flex-col gap-2'>
                  {detail.options.map((option, index) => (
                    <li
                      key={option + index}
                      className='flex items-center gap-2 whitespace-nowrap text-sm tracking-wide text-neutral-400'
                    >
                      <Check size={18} className='shrink-0 text-brand' />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col items-center justify-end gap-4'>
                {detail.image &&
                  (Array.isArray(detail.image) ? (
                    <div className='flex items-center'>
                      {detail.image.map((image, i) => (
                        <Image key={index} src={image} alt={detail.name} width={50} height={50} />
                      ))}
                    </div>
                  ) : (
                    <Image src={detail.image} alt={detail.name} width={80} height={80} />
                  ))}
                <p className='whitespace-nowrap text-sm font-semibold text-neutral-400'>
                  {detail.description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {children}
    </div>
  )
}
