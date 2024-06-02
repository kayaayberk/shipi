'use client'

import { useTheme } from 'next-themes'
import { Icons } from '../Icons/icons'
import { Button } from '../ui/button'

export function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  return (
    <Button
      className='p-0'
      variant='ghost'
      size='icon'
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      {resolvedTheme === 'dark' ? <Icons.Moon size={20} /> : <Icons.Sun size={20} />}
    </Button>
  )
}
