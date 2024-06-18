import { NavItems } from '@/lib/constants'
import Link from 'next/link'

export default function FooterLinks() {
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-sm font-bold tracking-wider text-neutral-400'>LINKS</h1>
      {NavItems.map((item, index) => (
        <Link
          href={item.link}
          key={index}
          className='whitespace-nowrap text-xs tracking-wider font-normal text-neutral-300 hover:underline'
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
