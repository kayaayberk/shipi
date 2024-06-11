'use client'
import { Icons } from '@/components/Icons/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'

const AvatarImages = [
  {
    src: '/Avatars/Avatar1.jpeg',
    alt: 'Avatar 1'
  },
  {
    src: '/Avatars/Avatar2.jpeg',
    alt: 'Avatar 2'
  },
  {
    src: '/Avatars/Avatar3.jpeg',
    alt: 'Avatar 3'
  },
  {
    src: '/Avatars/Avatar5.jpeg',
    alt: 'Avatar 5'
  },
  {
    src: '/Avatars/Avatar4.jpeg',
    alt: 'Avatar 4'
  }
]

export default function HeroSection() {
  return (
    <div className='mx-auto flex w-full flex-col-reverse bg-gradient-to-br justify-center from-[#141414] via-[#141414] to-[#B4EA51] lg:flex-row'>
      <div className='max-w-container-lg flex items-center justify-between'>
        <div className='mx-auto flex flex-col items-center justify-start gap-16 px-4 py-20 md:items-start w-full'>
          <h1 className='text-center text-2xl tracking-tighter text-white sm:text-[77px]/[79px] md:text-left font-medium'>
            Fastest way to ship <span className='underline underline-offset-[14px]'>Shopify</span>{' '}
            stores!
          </h1>
          <div>
            <p>- Next.js boilerplate for Shopify headless storefront apps.</p>
            <p>- Comprehensive documentation that walks you through from start to finish!</p>
          </div>
          <Link href='#' target='_blank' prefetch={false}>
            <button className='group relative inline-block cursor-pointer rounded-xl bg-[#B4EA51] p-px text-xs font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900 transition-transform duration-300 hover:scale-105'>
              <span className='absolute inset-0 overflow-hidden rounded-xl'>
                <span className='absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
              </span>
              <div className='relative flex h-14 w-60 items-center justify-center gap-1 rounded-xl bg-[#141414] px-4 py-0.5 ring-1 ring-white/10 transition-colors duration-300 hover:bg-[#141414]/20'>
                <span className='text-xl transition-all duration-300 group-hover:text-[22px]'>
                  Ship now!
                </span>
                <Icons.Send className='size-5 text-white transition-all duration-300 group-hover:text-2xl' />
              </div>
              <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
            </button>
          </Link>

          <div className='flex items-center gap-10 w-full'>
            <div className='flex -space-x-6 rtl:space-x-reverse max-w-min'>
              {AvatarImages.map((avatar, index) => (
                <Avatar className='w-12 h-12 border' key={index + avatar.src}>
                  <AvatarImage
                    src={avatar.src}
                    alt={avatar.alt}
                    className='object-cover'
                    width={48}
                    height={48}
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icons.Star key={index} className='size-5' fill='white' />
                ))}
              </div>
              <div>
                <span className='flex items-center leading-none gap-1'>
                  <span>
                    <Icons.Gift />
                  </span>
                  $100 off Join first 250 developers and get your
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto flex flex-col items-center justify-start gap-16 px-4 py-20 md:items-start w-full'>
          <h1 className='text-center text-2xl tracking-tighter text-white sm:text-[77px]/[79px] md:text-left font-medium'>
            Fastest way to ship <span className='underline underline-offset-8'>Shopify</span>{' '}
            stores!
          </h1>
          <Link href='#' target='_blank' prefetch={false}>
            <button className='group relative inline-block cursor-pointer rounded-xl bg-[#B4EA51] p-px text-xs font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900 transition-transform duration-300 hover:scale-105'>
              <span className='absolute inset-0 overflow-hidden rounded-xl'>
                <span className='absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
              </span>
              <div className='relative flex h-14 w-60 items-center justify-center gap-1 rounded-xl bg-[#141414] px-4 py-0.5 ring-1 ring-white/10 transition-colors duration-300 hover:bg-[#141414]/20'>
                <span className='text-xl transition-all duration-300 group-hover:text-[22px]'>
                  Ship now!
                </span>
                <Icons.Send className='size-5 text-white transition-all duration-300 group-hover:text-2xl' />
              </div>
              <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
            </button>
          </Link>
          <div className='flex items-center w-40 gap-2'>
            {AvatarImages.map((avatar, index) => (
              <div key={index + avatar.src} className='relative '>
                <Avatar className='w-12 h-12 absolute'>
                  <AvatarImage
                    src={avatar.src}
                    alt={avatar.alt}
                    className='object-cover'
                    width={48}
                    height={48}
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
