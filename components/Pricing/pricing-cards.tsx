import ProductPlan from './product-plan'
import PlanSwitcher from './plan-switcher'
import { productFixtures } from '@/lib/stripe/fixtures'
import { useState } from 'react'
import ServicePlan from './service-plan'

export default function PricingCards() {
  const [isActive, setIsActive] = useState<'dev' | 'seeker'>('dev')
  return (
    <div className='relative flex flex-col gap-5 p-10 lg:px-32'>
      <PlanSwitcher isActive={isActive} setIsActive={setIsActive} />
      <div className='gap-5'>
        {isActive === 'dev' ? (
          <div className='grid gap-10 lg:grid-cols-2'>
            {productFixtures.map((plan) => (
              <div key={plan.id} className='relative col-span-1'>
                <ProductPlan plan={plan} />
              </div>
            ))}
          </div>
        ) : (
          <div className=''>
            <ServicePlan />
          </div>
        )}
      </div>
    </div>
  )
}
