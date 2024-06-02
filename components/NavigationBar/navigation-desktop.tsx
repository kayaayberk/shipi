'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import MainLogo from '@/public/MainLogo.png'
import { Icons } from '../Icons/icons'
import Image from 'next/image'
import Link from 'next/link'

const NavItems = [
  {
    name: 'Pricing',
    link: '#pricing'
  },
  {
    name: 'Wall of Love',
    link: '#wol'
  },
  {
    name: 'What is Shipi.fyi?',
    link: '#wtf'
  },
  {
    name: 'FAQ',
    link: '#faq'
  }
]

export function NavigationDesktop() {
  return (
    <nav className='sticky top-0 pt-4 hidden md:block'>
      <div className='flex items-center gap-2 justify-center md:max-w-min mx-auto px-4 py-2 rounded-2xl bg-black/20 dark:bg-white/5 backdrop-blur-md'>
        <Link href='#' className='group rounded-md'>
          <div className='w-20 rounded-md overflow-hidden'>
            <AspectRatio ratio={16 / 7} className='flex items-center justify-center'>
              <Image
                fill
                src={MainLogo}
                alt='Shipi.fyi Logo'
                className='group-hover:opacity-0 group-hover:scale-50 rounded-md object-cover p-1.5 group-hover:-translate-y-5 transition-all duration-200 ease-in-out'
              />
              <Icons.ArrowUp className='opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-brand transition-all translate-y-5 duration-200 ease-in-out' />
            </AspectRatio>
          </div>
        </Link>
        {NavItems.map((item, index) => (
          <Button key={item.name + index} asChild variant='ghost'>
            <Link href={item.link} className='text-sm tracking-wide font-normal hover:outline-brand hover:bg-transparent hover:outline'>
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}
