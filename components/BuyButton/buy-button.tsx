import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Icons } from '../Icons/icons'

export default function BuyButton({
  paymentLink,
  className
}: {
  paymentLink: string
  className?: string
}) {
  return (
    <Link href={paymentLink} prefetch={false} >
      <button
        className={cn(
          'group relative inline-block cursor-pointer rounded-lg bg-[#B4EA51] p-px text-xs font-medium leading-6 text-white no-underline shadow-2xl shadow-zinc-900 transition-transform duration-300 hover:scale-105',
          className
        )}
      >
        <span className='absolute inset-0 overflow-hidden rounded-lg'>
          <span className='absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        </span>
        <div className='relative flex h-12 items-center justify-center gap-2 rounded-lg bg-background px-4 py-0 ring-1 ring-white/10 transition-colors duration-300 hover:bg-background/20'>
          <Icons.Send className='size-4 text-white transition-all duration-300 group-hover:text-2xl' />
          <span className='text-lg transition-all duration-300 group-hover:text-[20px]'>
            Ship now
          </span>
        </div>
        <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
      </button>
    </Link>
  )
}
