import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const logger = {
  info: (...args: any[]) => {
    console.info('LOGGER INFO: ', ...args)
  },
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.info('LOGGER DEBUG: ', ...args)
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.error('LOGGER ERROR: ', ...args)
    }
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const runAsyncFnWithoutBlocking = (fn: (...args: any) => Promise<any>) => {
  fn()
}
