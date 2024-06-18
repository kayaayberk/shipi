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
import { NavItems } from '@/lib/constants'

type NavigationLinksProps = {
  user: User | null
}

export default function NavigationLinks({ user }: NavigationLinksProps) {
  return (
    <>
      <Link href='/#' className='group rounded-md'>
        <div className='w-[70px] overflow-hidden rounded-md'>
          <AspectRatio ratio={16 / 7} className='flex items-center justify-center'>
            <Image
              fill
              src={MainLogo}
              alt='Shipi.fyi Logo'
              className='rounded-md object-cover p-1.5 transition-all duration-200 ease-in-out group-hover:-translate-y-5 group-hover:scale-50 group-hover:opacity-0'
            />
            <ArrowUp className='translate-y-5 text-brand opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100' />
          </AspectRatio>
        </div>
      </Link>
      {NavItems.map((item, index) => (
        <Button size={'sm'} key={item.name + index} asChild variant='ghost'>
          <Link
            href={item.link}
            className='h-min p-0.5 font-normal tracking-wide text-neutral-400 transition-colors duration-200 hover:bg-transparent'
          >
            {item.name}
          </Link>
        </Button>
      ))}
      {user ? (
        <Button
          size={'sm'}
          onClick={async () => signOut()}
          variant='ghost'
          className='h-min p-0.5 font-normal tracking-wide hover:bg-transparent text-neutral-400'
        >
          Sign Out
        </Button>
      ) : (
        <Button size={'sm'} asChild variant='ghost'>
          <Link
            href='/login'
            className='h-min p-0.5 font-normal tracking-wide hover:bg-transparent text-neutral-400'
          >
            Log In
          </Link>
        </Button>
      )}
    </>
  )
}
