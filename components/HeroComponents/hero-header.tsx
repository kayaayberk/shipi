export default function HeroHeader() {
  return (
    <div className='flex flex-col items-center space-y-10 lg:items-start'>
      <h1 className='whitespace-nowrap text-center text-5xl font-medium tracking-tighter text-white lg:text-left xl:text-7xl'>
        Fastest way to ship
        <br />
        <span className='underline underline-offset-[14px]'>Shopify</span> stores!
      </h1>
      <p>Next.js boilerplate for Shopify headless storefront apps.</p>
    </div>
  )
}
