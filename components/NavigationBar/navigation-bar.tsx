'use client'

import Link from 'next/link'
import { DarkModeToggle } from '../DarkModeToggle/dark-mode-toggle'
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import MainLogo from '@/public/MainLogo.png'
import { AspectRatio } from '@/components/ui/aspect-ratio'

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

export function NavigationBar() {
  return (
    <nav className='sticky top-0 pt-4'>
      <div className='flex items-center gap-2 justify-between md:w-1/3 mx-auto p-4 rounded-md'>
        <Link href='#'>
          <div className='w-20'>
            <AspectRatio ratio={16 / 9} className='flex items-center justify-center'>
              <Image
                src={MainLogo}
                alt='Shipi.fyi Logo'
                layout='fill'
                objectFit='contain'
                className='rounded-md object-cover'
              />
            </AspectRatio>
          </div>
        </Link>
        {NavItems.map((item, index) => (
          <Button key={item.name + index} asChild variant='ghost'>
            <Link href={item.link}>{item.name}</Link>
          </Button>
        ))}
        <DarkModeToggle />
      </div>
    </nav>
  )
}
