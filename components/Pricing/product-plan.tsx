import { Check, X } from 'lucide-react'
import BuyButton from '../BuyButton/buy-button'
import { cn } from '@/lib/utils'

type ProductPlanProps = {
  id: string
  active: boolean
  name: string
  description: string
  paymentLink: string
  price_id: string
  discountedPrice: string
  normalPrice: string
  options: string[]
  notIncluded?: string[]
}

export default function ProductPlan({ plan }: { plan: ProductPlanProps }) {
  return (
    <div
      className={cn(
        'animate-slide-to-left relative flex flex-col gap-8 rounded-xl border bg-neutral-700/10 p-10',
        plan.name === 'All-in' && 'border-brand'
      )}
    >
      {plan.name === 'All-in' && (
        <div className='absolute inset-x-1/2 top-0 w-min -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand px-4 font-medium text-background'>
          Popular
        </div>
      )}
      <div className='flex items-center justify-between text-right text-neutral-400'>
        <h1 className='text-4xl font-semibold text-brand'>{plan.name}</h1>
        <div className='space-x-1 whitespace-nowrap'>
          <span className='text-lg line-through'>${plan.normalPrice}</span>{' '}
          <span className='text-5xl font-extrabold text-neutral-200'>${plan.discountedPrice}</span>
          <span className='text-xs'>USD</span>
        </div>
      </div>
      <hr />
      <div>
        <ul className='flex flex-col gap-2'>
          {plan.options.map((option) => (
            <li className='flex items-center gap-2 text-neutral-500' key={option}>
              <Check size={16} className='text-brand' /> {option}
            </li>
          ))}
          {plan.notIncluded &&
            plan.notIncluded.map((notIncluded) => (
              <li className='flex items-center gap-2 text-neutral-700' key={notIncluded}>
                <X size={16} className='text-neutral-400' /> {notIncluded}
              </li>
            ))}
        </ul>
      </div>
      <BuyButton paymentLink={plan.paymentLink} className='w-full' />
    </div>
  )
}
