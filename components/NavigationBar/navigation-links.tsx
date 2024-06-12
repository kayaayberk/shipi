'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'

import MainLogo from '@/public/MainLogo.png'
import { AspectRatio } from '../ui/aspect-ratio'
import { User } from '@supabase/supabase-js'
import { Icons } from '../Icons/icons'
import { ArrowUp } from 'lucide-react'
import { signOut } from '@/app/login/actions'

const NavItems = [
  {
    name: 'Pricing',
    link: '/#pricing'
  },
  {
    name: 'Wall of Love',
    link: '/#wol'
  },
  {
    name: 'What is Shipi.fyi?',
    link: '/#wtf'
  },
  {
    name: 'FAQ',
    link: '/#faq'
  }
]

type NavigationLinksProps = {
  user: User | null
}

export default function NavigationLinks({ user }: NavigationLinksProps) {
  return (
    <>
      <Link href='/#' className='group rounded-md'>
        <div className='w-20 rounded-md overflow-hidden'>
          <AspectRatio ratio={16 / 7} className='flex items-center justify-center'>
            <Image
              fill
              src={MainLogo}
              alt='Shipi.fyi Logo'
              className='group-hover:opacity-0 group-hover:scale-50 rounded-md object-cover p-1.5 group-hover:-translate-y-5 transition-all duration-200 ease-in-out'
            />
            <ArrowUp className='opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-brand transition-all translate-y-5 duration-200 ease-in-out' />
          </AspectRatio>
        </div>
      </Link>
      {NavItems.map((item, index) => (
        <Button key={item.name + index} asChild variant='ghost'>
          <Link
            href={item.link}
            className='text-sm tracking-wide font-normal hover:outline-brand hover:bg-transparent hover:outline'
          >
            {item.name}
          </Link>
        </Button>
      ))}
      {user ? (
        <Button onClick={async () => signOut()} variant='ghost' className='text-sm tracking-wide font-normal hover:outline-brand hover:bg-transparent hover:outline'>
          Sign Out
        </Button>
      ) : (
        <Button asChild variant='ghost'>
          <Link
            href='/login'
            className='text-sm tracking-wide font-normal hover:outline-brand hover:bg-transparent hover:outline'
          >
            Log In
          </Link>
        </Button>
      )}
    </>
  )
}
