import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { LaptopMinimal, Zap } from 'lucide-react'

type ActiveState = 'dev' | 'seeker'

type PlanSwitcherProps = {
  isActive: ActiveState
  setIsActive: (value: ActiveState) => void
}

export default function PlanSwitcher({ isActive, setIsActive }: PlanSwitcherProps) {
  return (
    <div className='flex w-min items-center lg:items-start gap-2 rounded-full border border-brand p-0.5'>
      <Button
        size={'lg'}
        className={cn(
          'text-md space-x-2 rounded-full px-7 font-normal tracking-normal',
          isActive === 'dev'
            ? 'bg-brand text-black hover:bg-brand animate-slide-to-left'
            : 'bg-transparent text-white hover:bg-transparent'
        )}
        onClick={() => setIsActive('dev')}
      >
        <span>
          <LaptopMinimal size={20} />
        </span>
        <span>I am a Developer</span>
      </Button>
      <Button
        size={'lg'}
        className={cn(
          'text-md space-x-2 rounded-full px-7 font-normal tracking-normal',
          isActive === 'seeker'
            ? 'bg-brand text-black hover:bg-brand animate-slide-to-right'
            : 'bg-transparent text-white hover:bg-transparent'
        )}
        onClick={() => setIsActive('seeker')}
      >
        <span>
          <Zap size={20} />
        </span>
        <span>I need a Developer</span>
      </Button>
    </div>
  )
}
