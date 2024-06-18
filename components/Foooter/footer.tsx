import Link from 'next/link'
import Image from 'next/image'
import Legal from './footer-legal'
import CallToAction from './footer-cta'
import FooterLinks from './footer-links'
import Logo from '@/public/MainLogo.png'

export default function Footer() {
  return (
    <div className='mx-auto flex max-w-container-md justify-center px-10 py-20'>
      <div className='mx-auto flex w-full flex-col space-y-10'>
        <Link href='#' className='relative w-max'>
          <Image src={Logo} width={100} height={100} alt='logo' className='relative cursor-pointer' />
        </Link>
        <div className='flex flex-col items-start justify-between gap-10 md:flex-row'>
          <Legal />
          <FooterLinks />
          <CallToAction />
        </div>
        <div className='w-min'>
          <div className='space-y-2'>
            <p className='whitespace-nowrap text-xs font-normal tracking-wide text-neutral-400'>
              Ship Shopify stores faster with latest technologies!
            </p>
            <p className='whitespace-nowrap text-xs font-normal tracking-wide text-neutral-400'>
              Copyright © <span>{new Date().toDateString().split(' ')[3]}</span> - All rights
              reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
