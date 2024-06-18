import Link from 'next/link'

export default function Legal() {
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-neutral-400 font-bold tracking-wider text-sm'>LEGAL</h1>
      <Link
        href='/privacy-policy'
        className='whitespace-nowrap text-xs tracking-wider font-normal text-neutral-300 hover:underline'
      >
        Privacy Policy
      </Link>
      <Link
        href='/terms-of-service'
        className='whitespace-nowrap text-xs tracking-wider font-normal text-neutral-300 hover:underline'
      >
        Terms of Service
      </Link>
      <Link
        href='/licenses'
        className='whitespace-nowrap text-xs tracking-wider font-normal text-neutral-300 hover:underline'
      >
        Licenses
      </Link>
    </div>
  )
}
